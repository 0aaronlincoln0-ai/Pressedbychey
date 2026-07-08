import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "pressed-by-chey";
const ORDER_PREFIX = "orders";
const PHOTO_PREFIX = "request-photos";
const DATA_URL_PATTERN = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([a-zA-Z0-9+/=\s]+)$/;

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(init.headers || {})
    }
  });
}

function safeText(value, maxLength = 300) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeEmail(value = "") {
  return safeText(value, 160).toLowerCase();
}

function imageExtension(mimeType) {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/gif") return "gif";
  return "jpg";
}

function orderKey(orderId) {
  return `${ORDER_PREFIX}/${orderId}.json`;
}

function photoUrlForKey(key, origin = "") {
  const path = `/.netlify/functions/custom-request?photo=${encodeURIComponent(key)}`;
  return origin ? `${origin}${path}` : path;
}

function safePhotoKey(key) {
  const value = String(key || "").trim();
  if (!/^request-photos\/[a-z0-9._-]+$/i.test(value)) return "";
  if (value.includes("..")) return "";
  return value;
}

async function storeReferencePhoto(store, dataUrl = "", origin = "") {
  const match = String(dataUrl || "").match(DATA_URL_PATTERN);
  if (!match) return "";
  const [, mimeType, base64] = match;
  const bytes = Buffer.from(base64.replace(/\s/g, ""), "base64");
  if (!bytes.length) return "";
  const key = `${PHOTO_PREFIX}/${Date.now()}-${randomUUID()}.${imageExtension(mimeType)}`;
  const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  await store.set(key, arrayBuffer, {
    metadata: {
      contentType: mimeType,
      createdAt: new Date().toISOString(),
      kind: "custom-request"
    }
  });
  return photoUrlForKey(key, origin);
}

function publicOrder(order = {}) {
  return {
    id: order.id || "",
    status: order.status || "",
    paymentStatus: order.paymentStatus || "",
    fulfillmentStatus: order.fulfillmentStatus || "Needs review",
    createdAt: order.createdAt || "",
    customer: order.customer || {},
    items: Array.isArray(order.items) ? order.items : [],
    total: order.total || 0,
    currency: order.currency || "usd"
  };
}

export default async (request) => {
  const store = getStore(STORE_NAME);
  const url = new URL(request.url);
  const photoKey = safePhotoKey(url.searchParams.get("photo"));

  if (request.method === "GET" && url.searchParams.has("photo")) {
    if (!photoKey) return jsonResponse({ error: "Invalid photo key" }, { status: 400 });
    const entry = await store.getWithMetadata(photoKey, { type: "arrayBuffer" });
    if (!entry?.data) return jsonResponse({ error: "Photo not found" }, { status: 404 });
    return new Response(entry.data, {
      headers: {
        "Content-Type": entry.metadata?.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid custom request." }, { status: 400 });
  }

  const customer = payload?.customer || {};
  const email = normalizeEmail(customer.email);
  const name = safeText(customer.name || "Customer", 100);
  const phone = safeText(customer.phone, 40);
  const sizing = safeText(customer.sizing, 700);
  const notes = safeText(customer.notes, 700);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "A customer email is required for Chey to follow up." }, { status: 400 });
  }

  const sourceItems = Array.isArray(payload?.items) ? payload.items.slice(0, 8) : [];
  if (!sourceItems.length) {
    return jsonResponse({ error: "Add a custom request before submitting." }, { status: 400 });
  }

  const items = [];
  for (const item of sourceItems) {
    const name = safeText(item?.name || "Custom request", 120);
    const note = safeText(item?.note, 900);
    const image = await storeReferencePhoto(store, item?.image, url.origin);
    const shape = safeText(item?.shape, 80);
    const length = safeText(item?.length, 80);
    const sizePreference = safeText(item?.sizePreference, 120);
    items.push({
      name,
      quantity: Math.max(1, Math.min(10, Number(item?.quantity) || 1)),
      unitAmount: 0,
      customOrder: true,
      category: safeText(item?.category || shape || "custom request", 80),
      shape,
      length,
      sizePreference,
      note,
      image
    });
  }

  const now = new Date().toISOString();
  const order = {
    id: `pbc-${Date.now()}-${randomUUID().slice(0, 8)}`,
    status: "quote_request",
    paymentStatus: "no_payment_required",
    fulfillmentStatus: "Needs review",
    createdAt: now,
    updatedAt: now,
    customer: {
      mode: safeText(customer.mode || "account", 20),
      name,
      email,
      phone,
      sizing,
      notes
    },
    customerEmail: email,
    customerName: name,
    customerPhone: phone,
    items,
    total: 0,
    currency: "usd",
    orderNotificationEmail: process.env.ORDER_NOTIFICATION_EMAIL || process.env.CHEY_SUPPORT_EMAIL || "callison@pressedbychey.com"
  };

  await store.setJSON(orderKey(order.id), order);
  return jsonResponse({ ok: true, order: publicOrder(order) });
};
