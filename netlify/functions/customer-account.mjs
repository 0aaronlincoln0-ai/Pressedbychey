import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "pressed-by-chey";
const CUSTOMER_PREFIX = "customers";
const ORDER_PREFIX = "orders";
const RESET_PREFIX = "customer-password-resets";
const RESET_CODE_TTL_MS = 15 * 60 * 1000;
const MAX_RESET_ATTEMPTS = 5;

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

function safeText(value, maxLength = 240) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeEmail(value = "") {
  return safeText(value, 160).toLowerCase();
}

function customerKey(email) {
  return `${CUSTOMER_PREFIX}/${encodeURIComponent(email)}.json`;
}

function orderKey(orderId) {
  return `${ORDER_PREFIX}/${orderId}.json`;
}

function resetKey(email) {
  return `${RESET_PREFIX}/${encodeURIComponent(email)}.json`;
}

function blankHandSizes() {
  return { thumb: "", index: "", middle: "", ring: "", pinky: "" };
}

function normalizeSizes(sizes = {}) {
  const source = sizes && typeof sizes === "object" ? sizes : {};
  const next = { left: blankHandSizes(), right: blankHandSizes() };
  for (const hand of ["left", "right"]) {
    const handSource = source[hand] && typeof source[hand] === "object" ? source[hand] : {};
    for (const finger of Object.keys(next[hand])) {
      next[hand][finger] = safeText(handSource[finger], 20);
    }
  }
  return next;
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, savedHash = "") {
  const [salt, hash] = String(savedHash).split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(String(password), salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function createResetCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function genericResetResponse() {
  return jsonResponse({
    ok: true,
    message: "If that email has a customer account, a reset passcode has been sent."
  });
}

function resetEmailFromAddress() {
  return process.env.PASSWORD_RESET_FROM_EMAIL || process.env.CHEY_SUPPORT_EMAIL || "";
}

function resetReplyToAddress() {
  return process.env.CHEY_SUPPORT_EMAIL || process.env.ORDER_NOTIFICATION_EMAIL || "callison@pressedbychey.com";
}

function resetEmailHtml({ name, code }) {
  const safeName = safeText(name || "there", 80);
  return `
    <div style="font-family:Arial,sans-serif;color:#2b1821;line-height:1.5">
      <h2 style="color:#9b1957">Reset your Pressed by Chey password</h2>
      <p>Hi ${safeName},</p>
      <p>Your one-time password reset passcode is:</p>
      <p style="font-size:28px;font-weight:700;letter-spacing:0.2em;color:#9b1957">${code}</p>
      <p>This code expires in 15 minutes. If you did not ask for this, you can ignore this email.</p>
      <p>Pressed by Chey</p>
    </div>
  `;
}

async function sendResetEmail({ to, name, code }) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = resetEmailFromAddress();
  if (!apiKey || !from) {
    throw new Error("Password reset email is not configured yet.");
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "pressedbychey-site/1.0"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: resetReplyToAddress(),
      subject: "Your Pressed by Chey password reset code",
      html: resetEmailHtml({ name, code }),
      text: `Your Pressed by Chey password reset code is ${code}. It expires in 15 minutes.`
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || "Password reset email could not be sent.");
  }
  return payload;
}

function publicOrder(order = {}) {
  return {
    id: order.id || "",
    status: order.status || "",
    paymentStatus: order.paymentStatus || "",
    fulfillmentStatus: order.fulfillmentStatus || "",
    date: order.createdAt || order.date || "",
    createdAt: order.createdAt || "",
    paidAt: order.paidAt || "",
    customer: order.customer || {},
    sizing: order.customer?.sizing || order.sizing || "",
    items: Array.isArray(order.items) ? order.items : [],
    total: order.total || order.amountTotal || 0,
    currency: order.currency || "usd",
    quoteAmount: Number(order.quoteAmount || 0),
    quoteStatus: order.quoteStatus || "",
    quoteMessage: order.quoteMessage || "",
    quoteUpdatedAt: order.quoteUpdatedAt || "",
    quoteAcceptedAt: order.quoteAcceptedAt || ""
  };
}

async function liveOrdersForCustomer(store, email) {
  const listing = await store.list({ prefix: `${ORDER_PREFIX}/` });
  const orders = [];
  for (const entry of listing.blobs || []) {
    const order = await store.get(entry.key, { type: "json" });
    const orderEmail = normalizeEmail(order?.customer?.email || order?.customerEmail);
    if (order && orderEmail === email) orders.push(publicOrder(order));
  }
  return orders.sort((a, b) => String(b.createdAt || b.date || b.paidAt).localeCompare(String(a.createdAt || a.date || a.paidAt)));
}

function mergeOrderLists(savedOrders = [], liveOrders = []) {
  const merged = [];
  const seen = new Set();
  for (const order of [...liveOrders, ...(Array.isArray(savedOrders) ? savedOrders : [])]) {
    const id = order?.id || "";
    if (id && seen.has(id)) continue;
    if (id) seen.add(id);
    merged.push(order);
  }
  return merged.slice(0, 75);
}

async function publicCustomer(customer = {}, store = null) {
  const email = normalizeEmail(customer.email);
  const liveOrders = store && email ? await liveOrdersForCustomer(store, email) : [];
  return {
    name: customer.name || "",
    email,
    sizes: normalizeSizes(customer.sizes),
    savedProducts: Array.isArray(customer.savedProducts) ? customer.savedProducts : [],
    orders: mergeOrderLists(customer.orders, liveOrders),
    createdAt: customer.createdAt || "",
    lastLogin: customer.lastLogin || ""
  };
}

async function readPayload(request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid account request.");
  }
}

export default async (request) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  const store = getStore(STORE_NAME);
  let payload;
  try {
    payload = await readPayload(request);
  } catch (error) {
    return jsonResponse({ error: error.message }, { status: 400 });
  }

  const action = safeText(payload?.action, 40);
  const email = normalizeEmail(payload?.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Enter a valid email address." }, { status: 400 });
  }

  const key = customerKey(email);
  const savedCustomer = await store.get(key, { type: "json" });

  if (action === "request-reset") {
    if (!savedCustomer) return genericResetResponse();
    const code = createResetCode();
    const resetRecord = {
      email,
      codeHash: hashPassword(code),
      expiresAt: Date.now() + RESET_CODE_TTL_MS,
      attempts: 0,
      createdAt: new Date().toISOString()
    };
    await store.setJSON(resetKey(email), resetRecord);
    try {
      await sendResetEmail({ to: email, name: savedCustomer.name, code });
    } catch (error) {
      await store.delete(resetKey(email));
      return jsonResponse({ error: error.message || "Password reset email could not be sent." }, { status: 503 });
    }
    return genericResetResponse();
  }

  if (action === "confirm-reset") {
    const code = safeText(payload?.code, 12);
    const newPassword = String(payload?.newPassword || "");
    if (!code || !newPassword || newPassword.length < 8) {
      return jsonResponse({ error: "Enter the reset code and a new password with at least 8 characters." }, { status: 400 });
    }
    const resetRecord = await store.get(resetKey(email), { type: "json" });
    if (!savedCustomer || !resetRecord || Date.now() > Number(resetRecord.expiresAt || 0)) {
      await store.delete(resetKey(email));
      return jsonResponse({ error: "That reset code is invalid or expired. Request a new one." }, { status: 400 });
    }
    if (Number(resetRecord.attempts || 0) >= MAX_RESET_ATTEMPTS) {
      await store.delete(resetKey(email));
      return jsonResponse({ error: "Too many reset attempts. Request a fresh passcode." }, { status: 429 });
    }
    if (!verifyPassword(code, resetRecord.codeHash)) {
      resetRecord.attempts = Number(resetRecord.attempts || 0) + 1;
      await store.setJSON(resetKey(email), resetRecord);
      return jsonResponse({ error: "That reset code does not match." }, { status: 400 });
    }
    const nextCustomer = {
      ...savedCustomer,
      passwordHash: hashPassword(newPassword),
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await store.setJSON(key, nextCustomer);
    await store.delete(resetKey(email));
    return jsonResponse({ ok: true, customer: await publicCustomer(nextCustomer, store) });
  }

  const password = String(payload?.password || "");
  if (!password || password.length < 3) {
    return jsonResponse({ error: "Enter the account password." }, { status: 400 });
  }

  if (action === "register") {
    if (password.length < 8) {
      return jsonResponse({ error: "Use at least 8 characters for the account password." }, { status: 400 });
    }
    if (savedCustomer) {
      return jsonResponse({ error: "That email already has an account. Sign in instead." }, { status: 409 });
    }
    const now = new Date().toISOString();
    const customer = {
      name: safeText(payload?.name || email.split("@")[0], 100),
      email,
      passwordHash: hashPassword(password),
      sizes: normalizeSizes(payload?.sizes),
      savedProducts: [],
      orders: [],
      createdAt: now,
      lastLogin: now
    };
    await store.setJSON(key, customer);
    return jsonResponse({ ok: true, customer: await publicCustomer(customer, store) });
  }

  if (!savedCustomer) {
    return jsonResponse({ error: "No account found with that email. Create a profile first." }, { status: 404 });
  }
  if (!verifyPassword(password, savedCustomer.passwordHash)) {
    return jsonResponse({ error: "That password does not match this account." }, { status: 401 });
  }

  if (action === "login") {
    savedCustomer.lastLogin = new Date().toISOString();
    await store.setJSON(key, savedCustomer);
    return jsonResponse({ ok: true, customer: await publicCustomer(savedCustomer, store) });
  }

  if (action === "refresh-profile") {
    return jsonResponse({ ok: true, customer: await publicCustomer(savedCustomer, store) });
  }

  if (action === "save-profile") {
    const nextCustomer = {
      ...savedCustomer,
      name: safeText(payload?.name || savedCustomer.name, 100),
      sizes: normalizeSizes(payload?.sizes || savedCustomer.sizes),
      savedProducts: Array.isArray(payload?.savedProducts) ? payload.savedProducts.slice(0, 50) : savedCustomer.savedProducts || [],
      orders: Array.isArray(payload?.orders) ? payload.orders.slice(0, 50) : savedCustomer.orders || [],
      updatedAt: new Date().toISOString()
    };
    await store.setJSON(key, nextCustomer);
    return jsonResponse({ ok: true, customer: await publicCustomer(nextCustomer, store) });
  }

  return jsonResponse({ error: "Unknown account action." }, { status: 400 });
};
