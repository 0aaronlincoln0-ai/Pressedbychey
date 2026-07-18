import { createHmac, randomBytes, randomInt, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const envPath = resolve(root, ".env");
const snapshotPath = resolve(root, "local-production-state.json");
const workingStatePath = resolve(root, "local-working-state.json");
const ordersPath = resolve(root, "local-orders.json");
const customersPath = resolve(root, "local-customers.json");
const messagesPath = resolve(root, "local-messages.json");
const checkoutSessionsPath = resolve(root, "local-checkout-sessions.json");
const uploadDirectory = resolve(root, ".local-admin-uploads");
const port = Number(process.env.PORT || 8888);
const maxBodyBytes = 12 * 1024 * 1024;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function parseEnv(source = "") {
  return Object.fromEntries(
    source.split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      })
  );
}

const localEnv = parseEnv(await readFile(envPath, "utf8"));
const adminPassword = localEnv.CHEY_ADMIN_PASSWORD || "";
const secondaryAdminPassword = localEnv.CHEY_SECONDARY_ADMIN_PASSWORD || adminPassword;
const sessionSecret = localEnv.CHEY_ADMIN_SESSION_SECRET || "";
const adminEmails = String(localEnv.CHEY_ADMIN_EMAILS || "")
  .split(",")
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean);

if (adminPassword.length < 12 || secondaryAdminPassword.length < 12 || sessionSecret.length < 32 || !adminEmails.length) {
  throw new Error("Local Admin credentials are not configured securely in .env.");
}

function safeEqual(leftValue, rightValue) {
  const left = Buffer.from(String(leftValue || ""));
  const right = Buffer.from(String(rightValue || ""));
  return left.length === right.length && timingSafeEqual(left, right);
}

function safeText(value, maxLength = 240) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeEmail(value = "") {
  return safeText(value, 160).toLowerCase();
}

function validEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

function blankHandSizes() {
  return { thumb: "", index: "", middle: "", ring: "", pinky: "" };
}

function normalizeSizes(sizes = {}) {
  const source = sizes && typeof sizes === "object" ? sizes : {};
  const normalized = { left: blankHandSizes(), right: blankHandSizes() };
  for (const hand of ["left", "right"]) {
    const handSource = source[hand] && typeof source[hand] === "object" ? source[hand] : {};
    for (const finger of Object.keys(normalized[hand])) {
      normalized[hand][finger] = safeText(handSource[finger], 20);
    }
  }
  return normalized;
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, savedHash = "") {
  const [salt, hash] = String(savedHash).split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(String(password), salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function readJsonFile(path, fallback) {
  try {
    const value = JSON.parse(await readFile(path, "utf8"));
    return value && typeof value === "object" ? value : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

async function writeJsonFile(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function ownerRecord(email) {
  const names = {
    "callison@pressedbychey.com": "Callison Chey",
    "0aaronlincoln0@gmail.com": "Aaron Lincoln"
  };
  return {
    name: names[email] || email,
    email,
    accountStatus: "active",
    adminRole: "owner",
    isAdmin: true,
    canDelete: true,
    adminNote: "Permanent local owner account.",
    sizes: normalizeSizes(),
    savedProducts: [],
    orders: [],
    createdAt: "",
    lastLogin: "",
    updatedAt: ""
  };
}

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function issueToken(email) {
  const now = Math.floor(Date.now() / 1000);
  const payload = encode(JSON.stringify({
    v: 1,
    sub: email,
    role: "admin",
    iat: now,
    exp: now + (2 * 60 * 60)
  }));
  const signature = createHmac("sha256", sessionSecret).update(payload).digest("base64url");
  return {
    token: `${payload}.${signature}`,
    expiresAt: (now + (2 * 60 * 60)) * 1000,
    email,
    adminRole: "owner",
    canDelete: true
  };
}

function verifyToken(request) {
  const match = String(request.headers.authorization || "").match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  const [payload, suppliedSignature, ...extra] = match[1].split(".");
  if (!payload || !suppliedSignature || extra.length) return null;
  const expectedSignature = createHmac("sha256", sessionSecret).update(payload).digest("base64url");
  if (!safeEqual(suppliedSignature, expectedSignature)) return null;
  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return decoded?.exp > Math.floor(Date.now() / 1000) ? decoded : null;
  } catch {
    return null;
  }
}

function json(response, status, body) {
  response.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodyBytes) throw new Error("Request is too large.");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

async function readWorkingState() {
  try {
    return JSON.parse(await readFile(workingStatePath, "utf8"));
  } catch {
    const snapshot = JSON.parse(await readFile(snapshotPath, "utf8"));
    await writeFile(workingStatePath, `${JSON.stringify(snapshot.state, null, 2)}\n`, "utf8");
    return snapshot.state;
  }
}

function withoutPrivateCatalogFields(value = {}) {
  const {
    notes: _notes,
    sku: _sku,
    productNumber: _productNumber,
    ...publicValue
  } = value && typeof value === "object" ? value : {};
  return publicValue;
}

function publicState(state = {}) {
  const {
    accountingExpenses: _accountingExpenses,
    ...safeState
  } = state;
  return {
    ...safeState,
    customProducts: (safeState.customProducts || []).map(withoutPrivateCatalogFields),
    lookDetails: Object.fromEntries(
      Object.entries(safeState.lookDetails || {}).map(([key, value]) => [
        key,
        withoutPrivateCatalogFields(value)
      ])
    ),
    ideas: [],
    proNotes: []
  };
}

async function handleAdminAuth(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "Method not allowed" });
  const payload = await readBody(request);
  const email = String(payload.email || "").trim().toLowerCase();
  const expectedPassword = email === "0aaronlincoln0@gmail.com" ? secondaryAdminPassword : adminPassword;
  if (!adminEmails.includes(email) || !safeEqual(payload.password, expectedPassword)) {
    return json(response, 401, { error: "Invalid local Admin email or password." });
  }
  return json(response, 200, { ok: true, session: issueToken(email) });
}

async function handlePhotoUpload(request, response) {
  if (!verifyToken(request)) return json(response, 401, { error: "Unauthorized" });
  const payload = await readBody(request);
  const match = String(payload.dataUrl || "").match(/^data:image\/(png|jpeg|webp|gif);base64,([A-Za-z0-9+/=]+)$/i);
  if (!match) return json(response, 400, { error: "Unsupported photo format." });
  const extension = match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 8 * 1024 * 1024) {
    return json(response, 400, { error: "Photo must be smaller than 8 MB." });
  }
  await mkdir(uploadDirectory, { recursive: true });
  const name = `${String(payload.kind || "photo").replace(/[^a-z0-9-]/gi, "-").slice(0, 40)}-${randomUUID()}.${extension}`;
  await writeFile(resolve(uploadDirectory, name), bytes);
  return json(response, 200, {
    ok: true,
    photo: {
      key: name,
      url: `/.local-admin-uploads/${name}`,
      contentType: `image/${match[1].toLowerCase()}`,
      size: bytes.length
    }
  });
}

async function handleAdminState(request, response, url) {
  if (request.method === "POST" && url.searchParams.get("photo") === "upload") {
    return handlePhotoUpload(request, response);
  }
  if (request.method === "GET") {
    const state = await readWorkingState();
    return json(response, 200, {
      state: verifyToken(request) ? state : publicState(state),
      local: true
    });
  }
  if (request.method === "PUT") {
    if (!verifyToken(request)) return json(response, 401, { error: "Unauthorized" });
    const payload = await readBody(request);
    if (!payload.state || typeof payload.state !== "object") {
      return json(response, 400, { error: "State payload is required." });
    }
    await writeFile(workingStatePath, `${JSON.stringify(payload.state, null, 2)}\n`, "utf8");
    return json(response, 200, { ok: true, state: payload.state, local: true });
  }
  return json(response, 405, { error: "Method not allowed" });
}

function publicOrder(order = {}) {
  return {
    id: order.id || "",
    status: order.status || "",
    paymentStatus: order.paymentStatus || "",
    fulfillmentStatus: order.fulfillmentStatus || (order.paymentStatus === "paid" ? "Needs review" : "Payment pending"),
    createdAt: order.createdAt || "",
    updatedAt: order.updatedAt || order.createdAt || "",
    paidAt: order.paidAt || "",
    customer: order.customer || {},
    customerEmail: order.customerEmail || order.customer?.email || "",
    customerName: order.customerName || order.customer?.name || "",
    customerPhone: order.customerPhone || order.customer?.phone || "",
    shipping: order.shipping || {},
    items: Array.isArray(order.items) ? order.items : [],
    total: Number(order.total || order.amountTotal || 0),
    currency: order.currency || "usd",
    stripeSessionId: order.stripeSessionId || "",
    adminNote: order.adminNote || "",
    quoteAmount: Number(order.quoteAmount || 0),
    quoteStatus: order.quoteStatus || "",
    quoteMessage: order.quoteMessage || "",
    quoteUpdatedAt: order.quoteUpdatedAt || "",
    quoteAcceptedAt: order.quoteAcceptedAt || "",
    localSimulation: order.localSimulation === true
  };
}

async function readOrders() {
  return readJsonFile(ordersPath, {});
}

async function saveOrder(order) {
  const orders = await readOrders();
  orders[order.id] = order;
  await writeJsonFile(ordersPath, orders);
  return order;
}

function safeOrderId(value = "") {
  const id = safeText(value, 120);
  return /^pbc-\d+-[a-z0-9-]+$/i.test(id) ? id : "";
}

function customerOrders(email, orders = {}) {
  return Object.values(orders)
    .filter((order) => normalizeEmail(order?.customer?.email || order?.customerEmail) === email)
    .map(publicOrder)
    .sort((left, right) => String(right.updatedAt || right.createdAt).localeCompare(String(left.updatedAt || left.createdAt)));
}

function mergeOrders(saved = [], live = []) {
  const seen = new Set();
  return [...live, ...(Array.isArray(saved) ? saved : [])].filter((order) => {
    const id = safeText(order?.id, 120);
    if (id && seen.has(id)) return false;
    if (id) seen.add(id);
    return true;
  }).slice(0, 75);
}

function publicCustomer(customer = {}, orders = {}, detailed = true) {
  const email = normalizeEmail(customer.email);
  const teamRole = adminEmails.includes(email) ? "owner" : safeText(customer.adminRole, 30).toLowerCase();
  const base = {
    name: safeText(customer.name, 100),
    email,
    accountStatus: adminEmails.includes(email) ? "active" : safeText(customer.accountStatus || "active", 20).toLowerCase(),
    adminRole: teamRole,
    isAdmin: Boolean(teamRole),
    canDelete: adminEmails.includes(email) || (teamRole === "admin" && customer.canDelete === true),
    adminNote: safeText(customer.adminNote, 1200),
    sizes: normalizeSizes(customer.sizes),
    savedProductCount: Array.isArray(customer.savedProducts) ? customer.savedProducts.length : 0,
    orderCount: mergeOrders(customer.orders, customerOrders(email, orders)).length,
    createdAt: customer.createdAt || "",
    lastLogin: customer.lastLogin || "",
    updatedAt: customer.updatedAt || ""
  };
  if (!detailed) return base;
  return {
    ...base,
    savedProducts: Array.isArray(customer.savedProducts) ? customer.savedProducts.slice(0, 50) : [],
    orders: mergeOrders(customer.orders, customerOrders(email, orders))
  };
}

async function handleAdminOrders(request, response, url) {
  const admin = verifyToken(request);
  if (!admin) return json(response, 401, { error: "Unauthorized" });
  const orders = await readOrders();
  if (request.method === "GET") {
    const records = Object.values(orders)
      .map(publicOrder)
      .sort((left, right) => String(right.updatedAt || right.createdAt).localeCompare(String(left.updatedAt || left.createdAt)));
    return json(response, 200, { ok: true, orders: records, local: true });
  }
  if (request.method === "PUT") {
    const payload = await readBody(request);
    const orderId = safeOrderId(payload.orderId);
    if (!orderId) return json(response, 400, { error: "Valid order ID is required." });
    const savedOrder = orders[orderId];
    if (!savedOrder) return json(response, 404, { error: "Order not found." });
    const allowedFulfillment = ["Payment pending", "Needs review", "Needs making", "Making", "Packing", "Ready to ship", "Shipped", "Completed", "Canceled"];
    const fulfillmentStatus = allowedFulfillment.includes(payload.fulfillmentStatus)
      ? payload.fulfillmentStatus
      : savedOrder.fulfillmentStatus || "Needs review";
    const amount = Number(String(payload.quoteAmount ?? "").replace(/[^0-9.]/g, ""));
    const quoteAmount = payload.quoteAmount === undefined
      ? Number(savedOrder.quoteAmount || 0)
      : Math.max(0, Math.round((Number.isFinite(amount) ? amount : 0) * 100));
    const quoteStatuses = ["Needs quote", "Quoted", "Accepted", "Paid", "Declined", "Canceled"];
    const nextOrder = {
      ...savedOrder,
      fulfillmentStatus,
      adminNote: safeText(payload.adminNote ?? savedOrder.adminNote, 600),
      updatedAt: new Date().toISOString()
    };
    const isQuote = savedOrder.status?.startsWith("quote_")
      || savedOrder.items?.some((item) => item?.customOrder)
      || quoteAmount > 0
      || savedOrder.quoteStatus;
    if (isQuote) {
      nextOrder.quoteAmount = quoteAmount;
      nextOrder.quoteStatus = quoteStatuses.includes(payload.quoteStatus)
        ? payload.quoteStatus
        : savedOrder.quoteStatus || (quoteAmount ? "Quoted" : "Needs quote");
      nextOrder.quoteMessage = safeText(payload.quoteMessage ?? savedOrder.quoteMessage, 900);
      nextOrder.quoteUpdatedAt = nextOrder.updatedAt;
      if (quoteAmount > 0 && nextOrder.paymentStatus !== "paid") {
        nextOrder.paymentStatus = "unpaid";
        nextOrder.status = "quote_sent";
        if (nextOrder.fulfillmentStatus === "Needs review") nextOrder.fulfillmentStatus = "Payment pending";
      }
    }
    orders[orderId] = nextOrder;
    await writeJsonFile(ordersPath, orders);
    return json(response, 200, { ok: true, order: publicOrder(nextOrder), local: true });
  }
  if (request.method === "DELETE") {
    const orderId = safeOrderId(url.searchParams.get("orderId"));
    if (!orderId) return json(response, 400, { error: "Valid order ID is required." });
    const savedOrder = orders[orderId];
    if (!savedOrder) return json(response, 404, { error: "Order not found." });
    if (savedOrder.paymentStatus === "paid" || savedOrder.paidAt) {
      return json(response, 409, { error: "Paid transactions cannot be deleted. Mark the order canceled or completed instead." });
    }
    delete orders[orderId];
    await writeJsonFile(ordersPath, orders);
    return json(response, 200, { ok: true, deleted: orderId, local: true });
  }
  return json(response, 405, { error: "Method not allowed" });
}

async function handleCustomerAccount(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "Method not allowed" });
  const payload = await readBody(request);
  const action = safeText(payload.action, 40);
  const email = normalizeEmail(payload.email);
  if (!validEmail(email)) return json(response, 400, { error: "Enter a valid email address." });
  const customers = await readJsonFile(customersPath, {});
  const orders = await readOrders();
  const savedCustomer = customers[email];

  if (action === "request-reset") {
    if (!savedCustomer) {
      return json(response, 200, { ok: true, message: "If that email has a local customer account, a reset passcode is available." });
    }
    const code = String(randomInt(100000, 1000000));
    savedCustomer.localReset = {
      codeHash: hashPassword(code),
      expiresAt: Date.now() + (15 * 60 * 1000),
      attempts: 0
    };
    await writeJsonFile(customersPath, customers);
    return json(response, 200, {
      ok: true,
      message: `Local testing only: use reset code ${code}. No email was sent.`,
      local: true
    });
  }

  if (action === "confirm-reset") {
    const code = safeText(payload.code, 12);
    const newPassword = String(payload.newPassword || "");
    if (!savedCustomer?.localReset || Date.now() > Number(savedCustomer.localReset.expiresAt || 0)) {
      return json(response, 400, { error: "That local reset code is invalid or expired." });
    }
    if (!verifyPassword(code, savedCustomer.localReset.codeHash)) {
      savedCustomer.localReset.attempts = Number(savedCustomer.localReset.attempts || 0) + 1;
      await writeJsonFile(customersPath, customers);
      return json(response, 400, { error: "That reset code does not match." });
    }
    if (newPassword.length < 8) return json(response, 400, { error: "Use at least 8 characters for the new password." });
    savedCustomer.passwordHash = hashPassword(newPassword);
    delete savedCustomer.localReset;
    savedCustomer.lastLogin = new Date().toISOString();
    savedCustomer.updatedAt = savedCustomer.lastLogin;
    await writeJsonFile(customersPath, customers);
    return json(response, 200, { ok: true, customer: publicCustomer(savedCustomer, orders), local: true });
  }

  const password = String(payload.password || "");
  if (action === "register") {
    if (password.length < 8) return json(response, 400, { error: "Use at least 8 characters for the account password." });
    if (savedCustomer) return json(response, 409, { error: "That email already has an account. Sign in instead." });
    const now = new Date().toISOString();
    const customer = {
      name: safeText(payload.name || email.split("@")[0], 100),
      email,
      passwordHash: hashPassword(password),
      sizes: normalizeSizes(payload.sizes),
      savedProducts: [],
      orders: [],
      accountStatus: "active",
      adminRole: "",
      isAdmin: false,
      canDelete: false,
      createdAt: now,
      lastLogin: now,
      updatedAt: now
    };
    customers[email] = customer;
    await writeJsonFile(customersPath, customers);
    return json(response, 200, { ok: true, customer: publicCustomer(customer, orders), local: true });
  }

  if (!savedCustomer || !verifyPassword(password, savedCustomer.passwordHash)) {
    return json(response, 401, { error: "Email or password is incorrect." });
  }
  if (["paused", "blocked"].includes(savedCustomer.accountStatus)) {
    return json(response, 403, { error: "This customer account is temporarily unavailable. Please contact Chey for help." });
  }
  if (action === "login") {
    savedCustomer.lastLogin = new Date().toISOString();
    await writeJsonFile(customersPath, customers);
  } else if (action === "save-profile") {
    savedCustomer.name = safeText(payload.name || savedCustomer.name, 100);
    savedCustomer.sizes = normalizeSizes(payload.sizes || savedCustomer.sizes);
    savedCustomer.savedProducts = Array.isArray(payload.savedProducts)
      ? payload.savedProducts.slice(0, 50)
      : savedCustomer.savedProducts || [];
    savedCustomer.updatedAt = new Date().toISOString();
    await writeJsonFile(customersPath, customers);
  } else if (action !== "refresh-profile") {
    return json(response, 400, { error: "Unknown account action." });
  }
  return json(response, 200, { ok: true, customer: publicCustomer(savedCustomer, orders), local: true });
}

async function handleCustomerAdmin(request, response) {
  const session = verifyToken(request);
  if (!session) return json(response, 401, { error: "Unauthorized" });
  if (request.method !== "POST") return json(response, 405, { error: "Method not allowed" });
  const payload = await readBody(request);
  const action = safeText(payload.action, 40);
  const customers = await readJsonFile(customersPath, {});
  const orders = await readOrders();

  if (action === "list") {
    const search = safeText(payload.search, 160).toLowerCase();
    const status = safeText(payload.status || "all", 20).toLowerCase();
    const records = Object.values(customers);
    if (payload.teamOnly) {
      for (const email of adminEmails) {
        if (!records.some((customer) => normalizeEmail(customer.email) === email)) records.push(ownerRecord(email));
      }
    }
    const matches = records.map((customer) => publicCustomer(customer, orders, false)).filter((customer) => {
      if (Boolean(payload.teamOnly) !== Boolean(customer.adminRole)) return false;
      if (search && !`${customer.name} ${customer.email}`.toLowerCase().includes(search)) return false;
      return status === "all" || customer.accountStatus === status;
    }).sort((left, right) => String(right.lastLogin || right.createdAt).localeCompare(String(left.lastLogin || left.createdAt)));
    const pageSize = Math.min(Math.max(Number(payload.pageSize) || 25, 1), 100);
    const page = Math.max(Number(payload.page) || 1, 1);
    return json(response, 200, {
      ok: true,
      customers: matches.slice((page - 1) * pageSize, page * pageSize),
      total: matches.length,
      page,
      pageSize,
      pageCount: Math.max(1, Math.ceil(matches.length / pageSize)),
      local: true
    });
  }

  const email = normalizeEmail(payload.email);
  if (!validEmail(email)) return json(response, 400, { error: "A valid customer email is required." });
  let customer = customers[email];
  if (!customer && adminEmails.includes(email)) customer = ownerRecord(email);
  if (!customer) return json(response, 404, { error: "Customer account not found." });
  if (action === "get") return json(response, 200, { ok: true, customer: publicCustomer(customer, orders), local: true });
  if (action !== "update") return json(response, 400, { error: "Unknown customer admin action." });

  const protectedOwner = adminEmails.includes(email);
  const allowedRoles = ["", "admin", "accountant", "employee"];
  const requestedRole = allowedRoles.includes(safeText(payload.adminRole, 30).toLowerCase())
    ? safeText(payload.adminRole, 30).toLowerCase()
    : safeText(customer.adminRole, 30).toLowerCase();
  customer = {
    ...customer,
    name: safeText(payload.name || customer.name, 100),
    sizes: normalizeSizes(payload.sizes || customer.sizes),
    accountStatus: protectedOwner ? "active" : (["active", "paused", "blocked"].includes(payload.accountStatus) ? payload.accountStatus : customer.accountStatus || "active"),
    adminRole: protectedOwner ? "owner" : requestedRole,
    isAdmin: protectedOwner || Boolean(requestedRole),
    canDelete: protectedOwner || (requestedRole === "admin" && payload.canDelete === true),
    adminNote: safeText(payload.adminNote, 1200),
    updatedAt: new Date().toISOString()
  };
  if (!protectedOwner || customers[email]) {
    customers[email] = customer;
    await writeJsonFile(customersPath, customers);
  }
  return json(response, 200, { ok: true, customer: publicCustomer(customer, orders), local: true });
}

function imageExtension(mimeType) {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  return "jpg";
}

async function saveCustomPhoto(value = "") {
  const match = String(value || "").trim().match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\s]+)$/i);
  if (!match) return String(value || "").startsWith("/.netlify/functions/custom-request?photo=") ? String(value) : "";
  const bytes = Buffer.from(match[2].replace(/\s/g, ""), "base64");
  if (!bytes.length || bytes.length > 5 * 1024 * 1024) return "";
  await mkdir(uploadDirectory, { recursive: true });
  const name = `custom-request-${Date.now()}-${randomUUID()}.${imageExtension(match[1].toLowerCase())}`;
  await writeFile(resolve(uploadDirectory, name), bytes);
  return `/.local-admin-uploads/${name}`;
}

async function handleCustomRequest(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "Method not allowed" });
  const payload = await readBody(request);
  if (safeText(payload.action, 40) === "upload-photo") {
    const image = await saveCustomPhoto(payload.image);
    if (!image) return json(response, 400, { error: "The reference photo could not be saved. Try a JPG or PNG image." });
    return json(response, 200, { ok: true, image, local: true });
  }
  const customer = payload.customer || {};
  const email = normalizeEmail(customer.email);
  if (!validEmail(email)) return json(response, 400, { error: "A customer email is required for Chey to follow up." });
  const sourceItems = Array.isArray(payload.items) ? payload.items.slice(0, 8) : [];
  if (!sourceItems.length) return json(response, 400, { error: "Add a custom request before submitting." });
  const items = [];
  for (const item of sourceItems) {
    items.push({
      name: safeText(item.name || "Custom request", 120),
      quantity: Math.max(1, Math.min(10, Number(item.quantity) || 1)),
      unitAmount: 0,
      customOrder: true,
      category: safeText(item.category || item.shape || "custom request", 80),
      shape: safeText(item.shape, 80),
      length: safeText(item.length, 80),
      sizePreference: safeText(item.sizePreference, 120),
      note: safeText(item.note, 900),
      image: await saveCustomPhoto(item.image)
    });
  }
  const now = new Date().toISOString();
  const order = {
    id: `pbc-${Date.now()}-${randomUUID().slice(0, 8)}`,
    status: "quote_request",
    paymentStatus: "quote_pending",
    fulfillmentStatus: "Needs review",
    createdAt: now,
    updatedAt: now,
    customer: {
      mode: safeText(customer.mode || payload.source || "account", 20),
      name: safeText(customer.name || "Customer", 100),
      email,
      phone: safeText(customer.phone, 40),
      sizing: safeText(customer.sizing, 700),
      notes: safeText(customer.notes, 700)
    },
    items,
    total: 0,
    currency: "usd",
    quoteAmount: 0,
    quoteStatus: "Needs quote",
    quoteMessage: "",
    localSimulation: true
  };
  await saveOrder(order);
  return json(response, 200, { ok: true, order: publicOrder(order), local: true });
}

const localPresence = {
  chey: 0,
  customers: new Map()
};

function blankConversation(email = "", name = "") {
  const now = new Date().toISOString();
  return {
    email,
    name: safeText(name, 100),
    createdAt: now,
    updatedAt: now,
    customerUnread: 0,
    adminUnread: 0,
    messages: []
  };
}

function normalizeConversation(value = {}, email = "") {
  const source = value && typeof value === "object" ? value : {};
  return {
    email: normalizeEmail(source.email || email),
    name: safeText(source.name, 100),
    createdAt: source.createdAt || new Date().toISOString(),
    updatedAt: source.updatedAt || source.createdAt || new Date().toISOString(),
    customerUnread: Math.max(0, Number(source.customerUnread || 0)),
    adminUnread: Math.max(0, Number(source.adminUnread || 0)),
    messages: (Array.isArray(source.messages) ? source.messages : []).slice(-300).map((message) => ({
      id: safeText(message.id, 80) || randomUUID(),
      sender: message.sender === "chey" ? "chey" : "customer",
      body: safeText(message.body, 2400),
      createdAt: message.createdAt || new Date().toISOString(),
      readAt: message.readAt || "",
      kind: message.kind === "quote" ? "quote" : "text",
      orderId: safeText(message.orderId, 120),
      quoteAmount: Math.max(0, Math.round(Number(message.quoteAmount || 0))),
      quoteCurrency: safeText(message.quoteCurrency || "usd", 12).toLowerCase(),
      quoteStatus: safeText(message.quoteStatus, 20),
      acceptedAt: message.acceptedAt || ""
    })).filter((message) => message.body)
  };
}

function presencePayload(email = "") {
  const threshold = Date.now() - 45_000;
  const customerLastSeen = Number(localPresence.customers.get(email) || 0);
  return {
    cheyOnline: localPresence.chey > threshold,
    cheyLastSeen: localPresence.chey ? new Date(localPresence.chey).toISOString() : "",
    customerOnline: customerLastSeen > threshold,
    customerLastSeen: customerLastSeen ? new Date(customerLastSeen).toISOString() : ""
  };
}

function conversationResponse(conversation) {
  return {
    ok: true,
    conversation: {
      ...normalizeConversation(conversation),
      presence: presencePayload(conversation.email)
    },
    local: true
  };
}

function appendMessage(conversation, sender, body, quote = null) {
  const cleanBody = safeText(body, 2400);
  if (!cleanBody) throw new Error("Write a message before sending.");
  const now = new Date().toISOString();
  conversation.messages.push({
    id: randomUUID(),
    sender,
    body: cleanBody,
    createdAt: now,
    readAt: "",
    ...(quote || {})
  });
  conversation.messages = conversation.messages.slice(-300);
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

async function authenticateLocalCustomer(email, password) {
  const customers = await readJsonFile(customersPath, {});
  const customer = customers[email];
  return customer && verifyPassword(password, customer.passwordHash) ? customer : null;
}

async function handleMessages(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "Method not allowed" });
  const payload = await readBody(request);
  const action = safeText(payload.action, 40);
  const email = normalizeEmail(payload.email);
  const admin = verifyToken(request);
  const conversations = await readJsonFile(messagesPath, {});

  if (admin) {
    if (action === "presence") {
      localPresence.chey = Date.now();
      return json(response, 200, { ok: true, presence: presencePayload(email), local: true });
    }
    if (action === "list") {
      const summaries = Object.values(conversations).map((value) => {
        const conversation = normalizeConversation(value);
        const lastMessage = conversation.messages.at(-1);
        const presence = presencePayload(conversation.email);
        return {
          email: conversation.email,
          name: conversation.name || conversation.email.split("@")[0],
          updatedAt: conversation.updatedAt,
          customerUnread: conversation.customerUnread,
          adminUnread: conversation.adminUnread,
          customerOnline: presence.customerOnline,
          customerLastSeen: presence.customerLastSeen,
          messageCount: conversation.messages.length,
          lastMessage: lastMessage ? {
            sender: lastMessage.sender,
            body: lastMessage.body,
            createdAt: lastMessage.createdAt
          } : null
        };
      }).sort((left, right) => String(right.updatedAt).localeCompare(String(left.updatedAt)));
      return json(response, 200, { ok: true, conversations: summaries, local: true });
    }
    if (!validEmail(email)) return json(response, 400, { error: "A valid customer email is required." });
    const conversation = normalizeConversation(conversations[email] || blankConversation(email, payload.name), email);
    if (action === "send-quote") {
      const orderId = safeOrderId(payload.orderId);
      const orders = await readOrders();
      const order = orders[orderId];
      if (!order) return json(response, 404, { error: "Quote order was not found." });
      if (normalizeEmail(order.customer?.email || order.customerEmail) !== email) {
        return json(response, 403, { error: "Quote recipient does not match the order." });
      }
      const quoteAmount = Math.max(0, Math.round(Number(order.quoteAmount || 0)));
      if (!quoteAmount) return json(response, 400, { error: "Save a quote amount before sending it." });
      appendMessage(
        conversation,
        "chey",
        order.quoteMessage || payload.body || `Chey sent you a quote for $${(quoteAmount / 100).toFixed(2)}.`,
        {
          kind: "quote",
          orderId,
          quoteAmount,
          quoteCurrency: order.currency || "usd",
          quoteStatus: "Quoted",
          acceptedAt: ""
        }
      );
    } else if (action === "delete-conversation") {
      delete conversations[email];
      await writeJsonFile(messagesPath, conversations);
      return json(response, 200, { ok: true, deleted: true, email, local: true });
    } else if (action === "delete-message") {
      try {
        removeMessage(conversation, safeText(payload.messageId, 80), "chey");
      } catch (error) {
        return json(response, error.message === "Message not found." ? 404 : 403, { error: error.message });
      }
    } else if (action === "mark-read") {
      conversation.adminUnread = 0;
      conversation.messages = conversation.messages.map((message) => message.sender === "customer" && !message.readAt
        ? { ...message, readAt: new Date().toISOString() }
        : message);
    } else if (action === "send") {
      try {
        appendMessage(conversation, "chey", payload.body);
      } catch (error) {
        return json(response, 400, { error: error.message });
      }
    } else if (action !== "get") {
      return json(response, 400, { error: "Unknown message action." });
    }
    conversations[email] = normalizeConversation(conversation);
    await writeJsonFile(messagesPath, conversations);
    return json(response, 200, conversationResponse(conversation));
  }

  if (!validEmail(email) || !(await authenticateLocalCustomer(email, String(payload.password || "")))) {
    return json(response, 401, { error: "Sign in to access messages." });
  }
  if (action === "presence") {
    localPresence.customers.set(email, Date.now());
    return json(response, 200, { ok: true, presence: presencePayload(email), local: true });
  }
  const customers = await readJsonFile(customersPath, {});
  const conversation = normalizeConversation(conversations[email] || blankConversation(email, customers[email]?.name), email);
  conversation.name = safeText(customers[email]?.name || conversation.name, 100);
  if (action === "accept-quote") {
    const message = conversation.messages.find((item) => item.id === safeText(payload.messageId, 80) && item.kind === "quote");
    if (!message) return json(response, 404, { error: "Quote message not found." });
    if (["Declined", "Canceled"].includes(message.quoteStatus)) {
      return json(response, 409, { error: "This quote is no longer available." });
    }
    message.quoteStatus = message.quoteStatus === "Paid" ? "Paid" : "Accepted";
    message.acceptedAt = new Date().toISOString();
    conversation.updatedAt = message.acceptedAt;
  } else if (action === "delete-conversation") {
    delete conversations[email];
    await writeJsonFile(messagesPath, conversations);
    return json(response, 200, { ok: true, deleted: true, email, local: true });
  } else if (action === "delete-message") {
    try {
      removeMessage(conversation, safeText(payload.messageId, 80), "customer");
    } catch (error) {
      return json(response, error.message === "Message not found." ? 404 : 403, { error: error.message });
    }
  } else if (action === "mark-read") {
    conversation.customerUnread = 0;
    conversation.messages = conversation.messages.map((message) => message.sender === "chey" && !message.readAt
      ? { ...message, readAt: new Date().toISOString() }
      : message);
  } else if (action === "send") {
    try {
      appendMessage(conversation, "customer", payload.body);
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  } else if (action !== "get") {
    return json(response, 400, { error: "Unknown message action." });
  }
  conversations[email] = normalizeConversation(conversation);
  await writeJsonFile(messagesPath, conversations);
  return json(response, 200, conversationResponse(conversation));
}

function checkoutItem(item = {}) {
  const price = Number(String(item.price ?? item.unitAmount ?? 0).replace(/[^0-9.]/g, ""));
  const unitAmount = item.unitAmount
    ? Math.max(0, Math.round(Number(item.unitAmount)))
    : Math.max(0, Math.round((Number.isFinite(price) ? price : 0) * 100));
  return {
    name: safeText(item.name || "Pressed by Chey item", 120),
    quantity: Math.max(1, Math.min(10, Number(item.quantity) || 1)),
    unitAmount,
    category: safeText(item.category || item.shape, 80),
    shape: safeText(item.shape, 80),
    length: safeText(item.length, 80),
    sizePreference: safeText(item.sizePreference, 120),
    note: safeText(item.note, 900),
    customOrder: Boolean(item.customOrder)
  };
}

async function handleCreateCheckout(request, response, url) {
  if (request.method !== "POST") return json(response, 405, { error: "Method not allowed" });
  const payload = await readBody(request);
  const customer = {
    mode: safeText(payload.customer?.mode || "guest", 20),
    name: safeText(payload.customer?.name, 100),
    email: normalizeEmail(payload.customer?.email),
    phone: safeText(payload.customer?.phone, 40),
    sizing: safeText(payload.customer?.sizing, 700),
    notes: safeText(payload.customer?.notes, 450)
  };
  let returnBaseUrl;
  try {
    const requested = new URL(payload.returnBaseUrl || url.origin, url.origin);
    returnBaseUrl = requested.origin === url.origin ? `${requested.origin}${requested.pathname}` : `${url.origin}/`;
  } catch {
    returnBaseUrl = `${url.origin}/`;
  }

  const orders = await readOrders();
  const quoteOrderId = safeOrderId(payload.quoteOrderId);
  let order;
  if (quoteOrderId) {
    const savedOrder = orders[quoteOrderId];
    if (!savedOrder) return json(response, 404, { error: "Quote order was not found." });
    if (!savedOrder.quoteAmount) return json(response, 400, { error: "This quote does not have a payment amount yet." });
    const email = normalizeEmail(savedOrder.customer?.email || savedOrder.customerEmail);
    if (customer.email && email && customer.email !== email) {
      return json(response, 403, { error: "Sign in to the customer account that owns this quote." });
    }
    order = {
      ...savedOrder,
      status: "quote_checkout",
      paymentStatus: "pending",
      fulfillmentStatus: "Payment pending",
      quoteStatus: "Accepted",
      quoteAcceptedAt: savedOrder.quoteAcceptedAt || new Date().toISOString(),
      customer: { ...(savedOrder.customer || {}), ...customer, mode: "account" },
      total: Number(savedOrder.quoteAmount),
      updatedAt: new Date().toISOString(),
      localSimulation: true
    };
  } else {
    const items = (Array.isArray(payload.items) ? payload.items : []).map(checkoutItem).filter((item) => item.unitAmount > 0);
    if (!items.length) return json(response, 400, { error: "Add a priced item before starting local checkout." });
    if (customer.mode === "guest" && !customer.sizing) {
      return json(response, 400, { error: "Add sizing before guest checkout so Chey knows what to make." });
    }
    const now = new Date().toISOString();
    order = {
      id: `pbc-${Date.now()}-${randomUUID().slice(0, 8)}`,
      status: "created",
      paymentStatus: "pending",
      fulfillmentStatus: "Payment pending",
      createdAt: now,
      updatedAt: now,
      customer,
      items,
      total: items.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0),
      currency: "usd",
      localSimulation: true
    };
  }
  const sessionId = `local_cs_${randomUUID().replace(/-/g, "")}`;
  order.stripeSessionId = sessionId;
  orders[order.id] = order;
  await writeJsonFile(ordersPath, orders);
  const sessions = await readJsonFile(checkoutSessionsPath, {});
  sessions[sessionId] = {
    id: sessionId,
    orderId: order.id,
    status: "open",
    paymentStatus: "unpaid",
    returnBaseUrl,
    createdAt: new Date().toISOString()
  };
  await writeJsonFile(checkoutSessionsPath, sessions);
  return json(response, 200, {
    ok: true,
    url: `${url.origin}/__local-checkout?session_id=${encodeURIComponent(sessionId)}`,
    sessionId,
    orderId: order.id,
    localSimulation: true
  });
}

async function handleCheckoutStatus(request, response, url) {
  if (request.method !== "GET") return json(response, 405, { error: "Method not allowed" });
  const sessionId = safeText(url.searchParams.get("session_id"), 100);
  const sessions = await readJsonFile(checkoutSessionsPath, {});
  const session = sessions[sessionId];
  if (!session) return json(response, 400, { error: "Missing local checkout session." });
  const orders = await readOrders();
  const order = orders[session.orderId];
  if (!order) return json(response, 404, { error: "Local checkout order was not found." });
  return json(response, 200, {
    ok: true,
    paid: session.paymentStatus === "paid",
    status: session.status,
    paymentStatus: session.paymentStatus,
    order: publicOrder(order),
    localSimulation: true
  });
}

function htmlEscape(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

async function handleLocalCheckoutPage(response, url) {
  const sessionId = safeText(url.searchParams.get("session_id"), 100);
  const sessions = await readJsonFile(checkoutSessionsPath, {});
  const session = sessions[sessionId];
  const orders = await readOrders();
  const order = session ? orders[session.orderId] : null;
  if (!session || !order) return json(response, 404, { error: "Local checkout session not found." });
  const total = (Number(order.total || 0) / 100).toFixed(2);
  const completeUrl = `/__local-checkout/complete?session_id=${encodeURIComponent(sessionId)}`;
  const cancelUrl = `/__local-checkout/cancel?session_id=${encodeURIComponent(sessionId)}`;
  response.writeHead(200, { "Cache-Control": "no-store", "Content-Type": "text/html; charset=utf-8" });
  response.end(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Local Checkout Simulator</title>
<style>body{margin:0;background:#fff7fa;color:#2b1821;font:16px/1.5 Arial,sans-serif}.wrap{max-width:560px;margin:8vh auto;padding:32px}.panel{background:#fff;border:1px solid #e6cbd8;padding:28px}.label{color:#9b1957;font-weight:700;text-transform:uppercase;letter-spacing:.08em}.total{font-size:34px;font-weight:700;margin:8px 0 24px}.actions{display:flex;gap:12px;flex-wrap:wrap}a{padding:12px 18px;text-decoration:none;border:1px solid #9b1957;color:#9b1957;font-weight:700}a.primary{background:#9b1957;color:#fff}small{display:block;margin-top:22px;color:#6c5360}</style>
</head><body><main class="wrap"><section class="panel"><div class="label">Local testing only</div><h1>No payment will be charged</h1><p>This simulates checkout for order <strong>${htmlEscape(order.id)}</strong>.</p><div class="total">$${htmlEscape(total)}</div><div class="actions"><a class="primary" href="${completeUrl}">Complete simulated payment</a><a href="${cancelUrl}">Cancel</a></div><small>This page never contacts Stripe and only updates ignored files on this computer.</small></section></main></body></html>`);
}

async function handleLocalCheckoutDecision(response, url, paid) {
  const sessionId = safeText(url.searchParams.get("session_id"), 100);
  const sessions = await readJsonFile(checkoutSessionsPath, {});
  const session = sessions[sessionId];
  if (!session) return json(response, 404, { error: "Local checkout session not found." });
  const orders = await readOrders();
  const order = orders[session.orderId];
  if (!order) return json(response, 404, { error: "Local checkout order not found." });
  if (paid) {
    const now = new Date().toISOString();
    session.status = "complete";
    session.paymentStatus = "paid";
    order.status = "complete";
    order.paymentStatus = "paid";
    order.fulfillmentStatus = "Needs review";
    order.paidAt = order.paidAt || now;
    order.updatedAt = now;
    if (order.quoteStatus) order.quoteStatus = "Paid";
  } else {
    session.status = "canceled";
    session.paymentStatus = "unpaid";
  }
  sessions[sessionId] = session;
  orders[order.id] = order;
  await writeJsonFile(checkoutSessionsPath, sessions);
  await writeJsonFile(ordersPath, orders);
  const destination = paid
    ? `${session.returnBaseUrl}?checkout=success&session_id=${encodeURIComponent(sessionId)}#shop`
    : `${session.returnBaseUrl}?checkout=cancel#shop`;
  response.writeHead(302, { Location: destination, "Cache-Control": "no-store" });
  response.end();
}

async function serveStatic(request, response, url) {
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const relativePath = requestedPath === "/admin" ? "/admin.html" : requestedPath;
  const filePath = resolve(root, `.${relativePath}`);
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    return json(response, 403, { error: "Forbidden" });
  }
  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) throw new Error("Not a file");
    const contentType = mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, {
      "Cache-Control": contentType.startsWith("text/html") ? "no-store" : "no-cache",
      "Content-Type": contentType
    });
    response.end(await readFile(filePath));
  } catch {
    json(response, 404, { error: "Not found" });
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || `localhost:${port}`}`);
    if (url.pathname === "/.netlify/functions/admin-auth") {
      return await handleAdminAuth(request, response);
    }
    if (url.pathname === "/.netlify/functions/admin-state") {
      return await handleAdminState(request, response, url);
    }
    if (url.pathname === "/.netlify/functions/admin-orders") {
      return await handleAdminOrders(request, response, url);
    }
    if (url.pathname === "/.netlify/functions/customer-account") {
      return await handleCustomerAccount(request, response);
    }
    if (url.pathname === "/.netlify/functions/customer-admin") {
      return await handleCustomerAdmin(request, response);
    }
    if (url.pathname === "/.netlify/functions/messages") {
      return await handleMessages(request, response);
    }
    if (url.pathname === "/.netlify/functions/custom-request") {
      return await handleCustomRequest(request, response);
    }
    if (url.pathname === "/.netlify/functions/create-checkout-session") {
      return await handleCreateCheckout(request, response, url);
    }
    if (url.pathname === "/.netlify/functions/checkout-status") {
      return await handleCheckoutStatus(request, response, url);
    }
    if (url.pathname === "/__local-checkout") {
      return await handleLocalCheckoutPage(response, url);
    }
    if (url.pathname === "/__local-checkout/complete") {
      return await handleLocalCheckoutDecision(response, url, true);
    }
    if (url.pathname === "/__local-checkout/cancel") {
      return await handleLocalCheckoutDecision(response, url, false);
    }
    return await serveStatic(request, response, url);
  } catch (error) {
    json(response, 500, { error: error.message || "Local server error" });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Pressed by Chey local Admin server ready at http://localhost:${port}`);
});
