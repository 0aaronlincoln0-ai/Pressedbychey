# Pressed by Chey Website Audit Report

Audit date: July 15, 2026  
Audit branch: `codex/full-website-audit`  
Production site: `https://www.pressedbychey.com`  
Scope: storefront, customer accounts, custom requests, messaging, checkout, orders, admin operations, storage, deployment, security, accessibility, performance, and SEO.

## 1. Executive Summary

Pressed by Chey is a static, serverless commerce application with a large vanilla-JavaScript client, Netlify Functions, Netlify Blobs, Stripe Checkout, and Resend. The audit found 18 actionable defects: 2 Critical, 6 High, 7 Medium, and 3 Low. Fourteen verified defects were repaired. Four Medium/Low architecture or provider-validation items remain documented; no known Critical or High defect remains open.

The highest-risk issue was a hardcoded admin password sent from public browser code to every privileged endpoint. That was replaced with a server-only credential check, rate-limited login, signed two-hour bearer sessions, and a fail-closed configuration. Private maker notes were also exposed by an unauthenticated state response; public state is now explicitly projected and stripped.

Commerce protections now include server-recalculated prices, stock limits, same-origin return URLs, stricter uploads, webhook timestamp validation, duplicate-event tracking, and paid-order deletion protection. Six frequently used images were reduced from about 7.1 MB to 388 KB. The final automated result is 51 passing tests, 0 failures, and 0 known production dependency vulnerabilities.

## 2. System Architecture Discovered

- Frontend: static `index.html` and dedicated `admin.html`, `styles.css`, and vanilla `script.js`.
- Runtime: modern browser APIs and Netlify's Node serverless runtime; local audit runtime Node 24.14.0.
- Package manager: pnpm 11.7.0 with a committed lockfile.
- Backend: ten Netlify Functions under `netlify/functions`.
- Storage: Netlify Blobs stores named `pressed-by-chey` and `pressed-by-chey-security`.
- Blob model: `admin-state`, `customers/<email>.json`, `orders/<id>.json`, `messages/<email>.json`, password reset records, uploaded photos, Stripe event records, and login-attempt records.
- Authentication: customer passwords salted and hashed with scrypt; admin credentials remain server-only and issue HMAC-signed two-hour sessions.
- Roles: customer, owner/admin, and delegated team roles represented in application state.
- Payments: Stripe-hosted Checkout Sessions, server-side line-item validation, checkout-status reconciliation, and signed webhooks.
- Email: Resend is used for password-reset codes. Purchase confirmation/status email delivery is not implemented.
- Deployment: GitHub-connected Netlify site, static publish directory `.`, functions in `netlify/functions`, deploy build runs `pnpm run check`.
- Database/migrations: none. Netlify Blobs is schemaless and normalization occurs in function/client code.
- Analytics/monitoring: no dedicated error tracker, uptime monitor, or structured audit log was found.

## 3. Commands and Tests Executed

```text
git status / branch / log / diff inspection
pnpm install
node --check script.js
node --check netlify/functions/**/*.mjs
pnpm run check
pnpm audit --prod
OSV package query for @netlify/blobs 8.1.0
local HTTP status checks for HTML and optimized image assets
desktop, tablet, and mobile local smoke checks
repository searches for credentials, inline handlers, unsafe sinks, TODOs, and missing assets
```

The browser smoke pass covered direct page navigation, cart/account opening, visible images, duplicate IDs, horizontal overflow, and console errors. Production payment, Resend email, and destructive Blob writes were intentionally not exercised with live credentials.

## 4. Initial Failures

- No test, check, lint, or build scripts and no lockfile.
- Local dependency was not installed.
- Public code contained the working admin password and sent it in custom headers.
- Unauthenticated admin-state reads included private notes and unreleased ideas.
- Uploads accepted SVG/GIF and had no decoded byte limit.
- Checkout accepted arbitrary HTTP return origins and did not enforce numerical inventory.
- Webhooks lacked a replay window and durable duplicate-event record.
- Completed but unpaid sessions could be promoted toward fulfillment.
- Paid orders could be permanently deleted.
- Customer profile updates accepted client-provided order history.
- Password-reset codes used `Math.random`, lacked cooldown, and login errors enumerated accounts.
- Security headers, crawl controls, metadata, custom 404 handling, lazy loading, and durable asset caching were incomplete.
- Six used images totaled approximately 7.1 MB.

## 5. Complete Feature Inventory

- Storefront home, shop, product details, reviews, fit guide, custom design builder, and account page.
- Product search/filtering, fresh drops, stock state, sale pricing, SKU/inventory administration, and collapsible product management.
- Cart add/remove/quantity, guest sizing, account checkout, custom quote requests, and Stripe redirect/return handling.
- Customer registration, login/logout, saved sizing, favorites, order/quote history, password reset, and live messaging.
- Dedicated admin page with orders, products, customers, messenger, team access, accounting exports, content/photos, layout, design studio, size finder, ideas, and paginated pro notes.
- Admin order filtering, pagination, optimistic status updates, quotes, notes, shipment workflow, and protected deletion.
- Photo upload/fitting, lightbox enlargement, nail design canvas, brush/aura/fill/French/glitter/3D tools.
- Not implemented: addresses, tax/shipping calculation, coupons, refunds, email verification, purchase/status emails, recommendation engine, and formal analytics.

## 6. Bugs Found, Grouped by Severity

| ID | Severity | Status | Affected feature |
|---|---|---|---|
| F-01 | Critical | Fixed | Admin authentication/authorization |
| F-02 | Critical | Fixed | Private admin-state exposure |
| F-03 | High | Fixed | Checkout redirect and inventory validation |
| F-04 | High | Fixed | Stripe webhook verification/replay |
| F-05 | High | Fixed | Paid-order data retention |
| F-06 | High | Fixed | Unsafe/unbounded image uploads |
| F-07 | High | Fixed | Customer profile order integrity |
| F-08 | High | Fixed | Stored markup injection through cart image URL |
| F-09 | Medium | Fixed | Password reset and account enumeration |
| F-10 | Medium | Fixed | Missing browser security controls |
| F-11 | Medium | Fixed | Image weight and loading behavior |
| F-12 | Medium | Fixed | SEO and error-page readiness |
| F-13 | Medium | Fixed | Protected endpoint initialized storage before auth |
| F-14 | Low | Fixed | Missing reproducible build/test gate |
| F-15 | Medium | Open | Customer session architecture |
| F-16 | Medium | Open | Atomic inventory decrement/restoration |
| F-17 | Medium | Open | Transactional order email pipeline |
| F-18 | Low | Open | Monitoring and immutable audit trail |

## 7. Security Findings

### F-01: Public admin credential
- Severity: Critical. Affected feature: all admin APIs.
- Reproduction: inspect the old client bundle or admin request headers.
- Expected: credentials exist only server-side and requests use expiring sessions.
- Actual: a shared password was hardcoded in the bundle/functions and sent on each write.
- Root cause: demo authentication became production authorization.
- Fix applied: server-only credential validation, rate-limited login, HMAC-signed two-hour bearer sessions, timing-safe comparisons, and fail-closed secret requirements.
- Verification: admin auth and unauthorized endpoint tests pass; repository credential search passes.
- Remaining risk: session tokens use `sessionStorage`, so any future same-origin XSS must still be treated seriously.

### F-02: Private admin data in public state
- Severity: Critical. Affected feature: admin notes, ideas, and product formulas.
- Reproduction: unauthenticated `GET /.netlify/functions/admin-state` before repair.
- Expected: storefront receives only publishable catalog state.
- Actual: the full normalized state was returned.
- Root cause: one response model served both public and admin clients.
- Fix applied: public projection strips `notes`, `adminNote`, `privateNotes`, `ideas`, and `proNotes`; authenticated requests retain full state.
- Verification: data-protection test asserts private fields are absent.
- Remaining risk: newly added private fields must be added to the projection or moved to separate records.

### F-03: Checkout trust boundaries
- Severity: High. Affected feature: Stripe checkout.
- Reproduction: submit an external `returnBaseUrl`, remote product image, stale price, or quantity above stock.
- Expected: server controls destination, price, and availability.
- Actual: return origins were open and numeric inventory was not enforced.
- Root cause: incomplete server-side checkout validation.
- Fix applied: allowlisted origins, same-origin image URLs, live product price recalculation, sold-out detection, and inventory limits.
- Verification: commerce tests cover manipulation, open redirects, image URLs, and stock limits.
- Remaining risk: see F-16 for concurrent stock adjustment.

### F-04: Webhook replay/payment-state gaps
- Severity: High. Affected feature: Stripe order reconciliation.
- Reproduction: replay an old signed event or deliver `checkout.session.completed` with an unpaid state.
- Expected: recent valid signatures, duplicate suppression, and paid-only fulfillment.
- Actual: no timestamp tolerance/event record; completed events could advance unpaid sessions.
- Root cause: signature digest was checked without lifecycle validation.
- Fix applied: five-minute tolerance, multiple-signature support, constant-time comparison, durable event records, and paid-state requirement.
- Verification: webhook authenticity, tampering, expiration, and key validation tests pass.
- Remaining risk: Blob writes are strongly consistent but not a multi-record database transaction.

### F-05 through F-10
- Severity: High/Medium. Affected features: orders, uploads, profile integrity, cart rendering, reset flow, and browser shell.
- Reproduction: delete a paid order; upload SVG/oversized data; submit client orders; inject quotes into image attributes; probe login/reset errors; inspect response headers.
- Expected: retained financial records, safe bounded media, server-owned orders, escaped markup, generic auth errors, and hardened headers.
- Actual: each safeguard was missing or incomplete.
- Root causes: permissive demo defaults and shared client/server models.
- Fixes applied: paid deletion returns 409; uploads allow only JPG/PNG/WebP up to 5 MB; profile saves preserve server orders; image attributes are escaped; reset codes use cryptographic randomness/cooldown; login errors are generic; CSP, clickjacking, MIME, referrer, permissions, and opener policies were added.
- Verification: authorization, commerce, static-security, and data-protection suites pass.
- Remaining risk: public quote submission still needs stronger distributed spam controls.

## 8. Performance Findings

- Six used PNGs were converted to visually checked WebP assets: 7,401,379 bytes became 387,546 bytes, about a 94.8% reduction.
- Header/hero images now have dimensions and async decoding; below-fold guides/footer logo lazy-load.
- Asset caching increased from five minutes to seven days with stale-while-revalidate.
- Admin order reads are parallelized instead of sequential Blob fetches.
- Product/order/note interfaces already use filtering, collapsible records, and pagination appropriate for larger collections.
- Remaining: `script.js` and `styles.css` are large monoliths. Splitting by storefront/admin route would materially reduce parse cost but is a larger architectural change and was not attempted in a security audit.
- Remaining: many source/reference images remain in the deploy package, although they are not transferred during ordinary customer navigation.

## 9. Accessibility Findings

- Unique static IDs and image `alt` attributes are enforced by tests.
- Existing visible focus styles, labels, live regions, keyboard product cards, modal semantics, and reduced-motion rules were confirmed in source/runtime smoke checks.
- Responsive smoke checks found no horizontal overflow at mobile, tablet, or desktop sizes.
- Remaining human checks: contrast against dynamic uploaded images, full screen-reader flows, modal focus trapping/restoration, 200% zoom, and touch testing on physical iOS/Android devices.

## 10. SEO Findings

- Added descriptive title, meta description, canonical URL, Open Graph/Twitter metadata, theme color, `robots.txt`, and sitemap.
- Added a branded 404 page.
- Admin page now has meta and HTTP `noindex` controls.
- Remaining: Product JSON-LD should be generated from live catalog data; current hash-based page navigation limits per-product canonical URLs.

## 11. Root Causes of Significant Issues

1. A prototype trust model crossed into production: client code held admin credentials and mutable business state.
2. Public and private data shared one large state object without an explicit response boundary.
3. Schemaless Blob storage offers flexibility but no multi-record transaction for inventory/order/payment changes.
4. The single-file frontend grew through many feature additions without route-level modules or automated checks.
5. Production-readiness metadata, headers, observability, and test commands were added later than business features.

## 12. Files Changed

- Security/backend: `netlify/functions/_shared/admin-auth.mjs`, `admin-auth.mjs`, `admin-state.mjs`, `admin-orders.mjs`, `create-checkout-session.mjs`, `custom-request.mjs`, `customer-account.mjs`, `customer-admin.mjs`, `messages.mjs`, `stripe-webhook.mjs`.
- Frontend: `script.js`, `styles.css`, `index.html`, `admin.html`, `404.html`.
- Production/config: `netlify.toml`, `package.json`, `pnpm-lock.yaml`, `README.md`, `robots.txt`, `sitemap.xml`.
- Assets: six new `.webp` files in `assets/`.
- Tests: `tests/*.test.mjs`.

## 13. Fixes Implemented

- Signed admin sessions, login throttling, fail-closed environment validation, and protected APIs.
- Public/private admin-state separation and bounded safe image storage.
- Server-authoritative checkout totals, stock validation, safe redirects, and webhook replay controls.
- Paid-order retention, order deduplication, optimistic admin updates with rollback, and scalable admin filters/pagination.
- Customer order-integrity protection, stronger password-reset behavior, and generic login failures.
- Security headers, noindex controls, custom 404, SEO metadata, cache policy, responsive images, and WebP delivery.
- Persistent test/build gate and lockfile.

## 14. Tests Added or Modified

- Admin credential, token tampering, expiry, allowlist, and lockout recovery.
- Unauthorized admin orders, customer administration, and admin-state mutation.
- Price manipulation, inventory, quote ownership, external image, redirect, and webhook replay rules.
- Scrypt password behavior and private-state projection.
- Paid-order deduplication/deletion protections.
- Static credential/CSP/metadata/asset/duplicate-ID/alt-text checks.
- Existing UI regression tests cover products, filters, mobile sizing, admin navigation, notes, accounting, messages, quote delivery, and responsive layout rules.

## 15. Final Test Results

- `pnpm run check`: PASS, 51 tests passing, 0 failing.
- JavaScript/function syntax: PASS.
- `pnpm audit --prod`: PASS, no known vulnerabilities.
- Local HTTP page/assets: PASS (200 responses).
- Build: PASS for this static application; Netlify build now executes the full check suite.
- Lint/type-check: not configured and not applicable as separate tools in this vanilla JavaScript repository; syntax and business-rule tests are the enforced gate.

## 16. Issues Not Fixed and Exact Reason

- F-15 customer sessions: passwords are not persisted, are transmitted only over HTTPS, and are scrypt-verified, but authenticated requests reuse the in-memory password. Migration to `@netlify/identity` or first-party signed customer sessions affects all account/message/quote APIs and needs a deploy-preview migration plan.
- F-16 inventory transactions: stock is validated before Checkout, but no atomic reserve/decrement/restore workflow exists. Netlify Blobs does not provide a cross-record transaction; a durable inventory ledger or transactional database is required before high-volume limited-stock sales.
- F-17 order emails: only password reset email is implemented. Reliable purchase/status emails need provider templates, idempotency records, retry policy, and verified sandbox credentials.
- F-18 observability: adding an external error tracker/uptime service requires owner account selection, retention policy, and production credentials.

## 17. Items Requiring Credentials, Provider Validation, or Human Review

- Confirm `CHEY_ADMIN_PASSWORD`, `CHEY_ADMIN_SESSION_SECRET`, `CHEY_ADMIN_EMAILS`, Stripe keys/webhook secret, Resend key/from-domain, and checkout origin in Netlify without exposing values.
- Run Stripe test-mode success, decline, cancel, asynchronous payment, duplicate webhook, and refund simulations.
- Run Resend sandbox reset delivery and sender-domain validation.
- Validate real Blob state backups and restore procedure before schema changes.
- Perform screen-reader, keyboard-only, physical phone/tablet, and visual product-photo QA.
- Confirm legal copy, privacy policy, terms, refund/cancellation policy, shipping expectations, and tax obligations with the owner/professionals.

## 18. Recommended Next Improvements

1. Adopt signed customer sessions or Netlify Identity and remove repeated password submission.
2. Add a transactional inventory ledger/reservation service before limited-stock marketing at scale.
3. Split storefront/admin JavaScript and CSS into route-level modules.
4. Add Stripe/Resend sandbox integration tests and a deploy-preview environment.
5. Add structured logs, error tracking, uptime checks, and immutable admin audit events.
6. Add dynamic Product/Organization JSON-LD and stable product URLs.
7. Add automated browser accessibility and visual-regression tests in CI.

## 19. Production Deployment Checklist

- [ ] All 51 tests and dependency audit pass on the exact commit.
- [ ] Required Netlify variables exist; admin password is unique and session secret is at least 32 random characters.
- [ ] Stripe production webhook targets `/.netlify/functions/stripe-webhook` and subscribes to required Checkout events.
- [ ] Resend sender/domain is verified.
- [ ] Netlify production branch and custom domain are correct; HTTPS is forced.
- [ ] Backup/export current Blob state before major data changes.
- [ ] Verify admin login, public catalog, one non-destructive customer login, and image delivery after deploy.
- [ ] Use Stripe test mode for end-to-end checkout before any live charge.
- [ ] Monitor function logs for 401/403/429/5xx spikes after release.
- [ ] Keep a known-good deploy available for rollback.

## 20. Exact Manual Testing Checklist for the Owner

1. Open home, shop, reviews, fit, account, and a product directly on phone, tablet, and desktop.
2. Confirm the logo/guides/product photos load, enlarge, fit without white gaps, and retain correct aspect ratio.
3. Keyboard-tab through navigation, filters, product cards, cart, dialogs, account forms, and close controls; confirm focus stays visible.
4. Search/filter products; test no-result, sold-out, sale-price, quantity limit, fresh-drop, and reset states.
5. Add/remove products, change quantities, refresh, and confirm totals/cart state remain correct.
6. Attempt checkout with missing guest sizing and confirm a useful error; cancel Stripe test checkout and return safely.
7. Complete one Stripe test payment; confirm exactly one paid order with correct customer, items, amount, and status.
8. Replay the same test webhook and confirm no duplicate paid order.
9. Register a test customer, log out/in, save half sizes, favorite a product, update profile, and reset the password.
10. Confirm another customer cannot see or alter the test account's orders/messages.
11. Sign in as admin; refresh and wait past navigation changes; confirm the dedicated dashboard never opens blank.
12. Create/edit/withdraw a test product, upload JPG/PNG/WebP, change copy, stock, price, SKU, and photo fit; verify public updates.
13. Filter and paginate orders/notes/products/customers; update an order status and confirm it moves to the correct filter without a full-page flash.
14. Verify a paid order cannot be deleted; cancel/complete only through the supported status workflow.
15. Send customer/admin messages both directions and verify unread indicators and recipient selection.
16. Test Design Studio brush, fill, aura, French tip, glitter, polish, and movable/resizable 3D objects on a physical tablet.
17. Test reduced-motion, 200% browser zoom, screen reader announcements, and color contrast.
18. Review Netlify function logs, Stripe events, and Resend activity after testing; remove test records only through approved non-paid cleanup paths.

## Terminal Summary

```text
Total bugs found: 18
Total bugs fixed: 14
Critical issues remaining: 0
High-severity issues remaining: 0
Tests: 51 passing, 0 failing
Build status: PASS (static build; Netlify runs pnpm run check)
Security scan status: PASS (no known production dependency vulnerabilities)
Branch: codex/full-website-audit
Report: WEBSITE_AUDIT_REPORT.md
```
