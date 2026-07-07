import { getStore } from "@netlify/blobs";

const STORE_NAME = "pressed-by-chey";
const ORDER_PREFIX = "orders";
const STRIPE_API_BASE = "https://api.stripe.com/v1";

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

function stripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY || "";
}

function orderKey(orderId) {
  return `${ORDER_PREFIX}/${orderId}.json`;
}

async function retrieveSession(sessionId, key) {
  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${key}` }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error?.message || "Could not verify checkout status.");
  }
  return data;
}

function publicOrder(order = {}, session = {}) {
  return {
    id: order.id || session.client_reference_id || "",
    status: order.status || session.status || "",
    paymentStatus: order.paymentStatus || session.payment_status || "",
    createdAt: order.createdAt || "",
    paidAt: order.paidAt || "",
    total: order.total || session.amount_total || 0,
    customer: order.customer || {},
    items: Array.isArray(order.items) ? order.items : [],
    stripeSessionId: session.id || order.stripeSessionId || ""
  };
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

export default async (request) => {
  if (request.method !== "GET") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  const key = stripeSecretKey();
  if (!key || !/^(sk|rk)_(test|live)_/.test(key)) {
    return jsonResponse({ error: "Checkout status verification is not configured." }, { status: 503 });
  }

  const url = new URL(request.url);
  const sessionId = String(url.searchParams.get("session_id") || "").trim();
  if (!/^cs_(test|live)_/.test(sessionId)) {
    return jsonResponse({ error: "Missing checkout session." }, { status: 400 });
  }

  try {
    const session = await retrieveSession(sessionId, key);
    const orderId = session.metadata?.order_id || session.client_reference_id || "";
    const store = getStore(STORE_NAME);
    const savedOrder = orderId ? await store.get(orderKey(orderId), { type: "json" }) : null;
    const nextOrder = {
      ...(savedOrder || {}),
      id: orderId || savedOrder?.id || "",
      stripeSessionId: session.id,
      status: session.status === "complete" ? "complete" : session.status,
      paymentStatus: session.payment_status || "unknown",
      fulfillmentStatus: session.payment_status === "paid"
        ? (savedOrder?.fulfillmentStatus === "Payment pending" ? "Needs review" : savedOrder?.fulfillmentStatus || "Needs review")
        : savedOrder?.fulfillmentStatus || "Payment pending",
      amountSubtotal: session.amount_subtotal,
      amountTotal: session.amount_total,
      currency: session.currency,
      customer: publicCustomerFromSession(session, savedOrder || {}),
      customerEmail: session.customer_details?.email || savedOrder?.customer?.email || "",
      customerName: session.customer_details?.name || savedOrder?.customer?.name || "",
      customerPhone: session.customer_details?.phone || savedOrder?.customer?.phone || "",
      shipping: shippingFromSession(session, savedOrder || {}),
      paidAt: session.payment_status === "paid" ? (savedOrder?.paidAt || new Date().toISOString()) : savedOrder?.paidAt || "",
      updatedAt: new Date().toISOString()
    };

    if (nextOrder.id) {
      await store.setJSON(orderKey(nextOrder.id), nextOrder);
    }

    return jsonResponse({
      ok: true,
      paid: session.payment_status === "paid",
      status: session.status,
      paymentStatus: session.payment_status,
      order: publicOrder(nextOrder, session)
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Checkout status could not be verified." }, { status: 400 });
  }
};
