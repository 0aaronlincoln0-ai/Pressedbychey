import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";
import { verifyAdminRequest } from "./_shared/admin-auth.mjs";

const STORE_NAME = "pressed-by-chey";
const MESSAGE_PREFIX = "messages";
const MAX_MESSAGE_LENGTH = 2400;
const MAX_MESSAGES_PER_CONVERSATION = 300;
const MAX_CONVERSATIONS = 1000;

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

function safeText(value, maxLength = 240) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeEmail(value = "") {
  return safeText(value, 160).toLowerCase();
}

function conversationKey(email) {
  return `${MESSAGE_PREFIX}/${encodeURIComponent(email)}.json`;
}

function isAuthorizedAdmin(request) {
  return Boolean(verifyAdminRequest(request));
}

function customerKey(email) {
  return `customers/${encodeURIComponent(email)}.json`;
}

function verifyPassword(password, savedHash = "") {
  const [salt, hash] = String(savedHash).split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(String(password), salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function authenticateCustomer(store, email, password) {
  const normalizedEmail = normalizeEmail(email);
  const customer = await store.get(customerKey(normalizedEmail), { type: "json" });
  if (!customer || !verifyPassword(password, customer.passwordHash)) return null;
  return customer;
}

function blankConversation(email = "", name = "") {
  return {
    email,
    name: safeText(name, 100),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    customerUnread: 0,
    adminUnread: 0,
    messages: []
  };
}

function normalizeConversation(value, email = "") {
  const source = value && typeof value === "object" ? value : {};
  const messages = Array.isArray(source.messages) ? source.messages : [];
  return {
    email: normalizeEmail(source.email || email),
    name: safeText(source.name, 100),
    createdAt: source.createdAt || new Date().toISOString(),
    updatedAt: source.updatedAt || source.createdAt || new Date().toISOString(),
    customerUnread: Math.max(0, Number(source.customerUnread || 0)),
    adminUnread: Math.max(0, Number(source.adminUnread || 0)),
    messages: messages.slice(-MAX_MESSAGES_PER_CONVERSATION).map((message) => ({
      id: safeText(message?.id, 80) || randomUUID(),
      sender: message?.sender === "chey" ? "chey" : "customer",
      body: safeText(message?.body, MAX_MESSAGE_LENGTH),
      createdAt: message?.createdAt || new Date().toISOString(),
      readAt: message?.readAt || ""
    })).filter((message) => message.body)
  };
}

function publicConversation(conversation) {
  const normalized = normalizeConversation(conversation);
  return {
    ...normalized,
    messages: normalized.messages
  };
}

function conversationSummary(conversation) {
  const normalized = normalizeConversation(conversation);
  const lastMessage = normalized.messages[normalized.messages.length - 1] || null;
  return {
    email: normalized.email,
    name: normalized.name || normalized.email.split("@")[0],
    updatedAt: normalized.updatedAt,
    customerUnread: normalized.customerUnread,
    adminUnread: normalized.adminUnread,
    messageCount: normalized.messages.length,
    lastMessage: lastMessage ? {
      sender: lastMessage.sender,
      body: lastMessage.body,
      createdAt: lastMessage.createdAt
    } : null
  };
}

async function readConversation(store, email, fallbackName = "") {
  const saved = await store.get(conversationKey(email), { type: "json" });
  return normalizeConversation(saved || blankConversation(email, fallbackName), email);
}

async function saveConversation(store, conversation) {
  await store.setJSON(conversationKey(conversation.email), normalizeConversation(conversation));
}

async function readPayload(request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid message request.");
  }
}

async function listConversations(store) {
  const listing = await store.list({ prefix: `${MESSAGE_PREFIX}/` });
  const summaries = [];
  for (const entry of (listing.blobs || []).slice(0, MAX_CONVERSATIONS)) {
    const conversation = await store.get(entry.key, { type: "json" });
    if (conversation) summaries.push(conversationSummary(conversation));
  }
  return summaries.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
}

function appendMessage(conversation, sender, body) {
  const cleanBody = safeText(body, MAX_MESSAGE_LENGTH);
  if (!cleanBody) throw new Error("Write a message before sending.");
  const now = new Date().toISOString();
  conversation.messages.push({
    id: randomUUID(),
    sender,
    body: cleanBody,
    createdAt: now,
    readAt: ""
  });
  conversation.messages = conversation.messages.slice(-MAX_MESSAGES_PER_CONVERSATION);
  conversation.updatedAt = now;
  if (sender === "chey") conversation.customerUnread += 1;
  else conversation.adminUnread += 1;
}

export default async (request) => {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const admin = isAuthorizedAdmin(request);

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  let payload;
  try {
    payload = await readPayload(request);
  } catch (error) {
    return jsonResponse({ error: error.message }, { status: 400 });
  }

  const action = safeText(payload?.action, 40);
  const email = normalizeEmail(payload?.email);

  if (admin) {
    if (action === "list") {
      return jsonResponse({ ok: true, conversations: await listConversations(store) });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "A valid customer email is required." }, { status: 400 });
    }
    const conversation = await readConversation(store, email, payload?.name);
    if (action === "mark-read") {
      conversation.adminUnread = 0;
      conversation.messages = conversation.messages.map((message) => message.sender === "customer" && !message.readAt
        ? { ...message, readAt: new Date().toISOString() }
        : message);
      await saveConversation(store, conversation);
      return jsonResponse({ ok: true, conversation: publicConversation(conversation) });
    }
    if (action === "send") {
      appendMessage(conversation, "chey", payload?.body);
      await saveConversation(store, conversation);
      return jsonResponse({ ok: true, conversation: publicConversation(conversation) });
    }
    if (action === "get") return jsonResponse({ ok: true, conversation: publicConversation(conversation) });
    return jsonResponse({ error: "Unknown message action." }, { status: 400 });
  }

  const customer = await authenticateCustomer(store, email, String(payload?.password || ""));
  if (!customer) return jsonResponse({ error: "Sign in to access messages." }, { status: 401 });

  const conversation = await readConversation(store, email, customer.name);
  conversation.name = safeText(customer.name || conversation.name, 100);
  if (action === "mark-read") {
    conversation.customerUnread = 0;
    conversation.messages = conversation.messages.map((message) => message.sender === "chey" && !message.readAt
      ? { ...message, readAt: new Date().toISOString() }
      : message);
    await saveConversation(store, conversation);
    return jsonResponse({ ok: true, conversation: publicConversation(conversation) });
  }
  if (action === "send") {
    appendMessage(conversation, "customer", payload?.body);
    await saveConversation(store, conversation);
    return jsonResponse({ ok: true, conversation: publicConversation(conversation) });
  }
  if (action === "get") return jsonResponse({ ok: true, conversation: publicConversation(conversation) });
  return jsonResponse({ error: "Unknown message action." }, { status: 400 });
};
