import assert from "node:assert/strict";
import test from "node:test";

import {
  adminAuthConfiguration,
  authenticateAdminCredentials,
  adminEmails,
  isOwnerEmail,
  issueAdminToken,
  verifyAdminToken
} from "../netlify/functions/_shared/admin-auth.mjs";

const EMAIL = "owner@example.test";
const PASSWORD = "Test-only-password-2026";
const SECONDARY_PASSWORD = "Secondary-owner-2026";
const SECRET = "test-only-session-secret-with-32-characters";

function configure() {
  process.env.CHEY_ADMIN_EMAILS = EMAIL;
  process.env.CHEY_ADMIN_PASSWORD = PASSWORD;
  process.env.CHEY_SECONDARY_OWNER_PASSWORD = SECONDARY_PASSWORD;
  process.env.CHEY_ADMIN_SESSION_SECRET = SECRET;
}

test.beforeEach(configure);

test.after(() => {
  delete process.env.CHEY_ADMIN_EMAILS;
  delete process.env.CHEY_ADMIN_PASSWORD;
  delete process.env.CHEY_SECONDARY_OWNER_PASSWORD;
  delete process.env.CHEY_ADMIN_SESSION_SECRET;
});

test("requires sufficiently strong server-side configuration", () => {
  assert.equal(adminAuthConfiguration().configured, true);
  process.env.CHEY_ADMIN_SESSION_SECRET = "too-short";
  assert.equal(adminAuthConfiguration().configured, false);
});

test("accepts only the configured admin credentials", () => {
  assert.equal(authenticateAdminCredentials(EMAIL.toUpperCase(), PASSWORD).ok, true);
  assert.equal(authenticateAdminCredentials("0aaronlincoln0@gmail.com", SECONDARY_PASSWORD).ok, true);
  assert.equal(authenticateAdminCredentials("0aaronlincoln0@gmail.com", PASSWORD).ok, false);
  assert.equal(authenticateAdminCredentials(EMAIL, "wrong-password").ok, false);
  assert.equal(authenticateAdminCredentials("someone@example.test", PASSWORD).ok, false);
});

test("keeps the owner identity in the admin allowlist", () => {
  assert.equal(isOwnerEmail("CALLISON@PRESSEDBYCHEY.COM"), true);
  assert.equal(isOwnerEmail("0AARONLINCOLN0@GMAIL.COM"), true);
  assert.equal(adminEmails().includes("callison@pressedbychey.com"), true);
  assert.equal(adminEmails().includes("0aaronlincoln0@gmail.com"), true);
});

test("issues and verifies a short-lived signed session", () => {
  const now = Date.UTC(2026, 6, 15, 12);
  const session = issueAdminToken(EMAIL, now);
  const payload = verifyAdminToken(session.token, now + 1_000);
  assert.equal(payload?.sub, EMAIL);
  assert.equal(payload?.role, "admin");
  assert.equal(session.expiresAt, now + 2 * 60 * 60 * 1_000);
});

test("rejects modified and expired sessions", () => {
  const now = Date.UTC(2026, 6, 15, 12);
  const session = issueAdminToken(EMAIL, now);
  const [payload, signature] = session.token.split(".");
  assert.equal(verifyAdminToken(`${payload}x.${signature}`, now + 1_000), null);
  assert.equal(verifyAdminToken(session.token, now + 2 * 60 * 60 * 1_000), null);
});
