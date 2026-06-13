const body = document.body;
const cartButton = document.querySelector(".cart-button");
const accountButton = document.querySelector(".account-button");
const closeCart = document.querySelector(".close-cart");
const closeAccount = document.querySelector(".close-account");
const scrim = document.querySelector(".scrim");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector(".cart-total");
const cartEmpty = document.querySelector(".cart-empty");
const guestCheckout = document.querySelector("#guestCheckout");
const guestName = document.querySelector("#guestName");
const guestEmail = document.querySelector("#guestEmail");
const guestPhone = document.querySelector("#guestPhone");
const guestNotes = document.querySelector("#guestNotes");
const guestCheckoutButton = document.querySelector("#guestCheckoutButton");
const guestCheckoutStatus = document.querySelector("#guestCheckoutStatus");
const builderPreview = document.querySelector("#builderPreview");
const shade = document.querySelector("#shade");
const shape = document.querySelector("#shape");
const accent = document.querySelector("#accent");
const customAdd = document.querySelector("#customAdd");
const finishCard = document.querySelector("#finishCard");
const lookGrid = document.querySelector("#lookGrid");
const customDetails = document.querySelector("#customDetails");
const inspirationPhoto = document.querySelector("#inspirationPhoto");
const inspirationPreview = document.querySelector("#inspirationPreview");
const inspirationPreviewImage = inspirationPreview?.querySelector("img");
const inspirationName = document.querySelector("#inspirationName");
const removeInspiration = document.querySelector("#removeInspiration");
const adminNav = document.querySelector("#adminNav");
const adminPage = document.querySelector("#adminPage");
const adminLogout = document.querySelector("#adminLogout");
const adminViewButtons = document.querySelectorAll("[data-admin-view]");
const adminViewPanels = document.querySelectorAll("[data-admin-view-panel]");
const adminImageList = document.querySelector("#adminImageList");
const adminProductList = document.querySelector("#adminProductList");
const adminLookList = document.querySelector("#adminLookList");
const toggleEditTextButton = document.querySelector("#toggleEditText");
const saveEditsButton = document.querySelector("#saveEdits");
const exportEditsButton = document.querySelector("#exportEdits");
const importEditsInput = document.querySelector("#importEdits");
const resetEditsButton = document.querySelector("#resetEdits");
const addProductButton = document.querySelector("#addProductButton");
const saveProductChangesButton = document.querySelector("#saveProductChanges");
const newProductPhoto = document.querySelector("#newProductPhoto");
const newProductPreview = document.querySelector("#newProductPreview");
const addProductStatus = document.querySelector("#addProductStatus");
const productCountBadge = document.querySelector("#productCountBadge");
const ideaCountBadge = document.querySelector("#ideaCountBadge");
const ideaPhoto = document.querySelector("#ideaPhoto");
const ideaPhotoPreview = document.querySelector("#ideaPhotoPreview");
const ideaCanvas = document.querySelector("#ideaCanvas");
const charmCanvas = document.querySelector("#charmCanvas");
const drawPolish = document.querySelector("#drawPolish");
const drawNailShape = document.querySelector("#drawNailShape");
const drawColor = document.querySelector("#drawColor");
const drawSize = document.querySelector("#drawSize");
const stayInNail = document.querySelector("#stayInNail");
const drawBrushTool = document.querySelector("#drawBrushTool");
const drawEraser = document.querySelector("#drawEraser");
const drawUndo = document.querySelector("#drawUndo");
const drawClear = document.querySelector("#drawClear");
const useSketchButton = document.querySelector("#useSketchButton");
const charmSelect = document.querySelector("#charmSelect");
const charmSize = document.querySelector("#charmSize");
const ideaName = document.querySelector("#ideaName");
const ideaShape = document.querySelector("#ideaShape");
const ideaLength = document.querySelector("#ideaLength");
const ideaColors = document.querySelector("#ideaColors");
const ideaArt = document.querySelector("#ideaArt");
const ideaMaterials = document.querySelector("#ideaMaterials");
const ideaNotes = document.querySelector("#ideaNotes");
const ideaStatus = document.querySelector("#ideaStatus");
const ideaPrice = document.querySelector("#ideaPrice");
const saveIdeaButton = document.querySelector("#saveIdeaButton");
const ideaStatusMessage = document.querySelector("#ideaStatusMessage");
const ideaList = document.querySelector("#ideaList");
const productGrid = document.querySelector(".product-grid");
const checkoutButton = document.querySelector("#checkoutButton");
const accountAuth = document.querySelector("#accountAuth");
const accountDashboard = document.querySelector("#accountDashboard");
const accountStatus = document.querySelector("#accountStatus");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const registerName = document.querySelector("#registerName");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const customerLogin = document.querySelector("#customerLogin");
const customerRegister = document.querySelector("#customerRegister");
const customerLogout = document.querySelector("#customerLogout");
const accountName = document.querySelector("#accountName");
const savedProductsList = document.querySelector("#savedProductsList");
const orderHistoryList = document.querySelector("#orderHistoryList");
const saveSizesButton = document.querySelector("#saveSizes");
const sizeInputs = {
  thumb: document.querySelector("#sizeThumb"),
  index: document.querySelector("#sizeIndex"),
  middle: document.querySelector("#sizeMiddle"),
  ring: document.querySelector("#sizeRing"),
  pinky: document.querySelector("#sizePinky")
};
const adminUserList = document.querySelector("#adminUserList");
const adminGuestOrderList = document.querySelector("#adminGuestOrderList");
const cart = [];
let selectedLook = null;
let customInspirationSrc = "";
let textEditMode = false;
let cartEmptyMessage = "Your bag is ready for something glossy.";
let isDrawing = false;
let lastDrawPoint = null;
let eraserMode = false;
let drawingMode = "brush";
let selectedCharmIndex = -1;
let draggingCharmIndex = -1;
const drawingUndoStack = [];
const placedCharms = [];
const nailTemplate = {
  cx: 500,
  top: 58,
  bottom: 650,
  width: 276
};
const presetAura = {
  x: 500,
  y: 310,
  radius: 210
};
const ADMIN_PASSWORD = "chey2026";
const ADMIN_EMAILS = ["admin", "chey", "admin@pressedbychey.com", "chey@pressedbychey.com"];
const ADMIN_SESSION_KEY = "pressedByCheyAdminSession";
const ADMIN_STORAGE_KEY = "pressedByCheyEdits";
const CUSTOMER_STORAGE_KEY = "pressedByCheyCustomers";
const GUEST_ORDER_STORAGE_KEY = "pressedByCheyGuestOrders";
const nailSizeOptions = ["", "000", "00", "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"];
let customerState = {
  users: [],
  currentEmail: ""
};
let guestOrders = [];
let adminState = {
  texts: {},
  images: {},
  products: {},
  customProducts: [],
  lookPhotos: {},
  lookDetails: {},
  ideas: []
};
const finishNotes = {
  blush: {
    title: "Blush Pink",
    copy: "Opaque milky gel with a soft salon-pink finish."
  },
  rose: {
    title: "Rose Chrome",
    copy: "Reflective rose-pink chrome with a bright mirror highlight."
  },
  berry: {
    title: "Berry Jelly",
    copy: "Translucent berry-pink jelly with visible aura depth."
  }
};
const shadeSwatches = {
  blush: ["#fff3f8", "#ff9fc3"],
  rose: ["#ffd7e5", "#d94888"],
  berry: ["#ffc2d9", "#b20f4f"]
};
const shapePathLibrary = {
  almond: [
    "M365 533 C349 498 359 448 388 409 C405 386 438 387 457 414 C481 451 471 514 442 546 C419 570 377 560 365 533 Z",
    "M581 327 C558 290 565 222 598 177 C615 155 651 148 678 165 C708 190 716 278 682 337 C656 376 604 361 581 327 Z",
    "M777 221 C749 174 760 84 803 34 C827 8 871 8 899 36 C936 79 930 179 895 229 C865 269 805 262 777 221 Z",
    "M1004 326 C980 289 988 222 1019 177 C1036 155 1074 148 1102 166 C1133 190 1141 278 1107 337 C1080 374 1028 360 1004 326 Z",
    "M1260 705 C1251 657 1273 585 1323 562 C1357 551 1380 584 1382 630 C1384 686 1365 737 1331 760 C1300 782 1268 751 1260 705 Z"
  ],
  square: [
    "M382 392 L455 392 Q471 392 473 409 L472 482 C470 514 462 540 443 552 C421 569 382 559 363 535 C342 504 347 439 382 392 Z",
    "M600 148 L682 148 Q700 148 703 168 L703 267 C700 302 690 329 672 345 C646 374 604 363 580 333 C553 288 560 191 600 148 Z",
    "M795 12 L899 12 Q918 12 920 34 L920 147 C916 187 904 217 882 235 C850 266 809 261 778 224 C742 171 755 62 795 12 Z",
    "M1017 148 L1113 148 Q1132 148 1135 169 L1134 267 C1131 303 1117 330 1098 344 C1071 371 1032 363 1005 330 C976 284 982 191 1017 148 Z",
    "M1306 558 L1372 585 Q1384 590 1386 608 L1380 688 C1374 723 1358 749 1335 763 C1300 785 1264 756 1256 708 C1247 658 1266 582 1306 558 Z"
  ],
  coffin: [
    "M391 390 L449 390 C469 431 472 503 448 548 C427 570 385 560 363 535 C342 501 349 434 391 390 Z",
    "M610 146 L674 146 C705 189 712 291 681 341 C655 374 606 363 580 333 C553 288 563 190 610 146 Z",
    "M810 10 L891 10 C928 60 932 179 896 230 C864 267 811 261 778 224 C743 171 759 60 810 10 Z",
    "M1028 146 L1102 146 C1137 191 1146 291 1112 341 C1084 371 1033 363 1005 330 C976 284 985 190 1028 146 Z",
    "M1313 558 L1368 585 C1391 633 1377 730 1336 760 C1300 784 1265 756 1256 708 C1247 658 1269 581 1313 558 Z"
  ]
};
const lookLibrary = [
  ["Chey Signature Pink", "#ffbdd4", "#cb2e72", "gloss", "Pressed by Chey signature pink"],
  ["Milky Ballet", "#fff4f7", "#f5b3c9", "milky", "Soft sheer ballet nude"],
  ["Rose Chrome", "#ffd7e5", "#cb2e72", "chrome", "Mirror rose chrome"],
  ["Berry Jelly Aura", "#ffc2d9", "#d82675", "jelly", "Translucent berry aura"],
  ["Coquette Bow", "#fff0f6", "#ff9cc0", "3d", "Raised bow accent"],
  ["Pearl French", "#fff8fb", "#f9d7e2", "french", "Clean pearl French"],
  ["Ruby Micro French", "#fff3f8", "#b20f4f", "french", "Sheer base ruby tip"],
  ["Black Cherry", "#2a0718", "#8d1647", "gloss", "Deep glossy cherry"],
  ["Classic Red Gloss", "#8f0712", "#ff3b45", "gloss", "Timeless high-shine red"],
  ["Burgundy Velvet", "#310613", "#9d183d", "velvet", "Deep wine magnetic finish"],
  ["Chocolate Glaze", "#3a2118", "#9b6147", "gloss", "Rich cocoa shine"],
  ["Espresso Cat-Eye", "#160f0c", "#a06a4a", "cat-eye", "Dark coffee light beam"],
  ["Caramel Chrome", "#9a5a2e", "#f5b96e", "chrome", "Warm caramel metal"],
  ["Champagne Pearl", "#f7dfc2", "#fff5ee", "pearl", "Soft champagne shimmer"],
  ["Glazed Nude Almond", "#f1c9bc", "#fff4ec", "pearl", "Nude pearl almond"],
  ["Taupe Gloss", "#8c7873", "#d8beb8", "gloss", "Neutral taupe shine"],
  ["Greige French", "#f5eee8", "#9f9790", "french", "Modern greige edge"],
  ["Coconut Milk", "#fffaf1", "#e9d8c7", "milky", "Creamy white sheer"],
  ["Vanilla Chrome", "#fff4da", "#d7b760", "chrome", "Soft gold-white chrome"],
  ["Butter Yellow Aura", "#fff1a6", "#f5b92e", "aura", "Sunny butter glow"],
  ["Lemon Sorbet", "#fff8b8", "#f4d734", "jelly", "Clear yellow jelly"],
  ["Tangerine Gloss", "#ff8a38", "#ffbd73", "gloss", "Bright citrus orange"],
  ["Coral Petal", "#ff8a7a", "#ffc2b5", "gloss", "Vacation coral shine"],
  ["Peach Cream", "#ffc6a8", "#ffe3d3", "milky", "Soft peach cream"],
  ["Apricot Pearl", "#ffb17f", "#ffd8bd", "pearl", "Peach pearl topcoat"],
  ["Terracotta Satin", "#9f4c36", "#d98565", "gloss", "Earthy warm clay"],
  ["Sage Milk", "#dfe9d5", "#88a57a", "milky", "Soft green milk bath"],
  ["Olive Chrome", "#4f5f34", "#b3c06f", "chrome", "Muted olive metal"],
  ["Emerald Cat-Eye", "#063b2e", "#35c18a", "cat-eye", "Luxury green beam"],
  ["Jade Jelly", "#bbf0d0", "#2ca66d", "jelly", "Translucent jade glass"],
  ["Mint French", "#f7fff8", "#8adfbd", "french", "Fresh mint tip"],
  ["Forest Marble", "#0f3024", "#8ec3a7", "marble", "Green stone veining"],
  ["Seafoam Pearl", "#d7fff6", "#95d7d2", "pearl", "Soft ocean shimmer"],
  ["Aqua Glass", "#c8f7ff", "#1fb4d6", "jelly", "Clear aqua jelly"],
  ["Baby Blue Chrome", "#d7edff", "#78aee8", "chrome", "Icy blue metal"],
  ["Sky Aura", "#d6efff", "#57a6ff", "aura", "Soft blue airbrush"],
  ["Cobalt Gloss", "#102a8c", "#4b76ff", "gloss", "Bold cobalt shine"],
  ["Navy Cat-Eye", "#07142d", "#497de0", "cat-eye", "Midnight blue beam"],
  ["Denim French", "#f4f8ff", "#4b6f9d", "french", "Blue denim tip"],
  ["Lilac Milk", "#eee3ff", "#b68be8", "milky", "Cool lavender sheer"],
  ["Orchid Aura", "#d9b3ff", "#ff6fb1", "aura", "Purple-pink aura fade"],
  ["Amethyst Chrome", "#5e2d83", "#c08cff", "chrome", "Purple gemstone metal"],
  ["Plum Velvet", "#4f183b", "#b44785", "velvet", "Understated plum shimmer"],
  ["Midnight Plum", "#261338", "#9a4cc2", "chrome", "Dark purple metal"],
  ["Iced Lavender French", "#fbf8ff", "#bfa7ff", "french", "Pale lavender edge"],
  ["Silver Mirror", "#dfe4ef", "#8f9bb0", "chrome", "Liquid silver reflection"],
  ["Gunmetal Cat-Eye", "#222833", "#a7b0c0", "cat-eye", "Smoky metal beam"],
  ["Black Patent", "#050505", "#3b3b3b", "gloss", "High-shine black"],
  ["Black French", "#fff8fb", "#0b0b0c", "french", "Minimal black tip"],
  ["White Chrome", "#ffffff", "#dce5f2", "chrome", "Clean icy chrome"],
  ["Pearl Oyster", "#f7e7ed", "#cfd6e8", "pearl", "Cool oyster sheen"],
  ["Opal Shell", "#fff6fb", "#cfe9ff", "pearl", "Opalescent shell shift"],
  ["Hologlow", "#ffb8d2", "#b6e5ff", "chrome", "Rainbow holographic flash"],
  ["Disco Silver", "#f2f4f8", "#b8bcc7", "crystal", "Crystal party shine"],
  ["Gold Foil French", "#fff8ef", "#d6a64f", "french", "Gold couture edge"],
  ["Rose Gold Foil", "#ffd1df", "#d99a6c", "chrome", "Rose-gold metal glow"],
  ["Marble Quartz", "#fff0f7", "#c889a4", "marble", "Rose quartz lines"],
  ["White Marble", "#ffffff", "#b7b7b7", "marble", "Clean stone veining"],
  ["Smoky Marble", "#ece8e5", "#4a4343", "marble", "Smoked stone look"],
  ["Tortoise Shell", "#5c3217", "#d68d3f", "marble", "Amber tortoise depth"],
  ["Cow Print", "#fffefd", "#151515", "3d", "Graphic black-white spots"],
  ["Leopard Accent", "#d89b58", "#3a1d10", "3d", "Fashion print accent"],
  ["Micro Flower", "#ffeaf2", "#ff7eb0", "3d", "Tiny floral accents"],
  ["Daisy Cream", "#fffaf0", "#f6cc35", "3d", "Small daisy details"],
  ["Water Droplet Clear", "#eaf8ff", "#ffffff", "3d", "Raised glass drops"],
  ["Crystal Nude", "#f3d2c7", "#ffffff", "crystal", "Nude with sparkle accent"],
  ["Birthday Glitter", "#ffd6f0", "#9ed7ff", "crystal", "Confetti sparkle mix"],
  ["Aurora Ice", "#dbf7ff", "#dab8ff", "chrome", "Blue-lilac aurora"],
  ["Mermaid Chrome", "#75e0d0", "#8f63ff", "chrome", "Teal violet shift"],
  ["Unicorn Aura", "#ffd2f1", "#9ed7ff", "aura", "Pastel fantasy fade"],
  ["Sunset Aura", "#ffb37a", "#e24c87", "aura", "Orange-pink sunset"],
  ["Moody Aura", "#2e143f", "#e15c96", "aura", "Dark aura center"],
  ["Cyber Lime", "#d7ff44", "#5fda61", "chrome", "Electric lime shine"],
  ["Neon Pink Pop", "#ff3b99", "#8f1dff", "chrome", "Bright club pink-violet"],
  ["Neon Orange Pop", "#ff5a1f", "#ffe14a", "chrome", "Hot orange flash"],
  ["Neon Green French", "#fffefe", "#68ff4d", "french", "Bright green tip"],
  ["Holiday Ruby", "#8c061a", "#ffcad5", "crystal", "Red sparkle party set"],
  ["Winter Snow Pearl", "#ffffff", "#d9ecff", "pearl", "Soft snow shimmer"],
  ["Fall Cocoa Plaid", "#6b3a2a", "#d8a06f", "3d", "Warm fall accent style"],
  ["Bridal Lace", "#fff9f5", "#e7d2c2", "3d", "Soft bridal detail"]
];

function detailFor(finish) {
  if (finish === "jelly") {
    return "radial-gradient(circle at center 38%, rgba(255,255,255,.34) 0 12%, transparent 13%), radial-gradient(circle at 55% 40%, rgba(214,24,100,.58) 0 18%, transparent 19%)";
  }
  if (finish === "aura") {
    return "radial-gradient(circle at center 40%, rgba(255,255,255,.5) 0 10%, transparent 11%), radial-gradient(circle at 50% 42%, var(--nail-accent) 0 26%, transparent 27%)";
  }
  if (finish === "french") {
    return "linear-gradient(to bottom, var(--nail-accent) 0 18%, transparent 19%)";
  }
  if (finish === "marble") {
    return "linear-gradient(115deg, transparent 0 42%, rgba(255,255,255,.72) 43% 47%, transparent 48%), linear-gradient(65deg, transparent 0 58%, rgba(123,37,75,.28) 59% 61%, transparent 62%)";
  }
  if (finish === "3d" || finish === "crystal") {
    return "radial-gradient(circle at 68% 72%, rgba(255,255,255,.95) 0 4%, transparent 5%), radial-gradient(circle at 52% 65%, rgba(255,255,255,.86) 0 3%, transparent 4%)";
  }
  if (finish === "cat-eye" || finish === "velvet") {
    return "linear-gradient(100deg, transparent 0 34%, rgba(255,255,255,.95) 45%, rgba(255,255,255,.18) 54%, transparent 65%)";
  }
  if (finish === "chrome" || finish === "pearl") {
    return "linear-gradient(115deg, rgba(255,255,255,.82) 0 12%, transparent 13% 23%, rgba(255,255,255,.92) 46% 53%, transparent 54%)";
  }
  return "linear-gradient(100deg, transparent, transparent)";
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

requestAnimationFrame(() => {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    const box = el.getBoundingClientRect();
    const isNearViewport = box.top < window.innerHeight * 1.08 && box.bottom > -window.innerHeight * 0.08;
    if (isNearViewport) el.classList.add("is-visible");
  });
});

function openCart() {
  closeAccountPanel();
  body.classList.add("cart-open");
  document.querySelector(".cart-drawer").setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  body.classList.remove("cart-open");
  document.querySelector(".cart-drawer").setAttribute("aria-hidden", "true");
}

function openAccount(message = "") {
  closeCartDrawer();
  body.classList.add("account-open");
  document.querySelector(".account-panel").setAttribute("aria-hidden", "false");
  if (message) accountStatus.textContent = message;
  renderAccount();
}

function closeAccountPanel() {
  body.classList.remove("account-open");
  document.querySelector(".account-panel").setAttribute("aria-hidden", "true");
}

function isAdminSignedIn() {
  return localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function isAdminLogin(email, password) {
  return ADMIN_EMAILS.includes(email.trim().toLowerCase()) && password === ADMIN_PASSWORD;
}

function showAdminPage() {
  if (!isAdminSignedIn()) {
    openAccount("Sign in with the admin login to open the admin page.");
    return;
  }
  closeCartDrawer();
  closeAccountPanel();
  renderAdminVisibility();
  renderAdminUsers();
  renderAdminGuestOrders();
  adminPage.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderAdminVisibility() {
  const signedIn = isAdminSignedIn();
  adminNav.hidden = !signedIn;
  adminPage.hidden = !signedIn;
}

function logoutAdmin() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  renderAdminVisibility();
  window.location.hash = "top";
  openAccount("Admin logged out.");
}

function closeAdmin() {}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeCartDrawer();
  closeAccountPanel();
});

function escapeHTML(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[char];
  });
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = `cart-item${item.image ? " has-image" : ""}`;
    const meta = [item.shape, item.shade, item.note ? "Design notes included" : "", item.image ? "Inspiration photo included" : ""]
      .filter(Boolean)
      .map(escapeHTML)
      .join(" · ");
    row.innerHTML = `
      ${item.image ? `<img class="cart-thumb" src="${item.image}" alt="Inspiration for ${escapeHTML(item.name)}" />` : ""}
      <div>
        <strong>${escapeHTML(item.name)}</strong>
        ${meta ? `<p class="cart-meta">${meta}</p>` : ""}
        ${item.note ? `<p class="cart-note">${escapeHTML(item.note)}</p>` : ""}
        <div>$${item.price}</div>
      </div>
      <button type="button" aria-label="Remove ${escapeHTML(item.name)}" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = cart.length;
  cartTotal.textContent = `$${total}`;
  cartEmpty.textContent = cartEmptyMessage;
  cartEmpty.classList.toggle("show", cart.length === 0);
  guestCheckout.hidden = cart.length === 0;
}

function addToCart(name, price, details = {}) {
  cartEmptyMessage = "Your bag is ready for something glossy.";
  cart.push({ name, price: Number(price), ...details });
  renderCart();
  openCart();
}

function loadCustomerState() {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE_KEY) || "{}");
    customerState = {
      users: Array.isArray(saved.users)
        ? saved.users.map((user) => ({
            name: user.name || "",
            email: user.email || "",
            password: user.password || "",
            sizes: user.sizes || {},
            savedProducts: Array.isArray(user.savedProducts) ? user.savedProducts : [],
            orders: Array.isArray(user.orders) ? user.orders : [],
            createdAt: user.createdAt || "",
            lastLogin: user.lastLogin || ""
          }))
        : [],
      currentEmail: saved.currentEmail || ""
    };
  } catch {
    customerState = { users: [], currentEmail: "" };
  }
}

function setupNailSizeDropdowns() {
  document.querySelectorAll("[data-size-select]").forEach((select) => {
    select.innerHTML = nailSizeOptions
      .map((size) => `<option value="${size}">${size || "Select size"}</option>`)
      .join("");
  });
}

function saveCustomerState() {
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerState));
}

function loadGuestOrders() {
  try {
    const saved = JSON.parse(localStorage.getItem(GUEST_ORDER_STORAGE_KEY) || "[]");
    guestOrders = Array.isArray(saved) ? saved : [];
  } catch {
    guestOrders = [];
  }
}

function saveGuestOrders() {
  localStorage.setItem(GUEST_ORDER_STORAGE_KEY, JSON.stringify(guestOrders));
}

function currentCustomer() {
  return customerState.users.find((user) => user.email === customerState.currentEmail) || null;
}

function renderAccount() {
  const user = currentCustomer();
  accountAuth.hidden = Boolean(user);
  accountDashboard.hidden = !user;
  if (!user) {
    savedProductsList.innerHTML = "";
    orderHistoryList.innerHTML = "";
    return;
  }
  accountName.textContent = `Welcome back, ${user.name}`;
  Object.entries(sizeInputs).forEach(([key, input]) => {
    input.value = user.sizes?.[key] || "";
  });
  renderSavedProducts(user);
  renderOrderHistory(user);
}

function renderSavedProducts(user) {
  const saved = user.savedProducts || [];
  savedProductsList.innerHTML = saved.length
    ? saved
        .map(
          (item, index) => `
            <div class="account-list-item">
              <strong>${escapeHTML(item.name)}</strong>
              <p>${escapeHTML(item.copy || item.shape || "Saved for later")}</p>
              <button type="button" data-add-saved="${index}">Add to Bag</button>
            </div>
          `
        )
        .join("")
    : `<div class="account-list-item"><p>No saved products yet.</p></div>`;
}

function renderOrderHistory(user) {
  const orders = user.orders || [];
  orderHistoryList.innerHTML = orders.length
    ? orders
        .map(
          (order) => `
            <div class="account-list-item">
              <strong>${escapeHTML(order.id)}</strong>
              <p>${escapeHTML(order.date)} · $${order.total}</p>
              <p>${escapeHTML(order.items.map((item) => item.name).join(", "))}</p>
            </div>
          `
        )
        .join("")
    : `<div class="account-list-item"><p>No orders yet.</p></div>`;
}

function registerCustomer() {
  const name = registerName.value.trim();
  const email = registerEmail.value.trim().toLowerCase();
  const password = registerPassword.value;
  if (!name || !email || !password) {
    accountStatus.textContent = "Fill out name, email, and password.";
    return;
  }
  if (customerState.users.some((user) => user.email === email)) {
    accountStatus.textContent = "That email already has an account.";
    return;
  }
  customerState.users.push({
    name,
    email,
    password,
    sizes: {},
    savedProducts: [],
    orders: [],
    createdAt: new Date().toLocaleString(),
    lastLogin: new Date().toLocaleString()
  });
  customerState.currentEmail = email;
  saveCustomerState();
  accountStatus.textContent = "";
  registerName.value = "";
  registerEmail.value = "";
  registerPassword.value = "";
  renderAccount();
  renderAdminUsers();
}

function loginCustomer() {
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;
  if (isAdminLogin(email, password)) {
    localStorage.setItem(ADMIN_SESSION_KEY, "true");
    customerState.currentEmail = "";
    saveCustomerState();
    accountStatus.textContent = "";
    loginEmail.value = "";
    loginPassword.value = "";
    renderAccount();
    renderAdminVisibility();
    closeAccountPanel();
    window.location.hash = "adminPage";
    showAdminPage();
    return;
  }
  const user = customerState.users.find((item) => item.email === email && item.password === password);
  if (!user) {
    accountStatus.textContent = "No account found with that email and password.";
    return;
  }
  user.lastLogin = new Date().toLocaleString();
  customerState.currentEmail = email;
  saveCustomerState();
  accountStatus.textContent = "";
  loginEmail.value = "";
  loginPassword.value = "";
  renderAccount();
}

function logoutCustomer() {
  customerState.currentEmail = "";
  saveCustomerState();
  renderAccount();
}

function saveCustomerSizes() {
  const user = currentCustomer();
  if (!user) {
    openAccount("Sign in to save your nail sizes.");
    return;
  }
  user.sizes = Object.fromEntries(
    Object.entries(sizeInputs).map(([key, input]) => [key, input.value.trim()])
  );
  saveCustomerState();
  renderAdminUsers();
  accountStatus.textContent = "Sizes saved.";
}

function productDataFromCard(product) {
  const name = product.querySelector("h3").textContent.trim();
  const copy = product.querySelector(".product-copy > p:not(.product-tag)").textContent.trim();
  const price = product.querySelector(".product-bottom strong").textContent.replace("$", "").trim();
  const image = product.querySelector(".photo-preview img")?.getAttribute("src") || "";
  return {
    name,
    copy,
    price: Number(price),
    image,
    shape: detectProductShape(`${name} ${copy}`) || ""
  };
}

function saveProductForCustomer(product) {
  const user = currentCustomer();
  if (!user) {
    openAccount("Sign in or create an account to save products.");
    return;
  }
  const item = productDataFromCard(product);
  user.savedProducts = user.savedProducts || [];
  if (!user.savedProducts.some((saved) => saved.name === item.name)) {
    user.savedProducts.push(item);
  }
  saveCustomerState();
  renderAccount();
  renderAdminUsers();
  openAccount("Product saved.");
}

function checkoutCart() {
  if (!cart.length) return;
  const user = currentCustomer();
  if (!user) {
    guestCheckout.open = true;
    guestCheckoutStatus.textContent = "Sign in for account checkout or use guest checkout below.";
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  user.orders = user.orders || [];
  user.orders.unshift({
    id: `Order ${String(user.orders.length + 1).padStart(3, "0")}`,
    date: new Date().toLocaleDateString(),
    total,
    items: cart.map((item) => ({ ...item, image: item.image ? "Inspiration photo attached" : "" }))
  });
  cart.splice(0, cart.length);
  cartEmptyMessage = "Order saved to your account.";
  saveCustomerState();
  renderCart();
  renderAccount();
  renderAdminUsers();
  closeCartDrawer();
  openAccount("Order saved to your account.");
}

function checkoutGuest() {
  if (!cart.length) return;
  const name = guestName.value.trim();
  const email = guestEmail.value.trim();
  const phone = guestPhone.value.trim();
  const notes = guestNotes.value.trim();
  if (!name || !email) {
    guestCheckoutStatus.textContent = "Add a name and email for guest checkout.";
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  guestOrders.unshift({
    id: `Guest ${String(guestOrders.length + 1).padStart(3, "0")}`,
    date: new Date().toLocaleString(),
    name,
    email,
    phone,
    notes,
    total,
    items: cart.map((item) => ({ ...item, image: item.image ? "Inspiration photo attached" : "" }))
  });
  cart.splice(0, cart.length);
  cartEmptyMessage = "Guest order saved. Chey can view it in Admin.";
  [guestName, guestEmail, guestPhone, guestNotes].forEach((input) => {
    input.value = "";
  });
  saveGuestOrders();
  renderCart();
  renderAdminGuestOrders();
  guestCheckoutStatus.textContent = "Guest order saved. Chey can view it in Admin.";
}

function renderAdminUsers() {
  if (!adminUserList) return;
  adminUserList.innerHTML = customerState.users.length
    ? customerState.users
        .map((user) => {
          const sizes = user.sizes && Object.values(user.sizes).some(Boolean)
            ? `Sizes: ${Object.entries(user.sizes).map(([key, value]) => `${key} ${value || "-"}`).join(", ")}`
            : "Sizes not saved";
          return `
            <div class="admin-user-card">
              <strong>${escapeHTML(user.name)} · ${escapeHTML(user.email)}</strong>
              <p>${escapeHTML(user.createdAt ? `Created: ${user.createdAt}` : "Created date not saved")}</p>
              <p>${escapeHTML(user.lastLogin ? `Last login: ${user.lastLogin}` : "No login yet")}</p>
              <p>${escapeHTML(sizes)}</p>
              <p>${(user.savedProducts || []).length} saved products · ${(user.orders || []).length} orders</p>
              <p>${escapeHTML((user.orders || []).map((order) => order.id).join(", ") || "No order history")}</p>
            </div>
          `;
        })
        .join("")
    : `<div class="admin-user-card"><p>No customer accounts yet.</p></div>`;
}

function renderAdminGuestOrders() {
  if (!adminGuestOrderList) return;
  adminGuestOrderList.innerHTML = guestOrders.length
    ? guestOrders
        .map((order) => `
          <div class="admin-user-card">
            <strong>${escapeHTML(order.id)} - ${escapeHTML(order.name)}</strong>
            <p>${escapeHTML(order.date)} - $${order.total}</p>
            <p>${escapeHTML(order.email)}${order.phone ? ` - ${escapeHTML(order.phone)}` : ""}</p>
            <p>${escapeHTML((order.items || []).map((item) => item.name).join(", "))}</p>
            ${order.notes ? `<p>${escapeHTML(order.notes)}</p>` : ""}
          </div>
        `)
        .join("")
    : `<div class="admin-user-card"><p>No guest orders yet.</p></div>`;
}

document.querySelectorAll("[data-name]").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.name, button.dataset.price));
});

accountButton.addEventListener("click", () => openAccount());
closeAccount.addEventListener("click", closeAccountPanel);
customerRegister.addEventListener("click", registerCustomer);
customerLogin.addEventListener("click", loginCustomer);
customerLogout.addEventListener("click", logoutCustomer);
saveSizesButton.addEventListener("click", saveCustomerSizes);
checkoutButton.addEventListener("click", checkoutCart);
guestCheckoutButton.addEventListener("click", checkoutGuest);

savedProductsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-saved]");
  if (!button) return;
  const user = currentCustomer();
  const item = user?.savedProducts?.[Number(button.dataset.addSaved)];
  if (item) {
    closeAccountPanel();
    addToCart(item.name, item.price, { shape: item.shape });
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  cart.splice(Number(button.dataset.index), 1);
  renderCart();
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
scrim.addEventListener("click", closeCartDrawer);
scrim.addEventListener("click", closeAccountPanel);
scrim.addEventListener("click", closeAdmin);

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".product").forEach((product) => {
      const isMatch = filter === "all" || product.dataset.category === filter;
      product.classList.toggle("hidden", !isMatch);
    });
  });
});

function updateBuilder() {
  builderPreview.dataset.shade = shade.value;
  builderPreview.dataset.shape = shape.value;
  applyNailShape(shape.value);
  if (!selectedLook) {
    const [base, accentColor] = shadeSwatches[shade.value];
    builderPreview.style.setProperty("--nail-base", base);
    builderPreview.style.setProperty("--nail-accent", accentColor);
    builderPreview.style.setProperty("--look-detail", detailFor("gloss"));
    setNailTexture(customInspirationSrc || "");
  }
  if (!selectedLook) {
    builderPreview.dataset.customLook = customInspirationSrc ? "true" : "false";
    builderPreview.dataset.finish = "";
    finishCard.querySelector("strong").textContent = customInspirationSrc
      ? "Custom Inspiration"
      : finishNotes[shade.value].title;
    finishCard.querySelector("span").textContent = customInspirationSrc
      ? "Your uploaded reference will be sent with the order so Chey can recreate the design."
      : finishNotes[shade.value].copy;
    customAdd.textContent = customInspirationSrc || customDetails.value.trim()
      ? "Add Custom Request - $65"
      : "Add Custom Set - $55";
  } else if (customDetails.value.trim()) {
    customAdd.textContent = "Add Custom Request - $65";
  }
  setPreviewDetail();
}

function applyNailShape(shapeName) {
  const paths = shapePathLibrary[shapeName] || shapePathLibrary.almond;
  paths.forEach((path, index) => {
    builderPreview.querySelectorAll(`[data-nail-path="${index}"]`).forEach((nailPath) => {
      nailPath.setAttribute("d", path);
    });
    const clipPath = builderPreview.querySelector(`[data-nail-clip="${index}"]`);
    if (clipPath) clipPath.setAttribute("d", path);
  });
}

shade.addEventListener("input", () => {
  selectedLook = null;
  document.querySelectorAll(".look-option").forEach((button) => button.classList.remove("active"));
  updateBuilder();
});
shape.addEventListener("input", updateBuilder);
accent.addEventListener("input", updateBuilder);
customDetails.addEventListener("input", () => {
  const requestedShape = detectProductShape(customDetails.value);
  if (requestedShape) shape.value = requestedShape;
  updateBuilder();
});
inspirationPhoto.addEventListener("change", handleInspirationUpload);
removeInspiration.addEventListener("click", clearInspirationUpload);

function applyLook(look) {
  selectedLook = look;
  builderPreview.dataset.customLook = "true";
  builderPreview.dataset.finish = look.finish;
  builderPreview.style.setProperty("--nail-base", look.base);
  builderPreview.style.setProperty("--nail-accent", look.accent);
  builderPreview.style.setProperty("--look-detail", detailFor(look.finish));
  setNailTexture(look.photo || "");
  finishCard.querySelector("strong").textContent = look.name;
  finishCard.querySelector("span").textContent = look.copy;
  customAdd.textContent = look.price ? `Add ${look.name} - $${look.price}` : "Add Custom Set - $55";
  document.querySelectorAll(".look-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.name === look.name);
  });
  updateBuilder();
}

function readLookData(index) {
  const [name, base, accentColor, finish, copy] = lookLibrary[index];
  const detail = (adminState.lookDetails && adminState.lookDetails[index]) || {};
  const photo = (adminState.lookPhotos && adminState.lookPhotos[index]) || "";
  return {
    index,
    name: detail.name && detail.name.trim() ? detail.name.trim() : name,
    base,
    accent: accentColor,
    finish: detail.finish && detail.finish.trim() ? detail.finish.trim() : finish,
    copy: detail.copy && detail.copy.trim() ? detail.copy.trim() : copy,
    photo
  };
}

function renderLooks() {
  lookGrid.innerHTML = "";
  lookLibrary.forEach((_, index) => {
    const look = readLookData(index);
    const button = document.createElement("button");
    button.className = `look-option${look.photo ? " has-photo" : ""}`;
    button.type = "button";
    button.dataset.name = look.name;
    button.style.setProperty("--look-base", look.base);
    button.style.setProperty("--look-accent", look.accent);
    if (look.photo) button.style.setProperty("--look-photo", `url("${look.photo}")`);
    button.innerHTML = `
      <span class="look-photo" aria-hidden="true">
        <span class="look-dot"></span>
      </span>
      <span class="look-copy">
        <strong>${escapeHTML(look.name)}</strong>
        <span>${escapeHTML(look.finish)}</span>
      </span>
    `;
    button.addEventListener("click", () => applyLook(readLookData(index)));
    lookGrid.appendChild(button);
  });
}

function nailArtImages() {
  return Array.from(builderPreview.querySelectorAll(".nail-art"));
}

function setNailTexture(src) {
  builderPreview.dataset.texture = src ? "true" : "false";
  nailArtImages().forEach((image) => {
    if (src) {
      image.setAttribute("href", src);
      image.setAttribute("xlink:href", src);
      image.setAttribute("opacity", "0.92");
      image.style.setProperty("opacity", "0.92", "important");
    } else {
      image.removeAttribute("href");
      image.removeAttribute("xlink:href");
      image.setAttribute("opacity", "0");
      image.style.setProperty("opacity", "0", "important");
    }
  });
}

function handleInspirationUpload() {
  const file = inspirationPhoto.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    customInspirationSrc = reader.result;
    selectedLook = null;
    document.querySelectorAll(".look-option").forEach((button) => button.classList.remove("active"));
    inspirationPreviewImage.src = customInspirationSrc;
    inspirationName.textContent = file.name;
    inspirationPreview.hidden = false;
    updateBuilder();
  });
  reader.readAsDataURL(file);
}

function clearInspirationUpload() {
  customInspirationSrc = "";
  inspirationPhoto.value = "";
  inspirationPreviewImage.removeAttribute("src");
  inspirationName.textContent = "Inspiration uploaded";
  inspirationPreview.hidden = true;
  updateBuilder();
}

function setPreviewDetail() {
  const detail = Number(accent.value) / 100;
  builderPreview.style.setProperty("--detail-opacity", (0.34 + detail * 0.56).toFixed(2));
  builderPreview.style.setProperty("--paint-opacity", (0.62 + detail * 0.3).toFixed(2));
  builderPreview.style.setProperty("--texture-paint-opacity", (0.24 + detail * 0.22).toFixed(2));
  builderPreview.style.setProperty("--gloss-opacity", (0.42 + detail * 0.46).toFixed(2));
}

function setupProductTryOns() {
  productElementsForTryOn().forEach((product) => {
    const bottom = product.querySelector(".product-bottom");
    const addButton = bottom.querySelector("[data-name]");
    let actions = bottom.querySelector(".product-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "product-actions";
      bottom.appendChild(actions);
    }
    if (!actions.contains(addButton)) actions.appendChild(addButton);
    if (!product.querySelector(".try-on")) {
      const button = document.createElement("button");
      button.className = "try-on";
      button.type = "button";
      button.textContent = "Try On";
      button.addEventListener("click", () => previewProductOnHand(product));
      actions.insertBefore(button, addButton);
    }
    if (!product.querySelector(".save-product")) {
      const saveButton = document.createElement("button");
      saveButton.className = "save-product";
      saveButton.type = "button";
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", () => saveProductForCustomer(product));
      actions.insertBefore(saveButton, addButton);
    }
  });
}

function productElementsForTryOn() {
  return Array.from(document.querySelectorAll(".product"));
}

function previewProductOnHand(product) {
  const swatches = Array.from(product.querySelectorAll(".swatch-row span")).map((item) =>
    item.style.getPropertyValue("--swatch").trim()
  );
  const name = product.querySelector("h3").textContent.trim();
  const description = product.querySelector(".product-copy > p:not(.product-tag)").textContent.trim();
  const price = product.querySelector(".product-bottom strong").textContent.replace("$", "").trim();
  const image = product.querySelector(".photo-preview img")?.getAttribute("src") || "";
  selectedLook = {
    name,
    base: swatches[0] || "#fff3f8",
    accent: swatches[1] || swatches[0] || "#ff9fc3",
    finish: product.dataset.category || "gloss",
    copy: description,
    photo: image,
    price
  };
  const productShape = detectProductShape(`${name} ${description}`);
  if (productShape) shape.value = productShape;
  applyLook(selectedLook);
  document.querySelectorAll(".product").forEach((item) => item.classList.toggle("previewing", item === product));
  document.querySelector("#custom").scrollIntoView({ behavior: "smooth", block: "center" });
}

function detectProductShape(text) {
  const copy = text.toLowerCase();
  if (copy.includes("coffin")) return "coffin";
  if (copy.includes("square")) return "square";
  if (copy.includes("almond") || copy.includes("oval")) return "almond";
  return "";
}

customAdd.addEventListener("click", () => {
  const note = customDetails.value.trim();
  const hasCustomRequest = Boolean(note || customInspirationSrc);
  if (selectedLook?.price && !hasCustomRequest) {
    addToCart(selectedLook.name, selectedLook.price);
    return;
  }
  const baseName = selectedLook ? selectedLook.name : shade.options[shade.selectedIndex].text;
  const shapeLabel = shape.options[shape.selectedIndex].text;
  const shadeLabel = shade.options[shade.selectedIndex].text;
  const label = hasCustomRequest
    ? `Custom Request - ${shapeLabel}`
    : `${baseName} ${shapeLabel} Custom`;
  addToCart(label, hasCustomRequest ? 65 : 55, {
    shade: shadeLabel,
    shape: shapeLabel,
    note,
    image: customInspirationSrc
  });
});

setupNailSizeDropdowns();
loadCustomerState();
renderCart();
renderAccount();
renderLooks();
updateBuilder();
setupProductTryOns();
setupPhotoZoom();

document.querySelectorAll(".nail-preview, .builder-preview").forEach((tray) => {
  let shineFrame = 0;
  let pendingX = 0;

  tray.addEventListener("pointermove", (event) => {
    pendingX = event.clientX;
    if (shineFrame) return;
    shineFrame = requestAnimationFrame(() => {
      const bounds = tray.getBoundingClientRect();
      const x = ((pendingX - bounds.left) / bounds.width) * 100;
      tray.style.setProperty("--shine-x", `${x - 20}%`);
      tray.style.setProperty("--lamp-x", `${x}%`);
      shineFrame = 0;
    });
  });

  tray.addEventListener("pointerleave", () => {
    if (shineFrame) {
      cancelAnimationFrame(shineFrame);
      shineFrame = 0;
    }
    tray.style.removeProperty("--shine-x");
    tray.style.removeProperty("--lamp-x");
  });
});

function setupPhotoZoom() {
  const lightbox = document.createElement("div");
  lightbox.className = "photo-lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `<button type="button" aria-label="Close enlarged photo">x</button><img alt="Enlarged nail photo" />`;
  document.body.append(lightbox);
  const image = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector("button");
  const close = () => {
    lightbox.hidden = true;
    image.removeAttribute("src");
  };
  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) close();
  });
  document.addEventListener("click", (event) => {
    const zoomTarget = event.target.closest(".look-photo, .photo-preview img, .photo-proof-grid img, .inspiration-preview img, .idea-image, .admin-control img");
    if (!zoomTarget) return;
    const src = zoomTarget.tagName === "IMG" ? zoomTarget.getAttribute("src") : imageUrlFromStyle(zoomTarget.closest(".look-option, .admin-look-preview") || zoomTarget);
    if (!src) return;
    image.src = src;
    lightbox.hidden = false;
  });
}

function imageUrlFromStyle(element) {
  if (!element) return "";
  const value = element.style.getPropertyValue("--look-photo") || getComputedStyle(element).getPropertyValue("--look-photo") || "";
  const match = value.match(/url\(["']?(.+?)["']?\)/);
  return match ? match[1] : "";
}

function setupAdmin() {
  loadAdminState();
  loadGuestOrders();
  markEditableText();
  applyAdminState();
  renderAdminVisibility();
  renderAdminImages();
  renderAdminProducts();
  renderAdminLookPhotos();
  renderAdminUsers();
  renderAdminGuestOrders();
  renderIdeas();

  adminNav.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.hash = "adminPage";
    showAdminPage();
  });
  adminLogout.addEventListener("click", logoutAdmin);
  adminViewButtons.forEach((button) => {
    button.addEventListener("click", () => switchAdminView(button.dataset.adminView));
  });
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#adminPage") showAdminPage();
  });
  if (window.location.hash === "#adminPage") showAdminPage();
  [loginEmail, loginPassword].forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") loginCustomer();
    });
  });
  [registerName, registerEmail, registerPassword].forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") registerCustomer();
    });
  });
  toggleEditTextButton.addEventListener("click", toggleTextEditMode);
  saveEditsButton.addEventListener("click", saveAllAdminEdits);
  exportEditsButton.addEventListener("click", exportAdminEdits);
  importEditsInput.addEventListener("change", importAdminEdits);
  resetEditsButton.addEventListener("click", resetAdminEdits);
  addProductButton.addEventListener("click", addCustomProductFromAdmin);
  saveProductChangesButton.addEventListener("click", saveProductChangesFromSection);
  newProductPhoto.addEventListener("change", previewNewProductPhoto);
  setupDrawingPad();
  ideaPhoto.addEventListener("change", previewIdeaPhoto);
  saveIdeaButton.addEventListener("click", addDesignIdea);
  ideaList.addEventListener("click", handleIdeaListClick);
  ideaList.addEventListener("input", updateIdeaFromCard);
  document.addEventListener("input", (event) => {
    if (event.target.matches("textarea")) autoGrowTextarea(event.target);
  });
  autoGrowTextareas();
}

function switchAdminView(view) {
  adminViewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.adminView === view);
  });
  adminViewPanels.forEach((panel) => {
    panel.hidden = panel.dataset.adminViewPanel !== view;
  });
  autoGrowTextareas();
}

function autoGrowTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${Math.max(textarea.scrollHeight + 2, textarea.classList.contains("large-notes") ? 190 : 132)}px`;
}

function autoGrowTextareas(root = document) {
  requestAnimationFrame(() => {
    root.querySelectorAll("textarea").forEach(autoGrowTextarea);
  });
}

function loadAdminState() {
  try {
    const saved = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY) || "{}");
    const savedImages = saved.images || {};
    delete savedImages["try-on"];
  adminState = {
      texts: saved.texts || {},
      images: savedImages,
      products: saved.products || {},
      customProducts: saved.customProducts || [],
      lookPhotos: saved.lookPhotos || {},
      lookDetails: saved.lookDetails || {},
      ideas: Array.isArray(saved.ideas) ? saved.ideas : []
    };
  } catch {
    adminState = { texts: {}, images: {}, products: {}, customProducts: [], lookPhotos: {}, lookDetails: {}, ideas: [] };
  }
}

function saveAdminState() {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminState));
}

function editableElements() {
  return Array.from(
    document.querySelectorAll(
      [
        ".brand span:last-child",
        ".hero .eyebrow",
        "#hero-title",
        ".hero-text",
        ".floating-tag",
        ".hero-stats span",
        ".trend-strip span",
        "#intro-title",
        ".feature h3",
        ".feature p",
        "#shop-title",
        ".product-tag",
        ".product h3",
        ".product-copy > p:not(.product-tag)",
        ".product-bottom strong",
        "#custom-title",
        ".custom-panel > div > p:not(.eyebrow)",
        ".look-library h2",
        "#fit-title",
        ".fit-grid h3",
        ".fit-grid p",
        "#reviews-title",
        "blockquote",
        "figcaption",
        ".footer strong",
        ".footer p"
      ].join(",")
    )
  );
}

function markEditableText() {
  editableElements().forEach((el, index) => {
    el.dataset.adminText = `text-${index}`;
  });
}

function applyAdminState() {
  Object.entries(adminState.texts).forEach(([key, value]) => {
    const el = document.querySelector(`[data-admin-text="${key}"]`);
    if (el) el.textContent = value;
  });
  Object.entries(adminState.images).forEach(([key, value]) => {
    applyImageValue(key, value);
  });
  Object.entries(adminState.products).forEach(([key, product]) => {
    applyProductValue(Number(key), product);
  });
  renderLooks();
  renderCustomProducts();
  renderIdeas();
}

function toggleTextEditMode() {
  textEditMode = !textEditMode;
  editableElements().forEach((el) => {
    el.contentEditable = String(textEditMode);
  });
  toggleEditTextButton.textContent = textEditMode ? "Stop Text Edit" : "Edit Text";
}

function saveTextEdits() {
  editableElements().forEach((el) => {
    adminState.texts[el.dataset.adminText] = el.textContent.trim();
  });
}

function saveAllAdminEdits() {
  saveTextEdits();
  saveProductEdits();
  saveAdminState();
  applyAdminState();
  renderAdminProducts();
  renderAdminLookPhotos();
}

function saveProductChangesFromSection() {
  saveAllAdminEdits();
  addProductStatus.textContent = "Product edits saved.";
}

const imageTargets = [
  { key: "hero", label: "Hero product image", type: "img", selector: ".hero-visual img" },
  { key: "product-0", label: "Rose Mirror Muse photo", type: "img", selector: ".product:nth-child(1) .photo-preview img" },
  { key: "product-1", label: "Berry Aura Glaze photo", type: "img", selector: ".product:nth-child(2) .photo-preview img" },
  { key: "product-2", label: "Ribbon Crush photo", type: "img", selector: ".product:nth-child(3) .photo-preview img" },
  { key: "product-3", label: "Pink Cat-Eye Flash photo", type: "img", selector: ".product:nth-child(4) .photo-preview img" },
  { key: "custom-bg", label: "Custom section background", type: "bg", selector: ".custom-panel" },
  { key: "fit-0", label: "Fit guide photo 1", type: "img", selector: ".photo-proof-grid img:nth-child(1)" },
  { key: "fit-1", label: "Fit guide photo 2", type: "img", selector: ".photo-proof-grid img:nth-child(2)" }
];

function renderAdminImages() {
  adminImageList.innerHTML = "";
  imageTargets.forEach((target) => {
    const card = document.createElement("div");
    card.className = "admin-control";
    const preview = document.createElement("img");
    preview.src = adminState.images[target.key] || currentImageValue(target) || "";
    const label = document.createElement("strong");
    label.textContent = target.label;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const dataUrl = await fileToCompressedDataUrl(file);
      adminState.images[target.key] = dataUrl;
      applyImageValue(target.key, dataUrl);
      preview.src = dataUrl;
      saveAdminState();
    });
    card.append(label, preview, input);
    adminImageList.appendChild(card);
  });
}

function currentImageValue(target) {
  const el = document.querySelector(target.selector);
  if (!el) return "";
  if (target.type === "img") return el.getAttribute("src");
  const bg = getComputedStyle(el).backgroundImage;
  const match = bg.match(/url\(["']?(.*?)["']?\)/);
  return match ? match[1] : "";
}

function applyImageValue(key, value) {
  if (key === "try-on") return;
  const target = imageTargets.find((item) => item.key === key);
  if (!target) return;
  const el = document.querySelector(target.selector);
  if (!el) return;
  if (target.type === "img") {
    el.src = value;
    return;
  }
  if (key === "custom-bg") {
    el.style.backgroundImage = `linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(255, 228, 238, 0.5)), url("${value}")`;
    el.style.backgroundBlendMode = "screen";
    return;
  }
  if (key === "try-on") {
    el.style.backgroundImage = `linear-gradient(90deg, rgba(255, 248, 251, 0.1), rgba(255, 255, 255, 0)), url("${value}")`;
    el.style.backgroundPosition = "center";
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
  }
}

function fileToCompressedDataUrl(file, max = 1600, quality = 0.86) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function imageFromDataUrl(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function coverSourceRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = targetWidth / targetHeight;
  if (sourceRatio > targetRatio) {
    const width = sourceHeight * targetRatio;
    return { sx: (sourceWidth - width) / 2, sy: 0, sw: width, sh: sourceHeight };
  }
  const height = sourceWidth / targetRatio;
  return { sx: 0, sy: (sourceHeight - height) / 2, sw: sourceWidth, sh: height };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / d + 2;
    if (max === b) h = (r - g) / d + 4;
    h *= 60;
  }
  return { h, s, l };
}

async function extractNailTextureFromPhoto(src) {
  const img = await imageFromDataUrl(src);
  const analysisSize = 360;
  const analysis = document.createElement("canvas");
  analysis.width = analysisSize;
  analysis.height = analysisSize;
  const analysisCtx = analysis.getContext("2d");
  const source = coverSourceRect(img.width, img.height, analysisSize, analysisSize);
  analysisCtx.drawImage(img, source.sx, source.sy, source.sw, source.sh, 0, 0, analysisSize, analysisSize);
  const pixels = analysisCtx.getImageData(0, 0, analysisSize, analysisSize).data;
  const scored = [];
  for (let y = 0; y < analysisSize; y += 2) {
    for (let x = 0; x < analysisSize; x += 2) {
      const i = (y * analysisSize + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const { h, s, l } = rgbToHsl(r, g, b);
      const colorSpread = (Math.abs(r - g) + Math.abs(g - b) + Math.abs(r - b)) / 255;
      const dx = (x - analysisSize / 2) / (analysisSize / 2);
      const dy = (y - analysisSize / 2) / (analysisSize / 2);
      const center = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy));
      const skinLike = h > 12 && h < 52 && s > 0.16 && s < 0.62 && l > 0.34 && l < 0.86;
      const polishHue = h < 16 || h > 285 || (h > 180 && h < 265) || h > 52;
      const glossy = l > 0.72 && s > 0.08;
      const darkPolish = l < 0.28 && s > 0.12;
      const score =
        s * 1.9 +
        colorSpread * 0.85 +
        center * 0.72 +
        (polishHue ? 0.34 : 0) +
        (glossy ? 0.22 : 0) +
        (darkPolish ? 0.34 : 0) -
        (skinLike ? 0.54 : 0);
      scored.push({ x, y, score });
    }
  }
  scored.sort((a, b) => b.score - a.score);
  const keep = scored.slice(0, Math.max(90, Math.floor(scored.length * 0.16)));
  let minX = analysisSize;
  let minY = analysisSize;
  let maxX = 0;
  let maxY = 0;
  keep.forEach((point) => {
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  });
  const minBox = analysisSize * 0.34;
  const width = Math.max(maxX - minX, minBox);
  const height = Math.max(maxY - minY, minBox);
  const cx = (minX + maxX) / 2 || analysisSize / 2;
  const cy = (minY + maxY) / 2 || analysisSize / 2;
  const expand = 1.34;
  const cropW = Math.min(analysisSize, width * expand);
  const cropH = Math.min(analysisSize, height * expand);
  minX = Math.max(0, cx - cropW / 2);
  minY = Math.max(0, cy - cropH / 2);
  maxX = Math.min(analysisSize, minX + cropW);
  maxY = Math.min(analysisSize, minY + cropH);
  minX = Math.max(0, maxX - cropW);
  minY = Math.max(0, maxY - cropH);

  const texture = document.createElement("canvas");
  texture.width = 900;
  texture.height = 620;
  const ctx = texture.getContext("2d");
  const sx = source.sx + (minX / analysisSize) * source.sw;
  const sy = source.sy + (minY / analysisSize) * source.sh;
  const sw = ((maxX - minX) / analysisSize) * source.sw;
  const sh = ((maxY - minY) / analysisSize) * source.sh;
  const crop = coverSourceRect(sw, sh, texture.width, texture.height);
  ctx.save();
  ctx.filter = "blur(16px) saturate(1.14) contrast(1.05)";
  ctx.drawImage(img, sx + crop.sx, sy + crop.sy, crop.sw, crop.sh, -28, -28, texture.width + 56, texture.height + 56);
  ctx.restore();
  ctx.save();
  ctx.filter = "saturate(1.22) contrast(1.08) brightness(1.03)";
  ctx.globalAlpha = 0.9;
  ctx.drawImage(img, sx + crop.sx, sy + crop.sy, crop.sw, crop.sh, 0, 0, texture.width, texture.height);
  ctx.restore();
  const shine = ctx.createLinearGradient(0, 0, texture.width, 0);
  shine.addColorStop(0, "rgba(255,255,255,0)");
  shine.addColorStop(0.18, "rgba(255,255,255,0.42)");
  shine.addColorStop(0.3, "rgba(255,255,255,0.08)");
  shine.addColorStop(0.52, "rgba(255,255,255,0.3)");
  shine.addColorStop(0.68, "rgba(255,255,255,0)");
  ctx.fillStyle = shine;
  ctx.fillRect(0, 0, texture.width, texture.height);
  return texture.toDataURL("image/jpeg", 0.82);
}

function renderAdminLookPhotos() {
  adminLookList.innerHTML = "";
  lookLibrary.forEach((_, index) => {
    const look = readLookData(index);
    const card = document.createElement("div");
    card.className = "admin-control admin-look-card";
    card.style.setProperty("--look-base", look.base);
    card.style.setProperty("--look-accent", look.accent);
    if (look.photo) card.style.setProperty("--look-photo", `url("${look.photo}")`);
    card.innerHTML = `
      <div class="admin-look-preview${look.photo ? " has-photo" : ""}" aria-hidden="true">
        <span class="look-dot"></span>
      </div>
      <div class="admin-look-copy">
        <label>Name <input value="${escapeAttribute(look.name)}" data-look-detail="${index}" data-look-field="name" /></label>
        <label>Finish <input value="${escapeAttribute(look.finish)}" data-look-detail="${index}" data-look-field="finish" /></label>
        <label>Description <textarea data-look-detail="${index}" data-look-field="copy">${escapeTextarea(look.copy)}</textarea></label>
        <label class="tiny-upload" for="lookPhoto-${index}">Change Photo</label>
        <small class="look-extract-note" data-look-status>Photo uploads are cleaned into a nail-only texture for the hand preview.</small>
        <input class="hidden-file-input" id="lookPhoto-${index}" type="file" accept="image/*" data-look-photo="${index}" />
      </div>
    `;
    adminLookList.appendChild(card);
  });
  adminLookList.querySelectorAll("[data-look-photo]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const index = Number(input.dataset.lookPhoto);
      const card = input.closest(".admin-look-card");
      const status = card?.querySelector("[data-look-status]");
      if (status) status.textContent = "Scanning photo for the nail design...";
      const dataUrl = await fileToCompressedDataUrl(file, 1600, 0.88);
      let textureUrl = dataUrl;
      try {
        textureUrl = await extractNailTextureFromPhoto(dataUrl);
      } catch {
        if (status) status.textContent = "Smart extraction failed, using the uploaded photo.";
      }
      adminState.lookPhotos[index] = textureUrl;
      saveAdminState();
      renderLooks();
      renderAdminLookPhotos();
      if (selectedLook?.index === index) applyLook(readLookData(index));
    });
  });
  adminLookList.querySelectorAll("[data-look-detail]").forEach((field) => {
    field.addEventListener("input", () => {
      const index = field.dataset.lookDetail;
      const key = field.dataset.lookField;
      adminState.lookDetails[index] = adminState.lookDetails[index] || {};
      adminState.lookDetails[index][key] = field.value;
      saveAdminState();
      renderLooks();
    });
  });
}

function productElements() {
  return Array.from(document.querySelectorAll(".product:not(.custom-added)"));
}

function readProduct(index) {
  const product = productElements()[index];
  const button = product.querySelector("[data-name]");
  return {
    tag: product.querySelector(".product-tag").textContent.trim(),
    name: product.querySelector("h3").textContent.trim(),
    description: product.querySelector(".product-copy > p:not(.product-tag)").textContent.trim(),
    price: product.querySelector(".product-bottom strong").textContent.replace("$", "").trim(),
    category: product.dataset.category,
    buttonName: button.dataset.name
  };
}

function renderAdminProducts() {
  adminProductList.innerHTML = "";
  productElements().forEach((_, index) => {
    const product = { ...readProduct(index), ...(adminState.products[index] || {}) };
    const imageTarget = imageTargets.find((target) => target.key === `product-${index}`);
    const image = adminState.images[`product-${index}`] || currentImageValue(imageTarget) || "";
    const card = document.createElement("div");
    card.className = "admin-control admin-product-card";
    card.innerHTML = `
      <div class="admin-product-photo">
        <img src="${escapeAttribute(image)}" alt="" />
        <label class="tiny-upload" for="productImage-${index}">Change Photo</label>
        <input class="hidden-file-input" id="productImage-${index}" type="file" accept="image/*" data-product-image="${index}" />
      </div>
      <div class="admin-product-fields">
        <div class="admin-product-head">
          <strong>Shop Product ${index + 1}</strong>
        </div>
        <label>Name <input data-product="${index}" data-field="name" value="${escapeAttribute(product.name)}" /></label>
        <div class="admin-field-row">
          <label>Price <input data-product="${index}" data-field="price" value="${escapeAttribute(product.price)}" /></label>
          <label>Style <input data-product="${index}" data-field="category" value="${escapeAttribute(product.category)}" /></label>
        </div>
        <label>Description <textarea data-product="${index}" data-field="description">${escapeTextarea(product.description)}</textarea></label>
        <label>Maker notes <textarea data-product="${index}" data-field="notes" placeholder="Private notes: polish colors, pigments, charms, sizing, timing, or customer preferences.">${escapeTextarea(product.notes || "")}</textarea></label>
        <details class="admin-optional">
          <summary>Optional tag</summary>
          <label>Tag <input data-product="${index}" data-field="tag" value="${escapeAttribute(product.tag)}" /></label>
        </details>
      </div>
    `;
    adminProductList.appendChild(card);
  });
  adminState.customProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "admin-control admin-product-card";
    card.innerHTML = `
      <div class="admin-product-photo">
        <img src="${escapeAttribute(product.image)}" alt="" />
        <label class="tiny-upload" for="customImage-${index}">Change Photo</label>
        <input class="hidden-file-input" id="customImage-${index}" type="file" accept="image/*" data-custom-product-image="${index}" />
      </div>
      <div class="admin-product-fields">
        <div class="admin-product-head">
          <strong>Added Product ${index + 1}</strong>
          <button class="delete-product" type="button" data-delete-custom-product="${index}">Remove</button>
        </div>
        <label>Name <input data-custom-product="${index}" data-field="name" value="${escapeAttribute(product.name)}" /></label>
        <div class="admin-field-row">
          <label>Price <input data-custom-product="${index}" data-field="price" value="${escapeAttribute(product.price)}" /></label>
          <label>Style <input data-custom-product="${index}" data-field="category" value="${escapeAttribute(product.category)}" /></label>
        </div>
        <label>Description <textarea data-custom-product="${index}" data-field="description">${escapeTextarea(product.description)}</textarea></label>
        <label>Maker notes <textarea data-custom-product="${index}" data-field="notes" placeholder="Private notes: polish colors, pigments, charms, sizing, timing, or customer preferences.">${escapeTextarea(product.notes || "")}</textarea></label>
        <details class="admin-optional">
          <summary>Optional tag</summary>
          <label>Tag <input data-custom-product="${index}" data-field="tag" value="${escapeAttribute(product.tag)}" /></label>
        </details>
      </div>
    `;
    adminProductList.appendChild(card);
  });
  updateProductCount();
  bindProductPhotoEditors();
  adminProductList.querySelectorAll("[data-delete-custom-product]").forEach((button) => {
    button.addEventListener("click", () => {
      adminState.customProducts.splice(Number(button.dataset.deleteCustomProduct), 1);
      saveAdminState();
      renderCustomProducts();
      renderAdminProducts();
    });
  });
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function escapeTextarea(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;");
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function updateProductCount() {
  if (!productCountBadge) return;
  const count = productElements().length + adminState.customProducts.length;
  productCountBadge.textContent = `${count} product${count === 1 ? "" : "s"}`;
}

function bindProductPhotoEditors() {
  adminProductList.querySelectorAll("[data-product-image]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const index = Number(input.dataset.productImage);
      const dataUrl = await fileToCompressedDataUrl(file);
      adminState.images[`product-${index}`] = dataUrl;
      applyImageValue(`product-${index}`, dataUrl);
      input.closest(".admin-product-card").querySelector("img").src = dataUrl;
      saveAdminState();
    });
  });
  adminProductList.querySelectorAll("[data-custom-product-image]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const index = Number(input.dataset.customProductImage);
      const dataUrl = await fileToCompressedDataUrl(file);
      adminState.customProducts[index].image = dataUrl;
      input.closest(".admin-product-card").querySelector("img").src = dataUrl;
      saveAdminState();
      renderCustomProducts();
    });
  });
}

function saveProductEdits() {
  adminProductList.querySelectorAll("[data-product]").forEach((input) => {
    const index = input.dataset.product;
    const field = input.dataset.field;
    adminState.products[index] ||= {};
    adminState.products[index][field] = input.value.trim();
  });
  adminProductList.querySelectorAll("[data-custom-product]").forEach((input) => {
    const index = Number(input.dataset.customProduct);
    const field = input.dataset.field;
    adminState.customProducts[index][field] = input.value.trim();
  });
}

function applyProductValue(index, product) {
  const el = productElements()[index];
  if (!el) return;
  if (product.category) el.dataset.category = product.category;
  if (product.tag) el.querySelector(".product-tag").textContent = product.tag;
  if (product.name) el.querySelector("h3").textContent = product.name;
  if (product.description) el.querySelector(".product-copy > p:not(.product-tag)").textContent = product.description;
  if (product.price) el.querySelector(".product-bottom strong").textContent = `$${product.price}`;
  const button = el.querySelector("[data-name]");
  if (button) {
    if (product.name) button.dataset.name = product.name;
    if (product.price) button.dataset.price = product.price;
  }
}

function exportAdminEdits() {
  saveAllAdminEdits();
  const blob = new Blob([JSON.stringify(adminState, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "pressed-by-chey-site-edits.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function importAdminEdits(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imported = JSON.parse(reader.result);
    adminState = {
      texts: imported.texts || {},
      images: imported.images || {},
      products: imported.products || {},
      customProducts: imported.customProducts || [],
      lookPhotos: imported.lookPhotos || {},
      lookDetails: imported.lookDetails || {},
      ideas: Array.isArray(imported.ideas) ? imported.ideas : []
    };
    saveAdminState();
    applyAdminState();
    renderAdminImages();
    renderAdminProducts();
    renderAdminLookPhotos();
    renderIdeas();
  };
  reader.readAsText(file);
}

function resetAdminEdits() {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  window.location.reload();
}

async function addCustomProductFromAdmin() {
  const name = document.querySelector("#newProductName").value.trim();
  const tag = document.querySelector("#newProductTag").value.trim() || "New set";
  const description = document.querySelector("#newProductDescription").value.trim();
  const notes = document.querySelector("#newProductNotes").value.trim();
  const price = document.querySelector("#newProductPrice").value.trim();
  const category = document.querySelector("#newProductCategory").value.trim() || "custom";
  const file = newProductPhoto.files[0];
  if (!name || !description || !price || !file) {
    addProductStatus.textContent = "Add a name, description, price, and product photo.";
    return;
  }
  addProductButton.disabled = true;
  addProductStatus.textContent = "Adding product...";
  const image = await fileToCompressedDataUrl(file);
  adminState.customProducts.push({ name, tag, description, notes, price, category, image });
  saveAdminState();
  renderCustomProducts();
  renderAdminProducts();
  autoGrowTextareas();
  document.querySelector(".add-product-form").querySelectorAll("input, textarea").forEach((input) => {
    input.value = "";
  });
  clearNewProductPreview();
  addProductButton.disabled = false;
  addProductStatus.textContent = "Product added to the shop.";
}

async function previewNewProductPhoto() {
  const file = newProductPhoto.files && newProductPhoto.files[0];
  if (!file) {
    clearNewProductPreview();
    return;
  }
  newProductPreview.src = await fileToCompressedDataUrl(file);
  newProductPreview.hidden = false;
  addProductStatus.textContent = "Photo ready.";
}

function clearNewProductPreview() {
  newProductPreview.removeAttribute("src");
  newProductPreview.hidden = true;
}

function drawingContext() {
  return ideaCanvas.getContext("2d");
}

function charmContext() {
  return charmCanvas.getContext("2d");
}

function setupDrawingPad() {
  const ctx = drawingContext();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  clearDrawingPad();

  ideaCanvas.addEventListener("pointerdown", startDrawing);
  ideaCanvas.addEventListener("pointermove", drawOnPad);
  ideaCanvas.addEventListener("pointerup", stopDrawing);
  ideaCanvas.addEventListener("pointercancel", stopDrawing);
  ideaCanvas.addEventListener("pointerleave", stopDrawing);

  setDrawingMode("brush");
  document.querySelectorAll("[data-draw-mode]").forEach((button) => {
    button.addEventListener("click", () => setDrawingMode(button.dataset.drawMode));
  });
  drawNailShape.addEventListener("change", () => {
    saveDrawingSnapshot();
    clearDrawingPad();
    ideaStatusMessage.textContent = "Nail template updated.";
  });
  charmSize.addEventListener("input", () => {
    if (selectedCharmIndex < 0) return;
    placedCharms[selectedCharmIndex].scale = Number(charmSize.value) / 100;
    renderPlacedCharms();
    ideaStatusMessage.textContent = "3D object size updated.";
  });
  drawUndo.addEventListener("click", undoDrawing);
  drawClear.addEventListener("click", () => {
    saveDrawingSnapshot();
    clearDrawingPad();
    ideaStatusMessage.textContent = "Sketch cleared.";
  });
  document.querySelectorAll("[data-draw-effect]").forEach((button) => {
    button.addEventListener("click", () => applyDrawingEffect(button.dataset.drawEffect));
  });
  useSketchButton.addEventListener("click", useSketchAsIdeaPhoto);
}

function setDrawingMode(mode) {
  drawingMode = mode || "brush";
  eraserMode = drawingMode === "eraser";
  document.querySelectorAll("[data-draw-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.drawMode === drawingMode);
  });
  if (!ideaStatusMessage) return;
  const statusByMode = {
    brush: "Nail brush selected. Drag polish like a real brush stroke.",
    eraser: "Eraser selected.",
    "aura-brush": "Aura brush selected. Drag soft airbrushed color inside the nail.",
    "move-aura": "Move aura selected. Tap the nail where the center glow should sit.",
    charm: "Tap 3D selected. Tap the nail to place the selected object."
  };
  ideaStatusMessage.textContent = statusByMode[drawingMode] || "Drawing tool selected.";
}

function clearDrawingPad() {
  const ctx = drawingContext();
  ctx.clearRect(0, 0, ideaCanvas.width, ideaCanvas.height);
  charmContext().clearRect(0, 0, charmCanvas.width, charmCanvas.height);
  placedCharms.length = 0;
  selectedCharmIndex = -1;
  draggingCharmIndex = -1;
  ctx.save();
  ctx.fillStyle = "#fff6fa";
  ctx.fillRect(0, 0, ideaCanvas.width, ideaCanvas.height);
  drawNailBase(ctx);
  ctx.restore();
}

function nailPath() {
  const { cx, top, bottom, width } = nailTemplate;
  const shapeName = drawNailShape?.value || "almond";
  const half = width / 2;
  const height = bottom - top;
  const path = new Path2D();
  if (shapeName === "coffin") {
    const tipHalf = half * 0.55;
    const shoulderY = top + height * 0.18;
    path.moveTo(cx - tipHalf, top);
    path.lineTo(cx + tipHalf, top);
    path.bezierCurveTo(cx + half * 0.9, shoulderY, cx + half * 0.98, bottom - height * 0.22, cx + half * 0.58, bottom - height * 0.04);
    path.quadraticCurveTo(cx, bottom + height * 0.035, cx - half * 0.58, bottom - height * 0.04);
    path.bezierCurveTo(cx - half * 0.98, bottom - height * 0.22, cx - half * 0.9, shoulderY, cx - tipHalf, top);
  } else if (shapeName === "square") {
    const tipHalf = half * 0.86;
    const round = 28;
    path.moveTo(cx - tipHalf + round, top);
    path.lineTo(cx + tipHalf - round, top);
    path.quadraticCurveTo(cx + tipHalf, top, cx + tipHalf, top + round);
    path.bezierCurveTo(cx + half * 0.98, top + height * 0.42, cx + half * 0.88, bottom - height * 0.18, cx + half * 0.56, bottom - height * 0.04);
    path.quadraticCurveTo(cx, bottom + height * 0.035, cx - half * 0.56, bottom - height * 0.04);
    path.bezierCurveTo(cx - half * 0.88, bottom - height * 0.18, cx - half * 0.98, top + height * 0.42, cx - tipHalf, top + round);
    path.quadraticCurveTo(cx - tipHalf, top, cx - tipHalf + round, top);
  } else if (shapeName === "oval") {
    path.moveTo(cx - half * 0.28, top + height * 0.035);
    path.quadraticCurveTo(cx, top - height * 0.015, cx + half * 0.28, top + height * 0.035);
    path.bezierCurveTo(cx + half * 0.92, top + height * 0.16, cx + half * 0.95, bottom - height * 0.2, cx + half * 0.54, bottom - height * 0.04);
    path.quadraticCurveTo(cx, bottom + height * 0.035, cx - half * 0.54, bottom - height * 0.04);
    path.bezierCurveTo(cx - half * 0.95, bottom - height * 0.2, cx - half * 0.92, top + height * 0.16, cx - half * 0.28, top + height * 0.035);
  } else if (shapeName === "stiletto") {
    path.moveTo(cx, top);
    path.bezierCurveTo(cx + half * 0.88, top + height * 0.24, cx + half * 1.02, bottom - height * 0.18, cx + half * 0.58, bottom - height * 0.04);
    path.quadraticCurveTo(cx, bottom + height * 0.035, cx - half * 0.58, bottom - height * 0.04);
    path.bezierCurveTo(cx - half * 1.02, bottom - height * 0.18, cx - half * 0.88, top + height * 0.24, cx, top);
  } else {
    path.moveTo(cx - half * 0.13, top + height * 0.025);
    path.quadraticCurveTo(cx, top - height * 0.018, cx + half * 0.13, top + height * 0.025);
    path.bezierCurveTo(cx + half * 0.66, top + height * 0.12, cx + half * 1.02, bottom - height * 0.22, cx + half * 0.58, bottom - height * 0.04);
    path.quadraticCurveTo(cx, bottom + height * 0.035, cx - half * 0.58, bottom - height * 0.04);
    path.bezierCurveTo(cx - half * 1.02, bottom - height * 0.22, cx - half * 0.66, top + height * 0.12, cx - half * 0.13, top + height * 0.025);
  }
  path.closePath();
  return path;
}

function withNailClip(ctx, callback, showOutline = true) {
  ctx.save();
  ctx.clip(nailPath());
  callback();
  ctx.restore();
  if (showOutline) drawNailOutline(ctx);
}

function drawNailBase(ctx) {
  const path = nailPath();
  const base = ctx.createLinearGradient(360, 70, 650, 650);
  base.addColorStop(0, "#fffafd");
  base.addColorStop(0.44, "#ffddec");
  base.addColorStop(1, "#f6a8c8");
  ctx.save();
  ctx.shadowColor = "rgba(143, 29, 81, 0.18)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = base;
  ctx.fill(path);
  ctx.restore();
  drawNailGloss(ctx);
  drawNailOutline(ctx);
}

function drawNailOutline(ctx) {
  ctx.save();
  ctx.strokeStyle = "rgba(143, 29, 81, 0.25)";
  ctx.lineWidth = 4;
  ctx.stroke(nailPath());
  ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
  ctx.lineWidth = 2;
  ctx.stroke(nailPath());
  ctx.restore();
}

function drawNailGloss(ctx) {
  withNailClip(ctx, () => {
    const shine = ctx.createLinearGradient(392, 90, 626, 650);
    shine.addColorStop(0, "rgba(255,255,255,0.62)");
    shine.addColorStop(0.2, "rgba(255,255,255,0.08)");
    shine.addColorStop(0.56, "rgba(255,255,255,0.34)");
    shine.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = shine;
    ctx.fillRect(330, 56, 340, 610);
  });
}

function canvasPoint(event) {
  const rect = ideaCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * ideaCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * ideaCanvas.height
  };
}

function saveDrawingSnapshot() {
  drawingUndoStack.push({
    paint: drawingContext().getImageData(0, 0, ideaCanvas.width, ideaCanvas.height),
    charms: placedCharms.map((charm) => ({ ...charm })),
    selectedCharmIndex
  });
  if (drawingUndoStack.length > 18) drawingUndoStack.shift();
}

function startDrawing(event) {
  event.preventDefault();
  const point = canvasPoint(event);
  const ctx = drawingContext();
  saveDrawingSnapshot();
  if (drawingMode === "move-aura") {
    presetAura.x = point.x;
    presetAura.y = point.y;
    presetAura.radius = Math.max(120, Number(drawSize.value) * 5.2);
    drawAura(ctx, drawColor.value, presetAura.x, presetAura.y, presetAura.radius);
    ideaStatusMessage.textContent = "Preset aura moved onto the nail.";
    return;
  }
  if (drawingMode === "charm") {
    const hitIndex = hitTestCharm(point);
    if (hitIndex >= 0) {
      selectedCharmIndex = hitIndex;
      draggingCharmIndex = hitIndex;
      charmSize.value = Math.round((placedCharms[hitIndex].scale || 1) * 100);
      renderPlacedCharms();
      ideaStatusMessage.textContent = "Move the selected 3D object by dragging it.";
    } else {
      selectedCharmIndex = addCharm(charmSelect.value, point.x, point.y, Number(charmSize.value) / 100);
      draggingCharmIndex = selectedCharmIndex;
      ideaStatusMessage.textContent = "3D object placed. Drag to move it or adjust 3D Size.";
    }
    isDrawing = true;
    lastDrawPoint = point;
    ideaCanvas.setPointerCapture(event.pointerId);
    return;
  }
  isDrawing = true;
  lastDrawPoint = point;
  ideaCanvas.setPointerCapture(event.pointerId);
  drawOnPad(event);
}

function drawOnPad(event) {
  if (!isDrawing || !lastDrawPoint) return;
  const point = canvasPoint(event);
  if (drawingMode === "charm" && draggingCharmIndex >= 0) {
    placedCharms[draggingCharmIndex].x = point.x;
    placedCharms[draggingCharmIndex].y = point.y;
    renderPlacedCharms();
    lastDrawPoint = point;
    return;
  }
  const ctx = drawingContext();
  ctx.save();
  if (stayInNail.checked) ctx.clip(nailPath());
  if (drawingMode === "aura-brush") {
    drawAuraStroke(ctx, lastDrawPoint, point, drawColor.value, Number(drawSize.value));
  } else if (drawingMode === "eraser") {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#fff6fa";
    ctx.lineWidth = Number(drawSize.value) * 2.2;
    ctx.beginPath();
    ctx.moveTo(lastDrawPoint.x, lastDrawPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  } else {
    drawNailBrushStroke(ctx, lastDrawPoint, point, drawColor.value, Number(drawSize.value));
  }
  ctx.restore();
  drawNailOutline(ctx);
  renderPlacedCharms();
  lastDrawPoint = point;
}

function stopDrawing(event) {
  if (!isDrawing) return;
  isDrawing = false;
  lastDrawPoint = null;
  draggingCharmIndex = -1;
  try {
    ideaCanvas.releasePointerCapture(event.pointerId);
  } catch {}
}

function undoDrawing() {
  const snapshot = drawingUndoStack.pop();
  if (!snapshot) {
    ideaStatusMessage.textContent = "Nothing to undo yet.";
    return;
  }
  if (snapshot.paint) {
    drawingContext().putImageData(snapshot.paint, 0, 0);
    placedCharms.splice(0, placedCharms.length, ...snapshot.charms.map((charm) => ({ ...charm })));
    selectedCharmIndex = snapshot.selectedCharmIndex ?? -1;
    renderPlacedCharms();
  } else {
    drawingContext().putImageData(snapshot, 0, 0);
    renderPlacedCharms();
  }
  ideaStatusMessage.textContent = "Sketch undo applied.";
}

function sketchDataUrl() {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = ideaCanvas.width;
  exportCanvas.height = ideaCanvas.height;
  const ctx = exportCanvas.getContext("2d");
  ctx.drawImage(ideaCanvas, 0, 0);
  ctx.drawImage(charmCanvas, 0, 0);
  return exportCanvas.toDataURL("image/png");
}

function applyDrawingEffect(effect) {
  saveDrawingSnapshot();
  const ctx = drawingContext();
  if (effect === "polish") fillPolish(ctx, drawPolish.value);
  if (effect === "bucket") fillPolish(ctx, drawColor.value);
  if (effect === "aura") drawAura(ctx, drawColor.value, presetAura.x, presetAura.y, presetAura.radius);
  if (effect === "french") drawFrenchTip(ctx, drawColor.value);
  if (effect === "glitter") drawGlitter(ctx, drawColor.value, 130);
  if (effect === "chrome") drawChrome(ctx);
  if (effect === "charm") {
    selectedCharmIndex = addCharm(charmSelect.value, 570, 410, Number(charmSize.value) / 100);
    ideaStatusMessage.textContent = "3D object placed. Use Tap 3D to drag it or adjust 3D Size.";
    return;
  }
  if (effect === "ai-aura") {
    fillPolish(ctx, drawPolish.value);
    drawAura(ctx, drawColor.value, presetAura.x, presetAura.y, presetAura.radius);
    drawChrome(ctx);
    drawGlitter(ctx, "#ffffff", 34);
    renderPlacedCharms();
    ideaStatusMessage.textContent = "AI aura assist added polish, aura, shine, and tiny sparkle.";
    return;
  }
  if (effect === "ai-clean") {
    cleanNailEdges(ctx);
    ideaStatusMessage.textContent = "AI clean edges kept the design inside the nail.";
    return;
  }
  renderPlacedCharms();
  ideaStatusMessage.textContent = "Nail design tool applied.";
}

function fillPolish(ctx, color) {
  withNailClip(ctx, () => {
    const polish = ctx.createLinearGradient(360, 80, 650, 574);
    polish.addColorStop(0, lightenColor(color, 42));
    polish.addColorStop(0.58, color);
    polish.addColorStop(1, darkenColor(color, 18));
    ctx.fillStyle = polish;
    ctx.fillRect(300, 48, 400, 560);
    drawSubtleNailTexture(ctx);
  });
  drawNailGloss(ctx);
}

function drawNailBrushStroke(ctx, from, to, color, size) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy) || 1;
  const nx = -dy / distance;
  const ny = dx / distance;
  const width = Math.max(6, size);
  const steps = Math.max(1, Math.ceil(distance / 7));
  ctx.globalCompositeOperation = "source-over";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let i = 0; i < steps; i += 1) {
    const t1 = i / steps;
    const t2 = (i + 1) / steps;
    const sx = from.x + dx * t1;
    const sy = from.y + dy * t1;
    const x = from.x + dx * t2;
    const y = from.y + dy * t2;
    for (let bristle = -3; bristle <= 3; bristle += 1) {
      const offset = (bristle / 3) * width * 0.42;
      const jitter = Math.sin((x + y + bristle * 31) * 0.035) * width * 0.06;
      ctx.strokeStyle = bristle === 0 ? withAlpha(lightenColor(color, 30), 0.72) : withAlpha(color, 0.42);
      ctx.lineWidth = Math.max(1.2, width * (bristle === 0 ? 0.34 : 0.16));
      ctx.beginPath();
      ctx.moveTo(sx + nx * offset, sy + ny * offset);
      ctx.lineTo(x + nx * (offset + jitter), y + ny * (offset + jitter));
      ctx.stroke();
    }
  }
  const gloss = ctx.createLinearGradient(from.x, from.y, to.x + nx * width, to.y + ny * width);
  gloss.addColorStop(0, "rgba(255,255,255,0.34)");
  gloss.addColorStop(0.45, "rgba(255,255,255,0.04)");
  gloss.addColorStop(1, "rgba(255,255,255,0.28)");
  ctx.strokeStyle = gloss;
  ctx.lineWidth = Math.max(1.5, width * 0.18);
  ctx.beginPath();
  ctx.moveTo(from.x + nx * width * 0.18, from.y + ny * width * 0.18);
  ctx.lineTo(to.x + nx * width * 0.18, to.y + ny * width * 0.18);
  ctx.stroke();
}

function drawAuraStroke(ctx, from, to, color, size) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy) || 1;
  const steps = Math.max(1, Math.ceil(distance / 12));
  const radius = Math.max(34, size * 2.8);
  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = from.x + dx * t;
    const y = from.y + dy * t;
    const aura = ctx.createRadialGradient(x, y, 2, x, y, radius);
    aura.addColorStop(0, withAlpha(lightenColor(color, 22), 0.48));
    aura.addColorStop(0.35, withAlpha(color, 0.22));
    aura.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = aura;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
}

function drawAura(ctx, color, x = 500, y = 310, radius = 210) {
  presetAura.x = x;
  presetAura.y = y;
  presetAura.radius = radius;
  withNailClip(ctx, () => {
    const aura = ctx.createRadialGradient(x, y - radius * 0.04, 10, x, y, radius);
    aura.addColorStop(0, withAlpha(lightenColor(color, 28), 0.94));
    aura.addColorStop(0.25, withAlpha(color, 0.68));
    aura.addColorStop(0.58, withAlpha(color, 0.34));
    aura.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = aura;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  });
}

function drawFrenchTip(ctx, color) {
  const shapeName = drawNailShape.value;
  withNailClip(ctx, () => {
    const { top } = nailTemplate;
    const smileY = top + (shapeName === "coffin" || shapeName === "square" ? 112 : 132);
    ctx.fillStyle = color;
    ctx.beginPath();
    if (shapeName === "coffin" || shapeName === "square") {
      ctx.rect(300, 36, 400, smileY - 36);
    } else {
      ctx.moveTo(300, 36);
      ctx.lineTo(700, 36);
      ctx.lineTo(700, smileY);
      ctx.bezierCurveTo(630, smileY - 30, 590, smileY + 26, 500, smileY + 30);
      ctx.bezierCurveTo(410, smileY + 26, 370, smileY - 30, 300, smileY);
      ctx.closePath();
    }
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    if (shapeName === "coffin" || shapeName === "square") {
      ctx.moveTo(365, smileY);
      ctx.bezierCurveTo(430, smileY + 20, 570, smileY + 20, 635, smileY);
    } else {
      ctx.moveTo(345, smileY - 4);
      ctx.bezierCurveTo(410, smileY + 26, 460, smileY + 38, 500, smileY + 38);
      ctx.bezierCurveTo(540, smileY + 38, 590, smileY + 26, 655, smileY - 4);
    }
    ctx.stroke();
  });
}

function drawGlitter(ctx, color, count) {
  withNailClip(ctx, () => {
    for (let i = 0; i < count; i += 1) {
      const x = 370 + Math.random() * 260;
      const y = 100 + Math.random() * 430;
      const size = 1.4 + Math.random() * 4.6;
      ctx.fillStyle = i % 4 === 0 ? "rgba(255,255,255,0.94)" : withAlpha(color, 0.72);
      drawStar(ctx, x, y, size);
    }
  });
}

function drawChrome(ctx) {
  withNailClip(ctx, () => {
    const chrome = ctx.createLinearGradient(330, 90, 660, 550);
    chrome.addColorStop(0, "rgba(255,255,255,0.78)");
    chrome.addColorStop(0.18, "rgba(255,255,255,0.04)");
    chrome.addColorStop(0.38, "rgba(255,255,255,0.64)");
    chrome.addColorStop(0.52, "rgba(255,255,255,0.08)");
    chrome.addColorStop(0.72, "rgba(255,255,255,0.4)");
    chrome.addColorStop(1, "rgba(95,25,60,0.12)");
    ctx.fillStyle = chrome;
    ctx.fillRect(310, 60, 380, 560);
  });
}

function addCharm(type, x, y, scale) {
  placedCharms.push({
    type,
    x,
    y,
    scale: Math.max(0.45, Math.min(1.9, scale || 1))
  });
  renderPlacedCharms();
  return placedCharms.length - 1;
}

function renderPlacedCharms() {
  if (!charmCanvas) return;
  const ctx = charmContext();
  ctx.clearRect(0, 0, charmCanvas.width, charmCanvas.height);
  placedCharms.forEach((charm, index) => {
    drawCharm(ctx, charm.type, charm.x, charm.y, charm.scale || 1, index === selectedCharmIndex);
  });
}

function hitTestCharm(point) {
  for (let index = placedCharms.length - 1; index >= 0; index -= 1) {
    const charm = placedCharms[index];
    const radius = (charm.type === "bow" ? 56 : 42) * (charm.scale || 1);
    if (Math.hypot(point.x - charm.x, point.y - charm.y) <= radius) return index;
  }
  return -1;
}

function drawCharm(ctx, type, x = 570, y = 410, scale = 1, selected = false) {
  withNailClip(ctx, () => {
    ctx.save();
    drawCharmShadow(ctx, x, y, (type === "bow" ? 58 : 38) * scale);
    ctx.shadowColor = "rgba(74, 12, 42, 0.32)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 7;
    if (type === "pearl") drawPearl(ctx, x, y, 26 * scale);
    if (type === "crystal") drawCrystal(ctx, x, y, 30 * scale);
    if (type === "bow") drawBow(ctx, x, y, 70 * scale);
    if (type === "heart") drawHeart(ctx, x, y, 30 * scale);
    if (type === "star") {
      ctx.fillStyle = "#ffd36b";
      drawStar(ctx, x, y, 33 * scale);
      ctx.strokeStyle = "rgba(143, 92, 15, 0.28)";
      ctx.lineWidth = 2;
      drawStar(ctx, x, y, 33 * scale);
    }
    ctx.restore();
    if (selected) drawCharmSelection(ctx, x, y, type === "bow" ? 46 * scale : 36 * scale);
  }, false);
}

function cleanNailEdges(ctx) {
  const copy = document.createElement("canvas");
  copy.width = ideaCanvas.width;
  copy.height = ideaCanvas.height;
  copy.getContext("2d").drawImage(ideaCanvas, 0, 0);
  clearDrawingPad();
  withNailClip(ctx, () => {
    ctx.drawImage(copy, 0, 0);
  });
  renderPlacedCharms();
}

function drawSubtleNailTexture(ctx) {
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  for (let y = 115; y < 540; y += 22) {
    ctx.beginPath();
    ctx.moveTo(380, y);
    ctx.bezierCurveTo(450, y + 10, 540, y - 10, 622, y + 8);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawCharmShadow(ctx, x, y, size) {
  const shadow = ctx.createRadialGradient(x, y + size * 0.2, 2, x, y + size * 0.2, size);
  shadow.addColorStop(0, "rgba(74, 12, 42, 0.24)");
  shadow.addColorStop(0.58, "rgba(74, 12, 42, 0.08)");
  shadow.addColorStop(1, "rgba(74, 12, 42, 0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(x, y + size * 0.22, size * 0.72, size * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawCharmSelection(ctx, x, y, radius) {
  ctx.save();
  ctx.setLineDash([8, 7]);
  ctx.strokeStyle = "rgba(203, 46, 114, 0.82)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(x, y, radius * 1.15, radius * 0.86, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.strokeStyle = "rgba(203, 46, 114, 0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + radius * 0.88, y - radius * 0.68, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPearl(ctx, x, y, r) {
  const pearl = ctx.createRadialGradient(x - r * 0.35, y - r * 0.45, 2, x, y, r);
  pearl.addColorStop(0, "#ffffff");
  pearl.addColorStop(0.55, "#f5e8ee");
  pearl.addColorStop(1, "#cfaebe");
  ctx.fillStyle = pearl;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(126, 76, 96, 0.2)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.beginPath();
  ctx.arc(x - r * 0.32, y - r * 0.38, r * 0.22, 0, Math.PI * 2);
  ctx.fill();
}

function drawCrystal(ctx, x, y, r) {
  const crystal = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
  crystal.addColorStop(0, "rgba(255,255,255,0.98)");
  crystal.addColorStop(0.42, "rgba(206,232,255,0.86)");
  crystal.addColorStop(1, "rgba(236,211,255,0.92)");
  ctx.fillStyle = crystal;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r * 0.82, y - r * 0.18);
  ctx.lineTo(x + r * 0.55, y + r * 0.84);
  ctx.lineTo(x - r * 0.55, y + r * 0.84);
  ctx.lineTo(x - r * 0.82, y - r * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(179,197,220,0.9)";
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x, y - r * 0.85);
  ctx.lineTo(x, y + r * 0.74);
  ctx.moveTo(x - r * 0.72, y - r * 0.16);
  ctx.lineTo(x + r * 0.72, y - r * 0.16);
  ctx.stroke();
}

function drawBow(ctx, x, y, size) {
  const bow = ctx.createLinearGradient(x - size * 0.52, y - size * 0.2, x + size * 0.52, y + size * 0.25);
  bow.addColorStop(0, "#fff1f7");
  bow.addColorStop(0.5, "#ff9ec5");
  bow.addColorStop(1, "#d83c82");
  ctx.fillStyle = bow;
  ctx.strokeStyle = "rgba(143, 29, 81, 0.52)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(x - size * 0.22, y, size * 0.24, size * 0.16, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x + size * 0.22, y, size * 0.24, size * 0.16, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.64)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - size * 0.36, y - size * 0.02);
  ctx.quadraticCurveTo(x - size * 0.23, y - size * 0.12, x - size * 0.08, y - size * 0.02);
  ctx.moveTo(x + size * 0.36, y - size * 0.02);
  ctx.quadraticCurveTo(x + size * 0.23, y - size * 0.12, x + size * 0.08, y - size * 0.02);
  ctx.stroke();
  drawPearl(ctx, x, y, size * 0.11);
}

function drawHeart(ctx, x, y, r) {
  const heart = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
  heart.addColorStop(0, "#ffb3d0");
  heart.addColorStop(0.58, "#e94b8f");
  heart.addColorStop(1, "#a91652");
  ctx.fillStyle = heart;
  ctx.beginPath();
  ctx.moveTo(x, y + r * 0.8);
  ctx.bezierCurveTo(x - r * 1.6, y - r * 0.2, x - r, y - r * 1.5, x, y - r * 0.55);
  ctx.bezierCurveTo(x + r, y - r * 1.5, x + r * 1.6, y - r * 0.2, x, y + r * 0.8);
  ctx.fill();
  ctx.strokeStyle = "rgba(113, 12, 55, 0.26)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.beginPath();
  ctx.ellipse(x - r * 0.28, y - r * 0.3, r * 0.2, r * 0.32, -0.65, 0, Math.PI * 2);
  ctx.fill();
}

function drawStar(ctx, x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const radius = i % 2 === 0 ? r : r * 0.36;
    const angle = -Math.PI / 2 + (i * Math.PI) / 4;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

function withAlpha(color, alpha) {
  const { r, g, b } = colorToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function lightenColor(color, amount) {
  const { r, g, b } = colorToRgb(color);
  return `rgb(${Math.min(255, r + amount)}, ${Math.min(255, g + amount)}, ${Math.min(255, b + amount)})`;
}

function darkenColor(color, amount) {
  const { r, g, b } = colorToRgb(color);
  return `rgb(${Math.max(0, r - amount)}, ${Math.max(0, g - amount)}, ${Math.max(0, b - amount)})`;
}

function colorToRgb(color) {
  if (!color) return { r: 203, g: 46, b: 114 };
  const rgbMatch = String(color).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3])
    };
  }
  return hexToRgb(color);
}

function hexToRgb(hex) {
  const normalized = String(hex).replace("#", "").trim();
  const value = Number.parseInt(normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized, 16);
  if (Number.isNaN(value)) return { r: 203, g: 46, b: 114 };
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

function useSketchAsIdeaPhoto() {
  ideaPhotoPreview.src = sketchDataUrl();
  ideaPhotoPreview.hidden = false;
  ideaPhoto.value = "";
  ideaStatusMessage.textContent = "Sketch is set as the idea photo.";
}

async function previewIdeaPhoto() {
  const file = ideaPhoto.files && ideaPhoto.files[0];
  if (!file) {
    clearIdeaPhotoPreview();
    return;
  }
  ideaPhotoPreview.src = await fileToCompressedDataUrl(file, 1000, 0.84);
  ideaPhotoPreview.hidden = false;
  ideaStatusMessage.textContent = "Inspiration photo ready.";
}

function clearIdeaPhotoPreview() {
  ideaPhotoPreview.removeAttribute("src");
  ideaPhotoPreview.hidden = true;
  ideaPhoto.value = "";
}

async function addDesignIdea() {
  const name = ideaName.value.trim();
  if (!name) {
    ideaStatusMessage.textContent = "Add an idea name first.";
    return;
  }
  let image = ideaPhotoPreview.getAttribute("src") || "";
  if (ideaPhoto.files && ideaPhoto.files[0] && !image) {
    image = await fileToCompressedDataUrl(ideaPhoto.files[0], 1000, 0.84);
  }
  adminState.ideas.unshift({
    id: `idea-${Date.now()}`,
    createdAt: new Date().toLocaleString(),
    name,
    shape: ideaShape.value.trim(),
    length: ideaLength.value.trim(),
    colors: ideaColors.value.trim(),
    art: ideaArt.value.trim(),
    materials: ideaMaterials.value.trim(),
    notes: ideaNotes.value.trim(),
    status: ideaStatus.value,
    price: ideaPrice.value.trim(),
    image
  });
  saveAdminState();
  renderIdeas();
  [ideaName, ideaShape, ideaLength, ideaColors, ideaArt, ideaMaterials, ideaNotes, ideaPrice].forEach((input) => {
    input.value = "";
  });
  ideaStatus.value = "Idea";
  clearIdeaPhotoPreview();
  ideaStatusMessage.textContent = "Idea saved to the design studio.";
  autoGrowTextareas();
}

function renderIdeas() {
  if (!ideaList) return;
  const ideas = Array.isArray(adminState.ideas) ? adminState.ideas : [];
  ideaCountBadge.textContent = `${ideas.length} idea${ideas.length === 1 ? "" : "s"}`;
  ideaList.innerHTML = ideas.length
    ? ideas
        .map((idea, index) => `
          <article class="idea-card admin-control">
            ${idea.image ? `<img class="idea-image" src="${escapeAttribute(idea.image)}" alt="" />` : `<div class="idea-image idea-placeholder">No photo yet</div>`}
            <div class="idea-fields">
              <div class="admin-product-head">
                <strong>${escapeHTML(idea.name)}</strong>
                <button class="delete-product" type="button" data-delete-idea="${index}">Remove</button>
              </div>
              <p class="idea-date">${escapeHTML(idea.createdAt || "Saved idea")}</p>
              <label>Idea name <input data-idea="${index}" data-field="name" value="${escapeAttribute(idea.name || "")}" /></label>
              <div class="admin-field-row">
                <label>Shape <input data-idea="${index}" data-field="shape" value="${escapeAttribute(idea.shape || "")}" /></label>
                <label>Length <input data-idea="${index}" data-field="length" value="${escapeAttribute(idea.length || "")}" /></label>
              </div>
              <label>Color recipe <textarea data-idea="${index}" data-field="colors">${escapeTextarea(idea.colors || "")}</textarea></label>
              <label>Art details <textarea data-idea="${index}" data-field="art">${escapeTextarea(idea.art || "")}</textarea></label>
              <label>Materials and steps <textarea data-idea="${index}" data-field="materials">${escapeTextarea(idea.materials || "")}</textarea></label>
              <label>Extra notes <textarea data-idea="${index}" data-field="notes">${escapeTextarea(idea.notes || "")}</textarea></label>
              <div class="admin-field-row">
                <label>Status
                  <select data-idea="${index}" data-field="status">
                    ${["Idea", "Testing", "Ready to sell", "Needs supplies"].map((status) => `<option value="${status}"${idea.status === status ? " selected" : ""}>${status}</option>`).join("")}
                  </select>
                </label>
                <label>Target price <input data-idea="${index}" data-field="price" value="${escapeAttribute(idea.price || "")}" /></label>
              </div>
              <button class="button secondary wide" type="button" data-idea-to-product="${index}">Use In Product Form</button>
            </div>
          </article>
        `)
        .join("")
    : `<div class="admin-control"><p>No design ideas saved yet.</p></div>`;
  autoGrowTextareas(ideaList);
}

function updateIdeaFromCard(event) {
  const field = event.target.closest("[data-idea]");
  if (!field) return;
  const index = Number(field.dataset.idea);
  const key = field.dataset.field;
  if (!adminState.ideas[index] || !key) return;
  adminState.ideas[index][key] = field.value;
  saveAdminState();
  if (key === "name") {
    const title = field.closest(".idea-card")?.querySelector(".admin-product-head strong");
    if (title) title.textContent = field.value || "Untitled idea";
  }
}

function handleIdeaListClick(event) {
  const deleteButton = event.target.closest("[data-delete-idea]");
  if (deleteButton) {
    adminState.ideas.splice(Number(deleteButton.dataset.deleteIdea), 1);
    saveAdminState();
    renderIdeas();
    return;
  }
  const productButton = event.target.closest("[data-idea-to-product]");
  if (productButton) {
    const idea = adminState.ideas[Number(productButton.dataset.ideaToProduct)];
    if (!idea) return;
    document.querySelector("#newProductName").value = idea.name || "";
    document.querySelector("#newProductPrice").value = idea.price || "";
    document.querySelector("#newProductCategory").value = [idea.shape, idea.length, idea.status].filter(Boolean).join(", ");
    document.querySelector("#newProductDescription").value = [idea.shape, idea.length, idea.art].filter(Boolean).join(" - ");
    document.querySelector("#newProductNotes").value = [
      idea.colors ? `Colors: ${idea.colors}` : "",
      idea.materials ? `Materials: ${idea.materials}` : "",
      idea.notes ? `Notes: ${idea.notes}` : ""
    ].filter(Boolean).join("\n\n");
    switchAdminView("site");
    document.querySelector("#newProductName").focus();
    addProductStatus.textContent = "Idea copied into the product form.";
    autoGrowTextareas();
  }
}

function renderCustomProducts() {
  document.querySelectorAll(".product.custom-added").forEach((product) => product.remove());
  adminState.customProducts.forEach((product) => {
    const article = document.createElement("article");
    article.className = "product custom-added is-visible";
    article.dataset.category = product.category;
    article.innerHTML = `
      <div class="nail-preview photo-preview" aria-hidden="true">
        <img src="${escapeAttribute(product.image)}" alt="" />
      </div>
      <div class="product-copy">
        <p class="product-tag">${escapeHTML(product.tag)}</p>
        <h3>${escapeHTML(product.name)}</h3>
        <div class="swatch-row" aria-label="Color palette">
          <span style="--swatch: #ffe0eb"></span>
          <span style="--swatch: #f3659e"></span>
          <span style="--swatch: #fff7fb"></span>
        </div>
        <p>${escapeHTML(product.description)}</p>
        <div class="product-bottom">
          <strong>$${escapeHTML(product.price)}</strong>
          <button type="button" data-name="${escapeAttribute(product.name)}" data-price="${escapeAttribute(product.price)}">Add</button>
        </div>
      </div>
    `;
    article.querySelector("[data-name]").addEventListener("click", (event) => {
      addToCart(event.currentTarget.dataset.name, event.currentTarget.dataset.price);
    });
    productGrid.appendChild(article);
  });
  setupProductTryOns();
}

setupAdmin();
