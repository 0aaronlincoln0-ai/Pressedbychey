import assert from "node:assert/strict";
import test from "node:test";

import adminOrders from "../netlify/functions/admin-orders.mjs";
import adminState from "../netlify/functions/admin-state.mjs";
import customerAdmin from "../netlify/functions/customer-admin.mjs";

const request = (path, init = {}) => new Request(`https://www.pressedbychey.com${path}`, init);

test("admin order APIs reject requests without a signed session", async () => {
  const response = await adminOrders(request("/.netlify/functions/admin-orders"));
  assert.equal(response.status, 401);
});

test("customer administration rejects requests without a signed session", async () => {
  const response = await customerAdmin(request("/.netlify/functions/customer-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "list" })
  }));
  assert.equal(response.status, 401);
});

test("admin state mutations reject requests without a signed session", async () => {
  const response = await adminState(request("/.netlify/functions/admin-state", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state: {} })
  }));
  assert.equal(response.status, 401);
});
