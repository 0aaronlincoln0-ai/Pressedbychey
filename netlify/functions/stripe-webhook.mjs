import { createHmac, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "pressed-by-chey";
const ORDER_PREFIX = "orders";
const EVENT_PREFIX = "stripe-events";
const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

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

function orderKey(orderId) {
  return `${ORDER_PREFIX}/${orderId}.json`;
}

function webhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET || "";
}

function parseStripeSignature(header = "") {
  const values = {};
  for (const part of String(header).split(",")) {
    const separator = part.indexOf("=");
    if (separator <= 0) continue;
    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (!key || !value) continue;
    values[key] = values[key] || [];
    values[key].push(value);
  }
  return values;
}

export function verifySignature(rawBody, signatureHeader, secret, now = Date.now()) {
  if (!secret) return false;
  const parsed = parseStripeSignature(signatureHeader);
  const timestamp = Number(parsed.t?.[0]);
  const signatures = parsed.v1 || [];
  if (!Number.isFinite(timestamp) || !signatures.length) return false;
  if (Math.abs(Math.floor(now / 1000) - timestamp) > SIGNATURE_TOLERANCE_SECONDS) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const left = Buffer.from(expected, "hex");
  return signatures.some((signature) => {
    if (!/^[a-f0-9]{64}$/i.test(signature)) return false;
    const right = Buffer.from(signature, "hex");
    return left.length === right.length && timingSafeEqual(left, right);
  });
}

function publicCustomerFromSession(session = {}, saved = {}) {
  const details = session.customer_details || {};
  return {
    ...(saved.customer || {}),
    name: details.name || saved.customer?.name || saved.customerName || "",
    email: details.email || saved.customer?.email || saved.customerEmail || "",
    phone: details.phone || saved.customer?.phone || saved.customerPhone || ""
  };
}

function shippingFromSession(session = {}, saved = {}) {
  const shipping = session.shipping_details || {};
  return {
    ...(saved.shipping || {}),
    name: shipping.name || "",
    address: shipping.address || null
  };
}

async function markCheckoutCompleted(session = {}) {
  const orderId = session.metadata?.order_id || session.client_reference_id || "";
  if (!orderId) return { updated: false, reason: "No order id" };
  const store = getStore(STORE_NAME);
  const savedOrder = await store.get(orderKey(orderId), { type: "json" });
  const nextOrder = {
    ...(savedOrder || {}),
    id: orderId,
    stripeSessionId: session.id,
    status: "complete",
    paymentStatus: session.payment_status || "paid",
    fulfillmentStatus: savedOrder?.fulfillmentStatus === "Payment pending" ? "Needs review" : savedOrder?.fulfillmentStatus || "Needs review",
    quoteStatus: savedOrder?.quoteStatus === "Accepted" ? "Paid" : savedOrder?.quoteStatus || "",
    amountSubtotal: session.amount_subtotal,
    amountTotal: session.amount_total,
    total: savedOrder?.total || session.amount_total || 0,
    currency: session.currency || savedOrder?.currency || "usd",
    customer: publicCustomerFromSession(session, savedOrder || {}),
    customerEmail: session.customer_details?.email || savedOrder?.customerEmail || "",
    customerName: session.customer_details?.name || savedOrder?.customerName || "",
    customerPhone: session.customer_details?.phone || savedOrder?.customerPhone || "",
    shipping: shippingFromSession(session, savedOrder || {}),
    paidAt: savedOrder?.paidAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  await store.setJSON(orderKey(orderId), nextOrder);
  return { updated: true, orderId };
}

export function eventKey(eventId = "") {
  const safeId = String(eventId || "").trim();
  return /^evt_[a-zA-Z0-9_]+$/.test(safeId) ? `${EVENT_PREFIX}/${safeId}.json` : "";
}

export default async (request) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  const rawBody = await request.text();
  const secret = webhookSecret();
  const signature = request.headers.get("stripe-signature") || "";
  if (!verifySignature(rawBody, signature, secret)) {
    return jsonResponse({ error: "Invalid webhook signature" }, { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Invalid webhook event." }, { status: 400 });
  }

  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const processedKey = eventKey(event.id);
  if (!processedKey) return jsonResponse({ error: "Invalid webhook event id." }, { status: 400 });
  if (await store.get(processedKey, { type: "json" })) {
    return jsonResponse({ received: true, duplicate: true });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data?.object || {};
    if (session.payment_status !== "paid") {
      await store.setJSON(processedKey, { processedAt: new Date().toISOString(), type: event.type, paid: false });
      return jsonResponse({ received: true, updated: false, reason: "Payment is not paid" });
    }
    const result = await markCheckoutCompleted(session);
    await store.setJSON(processedKey, { processedAt: new Date().toISOString(), type: event.type, orderId: result.orderId || "" });
    return jsonResponse({ received: true, ...result });
  }

  await store.setJSON(processedKey, { processedAt: new Date().toISOString(), type: event.type || "unknown", ignored: true });
  return jsonResponse({ received: true, ignored: event.type || "unknown" });
};
