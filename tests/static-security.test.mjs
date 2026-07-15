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

test("the owner can recover from an admin login lockout with valid credentials", async () => {
  const adminAuth = await source("netlify/functions/admin-auth.mjs");
  assert.match(adminAuth, /failures >= MAX_ATTEMPTS && !result\.ok/);
  assert.match(adminAuth, /authenticateAdminCredentials\(email, password\)/);
  assert.match(adminAuth, /await store\.delete\(key\)/);
});

test("the secondary owner keeps permanent owner capabilities", async () => {
  const sharedAuth = await source("netlify/functions/_shared/admin-auth.mjs");
  const client = await source("script.js");
  assert.match(sharedAuth, /SECONDARY_OWNER_EMAIL = "0aaronlincoln0@gmail\.com"/);
  assert.match(sharedAuth, /CHEY_SECONDARY_OWNER_PASSWORD/);
  assert.match(sharedAuth, /OWNER_EMAILS/);
  assert.match(await source("netlify/functions/admin-auth.mjs"), /isOwnerEmail\(email\) \|\| customerAdminRecord\?\.isAdmin === true/);
  assert.match(client, /0aaronlincoln0@gmail\.com/);
  assert.match(client, /ADMIN_OWNER_EMAILS/);
});

test("product command center uses the full responsive admin workspace", async () => {
  const adminHtml = await source("admin.html");
  const styles = await source("styles.css");
  assert.match(adminHtml, /id="adminProductsView"/);
  assert.match(adminHtml, /Product Command Center/);
  assert.match(styles, /\.admin-dedicated-page \.admin-view-panel\s*\{[\s\S]*grid-column: 2/);
  assert.match(styles, /#adminProductsView \.admin-look-list/);
  assert.match(styles, /grid-template-columns: repeat\(auto-fit, minmax\(min\(100%, 430px\), 1fr\)\)/);
  assert.match(styles, /\.admin-dedicated-page \.admin-page[\s\S]*width: calc\(100% - 16px\)/);
});

test("admin tab changes realign the dedicated workspace", async () => {
  const client = await source("script.js");
  const styles = await source("styles.css");
  assert.match(client, /function alignAdminWorkspace\(\)/);
  assert.match(client, /adminPage\.scrollIntoView\(\{ block: "start", behavior: "auto" \}\)/);
  assert.match(client, /autoGrowTextareas\(\);\s*alignAdminWorkspace\(\);/);
  assert.match(styles, /\.admin-dedicated-page \.admin-page[\s\S]*scroll-margin-top: 92px/);
  assert.match(styles, /\.admin-dedicated-page \.admin-view-tabs\s*\{[\s\S]*grid-row: 2/);
  assert.match(styles, /\.admin-dedicated-page \.admin-view-panel\s*\{[\s\S]*grid-row: 2/);
  assert.match(styles, /\.admin-dedicated-page \.admin-header,[\s\S]*grid-row: auto/);
});

test("order summary cards navigate to matching workflow details", async () => {
  const adminHtml = await source("admin.html");
  const client = await source("script.js");
  const styles = await source("styles.css");
  assert.match(adminHtml, /data-admin-summary-filter="incoming"/);
  assert.match(adminHtml, /data-admin-summary-filter="working"/);
  assert.match(adminHtml, /data-admin-summary-filter="done"/);
  assert.match(adminHtml, /data-admin-summary-view="products"/);
  assert.match(client, /function navigateFromAdminSummary\(button\)/);
  assert.match(client, /selectedAdminOrderId = matchingOrder\?\.id \|\| ""/);
  assert.match(client, /detail\.scrollIntoView\(\{ block: "start", behavior: "smooth" \}\)/);
  assert.match(client, /updateAdminDashboardSummary\(liveOrders\)/);
  assert.match(styles, /\.admin-dashboard-summary-card:focus-visible/);
});

test("order saves update the dashboard optimistically and roll back failures", async () => {
  const client = await source("script.js");
  assert.match(client, /function applyOptimisticAdminOrderUpdate\(orderId, update = \{\}\)/);
  assert.match(client, /const previousOrder = recoveredLocalOrder \? null : applyOptimisticAdminOrderUpdate\(orderId, update\)/);
  assert.match(client, /Saving order update\.\.\. Dashboard updated\./);
  assert.match(client, /previousOrder\) \{[\s\S]*liveOrders = liveOrders\.map\(\(item\) => \(String\(item\.id/);
  assert.doesNotMatch(client, /payload\.error \|\| "Could not save order update/);
});

test("order browser columns stay inside narrow workspaces", async () => {
  const styles = await source("styles.css");
  assert.match(styles, /\.admin-order-row-list\s*\{[\s\S]*overflow-x: hidden/);
  assert.match(styles, /\.admin-order-row-head,\s*\.admin-order-row\s*\{[\s\S]*grid-template-columns: minmax\(0, 1\.15fr\)/);
});

test("admin markup has no patch marker artifacts", async () => {
  const adminHtml = await source("admin.html");
  const indexHtml = await source("index.html");
  assert.doesNotMatch(adminHtml, /^\+/m);
  assert.doesNotMatch(indexHtml, /^\+/m);
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
  assert.match(client, /function syncAdminMessageRecipient\(/);
  assert.match(client, /function toggleAdminMessageRecipientPicker\(/);
  assert.match(client, /adminMessageCustomerSelect\?\.addEventListener\("change"/);
  assert.match(client, /dataset\.recipientEmail/);
  assert.match(client, /adminConversationLoadId/);
  assert.match(client, /keepVisibleConversation/);
  assert.match(client, /wasNearBottom/);
  assert.match(styles, /\.admin-message-recipient-tools/);
  assert.match(styles, /\.chat-new-message-button/);
  assert.match(styles, /-webkit-overflow-scrolling:\s*touch/);
  assert.match(styles, /\.chat-composer textarea[\s\S]*font-size:\s*16px/);
});
