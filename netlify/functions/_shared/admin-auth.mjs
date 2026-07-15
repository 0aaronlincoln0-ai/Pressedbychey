import { createHmac, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";

const TOKEN_TTL_SECONDS = 2 * 60 * 60;
export const OWNER_EMAIL = "callison@pressedbychey.com";
const CUSTOMER_STORE_NAME = "pressed-by-chey";
const DEFAULT_ADMIN_EMAILS = [
  "admin",
  "chey",
  "admin@pressedbychey.com",
  "chey@pressedbychey.com",
  "cheyenne@pressedbychey.com",
  "callison@pressedbychey.com"
];

export function envValue(name) {
  return globalThis.Netlify?.env?.get?.(name) || process.env[name] || "";
}

export function adminEmails() {
  return [OWNER_EMAIL, ...(envValue("CHEY_ADMIN_EMAILS") || DEFAULT_ADMIN_EMAILS.join(",")).split(",")]
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isOwnerEmail(emailValue) {
  return String(emailValue || "").trim().toLowerCase() === OWNER_EMAIL;
}

export function adminAuthConfiguration() {
  const password = envValue("CHEY_ADMIN_PASSWORD");
  const secret = envValue("CHEY_ADMIN_SESSION_SECRET");
  return {
    password,
    secret,
    configured: password.length >= 12 && secret.length >= 32
  };
}

function safeEqual(leftValue, rightValue) {
  const left = Buffer.from(String(leftValue || ""));
  const right = Buffer.from(String(rightValue || ""));
  return left.length === right.length && timingSafeEqual(left, right);
}

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function sign(encodedPayload, secret) {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

export function authenticateAdminCredentials(emailValue, passwordValue) {
  const email = String(emailValue || "").trim().toLowerCase();
  const { password, configured } = adminAuthConfiguration();
  if (!configured) return { ok: false, configured: false, email };
  return {
    ok: adminEmails().includes(email) && safeEqual(passwordValue, password),
    configured: true,
    email
  };
}

export function issueAdminToken(emailValue, now = Date.now(), options = {}) {
  const email = String(emailValue || "").trim().toLowerCase();
  const { secret, configured } = adminAuthConfiguration();
  if (!configured || (!adminEmails().includes(email) && !options.allowDynamic)) throw new Error("Admin authentication is not configured.");
  const issuedAt = Math.floor(now / 1000);
  const payload = {
    v: 1,
    sub: email,
    role: "admin",
    iat: issuedAt,
    exp: issuedAt + TOKEN_TTL_SECONDS
  };
  const encodedPayload = encode(JSON.stringify(payload));
  return {
    token: `${encodedPayload}.${sign(encodedPayload, secret)}`,
    expiresAt: payload.exp * 1000,
    email
  };
}

export function verifyAdminToken(tokenValue, now = Date.now()) {
  const token = String(tokenValue || "").trim();
  const { secret, configured } = adminAuthConfiguration();
  if (!configured || !token.includes(".")) return null;
  const [encodedPayload, suppliedSignature, ...extra] = token.split(".");
  if (!encodedPayload || !suppliedSignature || extra.length) return null;
  if (!safeEqual(suppliedSignature, sign(encodedPayload, secret))) return null;
  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    const nowSeconds = Math.floor(now / 1000);
    if (payload?.v !== 1 || payload?.role !== "admin") return null;
    if (!Number.isFinite(payload.iat) || !Number.isFinite(payload.exp)) return null;
    if (payload.iat > nowSeconds + 60 || payload.exp <= nowSeconds) return null;
    return payload;
  } catch {
    return null;
  }
}

export function bearerToken(request) {
  const authorization = request.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

export function verifyAdminRequest(request, now = Date.now()) {
  return verifyAdminToken(bearerToken(request), now);
}

export async function verifyAdminCapability(request, capability = "") {
  const session = verifyAdminRequest(request);
  if (!session) return null;
  const owner = isOwnerEmail(session.sub);
  if (owner || capability !== "delete") {
    return { ...session, isOwner: owner, canDelete: owner };
  }

  const store = getStore({ name: CUSTOMER_STORE_NAME, consistency: "strong" });
  const customer = await store.get(`customers/${encodeURIComponent(session.sub)}.json`, { type: "json" });
  return {
    ...session,
    isOwner: false,
    canDelete: customer?.isAdmin === true && customer?.canDelete === true
  };
}
