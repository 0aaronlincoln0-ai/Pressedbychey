import { getStore } from "@netlify/blobs";

const STORE_NAME = "pressed-by-chey";
const CUSTOMER_PREFIX = "customers";
const DEFAULT_ADMIN_PASSWORD = "chey2026";
const DEFAULT_ADMIN_EMAILS = ["admin", "chey", "admin@pressedbychey.com", "chey@pressedbychey.com", "cheyenne@pressedbychey.com", "callison@pressedbychey.com"];
const ALLOWED_STATUSES = ["active", "paused", "blocked"];
const MAX_CUSTOMERS = 2000;

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

function adminEmails() {
  return (process.env.CHEY_ADMIN_EMAILS || DEFAULT_ADMIN_EMAILS.join(","))
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function isAuthorizedAdmin(request) {
  const email = normalizeEmail(request.headers.get("x-admin-email"));
  const password = request.headers.get("x-admin-password") || "";
  return adminEmails().includes(email) && password === (process.env.CHEY_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD);
}

function blankHandSizes() {
  return { thumb: "", index: "", middle: "", ring: "", pinky: "" };
}

function normalizeSizes(sizes = {}) {
  const source = sizes && typeof sizes === "object" ? sizes : {};
  const next = { left: blankHandSizes(), right: blankHandSizes() };
  for (const hand of ["left", "right"]) {
    const handSource = source[hand] && typeof source[hand] === "object" ? source[hand] : {};
    for (const finger of Object.keys(next[hand])) next[hand][finger] = safeText(handSource[finger], 20);
  }
  return next;
}

function normalizeStatus(value = "active") {
  const status = safeText(value, 20).toLowerCase();
  return ALLOWED_STATUSES.includes(status) ? status : "active";
}

function orderCount(customer) {
  return Array.isArray(customer?.orders) ? customer.orders.length : 0;
}

function publicCustomer(customer = {}, detailed = false) {
  const base = {
    name: safeText(customer.name, 100),
    email: normalizeEmail(customer.email),
    accountStatus: normalizeStatus(customer.accountStatus),
    adminNote: safeText(customer.adminNote, 1200),
    sizes: normalizeSizes(customer.sizes),
    savedProductCount: Array.isArray(customer.savedProducts) ? customer.savedProducts.length : 0,
    orderCount: orderCount(customer),
    createdAt: customer.createdAt || "",
    lastLogin: customer.lastLogin || "",
    updatedAt: customer.updatedAt || ""
  };
  if (!detailed) return base;
  return {
    ...base,
    savedProducts: Array.isArray(customer.savedProducts) ? customer.savedProducts.slice(0, 50) : [],
    orders: Array.isArray(customer.orders) ? customer.orders.slice(0, 75) : []
  };
}

async function readPayload(request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid customer admin request.");
  }
}

async function listCustomers(store, payload = {}) {
  const search = safeText(payload.search, 160).toLowerCase();
  const status = normalizeStatus(payload.status || "active");
  const allStatuses = payload.status === "all" || !payload.status;
  const listing = await store.list({ prefix: `${CUSTOMER_PREFIX}/` });
  const matches = [];
  for (const entry of (listing.blobs || []).slice(0, MAX_CUSTOMERS)) {
    const customer = await store.get(entry.key, { type: "json" });
    if (!customer) continue;
    const publicRecord = publicCustomer(customer);
    const haystack = `${publicRecord.name} ${publicRecord.email}`.toLowerCase();
    if (search && !haystack.includes(search)) continue;
    if (!allStatuses && publicRecord.accountStatus !== status) continue;
    matches.push(publicRecord);
  }
  matches.sort((a, b) => String(b.lastLogin || b.createdAt).localeCompare(String(a.lastLogin || a.createdAt)));
  const pageSize = Math.min(Math.max(Number(payload.pageSize) || 25, 1), 100);
  const page = Math.max(Number(payload.page) || 1, 1);
  const total = matches.length;
  return {
    customers: matches.slice((page - 1) * pageSize, page * pageSize),
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize))
  };
}

export default async (request) => {
  if (!isAuthorizedAdmin(request)) return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, { status: 405 });

  let payload;
  try {
    payload = await readPayload(request);
  } catch (error) {
    return jsonResponse({ error: error.message }, { status: 400 });
  }

  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const action = safeText(payload?.action, 40);
  if (action === "list") return jsonResponse({ ok: true, ...(await listCustomers(store, payload)) });

  const email = normalizeEmail(payload?.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "A valid customer email is required." }, { status: 400 });
  }
  const key = customerKey(email);
  const customer = await store.get(key, { type: "json" });
  if (!customer) return jsonResponse({ error: "Customer account not found." }, { status: 404 });

  if (action === "get") return jsonResponse({ ok: true, customer: publicCustomer(customer, true) });
  if (action === "update") {
    const nextCustomer = {
      ...customer,
      name: safeText(payload.name || customer.name, 100),
      sizes: normalizeSizes(payload.sizes || customer.sizes),
      accountStatus: normalizeStatus(payload.accountStatus || customer.accountStatus),
      adminNote: safeText(payload.adminNote || "", 1200),
      updatedAt: new Date().toISOString()
    };
    await store.setJSON(key, nextCustomer);
    return jsonResponse({ ok: true, customer: publicCustomer(nextCustomer, true) });
  }
  return jsonResponse({ error: "Unknown customer admin action." }, { status: 400 });
};
