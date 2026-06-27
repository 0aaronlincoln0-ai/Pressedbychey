Pressed by Chey - Netlify Upload

Fastest deploy:
1. Go to https://app.netlify.com/drop
2. Upload the prepared zip/folder from this project, not only index.html.
3. The upload must include index.html, styles.css, script.js, assets/, netlify/functions/, package.json, and node_modules/@netlify/blobs.
4. After Netlify publishes, open /asset-test.html on the Netlify link. If the test images show there, the website images will show too.

Important:
- This storefront is static, with one Netlify Function for live admin saving.
- The site images now live in the `assets/` folder, so make sure that folder is included in every upload.
- Admin product, photo, copy, layout, design note, and product edits save to the deployed Netlify website through `/.netlify/functions/admin-state`.
- Customer login, guest checkout, saved sizes, saved products, and order history still use browser storage for this demo version.
- Admin login is through the Account sign-in: admin / chey2026. The Admin tab appears after admin sign-in.
- The admin page includes a Design Studio tab for private nail ideas, maker notes, color recipes, materials, inspiration photos, and a one-nail sketch pad with realistic press-on nail shapes, polish, aura, glitter, 3D charms, stay-in-line drawing, and AI-style assist tools.
- The Design Library in admin is private reference storage for Chey's future product planning.
- For real public customer accounts and payments, connect the site to a secure backend/database and checkout provider.
