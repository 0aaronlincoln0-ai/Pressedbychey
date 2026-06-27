# Pressed by Chey

Luxury press-on nail website for Pressed by Chey.

## What is included

- Customer storefront with product cards, cart, guest checkout, and account area.
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
- `asset-test.html`: quick image check page for deploy verification

## Deploy to Netlify

Upload the contents of this folder to Netlify, or use the latest zip artifact in Documents:

```text
C:\Users\aplin\Documents\UPLOAD-THIS-TO-NETLIFY-LATEST-DESIGN-STUDIO-PHOTO-FIX.zip
```

## Important note

Admin product, photo, copy, layout, design note, and product edits are saved to the deployed Netlify website through `/.netlify/functions/admin-state`, backed by Netlify Blobs. Customer accounts, guest orders, saved sizes, saved products, and order history still use browser storage in this demo. For real public customer accounts, payments, and order management, connect a secure backend/database and checkout provider.
