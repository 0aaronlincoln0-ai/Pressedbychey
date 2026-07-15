import { createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";
import {
  adminAuthConfiguration,
  authenticateAdminCredentials,
  issueAdminToken
} from "./_shared/admin-auth.mjs";

const STORE_NAME = "pressed-by-chey-security";
const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

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

function safeText(value, maxLength = 180) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function attemptKey(email, ip) {
  const digest = createHash("sha256").update(`${email}|${ip}`).digest("hex");
  return `admin-login/${digest}.json`;
}

export default async (request, context = {}) => {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  if (!adminAuthConfiguration().configured) {
    return jsonResponse({ error: "Admin login is not configured securely." }, { status: 503 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid login request." }, { status: 400 });
  }

  const email = safeText(payload?.email, 180).toLowerCase();
  const password = String(payload?.password || "").slice(0, 256);
  const ip = safeText(context.ip || request.headers.get("x-nf-client-connection-ip") || "unknown", 80);
  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const key = attemptKey(email, ip);
  const now = Date.now();
  const attempt = await store.get(key, { type: "json" });
  const activeWindow = attempt && now - Number(attempt.windowStartedAt || 0) < ATTEMPT_WINDOW_MS;
  const failures = activeWindow ? Number(attempt.failures || 0) : 0;
  if (failures >= MAX_ATTEMPTS) {
    return jsonResponse({ error: "Too many login attempts. Try again in 15 minutes." }, { status: 429 });
  }

  const result = authenticateAdminCredentials(email, password);
  if (!result.ok) {
    await store.setJSON(key, {
      failures: failures + 1,
      windowStartedAt: activeWindow ? attempt.windowStartedAt : now,
      updatedAt: now
    });
    return jsonResponse({ error: "Invalid admin email or password." }, { status: 401 });
  }

  await store.delete(key);
  const session = issueAdminToken(result.email, now);
  return jsonResponse({ ok: true, session });
};

