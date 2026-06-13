# Pressed by Chey

Luxury press-on nail website for Pressed by Chey.

## What is included

- Customer storefront with product cards, custom design request, cart, guest checkout, and account area.
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

## Deploy to Netlify

Upload the contents of this folder to Netlify, or use the latest zip artifact in Documents:

```text
C:\Users\aplin\Documents\UPLOAD-THIS-TO-NETLIFY-LATEST-DESIGN-STUDIO-PHOTO-FIX.zip
```

## Important note

Customer accounts, admin edits, orders, uploaded photos, and design notes are saved in the browser on this static demo. To share those changes across different computers or real customers, the site will need a backend database and file storage.
