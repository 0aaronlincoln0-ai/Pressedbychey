import { getStore } from "@netlify/blobs";
import { verifyAdminCapability } from "./_shared/admin-auth.mjs";

const STORE_NAME = "pressed-by-chey";
const ORDER_PREFIX = "orders";

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

function safeOrderId(value = "") {
  const id = String(value || "").trim();
  if (!/^pbc-\d+-[a-z0-9-]+$/i.test(id)) return "";
  return id;
}

function orderKey(orderId) {
  return `${ORDER_PREFIX}/${orderId}.json`;
}

export function isQuoteOrder(order = {}) {
  const status = String(order.status || "").trim().toLowerCase();
  const hasCustomQuoteItem = Array.isArray(order.items) && order.items.some((item) => item?.customOrder);
  const isPaidShopOrder = order.paymentStatus === "paid"
    || Boolean(order.paidAt)
    || ["complete", "completed", "paid", "shipped"].includes(status);
  return hasCustomQuoteItem
    || ["quote_request", "quote_checkout", "quote_sent"].includes(status)
    || (!isPaidShopOrder && (Number(order.quoteAmount || order.quoteAmountCents || 0) > 0 || Boolean(String(order.quoteMessage || "").trim())));
}

function publicOrder(order = {}) {
  const quoteOrder = isQuoteOrder(order);
  return {
    id: order.id || "",
    status: order.status || "",
    paymentStatus: order.paymentStatus || "",
    fulfillmentStatus: order.fulfillmentStatus || (order.paymentStatus === "paid" ? "Needs review" : "Payment pending"),
    createdAt: order.createdAt || "",
    updatedAt: order.updatedAt || order.createdAt || "",
    paidAt: order.paidAt || "",
    customer: order.customer || {},
    customerEmail: order.customerEmail || "",
    customerName: order.customerName || "",
    customerPhone: order.customerPhone || "",
    shipping: order.shipping || order.shippingDetails || {},
    items: Array.isArray(order.items) ? order.items : [],
    total: order.total || order.amountTotal || 0,
    currency: order.currency || "usd",
    stripeSessionId: order.stripeSessionId || "",
    adminNote: order.adminNote || "",
    quoteAmount: quoteOrder ? Number(order.quoteAmount || 0) : 0,
    quoteStatus: quoteOrder ? order.quoteStatus || "" : "",
    quoteMessage: quoteOrder ? order.quoteMessage || "" : "",
    quoteUpdatedAt: quoteOrder ? order.quoteUpdatedAt || "" : "",
    quoteAcceptedAt: quoteOrder ? order.quoteAcceptedAt || "" : ""
  };
}

export function dedupeOrders(orders = []) {
  const seen = new Set();
  return orders.filter((order) => {
    const identities = [
      order?.id ? `id:${String(order.id).trim().toLowerCase()}` : "",
      order?.stripeSessionId ? `stripe-session:${String(order.stripeSessionId).trim().toLowerCase()}` : ""
    ].filter(Boolean);
    if (!identities.length || identities.some((identity) => seen.has(identity))) return false;
    identities.forEach((identity) => seen.add(identity));
    return true;
  });
}

async function listOrders(store) {
  const listing = await store.list({ prefix: `${ORDER_PREFIX}/` });
  const orders = (await Promise.all(
    (listing.blobs || []).map(async (entry) => {
      const order = await store.get(entry.key, { type: "json" });
      return order ? publicOrder(order) : null;
    })
  )).filter(Boolean).sort((a, b) => String(b.updatedAt || b.paidAt || b.createdAt).localeCompare(String(a.updatedAt || a.paidAt || a.createdAt)));
  return dedupeOrders(orders.map(publicOrder));
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
  const adminSession = await verifyAdminCapability(request);
  if (!adminSession) {
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
    if (isQuoteOrder(savedOrder)) {
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
    const deleteSession = await verifyAdminCapability(request, "delete");
    if (!deleteSession?.canDelete) {
      return jsonResponse({ error: "Only Chey or an admin granted delete access can delete orders." }, { status: 403 });
    }
    const url = new URL(request.url);
    const orderId = safeOrderId(url.searchParams.get("orderId"));
    if (!orderId) return jsonResponse({ error: "Valid order ID is required." }, { status: 400 });
    const savedOrder = await store.get(orderKey(orderId), { type: "json" });
    if (!savedOrder) return jsonResponse({ error: "Order not found." }, { status: 404 });
    if (savedOrder.paymentStatus === "paid" || savedOrder.paidAt) {
      return jsonResponse({ error: "Paid transactions cannot be deleted. Mark the order canceled or completed instead." }, { status: 409 });
    }
    await store.delete(orderKey(orderId));
    return jsonResponse({ ok: true, deleted: orderId });
  }

  return jsonResponse({ error: "Method not allowed" }, { status: 405 });
};
