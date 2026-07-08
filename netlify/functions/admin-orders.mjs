import { getStore } from "@netlify/blobs";

const STORE_NAME = "pressed-by-chey";
const ORDER_PREFIX = "orders";
const DEFAULT_ADMIN_PASSWORD = "chey2026";
const DEFAULT_ADMIN_EMAILS = ["admin", "chey", "admin@pressedbychey.com", "chey@pressedbychey.com", "cheyenne@pressedbychey.com", "callison@pressedbychey.com"];

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

function adminEmails() {
  return (process.env.CHEY_ADMIN_EMAILS || DEFAULT_ADMIN_EMAILS.join(","))
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function adminPassword() {
  return process.env.CHEY_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

function isAuthorized(request) {
  const email = (request.headers.get("x-admin-email") || "").trim().toLowerCase();
  const password = request.headers.get("x-admin-password") || "";
  return adminEmails().includes(email) && password === adminPassword();
}

function safeOrderId(value = "") {
  const id = String(value || "").trim();
  if (!/^pbc-\d+-[a-z0-9-]+$/i.test(id)) return "";
  return id;
}

function orderKey(orderId) {
  return `${ORDER_PREFIX}/${orderId}.json`;
}

function publicOrder(order = {}) {
  return {
    id: order.id || "",
    status: order.status || "",
    paymentStatus: order.paymentStatus || "",
    fulfillmentStatus: order.fulfillmentStatus || (order.paymentStatus === "paid" ? "Needs review" : "Payment pending"),
    createdAt: order.createdAt || "",
    paidAt: order.paidAt || "",
    customer: order.customer || {},
    customerEmail: order.customerEmail || "",
    customerName: order.customerName || "",
    customerPhone: order.customerPhone || "",
    shipping: order.shipping || order.shippingDetails || {},
    items: Array.isArray(order.items) ? order.items : [],
    total: order.total || order.amountTotal || 0,
    currency: order.currency || "usd",
    adminNote: order.adminNote || "",
    quoteAmount: Number(order.quoteAmount || 0),
    quoteStatus: order.quoteStatus || "",
    quoteMessage: order.quoteMessage || "",
    quoteUpdatedAt: order.quoteUpdatedAt || "",
    quoteAcceptedAt: order.quoteAcceptedAt || ""
  };
}

async function listOrders(store) {
  const listing = await store.list({ prefix: `${ORDER_PREFIX}/` });
  const orders = [];
  for (const entry of listing.blobs || []) {
    const order = await store.get(entry.key, { type: "json" });
    if (order) orders.push(publicOrder(order));
  }
  return orders.sort((a, b) => String(b.createdAt || b.paidAt).localeCompare(String(a.createdAt || a.paidAt)));
}

function normalizeFulfillmentStatus(value = "") {
  const status = String(value || "").trim();
  const allowed = ["Payment pending", "Needs review", "Needs making", "Making", "Packing", "Ready to ship", "Shipped", "Completed", "Canceled"];
  return allowed.includes(status) ? status : "Needs review";
}

function moneyToCents(value) {
  const amount = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? Math.max(0, Math.round(amount * 100)) : 0;
}

function normalizeQuoteStatus(value = "", quoteAmount = 0) {
  const status = String(value || "").trim();
  const allowed = ["Needs quote", "Quoted", "Accepted", "Paid", "Declined", "Canceled"];
  if (allowed.includes(status)) return status;
  return quoteAmount > 0 ? "Quoted" : "Needs quote";
}

export default async (request) => {
  if (!isAuthorized(request)) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  const store = getStore(STORE_NAME);

  if (request.method === "GET") {
    const orders = await listOrders(store);
    return jsonResponse({ ok: true, orders });
  }

  if (request.method === "PUT") {
    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid order update." }, { status: 400 });
    }

    const orderId = safeOrderId(payload?.orderId);
    if (!orderId) return jsonResponse({ error: "Valid order ID is required." }, { status: 400 });

    const savedOrder = await store.get(orderKey(orderId), { type: "json" });
    if (!savedOrder) return jsonResponse({ error: "Order not found." }, { status: 404 });

    const nextOrder = {
      ...savedOrder,
      fulfillmentStatus: normalizeFulfillmentStatus(payload?.fulfillmentStatus),
      adminNote: String(payload?.adminNote || savedOrder.adminNote || "").slice(0, 600),
      updatedAt: new Date().toISOString()
    };
    const hasQuoteItems = Array.isArray(savedOrder.items) && savedOrder.items.some((item) => item?.customOrder);
    if (hasQuoteItems || savedOrder.status === "quote_request" || savedOrder.quoteStatus) {
      const quoteAmount = Object.prototype.hasOwnProperty.call(payload, "quoteAmount")
        ? moneyToCents(payload?.quoteAmount)
        : Math.max(0, Math.round(Number(savedOrder.quoteAmount || 0)));
      nextOrder.quoteAmount = quoteAmount;
      nextOrder.quoteStatus = normalizeQuoteStatus(payload?.quoteStatus || savedOrder.quoteStatus, quoteAmount);
      nextOrder.quoteMessage = String(payload?.quoteMessage || savedOrder.quoteMessage || "").replace(/\s+/g, " ").trim().slice(0, 900);
      nextOrder.quoteUpdatedAt = new Date().toISOString();
      if (quoteAmount > 0 && nextOrder.paymentStatus !== "paid") {
        nextOrder.paymentStatus = "unpaid";
        nextOrder.status = "quote_sent";
        if (nextOrder.fulfillmentStatus === "Needs review") nextOrder.fulfillmentStatus = "Payment pending";
      }
    }
    await store.setJSON(orderKey(orderId), nextOrder);
    return jsonResponse({ ok: true, order: publicOrder(nextOrder) });
  }

  if (request.method === "DELETE") {
    const url = new URL(request.url);
    const orderId = safeOrderId(url.searchParams.get("orderId"));
    if (!orderId) return jsonResponse({ error: "Valid order ID is required." }, { status: 400 });
    await store.delete(orderKey(orderId));
    return jsonResponse({ ok: true, deleted: orderId });
  }

  return jsonResponse({ error: "Method not allowed" }, { status: 405 });
};
