import { randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "pressed-by-chey";
const STATE_KEY = "admin-state";
const ORDER_PREFIX = "orders";
const STRIPE_API_BASE = "https://api.stripe.com/v1";
const MAX_LINE_ITEMS = 20;
const DEFAULT_ORDER_EMAIL = "callison@pressedbychey.com";
const DEFAULT_SUPPORT_PHONE = "9893922012";

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

function normalizeMoneyValue(value) {
  return String(value || "").replace(/[^0-9.]/g, "").trim();
}

function moneyNumber(value) {
  const parsed = Number(normalizeMoneyValue(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoneyValue(value) {
  const amount = Math.max(0, Number(value) || 0);
  return amount % 1 === 0 ? String(amount) : amount.toFixed(2).replace(/0$/, "");
}

function calculatedSalePrice(price, discount) {
  const regular = moneyNumber(price);
  if (regular <= 0) return "";
  const label = String(discount || "").trim();
  const percentMatch = label.match(/^(\d+(?:\.\d+)?)%\s*off$/i);
  if (percentMatch) return formatMoneyValue(regular * (1 - Number(percentMatch[1]) / 100));
  const dollarMatch = label.match(/^\$(\d+(?:\.\d+)?)\s*off$/i);
  if (dollarMatch) return formatMoneyValue(Math.max(0, regular - Number(dollarMatch[1])));
  return "";
}

function effectiveSalePriceValue(product = {}) {
  const savedSale = normalizeMoneyValue(product.salePrice);
  if (savedSale && moneyNumber(savedSale) > 0) return savedSale;
  return calculatedSalePrice(product.price, product.discount);
}

function productCheckoutPrice(product = {}) {
  const sale = moneyNumber(effectiveSalePriceValue(product));
  return sale > 0 ? sale : moneyNumber(product.price);
}

function amountToCents(value) {
  return Math.round(moneyNumber(value) * 100);
}

function safeText(value, fallback = "", maxLength = 180) {
  const text = String(value || fallback || "").replace(/\s+/g, " ").trim();
  return text.slice(0, maxLength);
}

function safeQuantity(value) {
  const quantity = Math.floor(Number(value) || 1);
  return Math.min(Math.max(quantity, 1), 10);
}

function absoluteUrl(pathOrUrl, origin) {
  const value = String(pathOrUrl || "").trim();
  if (!value) return "";
  try {
    return new URL(value, origin).toString();
  } catch {
    return "";
  }
}

function safeReturnBaseUrl(value, requestUrl) {
  const fallback = new URL(requestUrl).origin;
  try {
    const url = new URL(value || fallback);
    if (!["http:", "https:"].includes(url.protocol)) return fallback;
    return `${url.origin}${url.pathname}`;
  } catch {
    return fallback;
  }
}

function stripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY || "";
}

function orderNotificationEmail() {
  return process.env.ORDER_NOTIFICATION_EMAIL || process.env.CHEY_SUPPORT_EMAIL || DEFAULT_ORDER_EMAIL;
}

function supportEmail() {
  return process.env.CHEY_SUPPORT_EMAIL || orderNotificationEmail();
}

function supportPhoneRaw() {
  return process.env.CHEY_SUPPORT_PHONE || DEFAULT_SUPPORT_PHONE;
}

function supportPhoneDisplay() {
  const digits = supportPhoneRaw().replace(/\D/g, "");
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return supportPhoneRaw();
}

function orderKey(orderId) {
  return `${ORDER_PREFIX}/${orderId}.json`;
}

async function loadLiveProducts() {
  const store = getStore(STORE_NAME);
  const savedState = await store.get(STATE_KEY, { type: "json" });
  return Array.isArray(savedState?.customProducts) ? savedState.customProducts : [];
}

function findLiveProduct(item, liveProducts) {
  const index = Number(item.sourceProductIndex);
  if (Number.isInteger(index) && index >= 0 && liveProducts[index]) {
    return { product: liveProducts[index], index };
  }

  const name = safeText(item.name).toLowerCase();
  const matchIndex = liveProducts.findIndex((product) => safeText(product.name).toLowerCase() === name);
  if (matchIndex >= 0) return { product: liveProducts[matchIndex], index: matchIndex };
  return { product: null, index: -1 };
}

function validateLineItems(items, liveProducts, origin) {
  if (!Array.isArray(items) || !items.length) {
    throw new Error("Your bag is empty.");
  }
  if (items.length > MAX_LINE_ITEMS) {
    throw new Error(`Checkout supports up to ${MAX_LINE_ITEMS} line items at a time.`);
  }

  return items.map((item) => {
    if (item?.customOrder || amountToCents(item?.price) <= 0) {
      throw new Error("Custom quote requests need Chey to review them before payment. Please remove quote-only items before paying.");
    }

    const { product, index } = findLiveProduct(item, liveProducts);
    if (!product) {
      throw new Error(`${safeText(item.name, "This item")} needs a current live product listing before payment.`);
    }
    if (/sold\s*out|unavailable/i.test(product.stock || "")) {
      throw new Error(`${safeText(product.name, "This item")} is not available for checkout right now.`);
    }

    const unitAmount = amountToCents(productCheckoutPrice(product));
    if (unitAmount <= 0) {
      throw new Error(`${safeText(product.name, "This item")} needs a valid price before checkout.`);
    }

    const requestedCents = amountToCents(item.price);
    if (requestedCents > 0 && requestedCents !== unitAmount) {
      throw new Error(`${safeText(product.name, "This item")} changed price. Refresh the shop and try again.`);
    }

    return {
      name: safeText(product.name, "Pressed by Chey nail set", 120),
      description: safeText(product.description || product.tag || "Handmade press-on nail set.", "", 240),
      unitAmount,
      quantity: safeQuantity(item.quantity),
      image: absoluteUrl(product.image, origin),
      sourceProductIndex: index,
      category: safeText(product.category || item.category || "", "", 80),
      sku: safeText(product.sku || "", "", 80)
    };
  });
}

function appendLineItem(params, item, index) {
  params.append(`line_items[${index}][quantity]`, String(item.quantity));
  params.append(`line_items[${index}][price_data][currency]`, "usd");
  params.append(`line_items[${index}][price_data][unit_amount]`, String(item.unitAmount));
  params.append(`line_items[${index}][price_data][product_data][name]`, item.name);
  if (item.description) params.append(`line_items[${index}][price_data][product_data][description]`, item.description);
  if (item.image) params.append(`line_items[${index}][price_data][product_data][images][0]`, item.image);
  if (item.category) params.append(`line_items[${index}][price_data][product_data][metadata][category]`, item.category);
  if (item.sku) params.append(`line_items[${index}][price_data][product_data][metadata][sku]`, item.sku);
}

async function createStripeCheckoutSession({ key, order, baseUrl, request }) {
  const params = new URLSearchParams();
  const email = supportEmail();
  const phone = supportPhoneDisplay();
  params.append("mode", "payment");
  params.append("success_url", `${baseUrl}?checkout=success&session_id={CHECKOUT_SESSION_ID}#shop`);
  params.append("cancel_url", `${baseUrl}?checkout=cancel#shop`);
  params.append("client_reference_id", order.id);
  params.append("metadata[order_id]", order.id);
  params.append("metadata[site]", "pressedbychey");
  params.append("metadata[order_notification_email]", orderNotificationEmail());
  params.append("metadata[support_email]", email);
  params.append("metadata[support_phone]", phone);
  params.append("payment_intent_data[metadata][order_id]", order.id);
  params.append("payment_intent_data[metadata][site]", "pressedbychey");
  params.append("payment_intent_data[metadata][order_notification_email]", orderNotificationEmail());
  params.append("payment_intent_data[metadata][customer_name]", order.customer.name || "");
  params.append("payment_intent_data[metadata][customer_email]", order.customer.email || "");
  if (order.customer.sizing) params.append("payment_intent_data[metadata][customer_sizing]", safeText(order.customer.sizing, "", 480));
  params.append("phone_number_collection[enabled]", "true");
  params.append("shipping_address_collection[allowed_countries][0]", "US");
  params.append("billing_address_collection", "auto");
  params.append("custom_text[shipping_address][message]", `Questions before ordering? Contact Chey at ${email} or ${phone}.`);
  params.append("custom_text[submit][message]", "After payment, Chey will receive the order details and follow up if anything needs attention.");
  if (order.customer.email) params.append("customer_email", order.customer.email);
  order.items.forEach((item, index) => appendLineItem(params, item, index));

  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Idempotency-Key": order.id
    },
    body: params
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || "";
    if (/api key|secret key|authentication/i.test(message)) {
      throw new Error("Payment setup needs the correct checkout secret before checkout can open.");
    }
    throw new Error(message || "Secure checkout could not start.");
  }
  return data;
}

export default async (request) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  const key = stripeSecretKey();
  if (!key || !/^(sk|rk)_(test|live)_/.test(key)) {
    return jsonResponse({
      error: "Secure checkout is not fully configured yet."
    }, { status: 503 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid checkout payload." }, { status: 400 });
  }

  try {
    const baseUrl = safeReturnBaseUrl(payload?.returnBaseUrl, request.url);
    const liveProducts = await loadLiveProducts();
    const items = validateLineItems(payload?.items, liveProducts, new URL(request.url).origin);
    const customer = {
      mode: safeText(payload?.customer?.mode || "guest", "guest", 20),
      name: safeText(payload?.customer?.name, "", 100),
      email: safeText(payload?.customer?.email, "", 120).toLowerCase(),
      phone: safeText(payload?.customer?.phone, "", 40),
      sizing: safeText(payload?.customer?.sizing, "", 700),
      notes: safeText(payload?.customer?.notes, "", 450)
    };
    if (customer.mode === "guest" && !customer.sizing) {
      throw new Error("Add sizing before guest checkout so Chey knows what to make.");
    }
    const order = {
      id: `pbc-${Date.now()}-${randomUUID().slice(0, 8)}`,
      status: "created",
      paymentStatus: "pending",
      fulfillmentStatus: "Payment pending",
      createdAt: new Date().toISOString(),
      customer,
      items,
      total: items.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0),
      orderNotificationEmail: orderNotificationEmail(),
      supportEmail: supportEmail(),
      supportPhone: supportPhoneDisplay()
    };

    const session = await createStripeCheckoutSession({ key, order, baseUrl, request });
    order.stripeSessionId = session.id;
    order.checkoutUrl = session.url;

    await getStore(STORE_NAME).setJSON(orderKey(order.id), order);

    return jsonResponse({
      ok: true,
      url: session.url,
      sessionId: session.id,
      orderId: order.id
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Checkout could not start." }, { status: 400 });
  }
};
