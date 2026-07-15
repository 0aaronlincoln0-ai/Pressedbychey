import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import { getStore } from "@netlify/blobs";
import { verifyAdminCapability, verifyAdminRequest } from "./_shared/admin-auth.mjs";

const STORE_NAME = "pressed-by-chey";
const STATE_KEY = "admin-state";
const PHOTO_PREFIX = "photos";
const DATA_URL_PATTERN = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([a-zA-Z0-9+/=\s]+)$/;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_STATE_BYTES = 4 * 1024 * 1024;

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(init.headers || {})
    }
  });
}

function defaultLayoutOrder() {
  return ["home", "shop", "reviews"];
}

function defaultAdminState() {
  return {
    texts: {},
    images: {},
    imageFits: {},
    imagePositions: {},
    imageZooms: {},
    imageTransforms: {},
    products: {},
    customProducts: [],
    lookPhotos: {},
    lookPhotoFits: {},
    lookPhotoPositions: {},
    lookPhotoZooms: {},
    lookPhotoTransforms: {},
    lookDetails: {},
    ideas: [],
    proNotes: [],
    customPages: [],
    customBlocks: [],
    hiddenText: {},
    textOffsets: {},
    layoutOrder: defaultLayoutOrder(),
    hiddenSections: {}
  };
}

function isDataUrl(value) {
  return typeof value === "string" && DATA_URL_PATTERN.test(value);
}

function imageExtension(mimeType) {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  return "jpg";
}

function sanitizePhotoKind(kind = "upload") {
  return String(kind)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "upload";
}

function photoUrlForKey(key) {
  return `/.netlify/functions/admin-state?photo=${encodeURIComponent(key)}`;
}

function safePhotoKey(key) {
  const value = String(key || "").trim();
  if (!/^photos\/[a-z0-9_-]+\/[a-z0-9._-]+$/i.test(value)) return "";
  if (value.includes("..")) return "";
  return value;
}

async function storePhotoDataUrl(store, dataUrl, kind = "upload") {
  const match = String(dataUrl || "").match(DATA_URL_PATTERN);
  if (!match) {
    throw new Error("Invalid image data");
  }

  const [, mimeType, base64] = match;
  if (!ALLOWED_IMAGE_TYPES.has(mimeType.toLowerCase())) {
    throw new Error("Only JPG, PNG, and WebP images are allowed");
  }
  const bytes = Buffer.from(base64.replace(/\s/g, ""), "base64");
  if (!bytes.length) {
    throw new Error("Image data was empty");
  }
  if (bytes.length > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller");
  }

  const safeKind = sanitizePhotoKind(kind);
  const key = `${PHOTO_PREFIX}/${safeKind}/${Date.now()}-${randomUUID()}.${imageExtension(mimeType)}`;
  const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  await store.set(key, arrayBuffer, {
    metadata: {
      contentType: mimeType,
      createdAt: new Date().toISOString(),
      kind: safeKind
    }
  });
  return {
    key,
    url: photoUrlForKey(key),
    bytes: bytes.length
  };
}

async function replaceDataUrl(store, container, key, kind) {
  if (!container || !isDataUrl(container[key])) return false;
  const stored = await storePhotoDataUrl(store, container[key], kind);
  container[key] = stored.url;
  return true;
}

async function externalizeStatePhotos(store, state) {
  let changed = false;

  for (const key of Object.keys(state.images || {})) {
    changed = (await replaceDataUrl(store, state.images, key, `site-${key}`)) || changed;
  }

  for (const key of Object.keys(state.lookPhotos || {})) {
    changed = (await replaceDataUrl(store, state.lookPhotos, key, `look-${key}`)) || changed;
  }

  for (const [index, product] of (state.customProducts || []).entries()) {
    changed = (await replaceDataUrl(store, product, "image", `product-${index}`)) || changed;
  }

  for (const [index, idea] of (state.ideas || []).entries()) {
    changed = (await replaceDataUrl(store, idea, "image", `idea-${index}`)) || changed;
  }

  return changed;
}

function normalizeAdminState(saved = {}) {
  const nextState = {
    ...defaultAdminState(),
    ...saved,
    texts: saved.texts || {},
    images: saved.images || {},
    imageFits: saved.imageFits || {},
    imagePositions: saved.imagePositions || {},
    imageZooms: saved.imageZooms || {},
    imageTransforms: saved.imageTransforms || {},
    products: saved.products || {},
    customProducts: Array.isArray(saved.customProducts) ? saved.customProducts : [],
    lookPhotos: saved.lookPhotos || {},
    lookPhotoFits: saved.lookPhotoFits || {},
    lookPhotoPositions: saved.lookPhotoPositions || {},
    lookPhotoZooms: saved.lookPhotoZooms || {},
    lookPhotoTransforms: saved.lookPhotoTransforms || {},
    lookDetails: saved.lookDetails || {},
    ideas: Array.isArray(saved.ideas) ? saved.ideas : [],
    proNotes: Array.isArray(saved.proNotes) ? saved.proNotes : [],
    customPages: Array.isArray(saved.customPages) ? saved.customPages : [],
    customBlocks: Array.isArray(saved.customBlocks) ? saved.customBlocks : [],
    hiddenText: saved.hiddenText && typeof saved.hiddenText === "object" ? saved.hiddenText : {},
    textOffsets: saved.textOffsets && typeof saved.textOffsets === "object" ? saved.textOffsets : {},
    layoutOrder: Array.isArray(saved.layoutOrder) ? saved.layoutOrder : defaultLayoutOrder(),
    hiddenSections: saved.hiddenSections && typeof saved.hiddenSections === "object" ? saved.hiddenSections : {}
  };
  delete nextState.images["try-on"];
  return nextState;
}

function withoutPrivateNotes(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const { notes, adminNote, privateNotes, ...publicValue } = value;
  return publicValue;
}

function withoutPrivateCatalogIdentifiers(value = {}) {
  const publicValue = withoutPrivateNotes(value);
  if (!publicValue || typeof publicValue !== "object" || Array.isArray(publicValue)) return publicValue;
  const { sku, productNumber, ...customerValue } = publicValue;
  return customerValue;
}

export function publicAdminState(state) {
  return {
    ...state,
    customProducts: (state.customProducts || []).map(withoutPrivateCatalogIdentifiers),
    lookDetails: Object.fromEntries(
      Object.entries(state.lookDetails || {}).map(([key, value]) => [key, withoutPrivateCatalogIdentifiers(value)])
    ),
    products: Object.fromEntries(
      Object.entries(state.products || {}).map(([key, value]) => [key, withoutPrivateCatalogIdentifiers(value)])
    ),
    ideas: [],
    proNotes: []
  };
}

function isAuthorized(request) {
  return Boolean(verifyAdminRequest(request));
}

function stateRemovesRecords(previous = {}, next = {}) {
  const objectCollections = ["images", "products", "lookPhotos", "lookPhotoFits", "lookPhotoPositions", "lookPhotoZooms", "lookPhotoTransforms", "lookDetails"];
  if (objectCollections.some((key) => Object.keys(previous[key] || {}).some((entry) => !Object.prototype.hasOwnProperty.call(next[key] || {}, entry)))) return true;
  return ["customProducts", "ideas", "proNotes", "customPages", "customBlocks"].some((key) => Array.isArray(next[key]) && Array.isArray(previous[key]) && next[key].length < previous[key].length);
}

export default async (request) => {
  const store = getStore(STORE_NAME);
  const url = new URL(request.url);
  const photoKey = safePhotoKey(url.searchParams.get("photo"));

  if (request.method === "GET" && url.searchParams.has("photo")) {
    if (!photoKey) {
      return jsonResponse({ error: "Invalid photo key" }, { status: 400 });
    }

    const entry = await store.getWithMetadata(photoKey, { type: "arrayBuffer" });
    if (!entry?.data) {
      return jsonResponse({ error: "Photo not found" }, { status: 404 });
    }

    const contentType = String(entry.metadata?.contentType || "").toLowerCase();
    if (!ALLOWED_IMAGE_TYPES.has(contentType)) {
      return jsonResponse({ error: "Unsupported photo type" }, { status: 415 });
    }

    return new Response(entry.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }

  if (request.method === "POST" && url.searchParams.get("photo") === "upload") {
    if (!isAuthorized(request)) {
      return jsonResponse({ error: "Unauthorized" }, { status: 401 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON payload" }, { status: 400 });
    }

    try {
      const photo = await storePhotoDataUrl(store, payload?.dataUrl, payload?.kind);
      return jsonResponse({ ok: true, photo });
    } catch (error) {
      return jsonResponse({ error: error.message || "Photo upload failed" }, { status: 400 });
    }
  }

  if (request.method === "GET") {
    const savedState = await store.get(STATE_KEY, { type: "json" });
    if (!savedState) {
      return jsonResponse({ state: null });
    }
    const normalizedState = normalizeAdminState(savedState);
    if (await externalizeStatePhotos(store, normalizedState)) {
      await store.setJSON(STATE_KEY, normalizedState);
    }
    return jsonResponse({ state: isAuthorized(request) ? normalizedState : publicAdminState(normalizedState) });
  }

  if (request.method === "PUT") {
    if (!isAuthorized(request)) {
      return jsonResponse({ error: "Unauthorized" }, { status: 401 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON payload" }, { status: 400 });
    }

    if (!payload?.state || typeof payload.state !== "object") {
      return jsonResponse({ error: "State payload is required" }, { status: 400 });
    }

    if (Buffer.byteLength(JSON.stringify(payload.state), "utf8") > MAX_STATE_BYTES) {
      return jsonResponse({ error: "State payload is too large" }, { status: 413 });
    }

    const normalizedState = normalizeAdminState(payload.state);
    const savedState = normalizeAdminState(await store.get(STATE_KEY, { type: "json" }) || {});
    const adminSession = await verifyAdminCapability(request, stateRemovesRecords(savedState, normalizedState) ? "delete" : "write");
    if (!adminSession) return jsonResponse({ error: "Unauthorized" }, { status: 401 });
    if (stateRemovesRecords(savedState, normalizedState) && !adminSession.canDelete) {
      return jsonResponse({ error: "Only Chey or an admin granted delete access can remove catalog records." }, { status: 403 });
    }
    await externalizeStatePhotos(store, normalizedState);
    await store.setJSON(STATE_KEY, normalizedState);
    return jsonResponse({ ok: true, state: normalizedState });
  }

  return jsonResponse({ error: "Method not allowed" }, { status: 405 });
};
