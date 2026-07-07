# Pressed by Chey

Luxury press-on nail website for Pressed by Chey.

## What is included

- Customer storefront with product cards, cart, guest checkout, and account area.
- Secure Stripe Checkout handoff for paid product purchases.
- Admin sign-in through the account panel.
- Admin product/photo editor.
- Design Studio with a nail canvas, aura tools, nail brush, French tip, glitter, chrome, and movable 3D objects.
- Local-only demo storage using browser `localStorage`.
- Netlify-ready static files.

## Admin login

- Username: `admin`
- Password: `chey2026`

## Run locally

This is a static site. From this folder, run:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

## Project structure

- `index.html`, `styles.css`, `script.js`: main app files
- `assets/`: logos, product photos, and preview images
- `netlify.toml`: deploy settings and security headers
- `netlify/functions/admin-state.mjs`: live admin saving for Netlify deployments
- `netlify/functions/create-checkout-session.mjs`: secure Stripe Checkout Session creation
- `netlify/functions/checkout-status.mjs`: verifies Stripe payment status after checkout returns
- `asset-test.html`: quick image check page for deploy verification

## Stripe payments

Paid product checkouts use Stripe's hosted Checkout page. Do not put the Stripe secret key in `index.html` or `script.js`.

Set this production environment variable in Netlify:

```text
STRIPE_SECRET_KEY=sk_live_...
```

The current customer-facing flow validates product prices against the live Netlify product inventory before creating a Stripe Checkout Session. Quote-only custom requests stay out of Stripe until Chey reviews and prices them.

## Deploy to Netlify

Upload the contents of this folder to Netlify, or use the latest zip artifact in Documents:

```text
C:\Users\aplin\Documents\UPLOAD-THIS-TO-NETLIFY-LATEST-DESIGN-STUDIO-PHOTO-FIX.zip
```

## Important note

Admin product, photo, copy, layout, design note, and product edits are saved to the deployed Netlify website through `/.netlify/functions/admin-state`, backed by Netlify Blobs. Paid product purchases use Stripe Checkout through Netlify Functions. Customer accounts, guest quote requests, saved sizes, saved products, and local order history still use browser storage unless a full customer database/order dashboard is added.
