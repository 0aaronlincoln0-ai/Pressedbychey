import { createHmac, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";

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

function orderKey(orderId) {
  return `${ORDER_PREFIX}/${orderId}.json`;
}

function webhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET || "";
}

function parseStripeSignature(header = "") {
  return Object.fromEntries(
    String(header)
      .split(",")
      .map((part) => part.split("="))
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key.trim(), value.trim()])
  );
}

function verifySignature(rawBody, signatureHeader, secret) {
  if (!secret) return false;
  const parsed = parseStripeSignature(signatureHeader);
  const timestamp = parsed.t;
  const signature = parsed.v1;
  if (!timestamp || !signature) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const left = Buffer.from(expected, "hex");
  const right = Buffer.from(signature, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
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

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const result = await markCheckoutCompleted(event.data?.object || {});
    return jsonResponse({ received: true, ...result });
  }

  return jsonResponse({ received: true, ignored: event.type || "unknown" });
};
