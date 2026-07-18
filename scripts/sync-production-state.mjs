import { writeFile } from "node:fs/promises";

const productionStateUrl = "https://www.pressedbychey.com/.netlify/functions/admin-state";
const productionOrigin = new URL(productionStateUrl).origin;
const outputUrl = new URL("../local-production-state.json", import.meta.url);

function localPreviewMediaUrl(value) {
  const url = String(value || "");
  return url.startsWith("/.netlify/functions/")
    ? `${productionOrigin}${url}`
    : value;
}

function withoutPrivateCatalogFields(value = {}) {
  const {
    notes: _notes,
    sku: _sku,
    productNumber: _productNumber,
    ...publicValue
  } = value && typeof value === "object" ? value : {};
  return {
    ...publicValue,
    image: localPreviewMediaUrl(publicValue.image)
  };
}

function sanitizePublicState(state = {}) {
  const safeState = state && typeof state === "object" ? state : {};
  return {
    ...safeState,
    accountingExpenses: [],
    ideas: [],
    proNotes: [],
    images: Object.fromEntries(
      Object.entries(safeState.images || {}).map(([key, value]) => [
        key,
        localPreviewMediaUrl(value)
      ])
    ),
    lookPhotos: Object.fromEntries(
      Object.entries(safeState.lookPhotos || {}).map(([key, value]) => [
        key,
        localPreviewMediaUrl(value)
      ])
    ),
    customProducts: Array.isArray(safeState.customProducts)
      ? safeState.customProducts.map(withoutPrivateCatalogFields)
      : [],
    lookDetails: Object.fromEntries(
      Object.entries(safeState.lookDetails || {}).map(([key, value]) => [
        key,
        withoutPrivateCatalogFields(value)
      ])
    )
  };
}

const response = await fetch(productionStateUrl, {
  headers: { Accept: "application/json" }
});

if (!response.ok) {
  throw new Error(`Production catalog request failed with ${response.status}.`);
}

const payload = await response.json();
if (!payload?.state || !Array.isArray(payload.state.customProducts)) {
  throw new Error("Production catalog response did not contain a valid storefront state.");
}

const snapshot = {
  source: productionStateUrl,
  syncedAt: new Date().toISOString(),
  productCount: payload.state.customProducts.length,
  state: sanitizePublicState(payload.state)
};

await writeFile(outputUrl, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`Synced ${snapshot.productCount} production products into local-production-state.json.`);
