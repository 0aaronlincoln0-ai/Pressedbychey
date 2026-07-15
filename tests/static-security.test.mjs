import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("public HTML has no inline event handlers", async () => {
  for (const file of ["index.html", "admin.html", "404.html"]) {
    assert.doesNotMatch(await source(file), /\son[a-z]+\s*=/i, file);
  }
});

test("client code does not contain a literal admin password", async () => {
  const client = await source("script.js");
  assert.doesNotMatch(client, /const\s+ADMIN_PASSWORD\s*=/);
  assert.doesNotMatch(client, /["']x-admin-password["']/i);
});

test("Netlify applies baseline browser protections", async () => {
  const config = await source("netlify.toml");
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /X-Content-Type-Options\s*=\s*"nosniff"/);
  assert.match(config, /X-Robots-Tag\s*=\s*"noindex/);
});

test("public page exposes basic search and sharing metadata", async () => {
  const html = await source("index.html");
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /property="og:title"/);
});

test("admin order deletion handles recovered orders without weakening paid protection", async () => {
  const client = await source("script.js");
  const ordersFunction = await source("netlify/functions/admin-orders.mjs");
  assert.match(client, /function deleteLocalAdminOrder\(/);
  assert.match(client, /isRecoveredLocalOrder\(orderId, order\)/);
  assert.match(client, /Paid orders are protected/);
  assert.match(ordersFunction, /verifyAdminCapability\(request\)/);
  assert.match(ordersFunction, /canDelete/);
  assert.match(ordersFunction, /Paid transactions cannot be deleted/);
});

test("dropdown controls keep a visible hover state", async () => {
  const styles = await source("styles.css");
  assert.match(styles, /select:not\(:disabled\):hover/);
  assert.match(styles, /select option:checked/);
});

test("product editors expose a sequential SKU generator", async () => {
  const client = await source("script.js");
  const styles = await source("styles.css");
  assert.match(client, /skuSequence/);
  assert.match(client, /function nextGeneratedSku\(/);
  assert.match(client, /data-generate-inventory-sku/);
  assert.match(client, /data-generate-custom-product-sku/);
  assert.match(styles, /\.admin-sku-input/);
});

test("admin accounting and delegated delete access are present", async () => {
  const client = await source("script.js");
  const adminHtml = await source("admin.html");
  const customerAdmin = await source("netlify/functions/customer-admin.mjs");
  const messagesFunction = await source("netlify/functions/messages.mjs");
  assert.match(adminHtml, /data-admin-view="accounting"/);
  assert.match(adminHtml, /id="adminAccountingView"/);
  assert.match(client, /function canAdminDelete\(/);
  assert.match(client, /data-admin-customer-input="canDelete"/);
  assert.match(customerAdmin, /Only the owner can change admin access/);
  assert.match(messagesFunction, /Only Chey or an admin granted delete access/);
});

test("customer-facing catalog does not expose SKU labels or identifiers", async () => {
  const client = await source("script.js");
  const stateFunction = await source("netlify/functions/admin-state.mjs");
  assert.doesNotMatch(client, /class="product-code"/);
  assert.doesNotMatch(client, /skuMarkup/);
  assert.match(stateFunction, /withoutPrivateCatalogIdentifiers/);
  assert.match(stateFunction, /const \{ sku, productNumber, \.\.\.customerValue \}/);
});

test("team roles are separated from customer accounts", async () => {
  const client = await source("script.js");
  const adminHtml = await source("admin.html");
  const customerAdmin = await source("netlify/functions/customer-admin.mjs");
  const adminAuth = await source("netlify/functions/admin-auth.mjs");
  assert.match(adminHtml, /data-admin-view="team"/);
  assert.match(adminHtml, /id="adminTeamView"/);
  assert.match(client, /teamOnly: true/);
  assert.match(client, /function renderAdminTeamList\(/);
  assert.match(customerAdmin, /ALLOWED_TEAM_ROLES/);
  assert.match(customerAdmin, /Boolean\(payload\.teamOnly\) !== isTeamMember/);
  assert.match(adminAuth, /customerAdminRecord\?\.adminRole/);
});

test("admin messages provide a direct customer picker", async () => {
  const client = await source("script.js");
  const adminHtml = await source("admin.html");
  const styles = await source("styles.css");
  assert.match(adminHtml, /id="adminMessageCustomerSelect"/);
  assert.match(adminHtml, /id="adminStartCustomerMessage"/);
  assert.match(adminHtml, /id="adminNewCustomerMessage"/);
  assert.match(adminHtml, /id="adminMessageRecipientPicker"/);
  assert.match(client, /function fetchAdminMessageRecipients\(/);
  assert.match(client, /function startAdminCustomerMessage\(/);
  assert.match(client, /function toggleAdminMessageRecipientPicker\(/);
  assert.match(styles, /\.admin-message-recipient-tools/);
  assert.match(styles, /\.chat-new-message-button/);
});
