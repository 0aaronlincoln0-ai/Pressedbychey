import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "pressed-by-chey";
const CUSTOMER_PREFIX = "customers";

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

function publicCustomer(customer = {}) {
  return {
    name: customer.name || "",
    email: customer.email || "",
    sizes: normalizeSizes(customer.sizes),
    savedProducts: Array.isArray(customer.savedProducts) ? customer.savedProducts : [],
    orders: Array.isArray(customer.orders) ? customer.orders : [],
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
  const password = String(payload?.password || "");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!password || password.length < 3) {
    return jsonResponse({ error: "Enter the account password." }, { status: 400 });
  }

  const key = customerKey(email);
  const savedCustomer = await store.get(key, { type: "json" });

  if (action === "register") {
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
    return jsonResponse({ ok: true, customer: publicCustomer(customer) });
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
    return jsonResponse({ ok: true, customer: publicCustomer(savedCustomer) });
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
    return jsonResponse({ ok: true, customer: publicCustomer(nextCustomer) });
  }

  return jsonResponse({ error: "Unknown account action." }, { status: 400 });
};
