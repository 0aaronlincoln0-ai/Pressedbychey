import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("public HTML has no inline event handlers", async () => {
  for (const file of ["index.html", "admin.html", "404.html"]) {
    assert.doesNotMatch(await source(file), /\son[a-z]+\s*=/i, file);
  }
});

test("client code does not contain a literal admin password", async () => {
  const client = await source("script.js");
  assert.doesNotMatch(client, /const\s+ADMIN_PASSWORD\s*=/);
  assert.doesNotMatch(client, /["']x-admin-password["']/i);
});

test("Netlify applies baseline browser protections", async () => {
  const config = await source("netlify.toml");
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /X-Content-Type-Options\s*=\s*"nosniff"/);
  assert.match(config, /X-Robots-Tag\s*=\s*"noindex/);
});

test("public page exposes basic search and sharing metadata", async () => {
  const html = await source("index.html");
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /property="og:title"/);
});
