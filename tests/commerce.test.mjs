import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import {
  safeReturnBaseUrl,
  validateLineItems,
  validateQuoteCheckout
} from "../netlify/functions/create-checkout-session.mjs";
import { eventKey, verifySignature } from "../netlify/functions/stripe-webhook.mjs";

const ORIGIN = "https://www.pressedbychey.com";

function liveProduct(overrides = {}) {
  return {
    name: "Rose Luxe",
    description: "Handmade almond set",
    price: "15",
    inventoryCount: 4,
    stock: "In stock",
    image: "/assets/rose.webp",
    sku: "PBC-001",
    ...overrides
  };
}

test("checkout recalculates price and quantity from live inventory", () => {
  const result = validateLineItems(
    [{ name: "Rose Luxe", price: "15", quantity: 2, sourceProductIndex: 0 }],
    [liveProduct()],
    ORIGIN
  );
  assert.equal(result[0].unitAmount, 1500);
  assert.equal(result[0].quantity, 2);
  assert.equal(result[0].image, `${ORIGIN}/assets/rose.webp`);
});

test("checkout rejects price manipulation, unavailable stock, and excessive quantity", () => {
  assert.throws(
    () => validateLineItems([{ name: "Rose Luxe", price: "1", quantity: 1 }], [liveProduct()], ORIGIN),
    /changed price/
  );
  assert.throws(
    () => validateLineItems([{ name: "Rose Luxe", price: "15", quantity: 1 }], [liveProduct({ stock: "Sold out" })], ORIGIN),
    /not available/
  );
  assert.throws(
    () => validateLineItems([{ name: "Rose Luxe", price: "15", quantity: 5 }], [liveProduct()], ORIGIN),
    /only has 4/
  );
});

test("checkout does not send remote product-image URLs to Stripe", () => {
  const [item] = validateLineItems(
    [{ name: "Rose Luxe", price: "15", quantity: 1 }],
    [liveProduct({ image: "https://attacker.example/tracking.png" })],
    ORIGIN
  );
  assert.equal(item.image, "");
});

test("checkout return URLs stay on an approved origin", () => {
  delete process.env.CHECKOUT_RETURN_ORIGINS;
  assert.equal(safeReturnBaseUrl("https://attacker.example/steal", `${ORIGIN}/.netlify/functions/checkout`), `${ORIGIN}/`);
  assert.equal(safeReturnBaseUrl(`${ORIGIN}/thank-you?ignored=true`, `${ORIGIN}/.netlify/functions/checkout`), `${ORIGIN}/thank-you`);
});

test("custom quotes require the requesting customer and a payable amount", () => {
  const quote = {
    id: "pbc-1-abc",
    quoteAmount: 4200,
    paymentStatus: "unpaid",
    customer: { email: "customer@example.test" },
    items: [{ name: "Custom aura set" }]
  };
  assert.equal(validateQuoteCheckout({ quoteOrder: quote, customer: { email: "customer@example.test" } })[0].unitAmount, 4200);
  assert.throws(() => validateQuoteCheckout({ quoteOrder: quote, customer: { email: "other@example.test" } }), /Sign in/);
  assert.throws(() => validateQuoteCheckout({ quoteOrder: { ...quote, paymentStatus: "paid" }, customer: quote.customer }), /already paid/);
});

test("Stripe signatures enforce authenticity and a five-minute replay window", () => {
  const now = Date.UTC(2026, 6, 15, 12);
  const timestamp = Math.floor(now / 1000);
  const body = JSON.stringify({ id: "evt_test_1" });
  const secret = "whsec_test_only";
  const signature = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  const header = `t=${timestamp},v1=${signature}`;
  assert.equal(verifySignature(body, header, secret, now), true);
  assert.equal(verifySignature(`${body}x`, header, secret, now), false);
  assert.equal(verifySignature(body, header, secret, now + 301_000), false);
});

test("webhook idempotency keys accept only Stripe event identifiers", () => {
  assert.equal(eventKey("evt_test_123"), "stripe-events/evt_test_123.json");
  assert.equal(eventKey("../../admin-state"), "");
});
