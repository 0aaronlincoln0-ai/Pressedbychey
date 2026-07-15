import assert from "node:assert/strict";
import test from "node:test";

import { dedupeOrders } from "../netlify/functions/admin-orders.mjs";

test("admin order API removes duplicate Stripe sessions while retaining separate payments", () => {
  const duplicateSession = {
    id: "pbc-100-first",
    stripeSessionId: "cs_test_same_payment",
    paymentStatus: "paid"
  };
  const duplicateSessionCopy = {
    id: "pbc-100-second",
    stripeSessionId: "cs_test_same_payment",
    paymentStatus: "paid"
  };
  const separatePayment = {
    id: "pbc-101",
    stripeSessionId: "cs_test_separate_payment",
    paymentStatus: "paid"
  };

  assert.deepEqual(dedupeOrders([duplicateSession, duplicateSessionCopy, separatePayment]), [duplicateSession, separatePayment]);
});

test("admin order API removes exact order duplicates without hiding unreferenced orders", () => {
  const first = { id: "pbc-200", paymentStatus: "paid" };
  const copy = { id: "pbc-200", paymentStatus: "paid", adminNote: "Latest copy" };
  const unreferenced = { paymentStatus: "pending" };

  assert.deepEqual(dedupeOrders([first, copy, unreferenced]), [first]);
});
