import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";
import { verifyAdminCapability, verifyAdminRequest } from "./_shared/admin-auth.mjs";

const STORE_NAME = "pressed-by-chey";
const MESSAGE_PREFIX = "messages";
const PRESENCE_PREFIX = "presence";
const PRESENCE_TTL_MS = 45_000;
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

function presenceKey(role, email = "") {
  return role === "chey"
    ? `${PRESENCE_PREFIX}/chey.json`
    : `${PRESENCE_PREFIX}/customers/${encodeURIComponent(email)}.json`;
}

async function touchPresence(store, role, email = "") {
  const lastSeen = Date.now();
  await store.setJSON(presenceKey(role, email), { lastSeen });
  return { online: true, lastSeen: new Date(lastSeen).toISOString() };
}

async function readPresence(store, role, email = "") {
  const value = await store.get(presenceKey(role, email), { type: "json" });
  const lastSeen = Number(value?.lastSeen || 0);
  return {
    online: lastSeen > Date.now() - PRESENCE_TTL_MS,
    lastSeen: lastSeen ? new Date(lastSeen).toISOString() : ""
  };
}

async function presencePayload(store, email = "") {
  const [chey, customer] = await Promise.all([
    readPresence(store, "chey"),
    email ? readPresence(store, "customer", email) : Promise.resolve({ online: false, lastSeen: "" })
  ]);
  return {
    cheyOnline: chey.online,
    cheyLastSeen: chey.lastSeen,
    customerOnline: customer.online,
    customerLastSeen: customer.lastSeen
  };
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

async function conversationResponse(store, conversation) {
  return {
    ok: true,
    conversation: {
      ...publicConversation(conversation),
      presence: await presencePayload(store, conversation.email)
    }
  };
}

async function conversationSummary(store, conversation) {
  const normalized = normalizeConversation(conversation);
  const lastMessage = normalized.messages[normalized.messages.length - 1] || null;
  const customerPresence = await readPresence(store, "customer", normalized.email);
  return {
    email: normalized.email,
    name: normalized.name || normalized.email.split("@")[0],
    updatedAt: normalized.updatedAt,
    customerUnread: normalized.customerUnread,
    adminUnread: normalized.adminUnread,
    customerOnline: customerPresence.online,
    customerLastSeen: customerPresence.lastSeen,
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
    if (conversation) summaries.push(await conversationSummary(store, conversation));
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

function removeMessage(conversation, messageId, sender) {
  const index = conversation.messages.findIndex((message) => message.id === messageId);
  if (index < 0) throw new Error("Message not found.");
  if (conversation.messages[index].sender !== sender) throw new Error("You can only undo your own messages.");
  conversation.messages.splice(index, 1);
  conversation.customerUnread = conversation.messages.filter((message) => message.sender === "chey" && !message.readAt).length;
  conversation.adminUnread = conversation.messages.filter((message) => message.sender === "customer" && !message.readAt).length;
  conversation.updatedAt = new Date().toISOString();
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
    if (action === "presence") {
      await touchPresence(store, "chey");
      return jsonResponse({ ok: true, presence: await presencePayload(store, email) });
    }
    if (action === "list") {
      return jsonResponse({ ok: true, conversations: await listConversations(store) });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "A valid customer email is required." }, { status: 400 });
    }
    const conversation = await readConversation(store, email, payload?.name);
    if (action === "delete-conversation") {
      const deleteSession = await verifyAdminCapability(request, "delete");
      if (!deleteSession?.canDelete) {
        return jsonResponse({ error: "Only Chey or an admin granted delete access can delete conversations." }, { status: 403 });
      }
      await store.delete(conversationKey(email));
      return jsonResponse({ ok: true, deleted: true, email });
    }
    if (action === "delete-message") {
      try {
        removeMessage(conversation, safeText(payload?.messageId, 80), "chey");
      } catch (error) {
        return jsonResponse({ error: error.message }, { status: error.message === "Message not found." ? 404 : 403 });
      }
      await saveConversation(store, conversation);
      return jsonResponse(await conversationResponse(store, conversation));
    }
    if (action === "mark-read") {
      conversation.adminUnread = 0;
      conversation.messages = conversation.messages.map((message) => message.sender === "customer" && !message.readAt
        ? { ...message, readAt: new Date().toISOString() }
        : message);
      await saveConversation(store, conversation);
      return jsonResponse(await conversationResponse(store, conversation));
    }
    if (action === "send") {
      appendMessage(conversation, "chey", payload?.body);
      await saveConversation(store, conversation);
      return jsonResponse(await conversationResponse(store, conversation));
    }
    if (action === "get") return jsonResponse(await conversationResponse(store, conversation));
    return jsonResponse({ error: "Unknown message action." }, { status: 400 });
  }

  const customer = await authenticateCustomer(store, email, String(payload?.password || ""));
  if (!customer) return jsonResponse({ error: "Sign in to access messages." }, { status: 401 });

  if (action === "presence") {
    await touchPresence(store, "customer", email);
    return jsonResponse({ ok: true, presence: await presencePayload(store, email) });
  }

  const conversation = await readConversation(store, email, customer.name);
  conversation.name = safeText(customer.name || conversation.name, 100);
  if (action === "delete-conversation") {
    await store.delete(conversationKey(email));
    return jsonResponse({ ok: true, deleted: true, email });
  }
  if (action === "delete-message") {
    try {
      removeMessage(conversation, safeText(payload?.messageId, 80), "customer");
    } catch (error) {
      return jsonResponse({ error: error.message }, { status: error.message === "Message not found." ? 404 : 403 });
    }
    await saveConversation(store, conversation);
    return jsonResponse(await conversationResponse(store, conversation));
  }
  if (action === "mark-read") {
    conversation.customerUnread = 0;
    conversation.messages = conversation.messages.map((message) => message.sender === "chey" && !message.readAt
      ? { ...message, readAt: new Date().toISOString() }
      : message);
    await saveConversation(store, conversation);
    return jsonResponse(await conversationResponse(store, conversation));
  }
  if (action === "send") {
    appendMessage(conversation, "customer", payload?.body);
    await saveConversation(store, conversation);
    return jsonResponse(await conversationResponse(store, conversation));
  }
  if (action === "get") return jsonResponse(await conversationResponse(store, conversation));
  return jsonResponse({ error: "Unknown message action." }, { status: 400 });
};
