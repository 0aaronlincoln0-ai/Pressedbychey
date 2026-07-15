import assert from "node:assert/strict";
import test from "node:test";

import { publicAdminState } from "../netlify/functions/admin-state.mjs";
import { hashPassword, verifyPassword } from "../netlify/functions/customer-account.mjs";

test("customer passwords are salted and verified with scrypt", () => {
  const first = hashPassword("Customer-password-2026");
  const second = hashPassword("Customer-password-2026");
  assert.notEqual(first, second);
  assert.equal(verifyPassword("Customer-password-2026", first), true);
  assert.equal(verifyPassword("wrong-password", first), false);
});

test("public catalog state strips private maker notes and idea boards", () => {
  const publicState = publicAdminState({
    customProducts: [{ name: "Rose Luxe", notes: "private formula" }],
    lookDetails: { 0: { copy: "Public copy", privateNotes: "do not expose" } },
    products: { 0: { name: "Rose Luxe", adminNote: "private" } },
    ideas: [{ name: "Unreleased collection" }],
    proNotes: [{ body: "Customer follow-up" }]
  });
  assert.deepEqual(publicState.customProducts, [{ name: "Rose Luxe" }]);
  assert.deepEqual(publicState.lookDetails, { 0: { copy: "Public copy" } });
  assert.deepEqual(publicState.products, { 0: { name: "Rose Luxe" } });
  assert.deepEqual(publicState.ideas, []);
  assert.deepEqual(publicState.proNotes, []);
});
