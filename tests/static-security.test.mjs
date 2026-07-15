import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
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
  assert.match(config, /script-src 'self' 'wasm-unsafe-eval'/);
  assert.doesNotMatch(config, /script-src[^\n]*'unsafe-eval'/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /X-Content-Type-Options\s*=\s*"nosniff"/);
  assert.match(config, /X-Robots-Tag\s*=\s*"noindex/);
  assert.match(config, /from\s*=\s*"\/WEBSITE_AUDIT_REPORT\.md"/);
  assert.match(config, /from\s*=\s*"\/netlify\/\*"/);
  assert.match(config, /from\s*=\s*"\/tests\/\*"/);
});

test("public page exposes basic search and sharing metadata", async () => {
  const html = await source("index.html");
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /property="og:title"/);
});

test("HTML documents contain unique ids and alternative text for images", async () => {
  for (const file of ["index.html", "admin.html"]) {
    const html = await source(file);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${file} has duplicate ids`);
    for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
      assert.match(image[0], /\salt="[^"]*"/i, `${file} image is missing alt text`);
    }
  }
});

test("referenced first-party assets exist with deploy-safe filename casing", async () => {
  const assetFiles = new Set(await readdir(new URL("../assets/", import.meta.url)));
  const content = [await source("index.html"), await source("admin.html"), await source("styles.css")].join("\n");
  const references = new Set(
    [...content.matchAll(/assets\/([a-zA-Z0-9._-]+)/g)].map((match) => match[1])
  );
  for (const filename of references) {
    assert.equal(assetFiles.has(filename), true, `Missing or case-mismatched asset: ${filename}`);
    await access(new URL(`../assets/${filename}`, import.meta.url));
  }
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
  assert.match(ordersFunction, /export function dedupeOrders\(/);
  assert.match(ordersFunction, /stripe-session:/);
  assert.match(client, /function adminOrdersSharePaidFingerprint\(/);
  assert.match(client, /90 \* 1000/);
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
  assert.match(customerAdmin, /"employee"/);
  assert.match(customerAdmin, /OWNER_EMAILS\.forEach/);
  assert.match(customerAdmin, /function ownerRecord\(email\)/);
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
  const customerAdmin = await source("netlify/functions/customer-admin.mjs");
  assert.match(sharedAuth, /SECONDARY_OWNER_EMAIL = "0aaronlincoln0@gmail\.com"/);
  assert.match(sharedAuth, /CHEY_SECONDARY_OWNER_PASSWORD/);
  assert.match(sharedAuth, /OWNER_EMAILS/);
  assert.match(await source("netlify/functions/admin-auth.mjs"), /isOwnerEmail\(email\) \|\| customerAdminRecord\?\.isAdmin === true/);
  assert.match(client, /0aaronlincoln0@gmail\.com/);
  assert.match(client, /ADMIN_OWNER_EMAILS/);
  assert.match(customerAdmin, /const protectedOwner = isOwnerEmail\(email\)/);
  assert.match(customerAdmin, /accountStatus: protectedOwner \? "active"/);
  assert.match(customerAdmin, /adminRole: nextRole/);
  assert.match(customerAdmin, /canDelete: protectedOwner \|\|/);
  assert.match(client, /data-admin-team-input="accountStatus"\$\{ADMIN_OWNER_EMAILS\.includes\(member\.email\) \? " disabled" : ""\}/);
  assert.match(client, /member\.canDelete && !ADMIN_OWNER_EMAILS\.includes\(member\.email\)/);
  assert.match(client, /customer\.canDelete && !ADMIN_OWNER_EMAILS\.includes\(customer\.email\)/);
});

test("product command center uses the full responsive admin workspace", async () => {
  const adminHtml = await source("admin.html");
  const styles = await source("styles.css");
  const client = await source("script.js");
  assert.match(adminHtml, /id="adminProductsView"/);
  assert.match(adminHtml, /Product Command Center/);
  assert.match(adminHtml, /id="adminCreateProduct"/);
  assert.match(adminHtml, /id="adminProductReadinessFilter"/);
  assert.match(styles, /\.admin-dedicated-page \.admin-view-panel\s*\{[\s\S]*grid-column: 2/);
  assert.match(styles, /#adminProductsView \.admin-look-list/);
  assert.match(styles, /grid-template-columns: repeat\(auto-fit, minmax\(min\(100%, 430px\), 1fr\)\)/);
  assert.match(styles, /\.admin-product-toolbar\s*\{[\s\S]*repeat\(4, minmax\(120px, 1fr\)\)/);
  assert.match(styles, /\.admin-dedicated-page \.admin-page[\s\S]*width: calc\(100% - 16px\)/);
  assert.match(client, /function focusProductCommandCard\(index\)/);
  assert.match(client, /createInventoryDraft\(\{ focusCommandCenter: true \}\)/);
  assert.match(client, /function productReadinessFor\(look = \{\}\)/);
  assert.match(client, /card\.dataset\.catalogReadiness/);
});

test("product cards expand independently and support one-time sets", async () => {
  const adminHtml = await source("admin.html");
  const styles = await source("styles.css");
  const client = await source("script.js");
  assert.match(adminHtml, /<option value="one-time">One-time set<\/option>/);
  assert.match(styles, /\.admin-look-details\s*\{[\s\S]*display:\s*none/);
  assert.match(styles, /\.admin-look-card\[open\]\s*>\s*\.admin-look-details/);
  assert.match(client, /function isOneTimeStock\(stock = ""\)/);
  assert.match(client, /key: "one-time", label: "One-time set"/);
  assert.match(client, /function inventoryQuantityInputAttributes\(item = \{\}\)/);
});

test("accounting workspace supports period review and accountant exports", async () => {
  const adminHtml = await source("admin.html");
  const styles = await source("styles.css");
  const client = await source("script.js");
  assert.match(adminHtml, /id="accountingExportCsv"/);
  assert.match(adminHtml, /id="accountingPrint"/);
  assert.match(adminHtml, /id="accountingReconciliationStatus"/);
  assert.match(adminHtml, /id="accountingExpenseForm"/);
  assert.match(styles, /\.accounting-reconciliation-grid/);
  assert.match(styles, /\.accounting-expense-section/);
  assert.match(styles, /\.accounting-resource-card/);
  assert.match(client, /function accountingPeriodOrders\(\)/);
  assert.match(client, /async function saveAccountingExpense\(event\)/);
  assert.match(client, /function exportAccountingCsv\(\)/);
  assert.match(client, /accountingExportCsvButton\?\.addEventListener/);
  assert.match(client, /no quote requests are pending/);
});

test("admin tab changes realign the dedicated workspace", async () => {
  const client = await source("script.js");
  const styles = await source("styles.css");
  assert.match(client, /function alignAdminWorkspace\(\{ focusPanel = false \} = \{\}\)/);
  assert.match(client, /target\?\.scrollIntoView\(\{ block: "start", behavior: focusPanel \? "smooth" : "auto" \}\)/);
  assert.match(client, /switchAdminView\(button\.dataset\.adminView, \{ focusPanel: true \}\)/);
  assert.match(client, /autoGrowTextareas\(\);\s*alignAdminWorkspace\(\{ focusPanel \}\);/);
  assert.match(styles, /\.admin-dedicated-page \.admin-page[\s\S]*scroll-margin-top: 92px/);
  assert.match(styles, /\.admin-dedicated-page \.admin-view-tabs\s*\{[\s\S]*grid-row: 2/);
  assert.match(styles, /\.admin-dedicated-page \.admin-view-panel\s*\{[\s\S]*grid-row: 2/);
  assert.match(styles, /\.admin-dedicated-page \.admin-header,[\s\S]*grid-row: auto/);
  assert.match(styles, /\.admin-dedicated-page \.admin-view-panel\s*\{[\s\S]*scroll-margin-top: 5\.5rem/);
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

test("home page has clear, contextual paths into the shop", async () => {
  const indexHtml = await source("index.html");
  const adminHtml = await source("admin.html");
  const styles = await source("styles.css");
  const client = await source("script.js");
  assert.match(indexHtml, /class="shop-promo-band"/);
  assert.match(indexHtml, /id="shopPromoTitle"/);
  assert.match(indexHtml, /Browse the collection/);
  assert.match(indexHtml, /Shop after sizing/);
  assert.ok((indexHtml.match(/data-page-link="shop"/g) || []).length >= 5);
  assert.match(adminHtml, /class="shop-promo-band"/);
  assert.match(styles, /\.shop-promo-band\s*\{/);
  assert.match(styles, /\.shop-promo-actions \.button\.primary/);
  assert.match(client, /function setupPromoCursorGlitter\(\)/);
  assert.match(client, /promo-cursor-glitter-particle/);
  assert.match(client, /pointerVelocityX/);
  assert.match(styles, /\.promo-cursor-glitter-particle\s*\{/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test("shop separates fresh drops from the complete inventory", async () => {
  const indexHtml = await source("index.html");
  const adminHtml = await source("admin.html");
  const client = await source("script.js");
  const styles = await source("styles.css");
  assert.match(client, /const productCollectionOptions = \[/);
  assert.match(client, /function productCollectionFor\(product = \{\}\)/);
  assert.ok(client.includes('.replace(/[\\s_]+/g, "-"'));
  assert.match(client, /return \/\^fresh-drops\?\$\/\.test\(value\)/);
  assert.match(client, /\["hot-drop", "fresh-drops", "inventory"\]\.forEach/);
  assert.match(client, /function setShopCollectionFilter\(destination = ""\)/);
  assert.match(client, /const collectionFilter = document\.querySelector\("#shopFilters \[data-collection-filter\]\.active"\)/);
  assert.match(client, /matchesCollection/);
  assert.match(client, /data-collection-grid/);
  assert.match(client, /collection: productCollectionFor\(product\)/);
  assert.match(client, /hotDrop: Boolean\(product\.hotDrop\)/);
  assert.match(client, /Post to Hot Drop/);
  assert.match(indexHtml, /data-shop-destination="fresh-drops"/);
  assert.match(indexHtml, /Shop Store/);
  assert.match(adminHtml, /data-shop-destination="inventory"/);
  assert.match(indexHtml, /data-collection-filter="fresh-drops"/);
  assert.doesNotMatch(indexHtml, /Shop Hot Drop/);
  assert.doesNotMatch(indexHtml, /View Main Inventory/);
  assert.match(indexHtml, /data-shop-destination="inventory"/);
  assert.match(client, /Shop placement/);
  assert.doesNotMatch(client, /Shop the full catalog/);
  assert.doesNotMatch(client, /Every available set in the Pressed by Chey store/);
  assert.match(styles, /\.shop-collection-grid\s*\{/);
});

test("home service strip fills its three-column rhythm", async () => {
  const indexHtml = await source("index.html");
  const adminHtml = await source("admin.html");
  assert.strictEqual((indexHtml.match(/<section class="service-strip"[\s\S]*?<\/section>/) || [""])[0].match(/<article>/g)?.length, 6);
  assert.strictEqual((adminHtml.match(/<section class="service-strip"[\s\S]*?<\/section>/) || [""])[0].match(/<article>/g)?.length, 6);
  assert.match(indexHtml, /Small-batch drops/);
  assert.match(indexHtml, /Custom by request/);
});

test("admin exposes the nail size finder tool", async () => {
  const indexHtml = await source("index.html");
  const adminHtml = await source("admin.html");
  const client = await source("script.js");
  const styles = await source("styles.css");
  assert.match(indexHtml, /data-admin-view="sizing"/);
  assert.match(indexHtml, /id="adminSizingView"/);
  assert.match(indexHtml, /id="adminOpenSizer"/);
  assert.match(adminHtml, /data-admin-view="sizing"/);
  assert.match(adminHtml, /id="adminSizingView"/);
  assert.match(adminHtml, /id="sizerOverlay"/);
  assert.match(client, /const adminOpenSizer = document\.querySelector\("#adminOpenSizer"\)/);
  assert.match(client, /const adminMode = IS_ADMIN_PAGE && isAdminSignedIn\(\)/);
  assert.match(client, /adminOpenSizer\?\.addEventListener\("click", sizerOpen\)/);
  assert.match(client, /navigator\.mediaDevices\?\.getUserMedia/);
  assert.match(client, /facingMode: \{ ideal: sizerState\.cameraFacingMode \}/);
  assert.match(client, /function sizerStopCamera\(\)/);
  assert.match(client, /canvas\.toDataURL\("image\/jpeg", 0\.92\)/);
  assert.match(client, /function sizerPhotoToCanvas\(file\)/);
  assert.match(client, /function sizerChoosePhotoFile\(file\)/);
  assert.match(client, /function sizerVisibleFingers\(landmarks\)/);
  assert.match(client, /function sizerEstimateMillimeters\(geometry, worldLandmarks, step\)/);
  assert.match(client, /worldLandmarks: result\.worldLandmarks/);
  assert.match(client, /cameraPxPerMm/);
  assert.match(client, /distanceHint/);
  assert.doesNotMatch(client, /sizerCameraScale/);
  assert.match(adminHtml, /id="sizerStepCamera"/);
  assert.match(adminHtml, /id="sizerCameraCapture"/);
  assert.match(adminHtml, /id="sizerPhotoInput"/);
  assert.match(adminHtml, /id="sizerChoosePhoto"/);
  assert.match(adminHtml, /No card required/);
  assert.doesNotMatch(adminHtml, /id="sizerStepCalibrate"/);
  assert.doesNotMatch(adminHtml, /id="sizerCameraScale"/);
  assert.doesNotMatch(adminHtml, /id="sizerCameraCardGuideLeft"/);
  assert.doesNotMatch(adminHtml, /id="sizerCameraCardGuideRight"/);
  assert.match(styles, /grid-template-columns: repeat\(10, minmax\(0, 1fr\)/);
  assert.match(styles, /\.admin-sizing-overview\s*\{/);
});

test("size finder and product photos support real mobile capture flows", async () => {
  const indexHtml = await source("index.html");
  const adminHtml = await source("admin.html");
  const client = await source("script.js");
  assert.doesNotMatch(indexHtml, /capture=/);
  assert.doesNotMatch(adminHtml, /capture=/);
  assert.doesNotMatch(client, /setAttribute\("capture"/);
  assert.match(client, /import\("\.\/assets\/mediapipe\/vision_bundle\.mjs"\)/);
  assert.match(client, /function sizerAnalyzeCapturedFrame\(canvas, step\)/);
  assert.match(client, /Measuring is local to the device/);
  assert.match(client, /cameraScanReady/);
  assert.match(client, /Only one finger can be measured at a time/);
  assert.match(client, /is-camera-step/);
  assert.doesNotMatch(await source("styles.css"), /\.sizer-camera-stage::after/);
});

test("account hero uses a restrained studio treatment", async () => {
  const styles = await source("styles.css");
  assert.match(styles, /\.account-auth-hero::before\s*\{/);
  assert.doesNotMatch(styles, /\.account-auth-hero::after\s*\{/);
  assert.match(styles, /\.account-benefits,\s*\.account-kpi-row\s*\{[\s\S]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)/);
  assert.match(styles, /\.account-auth-hero\s*\{[\s\S]*border-radius: 18px/);
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

test("quote delivery uses a structured messenger action and secure checkout", async () => {
  const client = await source("script.js");
  const messages = await source("netlify/functions/messages.mjs");
  const checkout = await source("netlify/functions/create-checkout-session.mjs");
  assert.match(client, /data-pay-message-quote/);
  assert.match(client, /customerMessagesRequest\("accept-quote"/);
  assert.match(client, /adminMessagesRequest\("send-quote"/);
  assert.match(messages, /kind: "quote"/);
  assert.match(messages, /action === "send-quote"/);
  assert.match(messages, /action === "accept-quote"/);
  assert.match(checkout, /quoteOrderId/);
  assert.match(checkout, /quoteStatus: "Accepted"/);
});

test("hot drop checkbox keeps a visible interactive state", async () => {
  const client = await source("script.js");
  const styles = await source("styles.css");
  assert.match(client, /class="admin-hot-drop-toggle"><input type="checkbox"/);
  assert.match(styles, /\.admin-hot-drop-toggle input\[type="checkbox"\]\s*\{/);
  assert.match(styles, /\.admin-hot-drop-toggle input\[type="checkbox"\]:hover/);
  assert.match(styles, /\.admin-hot-drop-toggle input\[type="checkbox"\]:checked/);
  assert.match(styles, /input\[type="checkbox"\]:hover\s*\{/);
  assert.match(styles, /background: #ffffff/);
});
