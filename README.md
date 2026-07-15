# Pressed by Chey

Luxury press-on nail website for Pressed by Chey.

## What is included

- Customer storefront with product cards, cart, guest checkout, and account area.
- Secure Stripe Checkout handoff for paid product purchases.
- Admin paid-order workflow for tracking products that need to be made, packed, or shipped.
- Admin sign-in through the account panel.
- Admin product/photo editor.
- Design Studio with a nail canvas, aura tools, nail brush, French tip, glitter, chrome, and movable 3D objects.
- Netlify Blobs-backed customer, inventory, message, note, and order storage.
- Netlify-ready static files and serverless functions.

## Admin login

The dedicated admin page is `admin.html`. Admin credentials and session signing are configured only in Netlify environment variables; there is no admin password in the public source code.

```text
CHEY_ADMIN_PASSWORD=<a unique password of at least 12 characters>
CHEY_ADMIN_SESSION_SECRET=<at least 32 random characters>
CHEY_ADMIN_EMAILS=callison@pressedbychey.com,chey@pressedbychey.com
```

Changing `CHEY_ADMIN_SESSION_SECRET` signs out existing admin sessions. Keep both secret values out of GitHub and browser code.

## Run locally

Install dependencies and use Netlify Dev so the serverless functions are available:

```powershell
netlify dev
```

Then open:

```text
http://localhost:8888/
```

## Project structure

- `index.html`, `styles.css`, `script.js`: main app files
- `assets/`: logos, product photos, and preview images
- `netlify.toml`: deploy settings and security headers
- `netlify/functions/admin-state.mjs`: live admin saving for Netlify deployments
- `netlify/functions/create-checkout-session.mjs`: secure Stripe Checkout Session creation
- `netlify/functions/checkout-status.mjs`: verifies Stripe payment status after checkout returns
- `netlify/functions/admin-orders.mjs`: admin-only paid order list and fulfillment status updates
- `netlify/functions/stripe-webhook.mjs`: Stripe payment webhook that marks paid orders ready for review
- `asset-test.html`: quick image check page for deploy verification

## Stripe payments

Paid product checkouts use Stripe's hosted Checkout page. Do not put the Stripe secret key in `index.html` or `script.js`.

Set this production environment variable in Netlify:

```text
STRIPE_SECRET_KEY=sk_live_...
```

The current customer-facing flow validates product prices against the live Netlify product inventory before creating a Stripe Checkout Session. Quote-only custom requests stay out of Stripe until Chey reviews and prices them.

Set these environment variables in Netlify for order workflow and support:

```text
ORDER_NOTIFICATION_EMAIL=callison@pressedbychey.com
CHEY_SUPPORT_EMAIL=callison@pressedbychey.com
CHEY_SUPPORT_PHONE=9893922012
STRIPE_WEBHOOK_SECRET=whsec_...
CHECKOUT_RETURN_ORIGINS=https://www.pressedbychey.com
```

Paid orders appear in the Admin > Orders tab, where Chey can update fulfillment status from payment pending through making, ready to ship, shipped, or canceled.

## Customer password resets

Customer account password resets use the Netlify `customer-account` function. The function creates a 6-digit one-time passcode, stores only a hashed copy, expires it after 15 minutes, and emails the passcode to the customer.

Set these production environment variables in Netlify before launch:

```text
RESEND_API_KEY=re_...
PASSWORD_RESET_FROM_EMAIL=Pressed by Chey <support@pressedbychey.com>
CHEY_SUPPORT_EMAIL=callison@pressedbychey.com
```

The `PASSWORD_RESET_FROM_EMAIL` sender must be a verified sender/domain in Resend.

## Deploy to Netlify

Deploy this site from the connected GitHub repository, not drag-and-drop, because checkout, customer accounts, admin saves, and paid orders require `netlify/functions`.

Recommended Netlify settings:

```text
Repository: 0aaronlincoln0-ai/Pressedbychey
Production branch: main
Build command: npm install
Publish directory: .
Functions directory: netlify/functions
```

After each change, commit and push to `main`; Netlify should automatically build and publish the site. If it does not, open Netlify > pressedbychey > Site configuration > Build & deploy and confirm continuous deployment is connected to the GitHub repository above.

Run `npm test` before pushing changes. This repository does not store deployment tokens or production secrets.

## Important note

Admin product, photo, copy, layout, design note, product edits, customer accounts, password resets, custom quote requests, and paid order workflow are saved to the deployed Netlify website through Netlify Functions backed by Netlify Blobs. Paid product purchases use Stripe Checkout through Netlify Functions.

Do not test destructive admin, order, or payment actions against production. Use a Netlify deploy preview with test Stripe and Resend credentials.
