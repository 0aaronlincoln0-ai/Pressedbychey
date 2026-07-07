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
const guestCheckoutOpen = document.querySelector("#guestCheckoutOpen");
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
const customOrderName = document.querySelector("#customOrderName");
const customOrderDescription = document.querySelector("#customOrderDescription");
const customOrderPhoto = document.querySelector("#customOrderPhoto");
const customOrderPreview = document.querySelector("#customOrderPreview");
const customOrderPreviewImage = customOrderPreview?.querySelector("img");
const customOrderPhotoName = document.querySelector("#customOrderPhotoName");
const customOrderPhotoRemove = document.querySelector("#customOrderPhotoRemove");
const customOrderSubmit = document.querySelector("#customOrderSubmit");
const customOrderStatus = document.querySelector("#customOrderStatus");
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
const saveProductChangesButton = document.querySelector("#saveProductChanges");
const addProductStatus = document.querySelector("#addProductStatus");
const productCountBadge = document.querySelector("#productCountBadge");
const lookCountBadge = document.querySelector("#lookCountBadge");
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
const productDetailContent = document.querySelector("#productDetailContent");
const filterRow = document.querySelector("#shopFilters");
const pageBook = document.querySelector("#pageBook");
const bookStatus = document.querySelector("#bookStatus");
const sitePages = () => document.querySelectorAll("[data-page-panel]");
const pageLinks = () => document.querySelectorAll("[data-page-link]");
const navBar = document.querySelector(".nav");
const scrollProgress = document.querySelector(".scroll-progress");
const checkoutButton = document.querySelector("#checkoutButton");
const checkoutStatus = document.querySelector("#checkoutStatus");
const accountAuth = document.querySelector("#accountAuth");
const accountDashboard = document.querySelector("#accountDashboard");
const accountStatus = document.querySelector("#accountStatus");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const forgotPasswordButton = document.querySelector("#forgotPasswordButton");
const passwordResetCard = document.querySelector("#passwordResetCard");
const adminSessionCard = document.querySelector("#adminSessionCard");
const adminContinueEditing = document.querySelector("#adminContinueEditing");
const adminOpenOrders = document.querySelector("#adminOpenOrders");
const adminExitMode = document.querySelector("#adminExitMode");
const resetEmail = document.querySelector("#resetEmail");
const sendResetCode = document.querySelector("#sendResetCode");
const resetCodeStep = document.querySelector("#resetCodeStep");
const resetCode = document.querySelector("#resetCode");
const resetNewPassword = document.querySelector("#resetNewPassword");
const verifyResetCode = document.querySelector("#verifyResetCode");
const cancelResetPassword = document.querySelector("#cancelResetPassword");
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
  left: {
    thumb: document.querySelector("#sizeLeftThumb"),
    index: document.querySelector("#sizeLeftIndex"),
    middle: document.querySelector("#sizeLeftMiddle"),
    ring: document.querySelector("#sizeLeftRing"),
    pinky: document.querySelector("#sizeLeftPinky")
  },
  right: {
    thumb: document.querySelector("#sizeRightThumb"),
    index: document.querySelector("#sizeRightIndex"),
    middle: document.querySelector("#sizeRightMiddle"),
    ring: document.querySelector("#sizeRightRing"),
    pinky: document.querySelector("#sizeRightPinky")
  }
};
const adminUserList = document.querySelector("#adminUserList");
const adminGuestOrderList = document.querySelector("#adminGuestOrderList");
const adminLiveOrderList = document.querySelector("#adminLiveOrderList");
const liveOrderStatus = document.querySelector("#liveOrderStatus");
const refreshLiveOrdersButton = document.querySelector("#refreshLiveOrders");
const adminContentList = document.querySelector("#adminContentList");
const adminContentStatus = document.querySelector("#adminContentStatus");
const adminLayoutList = document.querySelector("#adminLayoutList");
const adminLayoutStatus = document.querySelector("#adminLayoutStatus");
const resetLayoutButton = document.querySelector("#resetLayoutButton");
const cart = [];
let selectedLook = null;
let customInspirationSrc = "";
let customOrderPhotoDataUrl = "";
let textEditMode = false;
let inlineEditSaveTimer = null;
let inlineImageEditTarget = null;
let adminEditToolbar = null;
let adminEditToggle = null;
let adminEditStatus = null;
let adminToolbarResizeObserver = null;
let adminInlineImageInput = null;
let adminInlineProductInput = null;
let adminInventoryPanel = null;
let adminInventoryStatus = null;
let adminInventoryOverview = null;
let adminInventoryList = null;
let adminInventoryPhotoInput = null;
let cartEmptyMessage = "Your bag is ready for something glossy.";
let isDrawing = false;
let lastDrawPoint = null;
let eraserMode = false;
let drawingMode = "brush";
let selectedCharmIndex = -1;
let draggingCharmIndex = -1;
let visibleLookSlotCount = 12;
let selectedProductIndex = -1;
let productDetailQuantity = 1;
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
const ADMIN_EMAILS = ["admin", "chey", "admin@pressedbychey.com", "chey@pressedbychey.com", "cheyenne@pressedbychey.com", "callison@pressedbychey.com"];
const ADMIN_SESSION_KEY = "pressedByCheyAdminSession";
const ADMIN_SESSION_TTL_MS = 2 * 60 * 60 * 1000;
const ADMIN_STORAGE_KEY = "pressedByCheyEdits";
const ADMIN_REMOTE_STATE_ENDPOINT = "/.netlify/functions/admin-state";
const ADMIN_REMOTE_PHOTO_ENDPOINT = `${ADMIN_REMOTE_STATE_ENDPOINT}?photo=upload`;
const ADMIN_PENDING_REMOTE_STATE_KEY = "pressedByCheyPendingAdminRemoteState";
const ADMIN_REMOTE_SAVE_DEBOUNCE_MS = 700;
const ADMIN_REMOTE_RETRY_DELAY_MS = 4000;
const ADMIN_LIVE_SAVE_FAILURE_MESSAGE = "Saved on this device. Live site sync is pending and will retry automatically.";
const ADMIN_LIVE_SAVE_SUCCESS_MESSAGE = "Saved to the live website.";
const CUSTOMER_STORAGE_KEY = "pressedByCheyCustomers";
const GUEST_ORDER_STORAGE_KEY = "pressedByCheyGuestOrders";
const STRIPE_CHECKOUT_ENDPOINT = "/.netlify/functions/create-checkout-session";
const STRIPE_CHECKOUT_STATUS_ENDPOINT = "/.netlify/functions/checkout-status";
const ADMIN_ORDERS_ENDPOINT = "/.netlify/functions/admin-orders";
const CHECKOUT_PENDING_ORDER_KEY = "pressedByCheyPendingCheckoutOrder";
const nailSizeOptions = ["", "000", "00", "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"];
const sizeFingerKeys = ["thumb", "index", "middle", "ring", "pinky"];
const sizeHandKeys = ["left", "right"];
let customerState = {
  users: [],
  currentEmail: ""
};
let passwordResetRequest = null;
let guestOrders = [];
let liveOrders = [];
let adminSession = null;
let adminState = {
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
  customPages: [],
    customBlocks: [],
    hiddenText: {},
    textOffsets: {},
    layoutOrder: [],
    hiddenSections: {}
};
const quickContentFields = [
  { key: "hero-eyebrow", label: "Hero eyebrow", selector: ".hero .eyebrow" },
  { key: "hero-title", label: "Hero title", selector: "#hero-title" },
  { key: "hero-description", label: "Hero description", selector: ".hero-text", multiline: true },
  { key: "hero-primary-button", label: "Primary button label", selector: ".hero-actions .button.primary" },
  { key: "hero-secondary-button", label: "Secondary button label", selector: ".hero-actions .button.secondary" },
  { key: "hero-tag-one", label: "Floating tag 1", selector: ".tag-one" },
  { key: "hero-tag-two", label: "Floating tag 2", selector: ".tag-two" },
  { key: "shop-eyebrow", label: "Shop eyebrow", selector: "#shop .eyebrow" },
  { key: "shop-title", label: "Shop heading", selector: "#shop-title" },
  { key: "fit-eyebrow", label: "Fit guide eyebrow", selector: "#fit .eyebrow" },
  { key: "fit-title", label: "Fit guide heading", selector: "#fit-title" },
  { key: "fit-step-1-title", label: "Fit step 1 title", selector: '.fit-grid article:nth-of-type(1) h3' },
  { key: "fit-step-1-body", label: "Fit step 1 body", selector: '.fit-grid article:nth-of-type(1) p', multiline: true },
  { key: "fit-step-2-title", label: "Fit step 2 title", selector: '.fit-grid article:nth-of-type(2) h3' },
  { key: "fit-step-2-body", label: "Fit step 2 body", selector: '.fit-grid article:nth-of-type(2) p', multiline: true },
  { key: "fit-step-3-title", label: "Fit step 3 title", selector: '.fit-grid article:nth-of-type(3) h3' },
  { key: "fit-step-3-body", label: "Fit step 3 body", selector: '.fit-grid article:nth-of-type(3) p', multiline: true },
  { key: "reviews-eyebrow", label: "Reviews eyebrow", selector: "#reviews .eyebrow" },
  { key: "reviews-title", label: "Reviews heading", selector: "#reviews-title" },
  { key: "review-1-quote", label: "Review 1 quote", selector: '.review-track figure:nth-of-type(1) blockquote', multiline: true },
  { key: "review-1-name", label: "Review 1 name", selector: '.review-track figure:nth-of-type(1) figcaption' },
  { key: "review-2-quote", label: "Review 2 quote", selector: '.review-track figure:nth-of-type(2) blockquote', multiline: true },
  { key: "review-2-name", label: "Review 2 name", selector: '.review-track figure:nth-of-type(2) figcaption' },
  { key: "review-3-quote", label: "Review 3 quote", selector: '.review-track figure:nth-of-type(3) blockquote', multiline: true },
  { key: "review-3-name", label: "Review 3 name", selector: '.review-track figure:nth-of-type(3) figcaption' },
  { key: "footer-description", label: "Footer description", selector: ".footer p", multiline: true }
];
const layoutSectionMeta = [
  { key: "home", label: "Home", selector: '[data-page-panel="home"]', note: "Hero, trend strip, and welcome content" },
  { key: "shop", label: "Shop", selector: '[data-page-panel="shop"]', note: "Product grid and shopping page" },
  { key: "fit", label: "Fit guide", selector: '[data-page-panel="fit"]', note: "Sizing and application guidance page" },
  { key: "reviews", label: "Reviews", selector: '[data-page-panel="reviews"]', note: "Customer social proof page" }
];
const LOOK_SLOT_BATCH_SIZE = 12;

function safeSlug(value, fallback = "page") {
  const slug = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return slug || fallback;
}

function uniquePageKey(label) {
  const base = safeSlug(label, "page");
  const taken = new Set(allPageKeys());
  let key = base;
  let count = 2;
  while (taken.has(key)) {
    key = `${base}-${count}`;
    count += 1;
  }
  return key;
}

function customPageMeta() {
  return (adminState.customPages || []).map((page) => ({
    key: page.key,
    label: page.label || page.title || "New Page",
    selector: `[data-page-panel="${page.key}"]`,
    note: "Custom page added from the live admin toolbar"
  }));
}

function allLayoutSections() {
  return [...layoutSectionMeta, ...customPageMeta()];
}

function allPageKeys() {
  return allLayoutSections().map((section) => section.key);
}
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
const MAX_LOOK_SLOTS = 80;
const lookSlotPalette = [
  ["#ffbdd4", "#cb2e72"],
  ["#fff4f7", "#f5b3c9"],
  ["#ffd7e5", "#cb2e72"],
  ["#ffc2d9", "#d82675"],
  ["#fff0f6", "#ff9cc0"],
  ["#fff8fb", "#f9d7e2"],
  ["#f7dfc2", "#fff5ee"],
  ["#d7edff", "#78aee8"],
  ["#dfe9d5", "#88a57a"],
  ["#eee3ff", "#b68be8"]
];
const lookLibrary = Array.from({ length: MAX_LOOK_SLOTS }, (_, index) => {
  const [base, accentColor] = lookSlotPalette[index % lookSlotPalette.length];
  return {
    base,
    accent: accentColor,
    finish: "custom"
  };
});
const legacyCopyMigrations = [];
const corruptedQuickCopyRules = [
  {
    key: "hero-description",
    matches: (value) => /send your inspiration|custom look/i.test(normalizeCopyValue(value))
  },
  {
    key: "hero-secondary-button",
    matches: (value) => /build yours|custom/i.test(normalizeCopyValue(value))
  },
  {
    key: "shop-eyebrow",
    matches: (value) => normalizeCopyValue(value) === "Custom builder"
  },
  {
    key: "shop-title",
    matches: (value) => /design a set around your exact style/i.test(normalizeCopyValue(value))
  },
  {
    key: "reviews-eyebrow",
    matches: (value) => /^".+"$/.test(normalizeCopyValue(value)) || /salon set/i.test(normalizeCopyValue(value))
  },
  {
    key: "reviews-title",
    matches: (value) => /^[A-Z][a-z]+ [A-Z]\.?$/.test(normalizeCopyValue(value))
  }
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

const revealElements = document.querySelectorAll("[data-reveal]");

revealElements.forEach((el, index) => {
  el.style.setProperty("--reveal-index", String(index % 8));
  revealObserver.observe(el);
});

requestAnimationFrame(() => {
  revealElements.forEach((el) => {
    const box = el.getBoundingClientRect();
    const isNearViewport = box.top < window.innerHeight * 1.08 && box.bottom > -window.innerHeight * 0.08;
    if (isNearViewport) el.classList.add("is-visible");
  });
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

let currentPageKey = "home";
let adminRemoteSaveTimer = null;
let adminRemoteRetryTimer = null;
let adminRemoteSyncEventsBound = false;
let adminStateRevision = 0;
let pageVisitStack = [];
let pageScrollSyncFrame = 0;
let scrollChromeFrame = 0;
let removeBubbleFrame = 0;
let pageNavigationLockTimer = null;
let isPageNavigationLocked = false;
let lastScrollProgress = "";
let lastNavScrolled = false;
let textDragState = null;

function pageKeyFromHash(hash = window.location.hash) {
  const key = hash.replace("#", "").trim().toLowerCase();
  if (!key || key === "top") return "home";
  if (/^product-\d+$/.test(key)) return "product";
  return allPageKeys().includes(key) ? key : "home";
}

function productIndexFromHash(hash = window.location.hash) {
  const match = hash.match(/^#product-(\d+)$/i);
  return match ? Number(match[1]) : -1;
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
    customPages: [],
    customBlocks: [],
    hiddenText: {},
    textOffsets: {},
    layoutOrder: defaultLayoutOrder(),
    hiddenSections: {}
  };
}

function normalizeCopyValue(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

const photoFitOptions = [
  { value: "contain", label: "Show full photo" },
  { value: "cover", label: "Fill the frame" },
  { value: "soft-cover", label: "Soft crop" },
  { value: "free", label: "Free placement" }
];

const photoPositionOptions = [
  { value: "center", label: "Center", css: "center" },
  { value: "top", label: "Top", css: "center 18%" },
  { value: "bottom", label: "Bottom", css: "center 82%" },
  { value: "left", label: "Left", css: "18% center" },
  { value: "right", label: "Right", css: "82% center" }
];

function sanitizePhotoFit(value) {
  return photoFitOptions.some((option) => option.value === value) ? value : "contain";
}

function sanitizePhotoPosition(value) {
  return photoPositionOptions.some((option) => option.value === value) ? value : "center";
}

function sanitizePhotoZoom(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 1;
  return Math.min(2.5, Math.max(0.25, number));
}

function defaultPhotoTransform() {
  return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
}

function sanitizePhotoTransform(value = {}) {
  const fallback = defaultPhotoTransform();
  const source = value && typeof value === "object" ? value : {};
  const clamp = (number, min, max, backup) => {
    const parsed = Number(number);
    if (!Number.isFinite(parsed)) return backup;
    return Math.min(max, Math.max(min, parsed));
  };
  return {
    x: clamp(source.x, -140, 140, fallback.x),
    y: clamp(source.y, -140, 140, fallback.y),
    scaleX: clamp(source.scaleX, 0.2, 4, fallback.scaleX),
    scaleY: clamp(source.scaleY, 0.2, 4, fallback.scaleY)
  };
}

function photoFitOptionsMarkup(selectedFit) {
  const selected = sanitizePhotoFit(selectedFit);
  return photoFitOptions
    .map((option) => `<option value="${option.value}"${option.value === selected ? " selected" : ""}>${option.label}</option>`)
    .join("");
}

function photoPositionOptionsMarkup(selectedPosition) {
  const selected = sanitizePhotoPosition(selectedPosition);
  return photoPositionOptions
    .map((option) => `<option value="${option.value}"${option.value === selected ? " selected" : ""}>${option.label}</option>`)
    .join("");
}

function normalizePhotoFitMap(map = {}) {
  return Object.fromEntries(Object.entries(map || {}).map(([key, value]) => [key, sanitizePhotoFit(value)]));
}

function normalizePhotoPositionMap(map = {}) {
  return Object.fromEntries(Object.entries(map || {}).map(([key, value]) => [key, sanitizePhotoPosition(value)]));
}

function normalizePhotoZoomMap(map = {}) {
  return Object.fromEntries(Object.entries(map || {}).map(([key, value]) => [key, sanitizePhotoZoom(value)]));
}

function normalizePhotoTransformMap(map = {}) {
  return Object.fromEntries(Object.entries(map || {}).map(([key, value]) => [key, sanitizePhotoTransform(value)]));
}

function photoPositionCss(value) {
  const position = sanitizePhotoPosition(value);
  return photoPositionOptions.find((option) => option.value === position)?.css || "center";
}

function photoZoomPercent(value) {
  return Math.round((sanitizePhotoZoom(value) - 1) * 100);
}

function normalizeMoneyValue(value) {
  return String(value || "").replace(/[^0-9.]/g, "").trim();
}

function moneyNumber(value) {
  const parsed = Number(normalizeMoneyValue(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function effectiveSalePriceValue(product = {}) {
  const savedSale = normalizeMoneyValue(product.salePrice);
  if (savedSale && moneyNumber(savedSale) > 0) return savedSale;
  return calculatedSalePrice(product.price, product.discount);
}

function productCheckoutPrice(product = {}) {
  const sale = moneyNumber(effectiveSalePriceValue(product));
  return sale > 0 ? sale : moneyNumber(product.price);
}

function productPriceMarkup(product = {}) {
  const regular = normalizeMoneyValue(product.price);
  const sale = effectiveSalePriceValue(product);
  const discountLabel = productDiscountLabel({ ...product, salePrice: sale });
  if (sale && moneyNumber(sale) > 0 && regular && moneyNumber(regular) > moneyNumber(sale)) {
    return `
      <span class="price-stack">
        <span class="sale-price">$${escapeHTML(sale)}</span>
        <s>$${escapeHTML(regular)}</s>
        ${discountLabel ? `<small>${escapeHTML(discountLabel)}</small>` : ""}
      </span>
    `;
  }
  return `<strong data-admin-product-index="${product.index}" data-admin-product-field="price">$${escapeHTML(regular || "0")}</strong>`;
}

function productDiscountLabel(product = {}) {
  const label = String(product.discount || "").trim();
  if (label) return label;
  const regular = moneyNumber(product.price);
  const sale = moneyNumber(product.salePrice);
  if (regular > sale && sale > 0) return "Sale";
  return "";
}

const discountOptions = [
  ["", "No discount"],
  ["10% off", "10% off"],
  ["15% off", "15% off"],
  ["20% off", "20% off"],
  ["25% off", "25% off"],
  ["30% off", "30% off"],
  ["40% off", "40% off"],
  ["$5 off", "$5 off"],
  ["$10 off", "$10 off"],
  ["$15 off", "$15 off"],
  ["Sale", "Sale badge only"],
  ["New Drop", "New Drop badge"],
  ["Limited", "Limited badge"]
];

const categoryOptions = [
  ["custom", "Custom / handmade"],
  ["chrome", "Chrome"],
  ["jelly", "Jelly"],
  ["coquette", "Coquette"],
  ["french", "French tip"],
  ["aura", "Aura"],
  ["cat-eye", "Cat-eye"],
  ["glitter", "Glitter"],
  ["seasonal", "Seasonal"],
  ["sizing-kit", "Sizing kit"]
];

const stockOptions = [
  ["Available", "Available"],
  ["Made to order", "Made to order"],
  ["Low stock", "Low stock"],
  ["Sold out", "Sold out"],
  ["Coming soon", "Coming soon"]
];

function optionMarkup(options, selectedValue) {
  const selected = String(selectedValue || "");
  return options
    .map(([value, label]) => `<option value="${escapeAttribute(value)}"${value === selected ? " selected" : ""}>${escapeHTML(label)}</option>`)
    .join("");
}

function optionLabel(options, selectedValue, fallback = "") {
  const selected = String(selectedValue || "");
  const match = options.find(([value]) => value === selected);
  return match?.[1] || fallback || selected;
}

function formatMoneyValue(value) {
  const amount = Math.max(0, Number(value) || 0);
  return amount % 1 === 0 ? String(amount) : amount.toFixed(2).replace(/0$/, "");
}

function calculatedSalePrice(price, discount) {
  const regular = moneyNumber(price);
  if (regular <= 0) return "";
  const label = String(discount || "").trim();
  const percentMatch = label.match(/^(\d+(?:\.\d+)?)%\s*off$/i);
  if (percentMatch) {
    return formatMoneyValue(regular * (1 - Number(percentMatch[1]) / 100));
  }
  const dollarMatch = label.match(/^\$(\d+(?:\.\d+)?)\s*off$/i);
  if (dollarMatch) {
    return formatMoneyValue(Math.max(0, regular - Number(dollarMatch[1])));
  }
  return "";
}

function applyAutomaticDiscount(product, changedField = "") {
  if (!product) return;
  if (!["price", "discount"].includes(changedField)) return;
  const calculated = calculatedSalePrice(product.price, product.discount);
  if (calculated) product.salePrice = calculated;
  if (!product.discount) product.salePrice = "";
}

function productImageMarkup(product, index) {
  if (product.image) {
    return `<img src="${escapeAttribute(product.image)}" alt="" data-admin-product-image-index="${index}" data-photo-fit="${escapeAttribute(sanitizePhotoFit(product.imageFit))}" data-photo-position="${escapeAttribute(sanitizePhotoPosition(product.imagePosition))}" style="${photoTransformStyle(product.imageTransform, product.imageZoom)}" />`;
  }
  return `
    <div class="product-photo-placeholder" data-admin-product-placeholder-index="${index}">
      <div class="sample-set" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="sample-set-caption">
        <strong>Product photo coming soon</strong>
        <small>Use this polished preview, or add Chey's real nail photo.</small>
      </div>
    </div>
  `;
}

function photoTransformStyle(transform = {}, zoom = 1) {
  const safeTransform = sanitizePhotoTransform(transform);
  return [
    `--photo-zoom: ${sanitizePhotoZoom(zoom).toFixed(2)}`,
    `--photo-x: ${safeTransform.x.toFixed(2)}%`,
    `--photo-y: ${safeTransform.y.toFixed(2)}%`,
    `--photo-scale-x: ${safeTransform.scaleX.toFixed(2)}`,
    `--photo-scale-y: ${safeTransform.scaleY.toFixed(2)}`
  ].join("; ");
}

function applyPhotoFitToImage(image, fit, position = "center", zoom = 1, transform = {}) {
  if (!image) return;
  const safeTransform = sanitizePhotoTransform(transform);
  image.dataset.photoFit = sanitizePhotoFit(fit);
  image.dataset.photoPosition = sanitizePhotoPosition(position);
  image.style.setProperty("--photo-zoom", sanitizePhotoZoom(zoom).toFixed(2));
  image.style.setProperty("--photo-x", `${safeTransform.x.toFixed(2)}%`);
  image.style.setProperty("--photo-y", `${safeTransform.y.toFixed(2)}%`);
  image.style.setProperty("--photo-scale-x", safeTransform.scaleX.toFixed(2));
  image.style.setProperty("--photo-scale-y", safeTransform.scaleY.toFixed(2));
}

function applyLookFitProperties(element, fit, position = "center", zoom = 1) {
  if (!element) return;
  const safeFit = sanitizePhotoFit(fit);
  const safePosition = sanitizePhotoPosition(position);
  element.dataset.photoFit = safeFit;
  element.dataset.photoPosition = safePosition;
  element.style.setProperty("--look-fit", safeFit === "contain" ? "contain" : "cover");
  element.style.setProperty("--look-position", safeFit === "soft-cover" && safePosition === "center" ? "center 38%" : photoPositionCss(safePosition));
  element.style.setProperty("--look-zoom", sanitizePhotoZoom(zoom).toFixed(2));
}

function triggerPhotoBounce(element) {
  if (!element) return;
  element.classList.remove("photo-bounce");
  void element.offsetWidth;
  element.classList.add("photo-bounce");
}

let photoStudioModal = null;
let photoStudioResolve = null;
let photoStudioTransform = defaultPhotoTransform();
let photoStudioPointerState = null;
let adminCelebrationTimer = null;

function updatePhotoStudioPreview() {
  if (!photoStudioModal) return;
  const fit = photoStudioModal.querySelector("[data-studio-fit]")?.value;
  const position = photoStudioModal.querySelector("[data-studio-position]")?.value;
  const zoom = photoStudioModal.querySelector("[data-studio-zoom]")?.value;
  const preview = photoStudioModal.querySelector("[data-studio-preview]");
  const shell = photoStudioModal.querySelector("[data-studio-image-shell]");
  const zoomLabel = photoStudioModal.querySelector("[data-studio-zoom-label]");
  const placementLabel = photoStudioModal.querySelector("[data-studio-placement-label]");
  applyPhotoFitToImage(preview, fit, position, zoom, photoStudioTransform);
  applyPhotoFitToImage(shell, fit, position, zoom, photoStudioTransform);
  if (shell) {
    shell.dataset.photoFit = sanitizePhotoFit(fit);
    shell.dataset.photoPosition = sanitizePhotoPosition(position);
  }
  if (zoomLabel) zoomLabel.textContent = `${photoZoomPercent(zoom)}% zoom`;
  const widthInput = photoStudioModal.querySelector('[data-studio-scale="scaleX"]');
  const heightInput = photoStudioModal.querySelector('[data-studio-scale="scaleY"]');
  const widthLabel = photoStudioModal.querySelector('[data-studio-scale-label="scaleX"]');
  const heightLabel = photoStudioModal.querySelector('[data-studio-scale-label="scaleY"]');
  if (widthInput) widthInput.value = photoStudioTransform.scaleX.toFixed(2);
  if (heightInput) heightInput.value = photoStudioTransform.scaleY.toFixed(2);
  if (widthLabel) widthLabel.textContent = `${Math.round(photoStudioTransform.scaleX * 100)}%`;
  if (heightLabel) heightLabel.textContent = `${Math.round(photoStudioTransform.scaleY * 100)}%`;
  if (placementLabel) {
    placementLabel.textContent = `Move ${Math.round(photoStudioTransform.x)} / ${Math.round(photoStudioTransform.y)} - Stretch ${Math.round(photoStudioTransform.scaleX * 100)}% x ${Math.round(photoStudioTransform.scaleY * 100)}%`;
  }
}

function resetPhotoStudioPlacement() {
  photoStudioTransform = defaultPhotoTransform();
  const zoomInput = photoStudioModal?.querySelector("[data-studio-zoom]");
  if (zoomInput) zoomInput.value = "1.00";
  updatePhotoStudioPreview();
}

function startPhotoStudioPointer(event) {
  if (!photoStudioModal || event.button > 0) return;
  const frame = event.target.closest("[data-studio-frame]");
  if (!frame || event.target.closest("select, input, button:not([data-studio-handle])")) return;
  const handle = event.target.closest("[data-studio-handle]")?.dataset.studioHandle || "move";
  const rect = frame.getBoundingClientRect();
  photoStudioPointerState = {
    handle,
    startX: event.clientX,
    startY: event.clientY,
    width: Math.max(1, rect.width),
    height: Math.max(1, rect.height),
    startTransform: { ...photoStudioTransform }
  };
  frame.classList.add("is-moving-photo");
  frame.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}

function movePhotoStudioPointer(event) {
  if (!photoStudioPointerState) return;
  const state = photoStudioPointerState;
  const dx = event.clientX - state.startX;
  const dy = event.clientY - state.startY;
  const dxPercent = (dx / state.width) * 100;
  const dyPercent = (dy / state.height) * 100;
  const next = { ...state.startTransform };

  if (state.handle === "move") {
    next.x = state.startTransform.x + dxPercent;
    next.y = state.startTransform.y + dyPercent;
  } else {
    const horizontal = (dx / state.width) * 2;
    const vertical = (dy / state.height) * 2;
    if (state.handle.includes("e")) next.scaleX = state.startTransform.scaleX + horizontal;
    if (state.handle.includes("w")) next.scaleX = state.startTransform.scaleX - horizontal;
    if (state.handle.includes("s")) next.scaleY = state.startTransform.scaleY + vertical;
    if (state.handle.includes("n")) next.scaleY = state.startTransform.scaleY - vertical;
  }

  photoStudioTransform = sanitizePhotoTransform(next);
  updatePhotoStudioPreview();
  event.preventDefault();
}

function stopPhotoStudioPointer(event) {
  if (!photoStudioPointerState) return;
  photoStudioModal?.querySelector("[data-studio-frame]")?.classList.remove("is-moving-photo");
  photoStudioModal?.querySelector("[data-studio-frame]")?.releasePointerCapture?.(event.pointerId);
  photoStudioPointerState = null;
}

function sourcePlacementRect(imageWidth, imageHeight, targetWidth, targetHeight, fit = "contain", position = "center") {
  const sourceRatio = imageWidth / imageHeight;
  const targetRatio = targetWidth / targetHeight;
  const useCover = sanitizePhotoFit(fit) !== "contain";
  const scale = useCover
    ? (sourceRatio > targetRatio ? targetHeight / imageHeight : targetWidth / imageWidth)
    : (sourceRatio > targetRatio ? targetWidth / imageWidth : targetHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  const extraX = targetWidth - width;
  const extraY = targetHeight - height;
  const safePosition = sanitizePhotoPosition(position);
  const x = safePosition === "left" ? extraX * 0.18 : safePosition === "right" ? extraX * 0.82 : extraX / 2;
  const y = safePosition === "top" ? extraY * 0.18 : safePosition === "bottom" ? extraY * 0.82 : extraY / 2;
  return {
    x,
    y,
    width,
    height
  };
}

async function renderPhotoStudioFramedDataUrl() {
  if (!photoStudioModal) return "";
  const src = photoStudioModal.dataset.photoSrc || "";
  if (!src) return "";
  const frame = photoStudioModal.querySelector("[data-studio-frame]");
  const fit = sanitizePhotoFit(photoStudioModal.querySelector("[data-studio-fit]")?.value);
  const position = sanitizePhotoPosition(photoStudioModal.querySelector("[data-studio-position]")?.value);
  const image = await imageFromDataUrl(src);
  const frameRect = frame?.getBoundingClientRect();
  const aspect = frameRect?.width && frameRect?.height ? frameRect.width / frameRect.height : 1;
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = Math.max(900, Math.round(canvas.width / Math.max(0.55, Math.min(1.65, aspect))));
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff9fc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const placement = sourcePlacementRect(image.naturalWidth || image.width, image.naturalHeight || image.height, canvas.width, canvas.height, fit, position);
  const transform = sanitizePhotoTransform(photoStudioTransform);
  ctx.save();
  ctx.translate(canvas.width / 2 + (transform.x / 100) * canvas.width, canvas.height / 2 + (transform.y / 100) * canvas.height);
  ctx.scale(sanitizePhotoZoom(photoStudioModal.querySelector("[data-studio-zoom]")?.value) * transform.scaleX, sanitizePhotoZoom(photoStudioModal.querySelector("[data-studio-zoom]")?.value) * transform.scaleY);
  ctx.drawImage(image, placement.x - canvas.width / 2, placement.y - canvas.height / 2, placement.width, placement.height);
  ctx.restore();
  return canvas.toDataURL("image/jpeg", 0.9);
}

function closePhotoStudio(result = null) {
  if (!photoStudioModal) return;
  photoStudioModal.classList.remove("is-open");
  window.setTimeout(() => {
    if (photoStudioModal) photoStudioModal.hidden = true;
  }, 180);
  const resolver = photoStudioResolve;
  photoStudioResolve = null;
  if (resolver) resolver(result);
}

function ensurePhotoStudio() {
  if (photoStudioModal) return photoStudioModal;
  photoStudioModal = document.createElement("div");
  photoStudioModal.className = "photo-studio-modal";
  photoStudioModal.hidden = true;
  photoStudioModal.innerHTML = `
    <div class="photo-studio-panel" role="dialog" aria-modal="true" aria-labelledby="photoStudioTitle">
      <div class="photo-studio-head">
        <div>
          <p class="eyebrow">Photo Studio</p>
          <h3 id="photoStudioTitle">Make the product photo look right</h3>
        </div>
        <button class="photo-studio-close" type="button" data-studio-cancel aria-label="Close photo editor">x</button>
      </div>
      <div class="photo-studio-body">
        <div class="photo-studio-preview-wrap" data-studio-frame>
          <div class="photo-studio-image-shell" data-studio-image-shell>
            <img data-studio-preview alt="Photo preview before it goes live" />
            <button class="photo-resize-handle north" type="button" data-studio-handle="n" aria-label="Stretch photo up"></button>
            <button class="photo-resize-handle south" type="button" data-studio-handle="s" aria-label="Stretch photo down"></button>
            <button class="photo-resize-handle east" type="button" data-studio-handle="e" aria-label="Stretch photo right"></button>
            <button class="photo-resize-handle west" type="button" data-studio-handle="w" aria-label="Stretch photo left"></button>
            <button class="photo-resize-handle north-east" type="button" data-studio-handle="ne" aria-label="Stretch photo from top right"></button>
            <button class="photo-resize-handle north-west" type="button" data-studio-handle="nw" aria-label="Stretch photo from top left"></button>
            <button class="photo-resize-handle south-east" type="button" data-studio-handle="se" aria-label="Stretch photo from bottom right"></button>
            <button class="photo-resize-handle south-west" type="button" data-studio-handle="sw" aria-label="Stretch photo from bottom left"></button>
          </div>
          <span class="photo-studio-grid" aria-hidden="true"></span>
          <span class="photo-studio-drag-tip">Drag photo to place it</span>
          <span class="photo-studio-sparkle one"></span>
          <span class="photo-studio-sparkle two"></span>
        </div>
        <div class="photo-studio-controls">
          <p>Drag the photo itself to place it. Pull the pink handles, or use the width/height sliders, to stretch the actual photo without stretching the frame.</p>
          <small class="photo-studio-placement-readout" data-studio-placement-label>Move 0 / 0 · Stretch 100% x 100%</small>
          <label>Frame style
            <select data-studio-fit>
              ${photoFitOptionsMarkup("contain")}
            </select>
          </label>
          <label>Focus point
            <select data-studio-position>
              ${photoPositionOptionsMarkup("center")}
            </select>
          </label>
          <label>Zoom <span data-studio-zoom-label>0% zoom</span>
            <input data-studio-zoom type="range" min="0.25" max="2.5" step="0.01" value="1" />
          </label>
          <label>Photo width stretch <span data-studio-scale-label="scaleX">100%</span>
            <input data-studio-scale="scaleX" type="range" min="0.2" max="4" step="0.01" value="1" />
          </label>
          <label>Photo height stretch <span data-studio-scale-label="scaleY">100%</span>
            <input data-studio-scale="scaleY" type="range" min="0.2" max="4" step="0.01" value="1" />
          </label>
          <label class="photo-studio-replace">
            Replace With New Photo
            <input data-studio-replace type="file" accept="image/*" capture="environment" />
          </label>
          <div class="photo-studio-actions">
            <button class="button secondary" type="button" data-studio-choose>Choose Different Photo</button>
            <button class="button secondary" type="button" data-studio-reset>Reset Placement</button>
            <button class="button primary" type="button" data-studio-apply>Use This Photo</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(photoStudioModal);
  photoStudioModal.querySelectorAll("[data-studio-fit], [data-studio-position], [data-studio-zoom]").forEach((control) => {
    control.addEventListener("input", updatePhotoStudioPreview);
    control.addEventListener("change", updatePhotoStudioPreview);
  });
  photoStudioModal.querySelectorAll("[data-studio-scale]").forEach((control) => {
    const updateScale = () => {
      const key = control.dataset.studioScale;
      photoStudioTransform = sanitizePhotoTransform({
        ...photoStudioTransform,
        [key]: Number(control.value)
      });
      updatePhotoStudioPreview();
    };
    control.addEventListener("input", updateScale);
    control.addEventListener("change", updateScale);
  });
  photoStudioModal.querySelector("[data-studio-frame]")?.addEventListener("pointerdown", startPhotoStudioPointer);
  window.addEventListener("pointermove", movePhotoStudioPointer);
  window.addEventListener("pointerup", stopPhotoStudioPointer);
  window.addEventListener("pointercancel", stopPhotoStudioPointer);
  photoStudioModal.querySelector("[data-studio-reset]")?.addEventListener("click", resetPhotoStudioPlacement);
  photoStudioModal.querySelector("[data-studio-replace]")?.addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const dataUrl = await fileToCompressedDataUrl(file);
    photoStudioModal.dataset.photoSrc = dataUrl;
    photoStudioModal.dataset.sourceChanged = "true";
    const preview = photoStudioModal.querySelector("[data-studio-preview]");
    if (preview) preview.src = dataUrl;
    updatePhotoStudioPreview();
    event.target.value = "";
  });
  photoStudioModal.querySelector("[data-studio-choose]")?.addEventListener("click", () => {
    photoStudioModal.querySelector("[data-studio-replace]")?.click();
  });
  photoStudioModal.querySelectorAll("[data-studio-cancel]").forEach((button) => {
    button.addEventListener("click", () => closePhotoStudio(null));
  });
  photoStudioModal.querySelector("[data-studio-apply]")?.addEventListener("click", async () => {
    const fit = photoStudioModal.querySelector("[data-studio-fit]")?.value;
    const position = photoStudioModal.querySelector("[data-studio-position]")?.value;
    const framedDataUrl = await renderPhotoStudioFramedDataUrl();
    closePhotoStudio({
      dataUrl: framedDataUrl || photoStudioModal.dataset.photoSrc || "",
      fit: "contain",
      position: sanitizePhotoPosition(position),
      zoom: 1,
      transform: defaultPhotoTransform(),
      sourceChanged: photoStudioModal.dataset.sourceChanged === "true"
    });
  });
  photoStudioModal.addEventListener("click", (event) => {
    if (event.target === photoStudioModal) closePhotoStudio(null);
  });
  photoStudioModal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePhotoStudio(null);
  });
  return photoStudioModal;
}

function openPhotoStudio({ dataUrl, title = "Make the product photo look right", fit = "contain", position = "center", zoom = 1, transform = {}, sourceChanged = false } = {}) {
  const modal = ensurePhotoStudio();
  modal.dataset.photoSrc = dataUrl || "";
  modal.dataset.sourceChanged = sourceChanged ? "true" : "false";
  photoStudioTransform = sanitizePhotoTransform(transform);
  modal.querySelector("#photoStudioTitle").textContent = title;
  const preview = modal.querySelector("[data-studio-preview]");
  const fitSelect = modal.querySelector("[data-studio-fit]");
  const positionSelect = modal.querySelector("[data-studio-position]");
  const zoomInput = modal.querySelector("[data-studio-zoom]");
  if (preview) preview.src = dataUrl || "";
  if (fitSelect) fitSelect.value = sanitizePhotoFit(fit);
  if (positionSelect) positionSelect.value = sanitizePhotoPosition(position);
  if (zoomInput) zoomInput.value = sanitizePhotoZoom(zoom).toFixed(2);
  updatePhotoStudioPreview();
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("is-open"));
  return new Promise((resolve) => {
    photoStudioResolve = resolve;
  });
}

async function preparePhotoInStudio(file, options = {}) {
  const dataUrl = await fileToCompressedDataUrl(file, options.max || 1600, options.quality || 0.86);
  return openPhotoStudio({
    dataUrl,
    title: options.title,
    fit: options.fit,
    position: options.position,
    zoom: options.zoom,
    transform: options.transform,
    sourceChanged: true
  });
}

function bindPhotoDropZone(zone, onFile) {
  if (!zone || typeof onFile !== "function") return;
  const leaveDropZone = () => zone.classList.remove("is-dragging-photo");
  zone.addEventListener("dragover", (event) => {
    event.preventDefault();
    zone.classList.add("is-dragging-photo");
  });
  zone.addEventListener("dragleave", leaveDropZone);
  zone.addEventListener("drop", (event) => {
    event.preventDefault();
    leaveDropZone();
    const file = Array.from(event.dataTransfer?.files || []).find((item) => item.type.startsWith("image/"));
    if (file) onFile(file);
  });
}

function showAdminUploadCelebration(message = "Photo uploaded to the live website.") {
  let celebration = document.querySelector(".admin-upload-celebration");
  if (!celebration) {
    celebration = document.createElement("div");
    celebration.className = "admin-upload-celebration";
    celebration.setAttribute("role", "status");
    celebration.innerHTML = `
      <span aria-hidden="true">+</span>
      <strong></strong>
      <small>Netlify confirmed it.</small>
    `;
    document.body.appendChild(celebration);
  }
  celebration.querySelector("strong").textContent = message;
  celebration.classList.remove("is-showing");
  void celebration.offsetWidth;
  celebration.classList.add("is-showing");
  window.clearTimeout(adminCelebrationTimer);
  adminCelebrationTimer = window.setTimeout(() => {
    celebration.classList.remove("is-showing");
  }, 3600);
}

function stableQuickFieldKey(field) {
  return `copy:${field.key}`;
}

function stableMiscFieldKey(index) {
  return `misc:${index}`;
}

function normalizeAdminState(saved = {}) {
  const nextState = {
    ...defaultAdminState(),
    ...saved,
    texts: saved.texts || {},
    images: saved.images || {},
    imageFits: normalizePhotoFitMap(saved.imageFits || {}),
    imagePositions: normalizePhotoPositionMap(saved.imagePositions || {}),
    imageZooms: normalizePhotoZoomMap(saved.imageZooms || {}),
    imageTransforms: normalizePhotoTransformMap(saved.imageTransforms || {}),
    products: saved.products || {},
    customProducts: Array.isArray(saved.customProducts)
      ? saved.customProducts.map((product) => ({
          ...product,
          salePrice: normalizeMoneyValue(product.salePrice),
          discount: product.discount || "",
          stock: product.stock || "",
          sku: product.sku || "",
          imageFit: sanitizePhotoFit(product.imageFit),
          imagePosition: sanitizePhotoPosition(product.imagePosition),
          imageZoom: sanitizePhotoZoom(product.imageZoom),
          imageTransform: sanitizePhotoTransform(product.imageTransform)
        }))
      : [],
    lookPhotos: saved.lookPhotos || {},
    lookPhotoFits: normalizePhotoFitMap(saved.lookPhotoFits || {}),
    lookPhotoPositions: normalizePhotoPositionMap(saved.lookPhotoPositions || {}),
    lookPhotoZooms: normalizePhotoZoomMap(saved.lookPhotoZooms || {}),
    lookPhotoTransforms: normalizePhotoTransformMap(saved.lookPhotoTransforms || {}),
    lookDetails: saved.lookDetails || {},
    ideas: Array.isArray(saved.ideas) ? saved.ideas : [],
    customPages: Array.isArray(saved.customPages)
      ? saved.customPages
          .filter((page) => page && page.key)
          .map((page) => ({
            key: safeSlug(page.key, "page"),
            label: page.label || page.title || "New Page",
            title: page.title || page.label || "New Page",
            eyebrow: page.eyebrow || "Custom page",
            body: page.body || "Click here to write this page."
          }))
      : [],
    customBlocks: Array.isArray(saved.customBlocks)
      ? saved.customBlocks
          .filter((block) => block && block.id && block.pageKey)
          .map((block) => ({
            id: String(block.id),
            pageKey: safeSlug(block.pageKey, "home"),
            title: block.title || "New section",
            body: block.body || "Click here to add details."
          }))
      : [],
    hiddenText: saved.hiddenText && typeof saved.hiddenText === "object" ? saved.hiddenText : {},
    textOffsets: saved.textOffsets && typeof saved.textOffsets === "object" ? saved.textOffsets : {},
    layoutOrder: saved.layoutOrder || defaultLayoutOrder(),
    hiddenSections: saved.hiddenSections || {}
  };
  delete nextState.images["try-on"];
  return nextState;
}

function clearAdminRemoteSaveTimer() {
  if (!adminRemoteSaveTimer) return;
  clearTimeout(adminRemoteSaveTimer);
  adminRemoteSaveTimer = null;
}

function clearAdminRemoteRetryTimer() {
  if (!adminRemoteRetryTimer) return;
  clearTimeout(adminRemoteRetryTimer);
  adminRemoteRetryTimer = null;
}

function cloneAdminStateSnapshot() {
  return JSON.parse(JSON.stringify(adminState));
}

function loadPendingRemoteAdminStateRecord() {
  try {
    const raw = localStorage.getItem(ADMIN_PENDING_REMOTE_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.state || typeof parsed.state !== "object") return null;
    return {
      revision: Number.isFinite(Number(parsed.revision)) ? Number(parsed.revision) : adminStateRevision,
      updatedAt: Number.isFinite(Number(parsed.updatedAt)) ? Number(parsed.updatedAt) : Date.now(),
      state: normalizeAdminState(parsed.state)
    };
  } catch {
    return null;
  }
}

function storePendingRemoteAdminState(snapshot, revision = adminStateRevision) {
  try {
    localStorage.setItem(ADMIN_PENDING_REMOTE_STATE_KEY, JSON.stringify({
      revision,
      updatedAt: Date.now(),
      state: snapshot
    }));
  } catch {
    // Ignore local storage issues and keep the local save path working.
  }
}

function clearPendingRemoteAdminState() {
  try {
    localStorage.removeItem(ADMIN_PENDING_REMOTE_STATE_KEY);
  } catch {
    // Ignore cleanup failures.
  }
}

function adminRemoteWriteHeaders() {
  return {
    "Content-Type": "application/json",
    "x-admin-email": ADMIN_EMAILS[0],
    "x-admin-password": ADMIN_PASSWORD
  };
}

function isPhotoDataUrl(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}

function isUploadablePhotoDataUrl(value) {
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,/i.test(String(value || ""));
}

function liveSaveFailureMessage(error) {
  return error ? `${ADMIN_LIVE_SAVE_FAILURE_MESSAGE} (${error})` : ADMIN_LIVE_SAVE_FAILURE_MESSAGE;
}

function setAdminSaveMessage(target, message) {
  if (target) {
    setAdminMessage(target, message);
    return;
  }
  if (adminEditStatus) adminEditStatus.textContent = message;
  if (adminContentStatus) adminContentStatus.textContent = message;
}

function localSaveAdminState() {
  adminStateRevision += 1;
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminState));
  return adminStateRevision;
}

async function fetchRemoteAdminState() {
  try {
    const response = await fetch(ADMIN_REMOTE_STATE_ENDPOINT, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store"
    });
    if (response.status === 404 || response.status === 405 || response.status >= 500) return null;
    if (!response.ok) return null;
    const payload = await response.json();
    if (!payload?.state) return null;
    return normalizeAdminState(payload.state);
  } catch {
    return null;
  }
}

async function hydrateAdminStateFromRemote() {
  const remoteState = await fetchRemoteAdminState();
  if (!remoteState) return false;
  adminState = remoteState;
  ensureLayoutState();
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminState));
  return true;
}

async function persistAdminStateRemotely(snapshot, revision = adminStateRevision) {
  if (!isAdminSignedIn()) {
    return { ok: false, error: "admin session is not signed in" };
  }
  try {
    const response = await fetch(ADMIN_REMOTE_STATE_ENDPOINT, {
      method: "PUT",
      headers: adminRemoteWriteHeaders(),
      body: JSON.stringify({ state: snapshot })
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || payload?.ok === false) {
      return { ok: false, error: payload?.error || `server returned ${response.status}` };
    }
    if (payload?.state && revision === adminStateRevision) {
      adminState = normalizeAdminState(payload.state);
      ensureLayoutState();
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminState));
    }
    clearPendingRemoteAdminState();
    return { ok: true, state: payload?.state || snapshot };
  } catch (error) {
    return { ok: false, error: error.message || "network error" };
  }
}

async function flushPendingRemoteAdminState(options = {}) {
  if (!isAdminSignedIn()) return { ok: false, skipped: true, error: "admin session is not signed in" };
  const pending = loadPendingRemoteAdminStateRecord();
  if (!pending) return { ok: true, skipped: true };
  const result = await persistAdminStateRemotely(pending.state, pending.revision);
  if (result.ok) {
    if (options.showSuccess) {
      setAdminSaveMessage(options.statusTarget || null, options.successMessage || ADMIN_LIVE_SAVE_SUCCESS_MESSAGE);
    }
    return result;
  }
  if (options.showFailure) {
    setAdminSaveMessage(
      options.statusTarget || null,
      options.failureMessage === ADMIN_LIVE_SAVE_FAILURE_MESSAGE
        ? liveSaveFailureMessage(result.error)
        : (options.failureMessage || ADMIN_LIVE_SAVE_FAILURE_MESSAGE)
    );
  }
  return result;
}

function schedulePendingRemoteAdminStateFlush(options = {}) {
  if (!isAdminSignedIn()) return;
  clearAdminRemoteRetryTimer();
  const delay = Number(options.delayMs) > 0 ? Number(options.delayMs) : ADMIN_REMOTE_RETRY_DELAY_MS;
  adminRemoteRetryTimer = window.setTimeout(async () => {
    const result = await flushPendingRemoteAdminState(options);
    if (!result.ok && !result.skipped) {
      schedulePendingRemoteAdminStateFlush({ ...options, delayMs: delay });
    }
  }, delay);
}

function bindAdminRemoteSyncEvents() {
  if (adminRemoteSyncEventsBound) return;
  adminRemoteSyncEventsBound = true;
  window.addEventListener("online", () => {
    schedulePendingRemoteAdminStateFlush({
      delayMs: 250,
      statusTarget: adminInventoryStatus || adminEditStatus || adminContentStatus,
      showSuccess: true
    });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    schedulePendingRemoteAdminStateFlush({
      delayMs: 250,
      statusTarget: adminInventoryStatus || adminEditStatus || adminContentStatus,
      showSuccess: true
    });
  });
}

async function uploadAdminPhoto(dataUrl, kind = "upload") {
  if (!isAdminSignedIn()) {
    return { ok: false, error: "admin session is not signed in" };
  }
  if (!isUploadablePhotoDataUrl(dataUrl)) {
    return { ok: true, url: dataUrl };
  }
  try {
    const response = await fetch(ADMIN_REMOTE_PHOTO_ENDPOINT, {
      method: "POST",
      headers: adminRemoteWriteHeaders(),
      body: JSON.stringify({ dataUrl, kind })
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || payload?.ok === false || !payload?.photo?.url) {
      return { ok: false, error: payload?.error || `server returned ${response.status}` };
    }
    return { ok: true, ...payload.photo };
  } catch (error) {
    return { ok: false, error: error.message || "photo upload failed" };
  }
}

async function saveAdminState(options = {}) {
  const {
    statusTarget = null,
    savingMessage = "Saving to this device and the live website...",
    successMessage = ADMIN_LIVE_SAVE_SUCCESS_MESSAGE,
    failureMessage = ADMIN_LIVE_SAVE_FAILURE_MESSAGE,
    showSuccess = Boolean(statusTarget),
    showSaving = Boolean(statusTarget)
  } = options;

  const revision = localSaveAdminState();
  const snapshot = cloneAdminStateSnapshot();
  storePendingRemoteAdminState(snapshot, revision);
  if (!isAdminSignedIn()) {
    const result = { ok: false, localOnly: true, error: "admin session is not signed in" };
    setAdminSaveMessage(statusTarget, liveSaveFailureMessage(result.error));
    return result;
  }

  if (showSaving) setAdminSaveMessage(statusTarget, savingMessage);
  const result = await persistAdminStateRemotely(snapshot, revision);

  if (result.ok) {
    if (showSuccess) setAdminSaveMessage(statusTarget, successMessage);
    return result;
  }

  schedulePendingRemoteAdminStateFlush({
    statusTarget,
    successMessage,
    showSuccess
  });
  setAdminSaveMessage(statusTarget, failureMessage === ADMIN_LIVE_SAVE_FAILURE_MESSAGE ? liveSaveFailureMessage(result.error) : failureMessage);
  return result;
}

function scheduleRemoteAdminStateSave(options = {}) {
  if (!isAdminSignedIn()) return;
  clearAdminRemoteSaveTimer();
  const revision = adminStateRevision;
  const snapshot = cloneAdminStateSnapshot();
  storePendingRemoteAdminState(snapshot, revision);
  const target = options.statusTarget || null;
  const successMessage = options.successMessage || ADMIN_LIVE_SAVE_SUCCESS_MESSAGE;
  const failureMessage = options.failureMessage || ADMIN_LIVE_SAVE_FAILURE_MESSAGE;
  if (options.savingMessage) setAdminSaveMessage(target, options.savingMessage);
  adminRemoteSaveTimer = window.setTimeout(async () => {
    const result = await persistAdminStateRemotely(snapshot, revision);
    if (result.ok) {
      if (options.showSuccess) setAdminSaveMessage(target, successMessage);
      return;
    }
    schedulePendingRemoteAdminStateFlush({
      statusTarget: target,
      successMessage,
      showSuccess: options.showSuccess
    });
    setAdminSaveMessage(target, failureMessage === ADMIN_LIVE_SAVE_FAILURE_MESSAGE ? liveSaveFailureMessage(result.error) : failureMessage);
  }, ADMIN_REMOTE_SAVE_DEBOUNCE_MS);
}

function pageElement(key) {
  return document.querySelector(`[data-page-panel="${key}"]`);
}

function pageMeta(key) {
  if (key === "product") return { key: "product", label: "Product details" };
  return allLayoutSections().find((section) => section.key === key) || null;
}

function visiblePageKeys() {
  return adminState.layoutOrder.filter((key) => !adminState.hiddenSections[key]);
}

function firstVisiblePageKey() {
  return visiblePageKeys()[0] || "home";
}

function updatePageLinkVisibility() {
  pageLinks().forEach((link) => {
    const key = link.dataset.pageLink;
    if (!key || link.id === "adminNav") return;
    if (link.classList.contains("brand")) return;
    link.hidden = Boolean(adminState.hiddenSections[key]);
  });
}

function updatePageNavState(key) {
  currentPageKey = key;
  pageLinks().forEach((link) => {
    const isCurrent = link.dataset.pageLink === key;
    link.classList.toggle("is-current", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  updateBookStatus(key);
}

function navOffset() {
  return (navBar?.offsetHeight || 0) + 26;
}

function updateBookStatus(activeKey = currentPageKey) {
  if (!pageBook || !bookStatus) return;
  if (activeKey === "product") {
    bookStatus.innerHTML = "<strong>Product details</strong><span>Review this set, choose a quantity, or return to the Shop.</span>";
    return;
  }
  const orderedKeys = visiblePageKeys();
  const activeIndex = Math.max(orderedKeys.indexOf(activeKey), 0);
  pageBook.dataset.pageCurrent = String(activeIndex + 1);
  pageBook.dataset.pageTotal = String(orderedKeys.length || 1);
  bookStatus.innerHTML = `<strong>Page ${activeIndex + 1} of ${orderedKeys.length || 1}</strong><span>Use the tabs above to open another page.</span>`;
}

function sectionFocusLine() {
  const offset = navOffset();
  return Math.max(offset + 24, Math.min(window.innerHeight * 0.32, offset + 180));
}

function syncPageStateFromScroll() {
  if (currentPageKey === "product") return;
  const orderedKeys = visiblePageKeys();
  if (!orderedKeys.length) return;
  const focusLine = sectionFocusLine();
  let activeKey = orderedKeys[0];
  let bestDistance = Number.POSITIVE_INFINITY;

  orderedKeys.forEach((key) => {
    const section = pageElement(key);
    if (!section || section.hidden) return;
    const rect = section.getBoundingClientRect();

    if (rect.top <= focusLine && rect.bottom > focusLine) {
      activeKey = key;
      bestDistance = 0;
      return;
    }

    const distance = Math.min(Math.abs(rect.top - focusLine), Math.abs(rect.bottom - focusLine));
    if (distance < bestDistance) {
      bestDistance = distance;
      activeKey = key;
    }
  });

  updatePageNavState(activeKey);
}

function schedulePageStateFromScroll() {
  if (isPageNavigationLocked) return;
  if (pageScrollSyncFrame) return;
  pageScrollSyncFrame = window.requestAnimationFrame(() => {
    pageScrollSyncFrame = 0;
    syncPageStateFromScroll();
  });
}

function updateScrollChrome() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  const progressValue = `${(progress * 100).toFixed(1)}%`;
  if (scrollProgress) {
    if (progressValue !== lastScrollProgress) {
      scrollProgress.style.setProperty("--scroll-progress", progressValue);
      lastScrollProgress = progressValue;
    }
  }
  if (navBar) {
    const nextScrolled = window.scrollY > 24;
    if (nextScrolled !== lastNavScrolled) {
      navBar.classList.toggle("is-scrolled", nextScrolled);
      lastNavScrolled = nextScrolled;
    }
  }
}

function scheduleScrollChrome() {
  if (scrollChromeFrame) return;
  scrollChromeFrame = window.requestAnimationFrame(() => {
    scrollChromeFrame = 0;
    updateScrollChrome();
  });
}

function finishPageTransition(nextPage) {
  if (!nextPage) return;
  sitePages().forEach((page) => {
    page.classList.remove("is-turning-out", "is-turning-in");
    page.classList.toggle("is-active", page === nextPage && !page.hidden);
  });
  updateBookStatus(nextPage.dataset.pagePanel || currentPageKey);
}

function lockPageNavigation(duration = 760) {
  isPageNavigationLocked = true;
  window.clearTimeout(pageNavigationLockTimer);
  pageNavigationLockTimer = window.setTimeout(() => {
    isPageNavigationLocked = false;
    schedulePageStateFromScroll();
  }, duration);
}

function showSitePage(pageKey, options = {}) {
  const { updateHash = true, force = false, behavior = "smooth", track = true } = options;
  const resolvedKey = adminState.hiddenSections[pageKey] ? firstVisiblePageKey() : pageKey;
  const productPage = pageElement("product");
  if (productPage) productPage.hidden = resolvedKey !== "product";
  body.classList.toggle("product-detail-open", resolvedKey === "product");
  const targetPage = pageElement(resolvedKey);
  if (!targetPage || targetPage.hidden) return;

  if (track && resolvedKey !== currentPageKey) {
    pageVisitStack = [...pageVisitStack.filter((key) => key !== currentPageKey), currentPageKey].slice(-8);
  }
  currentPageKey = resolvedKey;
  updatePageNavState(resolvedKey);
  finishPageTransition(targetPage);
  lockPageNavigation(force ? 80 : 760);

  if (updateHash && window.location.hash !== `#${resolvedKey}`) {
    history.replaceState(null, "", `#${resolvedKey}`);
  }

  const performScroll = () => {
    const top = resolvedKey === firstVisiblePageKey()
      ? 0
      : Math.max(window.scrollY + targetPage.getBoundingClientRect().top - navOffset(), 0);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top,
      behavior: force || prefersReducedMotion ? "auto" : behavior
    });
    schedulePageStateFromScroll();
    scheduleScrollChrome();
    if (textEditMode && isAdminSignedIn()) scheduleRemoveBubbleControls();
  };

  if (force) {
    requestAnimationFrame(performScroll);
    return;
  }

  performScroll();
}

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

function isAdminLogin(email, password) {
  return ADMIN_EMAILS.includes(email.trim().toLowerCase()) && password === ADMIN_PASSWORD;
}

function clearAdminSession() {
  adminSession = null;
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

function startAdminSession() {
  const now = Date.now();
  adminSession = {
    authenticated: true,
    authenticatedAt: now,
    expiresAt: now + ADMIN_SESSION_TTL_MS
  };
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

function isAdminSignedIn() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  if (adminSession?.authenticated === true && Number(adminSession.expiresAt) > Date.now()) {
    return true;
  }
  adminSession = null;
  return false;
}

function exitAdminModeForCustomer() {
  clearAdminSession();
  textEditMode = false;
  closeAdminInventoryPanel();
  showPasswordReset(false);
  renderAdminVisibility();
  if (window.location.hash === "#adminPage") {
    showSitePage("home", { updateHash: true, force: true });
  }
}

function showAdminPage() {
  if (!isAdminSignedIn()) {
    openAccount("Please sign in to continue.");
    return;
  }
  closeCartDrawer();
  closeAccountPanel();
  if (window.location.hash !== "#adminPage") {
    history.replaceState(null, "", "#adminPage");
  }
  showSitePage("home", { updateHash: false, force: true });
  renderAdminVisibility();
  adminPage.hidden = false;
  requestAnimationFrame(() => {
    adminPage.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  setInlineEditStatus("Use Click To Edit Site to make changes directly on the page.");
}

function showAdminOrdersPage() {
  showAdminPage();
  switchAdminView("orders");
}

function renderAdminVisibility() {
  const signedIn = isAdminSignedIn();
  adminNav.hidden = !signedIn;
  adminPage.hidden = !signedIn || window.location.hash !== "#adminPage";
  if (!signedIn && textEditMode) {
    textEditMode = false;
  }
  if (!signedIn) closeAdminInventoryPanel();
  renderAdminEditToolbar();
  syncInlineEditMode();
}

function logoutAdmin() {
  clearAdminSession();
  textEditMode = false;
  closeAdminInventoryPanel();
  showPasswordReset(false);
  renderAdminVisibility();
  showSitePage("home", { updateHash: true, force: true });
  openAccount("You're signed out.");
}

function closeAdmin() {}

function syncAdminViewportChrome() {
  const toolbarHeight = adminEditToolbar && !adminEditToolbar.hidden
    ? Math.ceil(adminEditToolbar.getBoundingClientRect().height) + 24
    : 0;
  document.documentElement.style.setProperty("--admin-toolbar-offset", `${toolbarHeight}px`);
}

function ensureAdminEditToolbar() {
  if (adminEditToolbar) return;
  adminEditToolbar = document.createElement("div");
  adminEditToolbar.className = "admin-edit-toolbar";
  adminEditToolbar.hidden = true;
  adminEditToolbar.innerHTML = `
    <div class="admin-edit-toolbar-copy">
      <strong>Admin edit mode</strong>
      <span id="adminEditStatus">Press Click To Edit Site, then edit the page right where customers see it.</span>
    </div>
    <div class="admin-edit-toolbar-actions">
      <button type="button" id="adminEditBack">Back</button>
      <button type="button" id="adminEditToggle">Click To Edit Site</button>
      <button type="button" id="adminEditInventory">Inventory</button>
      <button type="button" id="adminEditAddProduct">Add Product</button>
      <button type="button" id="adminEditAddSection">Add Section</button>
      <button type="button" id="adminEditAddPage">Add Page</button>
      <button type="button" id="adminEditSave">Save Now</button>
      <button type="button" id="adminEditLogout">Exit Admin</button>
    </div>
  `;
  document.body.appendChild(adminEditToolbar);
  if (typeof ResizeObserver === "function") {
    adminToolbarResizeObserver = new ResizeObserver(() => syncAdminViewportChrome());
    adminToolbarResizeObserver.observe(adminEditToolbar);
  }
  adminEditToggle = adminEditToolbar.querySelector("#adminEditToggle");
  adminEditStatus = adminEditToolbar.querySelector("#adminEditStatus");
  adminEditToolbar.querySelector("#adminEditBack").addEventListener("click", handleAdminToolbarBack);
  adminEditToggle.addEventListener("click", toggleTextEditMode);
  adminEditToolbar.querySelector("#adminEditInventory").addEventListener("click", openAdminInventoryShelf);
  adminEditToolbar.querySelector("#adminEditAddProduct").addEventListener("click", startInlineProductAdd);
  adminEditToolbar.querySelector("#adminEditAddSection").addEventListener("click", addCustomSectionToCurrentPage);
  adminEditToolbar.querySelector("#adminEditAddPage").addEventListener("click", addCustomPageFromToolbar);
  adminEditToolbar.querySelector("#adminEditSave").addEventListener("click", async () => {
    await saveAllAdminEdits({
      statusTarget: adminEditStatus,
      successMessage: "Saved to the live website. Customers can see this now."
    });
  });
  adminEditToolbar.querySelector("#adminEditLogout").addEventListener("click", logoutAdmin);
}

function handleAdminToolbarBack() {
  if (!isAdminSignedIn()) return;
  if (adminInventoryPanel && !adminInventoryPanel.hidden) {
    closeAdminInventoryPanel();
    setInlineEditStatus("Back to the website. Inventory is closed.");
    return;
  }
  if (body.classList.contains("account-open")) {
    closeAccountPanel();
    setInlineEditStatus("Back to the website.");
    return;
  }
  if (body.classList.contains("cart-open")) {
    closeCartDrawer();
    setInlineEditStatus("Back to the website.");
    return;
  }
  const previousKey = pageVisitStack.pop();
  if (previousKey && previousKey !== currentPageKey && pageElement(previousKey)) {
    showSitePage(previousKey, { updateHash: true, behavior: "smooth", track: false });
    setInlineEditStatus(`Back to ${pageMeta(previousKey)?.label || "the previous page"}.`);
    return;
  }
  showSitePage(firstVisiblePageKey(), { updateHash: true, behavior: "smooth", track: false });
  setInlineEditStatus("Back to Home.");
}

function openAdminInventoryShelf() {
  if (!isAdminSignedIn()) {
    openAccount("Please sign in to manage inventory.");
    return;
  }
  ensureAdminInventoryPanel();
  adminInventoryPanel.hidden = false;
  body.classList.add("admin-inventory-open");
  renderAdminInventoryPanel();
  setInlineEditStatus("Inventory is open. Add drafts here first, then publish only the ready products to the store.");
  setAdminMessage(adminInventoryStatus, "Private inventory is open. Draft products stay hidden from customers until Chey publishes them.");
}

function ensureAdminInventoryPanel() {
  if (adminInventoryPanel) return;
  adminInventoryPanel = document.createElement("aside");
  adminInventoryPanel.className = "admin-inventory-panel";
  adminInventoryPanel.hidden = true;
  adminInventoryPanel.setAttribute("role", "dialog");
  adminInventoryPanel.setAttribute("aria-modal", "true");
  adminInventoryPanel.setAttribute("aria-label", "Chey's admin inventory");
  adminInventoryPanel.innerHTML = `
    <div class="admin-inventory-shell">
      <div class="admin-inventory-head">
        <div>
          <span class="admin-inventory-kicker">Admin only</span>
          <h2>Chey's Inventory</h2>
          <p>Build, stage, and publish products from one place. Drafts stay private until they are sent to the Shop.</p>
        </div>
        <div class="admin-inventory-head-actions">
          <button class="button primary" type="button" data-admin-inventory-add>Add Product</button>
          <button class="button ghost" type="button" data-admin-inventory-close>Close</button>
        </div>
      </div>
      <p class="admin-inventory-status" data-admin-inventory-status></p>
      <div class="admin-inventory-overview" data-admin-inventory-overview></div>
      <div class="admin-inventory-list" data-admin-inventory-list></div>
    </div>
  `;
  document.body.appendChild(adminInventoryPanel);
  adminInventoryStatus = adminInventoryPanel.querySelector("[data-admin-inventory-status]");
  adminInventoryOverview = adminInventoryPanel.querySelector("[data-admin-inventory-overview]");
  adminInventoryList = adminInventoryPanel.querySelector("[data-admin-inventory-list]");
  adminInventoryPanel.querySelector("[data-admin-inventory-add]").addEventListener("click", createInventoryDraft);
  adminInventoryPanel.querySelector("[data-admin-inventory-close]").addEventListener("click", closeAdminInventoryPanel);
  adminInventoryPanel.addEventListener("click", (event) => {
    if (event.target === adminInventoryPanel) closeAdminInventoryPanel();
  });
}

function closeAdminInventoryPanel() {
  if (!adminInventoryPanel) return;
  adminInventoryPanel.hidden = true;
  body.classList.remove("admin-inventory-open");
  refreshTextBubbleControlsSoon();
}

function ensureAdminInventoryPhotoInput() {
  if (adminInventoryPhotoInput) return;
  adminInventoryPhotoInput = document.createElement("input");
  adminInventoryPhotoInput.type = "file";
  adminInventoryPhotoInput.accept = "image/*";
  adminInventoryPhotoInput.setAttribute("capture", "environment");
  adminInventoryPhotoInput.className = "hidden-file-input";
  document.body.appendChild(adminInventoryPhotoInput);
  adminInventoryPhotoInput.addEventListener("change", handleAdminInventoryPhotoUpload);
}

function inventoryPhotoMarkup(look) {
  if (look.photo) {
    return `<img src="${escapeAttribute(look.photo)}" alt="" data-photo-fit="${escapeAttribute(look.photoFit)}" data-photo-position="${escapeAttribute(look.photoPosition)}" style="${photoTransformStyle(look.photoTransform, look.photoZoom)}" />`;
  }
  return `
    <div class="product-photo-placeholder inventory-placeholder">
      <div class="sample-set" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="sample-set-caption">
        <strong>No photo yet</strong>
        <small>Add a real nail photo when this product is ready.</small>
      </div>
    </div>
  `;
}

function inventoryLooks() {
  return lookLibrary
    .map((_, index) => readLookData(index))
    .filter((look) => look.active || look.published);
}

function inventorySummaryMetrics(looks) {
  const liveCount = looks.filter((look) => look.published).length;
  const draftCount = looks.filter((look) => !look.published).length;
  const pricedCount = looks.filter((look) => moneyNumber(look.price) > 0).length;
  return { total: looks.length, liveCount, draftCount, pricedCount };
}

function inventoryPricingSummary(look) {
  const regular = normalizeMoneyValue(look.price);
  const calculatedSale = calculatedSalePrice(look.price, look.discount);
  const sale = normalizeMoneyValue(look.salePrice) || calculatedSale;
  if (!regular && !sale) {
    return {
      headline: "No price set",
      detail: "Add pricing before publishing"
    };
  }
  if (sale && regular && sale !== regular) {
    return {
      headline: `$${formatMoneyValue(sale)} sale`,
      detail: `$${formatMoneyValue(regular)} regular${look.discount ? ` - ${look.discount}` : ""}`
    };
  }
  return {
    headline: `$${formatMoneyValue(regular || sale)} regular`,
    detail: look.discount || "No active discount"
  };
}

function inventoryCardMeta(look) {
  const publishedAt = adminState.lookDetails?.[look.index]?.publishedAt || "";
  const categoryLabel = optionLabel(categoryOptions, look.finish, "Custom / handmade");
  const stockLabel = optionLabel(stockOptions, look.stock || "Available", look.stock || "Available");
  const pricing = inventoryPricingSummary(look);
  return {
    visibilityLabel: look.published ? "Live in Shop" : "Private Draft",
    visibilityDetail: look.published ? "Customers can order this design right now." : "This product is hidden from customers until it is published.",
    priceHeadline: pricing.headline,
    priceDetail: pricing.detail,
    publishHeadline: publishedAt ? "Published to store" : "Not published yet",
    publishDetail: publishedAt || "Draft only",
    categoryLabel,
    stockLabel,
    photoLabel: look.photo ? "Photo ready" : "Photo needed"
  };
}

function renderAdminInventoryPanel() {
  if (!adminInventoryList) return;
  const looks = inventoryLooks();
  const metrics = inventorySummaryMetrics(looks);
  if (adminInventoryOverview) {
    adminInventoryOverview.innerHTML = `
      <div class="admin-inventory-overview-card">
        <span>Total products</span>
        <strong>${metrics.total}</strong>
        <small>All active inventory items</small>
      </div>
      <div class="admin-inventory-overview-card">
        <span>Live in shop</span>
        <strong>${metrics.liveCount}</strong>
        <small>Visible to customers now</small>
      </div>
      <div class="admin-inventory-overview-card">
        <span>Private drafts</span>
        <strong>${metrics.draftCount}</strong>
        <small>Still hidden from the storefront</small>
      </div>
      <div class="admin-inventory-overview-card">
        <span>Priced and ready</span>
        <strong>${metrics.pricedCount}</strong>
        <small>Products with pricing set</small>
      </div>
    `;
  }
  if (!looks.length) {
    adminInventoryList.innerHTML = `
      <div class="admin-inventory-empty">
        <span class="inline-plus-orb" aria-hidden="true">+</span>
        <strong>No inventory products yet</strong>
        <p>Press Add Product to create a private draft. It will not show in the customer store until you publish it.</p>
      </div>
    `;
    return;
  }

  adminInventoryList.innerHTML = looks.map((look) => {
    const meta = inventoryCardMeta(look);
    return `
      <article class="admin-inventory-card${look.published ? " is-published" : ""}" data-inventory-card="${look.index}">
        <div class="admin-inventory-photo-column">
          <div class="admin-inventory-photo photo-preview">
            ${inventoryPhotoMarkup(look)}
            ${look.published ? `<span class="published-ribbon">In Store</span>` : `<span class="draft-ribbon">Draft</span>`}
          </div>
          <div class="admin-inventory-photo-meta">
            <div class="admin-inventory-meta-card">
              <span>Visibility</span>
              <strong>${escapeHTML(meta.visibilityLabel)}</strong>
              <small>${escapeHTML(meta.visibilityDetail)}</small>
            </div>
            <div class="admin-inventory-meta-card">
              <span>Pricing</span>
              <strong>${escapeHTML(meta.priceHeadline)}</strong>
              <small>${escapeHTML(meta.priceDetail)}</small>
            </div>
            <div class="admin-inventory-meta-card">
              <span>Publish status</span>
              <strong>${escapeHTML(meta.publishHeadline)}</strong>
              <small>${escapeHTML(meta.publishDetail)}</small>
            </div>
          </div>
        </div>
        <div class="admin-inventory-fields">
          <div class="admin-inventory-card-head">
            <div class="admin-inventory-card-title">
              <span>${escapeHTML(look.slotLabel)}</span>
              <strong>${escapeHTML(look.name)}</strong>
              <p>${escapeHTML(look.published ? "This listing is live in the customer store." : "This draft is private until you publish it to the Shop.")}</p>
            </div>
            <div class="admin-inventory-card-tools">
              <span class="admin-inventory-chip${look.published ? " is-published" : ""}">${escapeHTML(meta.visibilityLabel)}</span>
              <span class="admin-inventory-chip">${escapeHTML(meta.stockLabel)}</span>
              <span class="admin-inventory-chip">${escapeHTML(meta.categoryLabel)}</span>
              <span class="admin-inventory-chip">${escapeHTML(meta.photoLabel)}</span>
              <button class="button small" type="button" data-inventory-photo-button="${look.index}">${look.photo ? "Edit Photo" : "Add Photo"}</button>
            </div>
          </div>
          <section class="admin-inventory-section">
            <div class="admin-inventory-section-head">
              <h3>Store details</h3>
              <p>Customer-facing basics for the storefront card and product listing.</p>
            </div>
            <div class="admin-inventory-field-grid">
              <label>Product name
                <input data-inventory-index="${look.index}" data-inventory-field="name" value="${escapeAttribute(look.name)}" placeholder="Pink chrome bows" />
              </label>
              <label>Regular price
                <input data-inventory-index="${look.index}" data-inventory-field="price" value="${escapeAttribute(look.price)}" inputmode="decimal" placeholder="45" />
              </label>
              <label>Discount
                <select data-inventory-index="${look.index}" data-inventory-field="discount">
                  ${optionMarkup(discountOptions, look.discount)}
                </select>
              </label>
              <label>Sale price
                <input data-inventory-index="${look.index}" data-inventory-field="salePrice" value="${escapeAttribute(look.salePrice)}" inputmode="decimal" placeholder="Auto" />
              </label>
              <label>Category
                <select data-inventory-index="${look.index}" data-inventory-field="finish">
                  ${optionMarkup(categoryOptions, look.finish)}
                </select>
              </label>
              <label>Stock/status
                <select data-inventory-index="${look.index}" data-inventory-field="stock">
                  ${optionMarkup(stockOptions, look.stock || "Available")}
                </select>
              </label>
              <label>SKU
                <input data-inventory-index="${look.index}" data-inventory-field="sku" value="${escapeAttribute(look.sku)}" placeholder="Optional" />
              </label>
              <label>Badge
                <input data-inventory-index="${look.index}" data-inventory-field="tag" value="${escapeAttribute(look.tag)}" placeholder="New from Chey" />
              </label>
            </div>
          </section>
          <section class="admin-inventory-section">
            <div class="admin-inventory-section-head">
              <h3>Descriptions and notes</h3>
              <p>Keep customer copy polished and internal notes private.</p>
            </div>
            <div class="admin-inventory-field-grid admin-inventory-copy-grid">
              <label class="wide">Customer description
                <textarea data-inventory-index="${look.index}" data-inventory-field="copy" placeholder="Describe the style, length, finish, charms, and vibe.">${escapeTextarea(look.copy)}</textarea>
              </label>
              <label class="wide">Private notes
                <textarea data-inventory-index="${look.index}" data-inventory-field="notes" placeholder="Colors, sizing, supplies, customer notes, timing...">${escapeTextarea(look.notes)}</textarea>
              </label>
            </div>
          </section>
          <div class="admin-inventory-card-footer">
            <small class="admin-inventory-card-status" data-inventory-status>${look.published ? "Customers can see this product." : "Private draft. Customers cannot see it yet."}</small>
            <div class="admin-inventory-card-actions">
              <button class="button primary" type="button" data-inventory-publish="${look.index}">${look.published ? "Update Store Product" : "Publish To Store"}</button>
              ${look.published ? `<button class="button secondary" type="button" data-inventory-view-shop="${look.index}">Done - View In Shop</button>` : ""}
              ${look.published ? `<button class="button ghost" type="button" data-inventory-withdraw="${look.productIndex}">Withdraw From Store</button>` : ""}
              <button class="button danger" type="button" data-inventory-delete="${look.index}">Delete From Inventory</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
  bindAdminInventoryPanel();
}

function syncInventoryLookToPublishedProduct(index) {
  const look = readLookData(index);
  if (!look.published || look.productIndex < 0) return;
  const existingProduct = adminState.customProducts[look.productIndex] || {};
  const product = productFromLook(look);
  product.publishedAt = existingProduct.publishedAt || adminState.lookDetails[index]?.publishedAt || product.publishedAt;
  adminState.customProducts[look.productIndex] = {
    ...existingProduct,
    ...product
  };
}

function updateInventoryField(field) {
  const index = Number(field.dataset.inventoryIndex);
  const key = field.dataset.inventoryField;
  if (!Number.isInteger(index) || !key) return;
  adminState.lookDetails[index] = adminState.lookDetails[index] || {};
  const value = key === "price" || key === "salePrice" ? normalizeMoneyValue(field.value) : field.value.trim();
  adminState.lookDetails[index][key] = value;
  applyAutomaticDiscount(adminState.lookDetails[index], key);
  if (key === "price" || key === "discount") {
    const card = field.closest("[data-inventory-card]");
    const saleInput = card?.querySelector('[data-inventory-field="salePrice"]');
    if (saleInput) saleInput.value = adminState.lookDetails[index].salePrice || "";
  }
  syncInventoryLookToPublishedProduct(index);
  localSaveAdminState();
  scheduleRemoteAdminStateSave({
    statusTarget: adminInventoryStatus || adminEditStatus,
    savingMessage: "Saving inventory changes to the live website...",
    showSuccess: true,
    successMessage: "Inventory changes saved to the live website."
  });
  renderLooks();
  renderCustomProducts();
  updateLookCount();
  updateProductCount();
}

function bindAdminInventoryPanel() {
  if (!adminInventoryList) return;
  adminInventoryList.querySelectorAll("[data-inventory-field]").forEach((field) => {
    field.addEventListener("input", () => updateInventoryField(field));
    field.addEventListener("change", () => updateInventoryField(field));
  });
  adminInventoryList.querySelectorAll("[data-inventory-photo-button]").forEach((button) => {
    button.addEventListener("click", () => {
      ensureAdminInventoryPhotoInput();
      adminInventoryPhotoInput.dataset.inventoryPhotoIndex = button.dataset.inventoryPhotoButton;
      adminInventoryPhotoInput.value = "";
      adminInventoryPhotoInput.click();
    });
  });
  adminInventoryList.querySelectorAll("[data-inventory-publish]").forEach((button) => {
    button.addEventListener("click", async () => {
      const index = Number(button.dataset.inventoryPublish);
      const wasPublished = readLookData(index).published;
      const published = await publishLookToShop(index);
      renderAdminInventoryPanel();
      if (published && !wasPublished) showPublishedProductInShop(index);
    });
  });
  adminInventoryList.querySelectorAll("[data-inventory-view-shop]").forEach((button) => {
    button.addEventListener("click", () => showPublishedProductInShop(Number(button.dataset.inventoryViewShop)));
  });
  adminInventoryList.querySelectorAll("[data-inventory-withdraw]").forEach((button) => {
    button.addEventListener("click", async () => {
      await removePublishedProduct(Number(button.dataset.inventoryWithdraw));
      renderAdminInventoryPanel();
    });
  });
  adminInventoryList.querySelectorAll("[data-inventory-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteInventoryProduct(Number(button.dataset.inventoryDelete));
      renderAdminInventoryPanel();
    });
  });
}

function showPublishedProductInShop(index) {
  const look = readLookData(index);
  closeAdminInventoryPanel();
  showSitePage("shop", { updateHash: true, behavior: "smooth" });
  setInlineEditStatus(`${look.name || "Product"} is live. You are viewing it in the Shop.`);
}

async function handleAdminInventoryPhotoUpload() {
  const index = Number(adminInventoryPhotoInput?.dataset.inventoryPhotoIndex);
  const file = adminInventoryPhotoInput?.files && adminInventoryPhotoInput.files[0];
  if (!Number.isInteger(index) || !file) return;
  await updateLookPhotoFromFile(index, file, adminInventoryPhotoInput);
  renderAdminInventoryPanel();
}

async function createInventoryDraft() {
  if (!isAdminSignedIn()) {
    openAccount("Please sign in to add products.");
    return;
  }
  ensureAdminInventoryPanel();
  if (adminInventoryPanel.hidden) openAdminInventoryShelf();
  const index = nextProductLibrarySlotIndex();
  const existing = readLookData(index);
  if (existing.active || existing.published) {
    setAdminMessage(adminInventoryStatus, "Inventory is full. Delete an old draft before adding another product.");
    return -1;
  }
  const nextNumber = inventoryLooks().length + 1;
  adminState.lookDetails[index] = {
    name: `New Product ${nextNumber}`,
    price: "",
    salePrice: "",
    discount: "",
    stock: "Available",
    sku: "",
    finish: "custom",
    copy: "Describe this set for customers before publishing it.",
    notes: "",
    tag: "New from Chey"
  };
  delete adminState.lookPhotos[index];
  delete adminState.lookPhotoFits[index];
  delete adminState.lookPhotoPositions[index];
  delete adminState.lookPhotoZooms[index];
  delete adminState.lookPhotoTransforms[index];
  visibleLookSlotCount = Math.max(visibleLookSlotCount, index + 1);
  renderAdminInventoryPanel();
  renderAdminLookPhotos();
  renderLooks();
  updateLookCount();
  setAdminMessage(adminInventoryStatus, "New private product draft added. Add details now, then publish when it is ready.");
  const result = await saveAdminState({
    statusTarget: adminInventoryStatus || adminEditStatus,
    savingMessage: "Adding product draft to inventory...",
    successMessage: "Product draft saved in inventory. Customers cannot see it yet."
  });
  if (!result.ok) return index;
  requestAnimationFrame(() => {
    adminInventoryList?.querySelector(`[data-inventory-card="${index}"] [data-inventory-field="name"]`)?.focus();
  });
  return index;
}

function renderAdminEditToolbar() {
  ensureAdminEditToolbar();
  const signedIn = isAdminSignedIn();
  adminEditToolbar.hidden = !signedIn;
  body.classList.toggle("admin-signed-in", signedIn);
  if (!signedIn) {
    syncAdminViewportChrome();
    return;
  }
  adminEditToolbar.classList.toggle("is-editing", textEditMode);
  adminEditToggle.classList.toggle("active", textEditMode);
  adminEditToggle.textContent = textEditMode ? "Stop Editing" : "Click To Edit Site";
  if (adminEditStatus && !inlineEditSaveTimer) {
    adminEditStatus.textContent = textEditMode
      ? "Click text to type, use x buttons to delete writing, or add products, sections, and pages."
      : "Press Click To Edit Site, then edit the page right where customers see it.";
  }
  syncAdminViewportChrome();
}

function setInlineEditStatus(message) {
  if (adminEditStatus) adminEditStatus.textContent = message;
  if (adminContentStatus) adminContentStatus.textContent = message;
}

async function addCustomPageFromToolbar() {
  if (!isAdminSignedIn()) return;
  if (!textEditMode) {
    textEditMode = true;
    syncInlineEditMode();
  }
  const label = window.prompt("Name this new page", "New Page");
  if (!label || !label.trim()) {
    setInlineEditStatus("Add page cancelled.");
    return;
  }
  const key = uniquePageKey(label);
  const page = {
    key,
    label: label.trim(),
    title: label.trim(),
    eyebrow: "New page",
    body: "Click here to write what customers should know."
  };
  adminState.customPages = adminState.customPages || [];
  adminState.customPages.push(page);
  adminState.layoutOrder = adminState.layoutOrder || defaultLayoutOrder();
  adminState.layoutOrder.push(key);
  if (adminState.hiddenSections) delete adminState.hiddenSections[key];
  adminState.texts[customPageTextKey(key, "title")] = page.title;
  adminState.texts[customPageTextKey(key, "eyebrow")] = page.eyebrow;
  adminState.texts[customPageTextKey(key, "body")] = page.body;
  renderCustomPages();
  renderCustomBlocks();
  ensureLayoutState();
  applyLayoutState();
  markEditableText();
  syncInlineEditMode();
  showSitePage(key, { updateHash: true, behavior: "smooth" });
  const result = await saveAdminState({
    statusTarget: adminEditStatus || adminContentStatus,
    savingMessage: "Adding the new page to the live website...",
    successMessage: "New page added to the live website."
  });
  setInlineEditStatus(result.ok ? "New page added. Click the page text to edit it." : liveSaveFailureMessage(result.error));
}

async function addCustomSectionToCurrentPage() {
  if (!isAdminSignedIn()) return;
  if (!textEditMode) {
    textEditMode = true;
    syncInlineEditMode();
  }
  const pageKey = currentPageKey || firstVisiblePageKey();
  const id = `block-${Date.now().toString(36)}`;
  const block = {
    id,
    pageKey,
    title: "New section",
    body: "Click here to add details, announcements, policies, FAQs, or anything else this page needs."
  };
  adminState.customBlocks = adminState.customBlocks || [];
  adminState.customBlocks.push(block);
  adminState.texts[customBlockTextKey(id, "title")] = block.title;
  adminState.texts[customBlockTextKey(id, "body")] = block.body;
  renderCustomBlocks();
  markEditableText();
  syncInlineEditMode();
  const result = await saveAdminState({
    statusTarget: adminEditStatus || adminContentStatus,
    savingMessage: "Adding the new section to the live website...",
    successMessage: "New section added to the live website."
  });
  setInlineEditStatus(result.ok ? "New section added. Click its text to edit it." : liveSaveFailureMessage(result.error));
}

function queueInlineAdminSave(message = "Saving your edit...") {
  clearTimeout(inlineEditSaveTimer);
  setInlineEditStatus(message);
  inlineEditSaveTimer = window.setTimeout(async () => {
    inlineEditSaveTimer = null;
    const result = await saveAdminState();
    renderAdminContentFields();
    renderAdminProducts();
    renderAdminLookPhotos();
    renderAdminInventoryPanel();
    updateLookCount();
    setInlineEditStatus(result.ok ? "Saved to the live website. Keep clicking anything else you want to change." : liveSaveFailureMessage(result.error));
  }, 450);
}

function productInlineElements() {
  return Array.from(document.querySelectorAll("[data-admin-product-field]"));
}

function markInlineImageTargets() {
  imageTargets.forEach((target) => {
    const el = document.querySelector(target.selector);
    if (!el) return;
    el.dataset.adminImageKey = target.key;
    el.dataset.adminImageLabel = target.label;
  });
}

function syncInlineEditMode() {
  const active = textEditMode && isAdminSignedIn();
  markInlineImageTargets();
  body.classList.toggle("admin-inline-editing", active);
  editableElements().forEach((el) => {
    el.contentEditable = active ? "true" : "false";
    el.spellcheck = active;
  });
  productInlineElements().forEach((el) => {
    el.contentEditable = active ? "true" : "false";
    el.spellcheck = active;
  });
  document.querySelectorAll("[data-admin-image-key], [data-admin-product-image-index]").forEach((el) => {
    el.classList.toggle("admin-clickable-image", active);
  });
  toggleEditTextButton.textContent = active ? "Stop Editing Site" : "Click To Edit Site";
  toggleEditTextButton.classList.toggle("active", active);
  renderAdminEditToolbar();
  scheduleRemoveBubbleControls();
}

function clearRemoveBubbleControls() {
  document.querySelectorAll(".admin-remove-bubble").forEach((button) => button.remove());
}

function refreshTextBubbleControlsSoon() {
  clearRemoveBubbleControls();
  scheduleRemoveBubbleControls();
}

function isCompactAdminTextControl(el) {
  if (!el) return false;
  if (el.classList?.contains("eyebrow")) return true;
  const rect = el.getBoundingClientRect();
  return rect.height <= 42 && rect.width <= 220;
}

function textBubbleControlsPaused() {
  const active = document.activeElement;
  const activeEditable = active?.closest?.("[contenteditable='true']");
  return Boolean(
    textDragState ||
    (active && active.closest?.("input, textarea, select")) ||
    (activeEditable && !isCompactAdminTextControl(activeEditable)) ||
    (adminInventoryPanel && !adminInventoryPanel.hidden)
  );
}

function isEditableTextControlCandidate(el) {
  if (!el || !el.dataset.adminText) return false;
  if (el.hidden || adminState.hiddenText?.[el.dataset.adminText]) return false;
  if (el.closest(".admin-edit-toolbar, .admin-inventory-panel, .account-panel, .cart-drawer, .admin-page")) return false;
  const panel = el.closest("[data-page-panel]");
  if (panel && panel.dataset.pagePanel !== currentPageKey) return false;
  const rect = el.getBoundingClientRect();
  if (rect.width < 10 || rect.height < 10) return false;
  if (rect.bottom < navOffset() || rect.top > window.innerHeight - 8) return false;
  return true;
}

function renderRemoveBubbleControls() {
  clearRemoveBubbleControls();
  if (!textEditMode || !isAdminSignedIn() || textBubbleControlsPaused()) return;
  document.querySelectorAll("[data-admin-text]").forEach((el) => {
    const key = el.dataset.adminText;
    if (!key || !isEditableTextControlCandidate(el)) return;
    const rect = el.getBoundingClientRect();
    const compact = isCompactAdminTextControl(el);
    const controlTop = compact
      ? Math.min(window.innerHeight - 36, Math.max(navOffset(), rect.bottom + 8))
      : Math.min(window.innerHeight - 30, Math.max(navOffset(), rect.top - 12));
    const moveLeft = compact
      ? Math.min(window.innerWidth - 64, Math.max(6, rect.left))
      : Math.min(window.innerWidth - 64, Math.max(6, rect.left - 12));
    const deleteLeft = compact
      ? Math.min(window.innerWidth - 30, Math.max(42, rect.right - 24))
      : Math.min(window.innerWidth - 30, Math.max(36, rect.right - 8));
    const moveButton = document.createElement("button");
    moveButton.type = "button";
    moveButton.className = "admin-remove-bubble move";
    moveButton.dataset.dragTextKey = key;
    moveButton.setAttribute("aria-label", "Drag this writing");
    moveButton.textContent = "move";
    moveButton.style.left = `${moveLeft}px`;
    moveButton.style.top = `${controlTop}px`;
    document.body.appendChild(moveButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "admin-remove-bubble delete";
    deleteButton.dataset.removeTextKey = key;
    deleteButton.setAttribute("aria-label", "Delete this text from the page");
    deleteButton.textContent = "x";
    deleteButton.style.left = `${deleteLeft}px`;
    deleteButton.style.top = `${controlTop}px`;
    document.body.appendChild(deleteButton);
  });
}

function scheduleRemoveBubbleControls() {
  if (removeBubbleFrame) return;
  removeBubbleFrame = window.requestAnimationFrame(() => {
    removeBubbleFrame = 0;
    renderRemoveBubbleControls();
  });
}

async function removeTextBubble(key) {
  if (!key || !isAdminSignedIn()) return;
  adminState.hiddenText = adminState.hiddenText || {};
  adminState.hiddenText[key] = true;
  applyHiddenTextState();
  saveTextEdits();
  const result = await saveAdminState({
    statusTarget: adminEditStatus || adminContentStatus,
    savingMessage: "Deleting that text from the live website...",
    successMessage: "Text deleted from the live website."
  });
  setInlineEditStatus(result.ok ? "Text deleted from the live website." : liveSaveFailureMessage(result.error));
}

function startTextBubbleDrag(event) {
  if (!textEditMode || !isAdminSignedIn()) return;
  const button = event.target.closest("[data-drag-text-key]");
  if (!button) return;
  const key = button.dataset.dragTextKey;
  const element = Array.from(document.querySelectorAll("[data-admin-text]")).find((item) => item.dataset.adminText === key);
  if (!key || !element) return;
  const startOffset = sanitizeTextOffset(adminState.textOffsets?.[key]);
  textDragState = {
    key,
    element,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startOffset,
    moved: false
  };
  button.setPointerCapture?.(event.pointerId);
  body.classList.add("admin-dragging-text");
  event.preventDefault();
  event.stopPropagation();
}

function moveTextBubbleDrag(event) {
  if (!textDragState) return;
  const deltaX = event.clientX - textDragState.startX;
  const deltaY = event.clientY - textDragState.startY;
  if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) textDragState.moved = true;
  const next = sanitizeTextOffset({
    x: textDragState.startOffset.x + deltaX,
    y: textDragState.startOffset.y + deltaY
  });
  adminState.textOffsets = adminState.textOffsets || {};
  adminState.textOffsets[textDragState.key] = next;
  applyTextOffset(textDragState.element, textDragState.key);
  scheduleRemoveBubbleControls();
  event.preventDefault();
}

async function stopTextBubbleDrag(event) {
  if (!textDragState) return;
  const key = textDragState.key;
  const moved = textDragState.moved;
  textDragState = null;
  body.classList.remove("admin-dragging-text");
  scheduleRemoveBubbleControls();
  if (!moved) {
    setInlineEditStatus("Drag the move button to reposition that text.");
    return;
  }
  const result = await saveAdminState({
    statusTarget: adminEditStatus || adminContentStatus,
    savingMessage: "Saving bubble position to the live website...",
    successMessage: "Bubble position saved to the live website."
  });
  setInlineEditStatus(result.ok ? "Bubble position saved." : liveSaveFailureMessage(result.error));
}

function updateInlineTextElement(el) {
  const key = el.dataset.adminText;
  if (!key) return;
  adminState.texts[key] = el.textContent.trim();
  queueInlineAdminSave("Saving text...");
}

function updateInlineProductElement(el) {
  const index = Number(el.dataset.adminProductIndex);
  const field = el.dataset.adminProductField;
  const product = adminState.customProducts[index];
  if (!product || !field) return;
  const value = field === "price" ? el.textContent.replace("$", "").trim() : el.textContent.trim();
  product[field] = value;
  syncPublishedProductBackToLook(product, { [field]: value });
  const adminField = adminProductList?.querySelector(`[data-custom-product="${index}"][data-field="${field}"]`);
  if (adminField) adminField.value = value;
  const card = el.closest(".product");
  const addButton = card?.querySelector("[data-name]");
  if (addButton) {
    addButton.dataset.name = product.name || "";
    addButton.dataset.price = productCheckoutPrice({ ...product, index });
    addButton.dataset.productIndex = String(index);
  }
  queueInlineAdminSave("Saving product...");
}

function handleInlineEditableInput(event) {
  if (!textEditMode || !isAdminSignedIn()) return;
  clearRemoveBubbleControls();
  const productTarget = event.target.closest("[data-admin-product-field]");
  if (productTarget) {
    updateInlineProductElement(productTarget);
    return;
  }
  const textTarget = event.target.closest("[data-admin-text]");
  if (textTarget) updateInlineTextElement(textTarget);
}

function handleInlineEditableBlur(event) {
  if (!textEditMode || !isAdminSignedIn()) return;
  const editableTarget = event.target.closest("[data-admin-text], [data-admin-product-field]");
  if (!editableTarget) return;
  refreshTextBubbleControlsSoon();
  queueInlineAdminSave("Saving final edit to the live website...");
}

function ensureInlineImageInput() {
  if (adminInlineImageInput) return;
  adminInlineImageInput = document.createElement("input");
  adminInlineImageInput.type = "file";
  adminInlineImageInput.accept = "image/*";
  adminInlineImageInput.setAttribute("capture", "environment");
  adminInlineImageInput.className = "hidden-file-input";
  document.body.appendChild(adminInlineImageInput);
  adminInlineImageInput.addEventListener("change", handleInlineImageUpload);
}

function ensureInlineProductInput() {
  if (adminInlineProductInput) return;
  adminInlineProductInput = document.createElement("input");
  adminInlineProductInput.type = "file";
  adminInlineProductInput.accept = "image/*";
  adminInlineProductInput.setAttribute("capture", "environment");
  adminInlineProductInput.className = "hidden-file-input";
  document.body.appendChild(adminInlineProductInput);
  adminInlineProductInput.addEventListener("change", handleInlineProductAddPhoto);
}

async function startInlineProductAdd() {
  if (!isAdminSignedIn()) {
    openAccount("Please sign in to add products.");
    return;
  }
  await createInventoryDraft();
}

async function createInlineProductDraft() {
  await createInventoryDraft();
}

async function handleInlineProductAddPhoto() {
  const file = adminInlineProductInput.files && adminInlineProductInput.files[0];
  if (!file) return;
  adminInlineProductInput.value = "";
  const index = await createInventoryDraft();
  if (Number.isInteger(index) && index >= 0) await updateLookPhotoFromFile(index, file, adminInlineProductInput);
  renderAdminInventoryPanel();
}

async function openInlineImagePicker(target) {
  ensureInlineImageInput();
  inlineImageEditTarget = {
    imageKey: target.dataset.adminImageKey || "",
    productIndex: target.dataset.adminProductImageIndex || "",
    element: target
  };
  const currentSrc = target.currentSrc || target.getAttribute("src") || "";
  const isPlaceholder = currentSrc.startsWith("data:image/svg+xml");
  if (!currentSrc || isPlaceholder) {
    adminInlineImageInput.value = "";
    adminInlineImageInput.click();
    return;
  }
  await openInlinePhotoStudio(currentSrc, false);
}

function handleInlineImageClick(event) {
  if (!textEditMode || !isAdminSignedIn()) return;
  const imageTarget = event.target.closest("[data-admin-image-key], [data-admin-product-image-index]");
  if (!imageTarget) return;
  event.preventDefault();
  event.stopPropagation();
  openInlineImagePicker(imageTarget);
}

function handleInlineEditableClick(event) {
  if (!textEditMode || !isAdminSignedIn()) return;
  const editableTarget = event.target.closest("[contenteditable='true']");
  if (!editableTarget) return;
  if (editableTarget.closest("a, button")) {
    event.preventDefault();
  }
  event.stopPropagation();
}

async function handleInlineImageUpload() {
  const file = adminInlineImageInput.files && adminInlineImageInput.files[0];
  if (!file || !inlineImageEditTarget) return;
  setInlineEditStatus("Opening Photo Studio...");
  const dataUrl = await fileToCompressedDataUrl(file);
  adminInlineImageInput.value = "";
  await openInlinePhotoStudio(dataUrl, true);
}

async function openInlinePhotoStudio(dataUrl, sourceChanged = false) {
  if (!inlineImageEditTarget) return;
  const productIndex = Number(inlineImageEditTarget.productIndex);
  if (inlineImageEditTarget.productIndex !== "" && adminState.customProducts[productIndex]) {
    const product = adminState.customProducts[productIndex];
    const studio = await openPhotoStudio({
      dataUrl,
      title: `Adjust ${product.name || "product photo"}`,
      fit: product.imageFit,
      position: product.imagePosition,
      zoom: product.imageZoom,
      transform: product.imageTransform,
      sourceChanged
    });
    if (!studio) {
      setInlineEditStatus("Photo upload cancelled.");
      return;
    }
    setInlineEditStatus("Uploading photo to the live website...");
    const upload = await uploadAdminPhoto(studio.dataUrl, `product-inline-${productIndex}`);
    const imageUrl = upload.ok ? upload.url : studio.dataUrl;
    product.image = imageUrl;
    product.imageFit = studio.fit;
    product.imagePosition = studio.position;
    product.imageZoom = studio.zoom;
    product.imageTransform = studio.transform;
    syncPublishedProductBackToLook(product, {
      image: imageUrl,
      imageFit: studio.fit,
      imagePosition: studio.position,
      imageZoom: studio.zoom,
      imageTransform: studio.transform
    });
    if (inlineImageEditTarget.element?.tagName === "IMG") {
      inlineImageEditTarget.element.src = imageUrl;
      applyPhotoFitToImage(inlineImageEditTarget.element, studio.fit, studio.position, studio.zoom, studio.transform);
    }
    if (!upload.ok) {
      localSaveAdminState();
      setInlineEditStatus(liveSaveFailureMessage(upload.error));
      return;
    }
    const result = await saveAdminState();
    renderCustomProducts();
    renderAdminProducts();
    renderAdminLookPhotos();
    renderAdminInventoryPanel();
    if (result.ok) {
      triggerPhotoBounce(inlineImageEditTarget.element);
      showAdminUploadCelebration("Product photo is live.");
    }
    setInlineEditStatus(result.ok ? "Product photo saved to the live website." : liveSaveFailureMessage(result.error));
    return;
  }
  if (inlineImageEditTarget.imageKey) {
    const imageKey = inlineImageEditTarget.imageKey;
    const studio = await openPhotoStudio({
      dataUrl,
      title: "Adjust site photo",
      fit: adminState.imageFits[imageKey],
      position: adminState.imagePositions[imageKey],
      zoom: adminState.imageZooms[imageKey],
      transform: adminState.imageTransforms[imageKey],
      sourceChanged
    });
    if (!studio) {
      setInlineEditStatus("Photo upload cancelled.");
      return;
    }
    setInlineEditStatus("Uploading photo to the live website...");
    adminState.imageFits[imageKey] = studio.fit;
    adminState.imagePositions[imageKey] = studio.position;
    adminState.imageZooms[imageKey] = studio.zoom;
    adminState.imageTransforms[imageKey] = studio.transform;
    const upload = await uploadAdminPhoto(studio.dataUrl, `site-inline-${imageKey}`);
    const imageUrl = upload.ok ? upload.url : studio.dataUrl;
    adminState.images[imageKey] = imageUrl;
    applyImageValue(imageKey, imageUrl);
    if (!upload.ok) {
      localSaveAdminState();
      setInlineEditStatus(liveSaveFailureMessage(upload.error));
      return;
    }
    const result = await saveAdminState();
    renderAdminImages();
    renderAdminInventoryPanel();
    if (result.ok) {
      triggerPhotoBounce(inlineImageEditTarget.element);
      showAdminUploadCelebration("Site photo is live.");
    }
    setInlineEditStatus(result.ok ? "Site photo saved to the live website." : liveSaveFailureMessage(result.error));
  }
}

function handleInlineEditKeydown(event) {
  if (!textEditMode || !event.target.closest("[contenteditable='true']")) return;
  if (event.key === "Escape") {
    event.target.blur();
    event.preventDefault();
  }
}

document.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-text-key]");
  if (removeButton) {
    event.preventDefault();
    event.stopPropagation();
    removeTextBubble(removeButton.dataset.removeTextKey);
    return;
  }

  const link = event.target.closest("[data-page-link]");
  if (!link) return;
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const pageKey = link.dataset.pageLink;
  if (!pageKey) return;
  event.preventDefault();
  showSitePage(pageKey, { updateHash: true, behavior: "smooth" });
});
document.addEventListener("focusin", (event) => {
  if (!textEditMode || !isAdminSignedIn()) return;
  if (event.target.closest("[contenteditable='true'], input, textarea, select")) {
    clearRemoveBubbleControls();
  }
});
document.addEventListener("focusout", () => {
  if (!textEditMode || !isAdminSignedIn()) return;
  refreshTextBubbleControlsSoon();
});
document.addEventListener("pointerdown", startTextBubbleDrag);
window.addEventListener("pointermove", moveTextBubbleDrag);
window.addEventListener("pointerup", stopTextBubbleDrag);
window.addEventListener("pointercancel", stopTextBubbleDrag);

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#adminPage") {
    showAdminPage();
    return;
  }
  const productIndex = productIndexFromHash();
  if (productIndex >= 0) {
    openProductDetail(productIndex, { updateHash: false, behavior: "smooth" });
    return;
  }
  showSitePage(pageKeyFromHash(), { updateHash: false, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  schedulePageStateFromScroll();
  scheduleScrollChrome();
  if (textEditMode && isAdminSignedIn()) scheduleRemoveBubbleControls();
}, { passive: true });
window.addEventListener("resize", () => {
  schedulePageStateFromScroll();
  scheduleScrollChrome();
  if (textEditMode && isAdminSignedIn()) scheduleRemoveBubbleControls();
  syncAdminViewportChrome();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (adminInventoryPanel && !adminInventoryPanel.hidden) {
    closeAdminInventoryPanel();
    event.preventDefault();
    return;
  }
  closeCartDrawer();
  closeAccountPanel();
  refreshTextBubbleControlsSoon();
});

function escapeHTML(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[char];
  });
}

function orderItemMeta(item = {}) {
  return [
    item.customOrder ? "Custom order request" : "",
    item.requestTitle || "",
    cartItemQuantity(item) > 1 ? `Quantity ${cartItemQuantity(item)}` : "",
    item.shape || "",
    item.shade || "",
    item.note ? "Design notes included" : "",
    item.image ? "Reference photo attached" : ""
  ]
    .filter(Boolean)
    .map(escapeHTML)
    .join(" · ");
}

function cartItemQuantity(item = {}) {
  const quantity = Math.floor(Number(item.quantity) || 1);
  return Math.min(Math.max(quantity, 1), 10);
}

function cartItemTotal(item = {}) {
  return (Number(item.price) || 0) * cartItemQuantity(item);
}

function cartTotalValue() {
  return cart.reduce((sum, item) => sum + cartItemTotal(item), 0);
}

function orderItemPriceLabel(item = {}) {
  if (item.customOrder) return "Quote after review";
  const quantity = cartItemQuantity(item);
  const total = cartItemTotal(item);
  return quantity > 1 ? `$${Number(item.price) || 0} each - $${total} total` : `$${total}`;
}

function orderItemSummary(item = {}) {
  const parts = [item.name || "Custom order"];
  if (cartItemQuantity(item) > 1) parts.push(`quantity ${cartItemQuantity(item)}`);
  if (item.customOrder) parts.push("custom request");
  if (item.image) parts.push("photo attached");
  return parts.join(" - ");
}

function orderRequestNotesMarkup(order = {}) {
  const notes = (order.items || [])
    .filter((item) => item.note)
    .map((item) => `${item.name}: ${item.note}${item.image ? " (photo attached)" : ""}`);
  return notes.length
    ? notes.map((note) => `<p class="order-request-note">${escapeHTML(note)}</p>`).join("")
    : "";
}

function handleCustomOrderPhotoUpload() {
  if (!customOrderPhoto || !customOrderPreviewImage || !customOrderPhotoName || !customOrderPreview) return;
  const file = customOrderPhoto.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    customOrderPhotoDataUrl = String(reader.result || "");
    customOrderPreviewImage.src = customOrderPhotoDataUrl;
    customOrderPhotoName.textContent = file.name;
    customOrderPreview.hidden = false;
    if (customOrderStatus) customOrderStatus.textContent = "";
  });
  reader.readAsDataURL(file);
}

function clearCustomOrderPhoto() {
  if (!customOrderPhoto || !customOrderPreviewImage || !customOrderPhotoName || !customOrderPreview) return;
  customOrderPhotoDataUrl = "";
  customOrderPhoto.value = "";
  customOrderPreviewImage.removeAttribute("src");
  customOrderPhotoName.textContent = "Reference photo uploaded";
  customOrderPreview.hidden = true;
}

function submitCustomOrderRequest() {
  if (!customOrderDescription || !customOrderStatus) return;
  const requestTitle = customOrderName?.value.trim() || "";
  const description = customOrderDescription.value.trim();
  if (!description) {
    customOrderStatus.textContent = "Add the custom order description first.";
    customOrderDescription.focus();
    return;
  }
  if (!customOrderPhotoDataUrl) {
    customOrderStatus.textContent = "Upload a reference photo before sending the custom order request.";
    customOrderPhoto?.focus();
    return;
  }
  addToCart(requestTitle ? `Custom Order - ${requestTitle}` : "Custom Order Request", 0, {
    customOrder: true,
    requestTitle,
    note: description,
    image: customOrderPhotoDataUrl
  });
  customOrderStatus.textContent = "Custom order request added to your bag. Submit checkout so Chey can review it.";
  if (customOrderName) customOrderName.value = "";
  customOrderDescription.value = "";
  clearCustomOrderPhoto();
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = `cart-item${item.image ? " has-image" : ""}${item.customOrder ? " is-custom-order" : ""}`;
    row.style.setProperty("--cart-index", String(index));
    const meta = orderItemMeta(item) || [item.shape, item.shade, item.note ? "Design notes included" : "", item.image ? "Inspiration photo included" : ""]
      .filter(Boolean)
      .map(escapeHTML)
      .join(" · ");
    const price = Number(item.price) || 0;
    row.innerHTML = `
      <div class="cart-thumb-wrap">
        ${item.image ? `<img class="cart-thumb" src="${item.image}" alt="Inspiration for ${escapeHTML(item.name)}" />` : `<span class="cart-thumb-fallback" aria-hidden="true"></span>`}
      </div>
      <div class="cart-item-copy">
        <span class="cart-item-number">Set ${index + 1}</span>
        <strong>${escapeHTML(item.name)}</strong>
        ${meta ? `<p class="cart-meta">${meta}</p>` : ""}
        ${item.note ? `<p class="cart-note">${escapeHTML(item.note)}</p>` : ""}
        <div class="cart-item-price">${orderItemPriceLabel(item)}</div>
      </div>
      <button class="cart-remove" type="button" aria-label="Remove ${escapeHTML(item.name)}" data-index="${index}">x</button>
    `;
    cartItems.appendChild(row);
  });

  const total = cartTotalValue();
  cartCount.textContent = cart.reduce((sum, item) => sum + cartItemQuantity(item), 0);
  cartTotal.textContent = `$${total}`;
  cartEmpty.textContent = cartEmptyMessage;
  cartEmpty.classList.toggle("show", cart.length === 0);
  cartItems.classList.toggle("has-items", cart.length > 0);
  body.classList.toggle("cart-has-items", cart.length > 0);
  guestCheckout.hidden = cart.length === 0;
}

function addToCart(name, price, details = {}) {
  cartEmptyMessage = "Your bag is ready for something glossy.";
  cart.push({ name, price: Number(price), ...details, quantity: cartItemQuantity(details) });
  renderCart();
  cartButton.classList.remove("bag-pop");
  void cartButton.offsetWidth;
  cartButton.classList.add("bag-pop");
  openCart();
}

function blankHandSizes() {
  return Object.fromEntries(sizeFingerKeys.map((finger) => [finger, ""]));
}

function normalizeCustomerSizes(sizes = {}) {
  const source = sizes && typeof sizes === "object" ? sizes : {};
  const legacySizes = Object.fromEntries(
    sizeFingerKeys.map((finger) => [finger, typeof source[finger] === "string" ? source[finger] : ""])
  );
  const normalized = Object.fromEntries(sizeHandKeys.map((hand) => [hand, blankHandSizes()]));

  sizeHandKeys.forEach((hand) => {
    const handSource = source[hand] && typeof source[hand] === "object" ? source[hand] : legacySizes;
    sizeFingerKeys.forEach((finger) => {
      normalized[hand][finger] = typeof handSource[finger] === "string" ? handSource[finger] : "";
    });
  });

  return normalized;
}

function hasSavedHandSizes(sizes = {}) {
  const normalized = normalizeCustomerSizes(sizes);
  return sizeHandKeys.some((hand) => sizeFingerKeys.some((finger) => Boolean(normalized[hand][finger])));
}

function handSizeSummary(label, sizes = {}) {
  const values = sizeFingerKeys
    .map((finger) => `${finger} ${sizes[finger] || "-"}`)
    .join(", ");
  return `${label}: ${values}`;
}

function customerSizesSummary(user) {
  const sizes = normalizeCustomerSizes(user.sizes);
  if (!hasSavedHandSizes(sizes)) return "Sizes not saved";
  return `Sizes - ${handSizeSummary("Left", sizes.left)}; ${handSizeSummary("Right", sizes.right)}`;
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
            sizes: normalizeCustomerSizes(user.sizes),
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
  const adminSignedIn = isAdminSignedIn();
  const user = currentCustomer();
  accountAuth.classList.toggle("admin-session-active", adminSignedIn);
  if (adminSessionCard) adminSessionCard.hidden = !adminSignedIn;
  accountStatus.hidden = adminSignedIn;
  accountAuth.hidden = adminSignedIn ? false : Boolean(user);
  accountDashboard.hidden = adminSignedIn || !user;
  if (adminSignedIn) {
    accountStatus.textContent = "";
    savedProductsList.innerHTML = "";
    orderHistoryList.innerHTML = "";
    return;
  }
  if (!user) {
    accountStatus.hidden = false;
    savedProductsList.innerHTML = "";
    orderHistoryList.innerHTML = "";
    return;
  }
  accountStatus.hidden = false;
  accountName.textContent = `Welcome back, ${user.name}`;
  user.sizes = normalizeCustomerSizes(user.sizes);
  sizeHandKeys.forEach((hand) => {
    sizeFingerKeys.forEach((finger) => {
      const input = sizeInputs[hand]?.[finger];
      if (input) input.value = user.sizes[hand]?.[finger] || "";
    });
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
    : `
      <div class="account-list-item account-empty-card">
        <strong>No favorites yet</strong>
        <p>Tap Save on any set in the shop and it will show up here for a faster reorder.</p>
      </div>
    `;
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
              <p>${escapeHTML(order.items.map(orderItemSummary).join(", "))}</p>
              ${orderRequestNotesMarkup(order)}
            </div>
          `
        )
        .join("")
    : `
      <div class="account-list-item account-empty-card">
        <strong>No orders yet</strong>
        <p>After checkout, your set details and custom request notes will live here.</p>
      </div>
    `;
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
    sizes: normalizeCustomerSizes(),
    savedProducts: [],
    orders: [],
    createdAt: new Date().toLocaleString(),
    lastLogin: new Date().toLocaleString()
  });
  customerState.currentEmail = email;
  exitAdminModeForCustomer();
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
    startAdminSession();
    customerState.currentEmail = "";
    saveCustomerState();
    accountStatus.textContent = "";
    loginEmail.value = "";
    loginPassword.value = "";
    renderAccount();
    renderAdminVisibility();
    closeAccountPanel();
    textEditMode = false;
    showAdminPage();
    renderCustomProducts();
    syncInlineEditMode();
    setInlineEditStatus("Admin is signed in. Use the Admin Dashboard tabs to edit the site or view orders.");
    return;
  }
  const user = customerState.users.find((item) => item.email === email && item.password === password);
  if (!user) {
    accountStatus.textContent = "No account found with that email and password.";
    return;
  }
  exitAdminModeForCustomer();
  user.lastLogin = new Date().toLocaleString();
  customerState.currentEmail = email;
  saveCustomerState();
  accountStatus.textContent = "";
  loginEmail.value = "";
  loginPassword.value = "";
  renderAccount();
}

function showPasswordReset(show = true) {
  passwordResetCard.hidden = !show;
  if (show) {
    resetEmail.value = loginEmail.value.trim().toLowerCase();
    resetCodeStep.hidden = true;
    resetCode.value = "";
    resetNewPassword.value = "";
    accountStatus.textContent = "Enter your account email to request a reset passcode.";
    resetEmail.focus();
  } else {
    passwordResetRequest = null;
    accountStatus.textContent = "";
  }
}

function createResetCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function requestPasswordReset() {
  const email = resetEmail.value.trim().toLowerCase();
  const user = customerState.users.find((item) => item.email === email);
  if (!email) {
    accountStatus.textContent = "Enter the email on the customer account.";
    return;
  }
  if (!user) {
    accountStatus.textContent = "If that email has an account, a reset passcode will be sent.";
    resetCodeStep.hidden = true;
    return;
  }
  const code = createResetCode();
  passwordResetRequest = {
    email,
    code,
    expiresAt: Date.now() + 10 * 60 * 1000
  };
  resetCodeStep.hidden = false;
  resetCode.value = "";
  resetNewPassword.value = "";
  resetCode.focus();
  accountStatus.textContent = `Email passcode created for ${email}. Demo passcode: ${code}. Connect an email provider before saving real card/payment details.`;
}

function verifyPasswordReset() {
  const code = resetCode.value.trim();
  const newPassword = resetNewPassword.value;
  if (!passwordResetRequest) {
    accountStatus.textContent = "Request a fresh passcode first.";
    return;
  }
  if (Date.now() > passwordResetRequest.expiresAt) {
    passwordResetRequest = null;
    accountStatus.textContent = "That passcode expired. Request a new one.";
    return;
  }
  if (code !== passwordResetRequest.code) {
    accountStatus.textContent = "That passcode does not match.";
    return;
  }
  if (newPassword.length < 8) {
    accountStatus.textContent = "Use at least 8 characters for the new password.";
    return;
  }
  const user = customerState.users.find((item) => item.email === passwordResetRequest.email);
  if (!user) {
    accountStatus.textContent = "Account not found. Request a new code.";
    return;
  }
  user.password = newPassword;
  user.lastLogin = new Date().toLocaleString();
  customerState.currentEmail = user.email;
  saveCustomerState();
  passwordResetRequest = null;
  resetCodeStep.hidden = true;
  passwordResetCard.hidden = true;
  loginEmail.value = "";
  loginPassword.value = "";
  accountStatus.textContent = "Password updated. You are signed in.";
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
    sizeHandKeys.map((hand) => [
      hand,
      Object.fromEntries(
        sizeFingerKeys.map((finger) => [finger, sizeInputs[hand]?.[finger]?.value.trim() || ""])
      )
    ])
  );
  saveCustomerState();
  renderAdminUsers();
  accountStatus.textContent = "Left and right hand sizes saved.";
}

function productPriceFromCard(product) {
  const buttonPrice = Number(product.querySelector("[data-name]")?.dataset.price);
  if (Number.isFinite(buttonPrice)) return buttonPrice;
  const visiblePrice = product.querySelector(".sale-price, .product-bottom strong")?.textContent.replace("$", "").trim() || "0";
  return Number(visiblePrice) || 0;
}

function productDataFromCard(product) {
  const name = product.querySelector("h3").textContent.trim();
  const copy = product.querySelector(".product-copy > p:not(.product-tag)").textContent.trim();
  const image = product.querySelector(".photo-preview img")?.getAttribute("src") || "";
  return {
    name,
    copy,
    price: productPriceFromCard(product),
    image,
    shape: detectProductShape(`${name} ${copy}`) || ""
  };
}

function saveProductForCustomer(product) {
  saveProductDataForCustomer(productDataFromCard(product));
}

function saveProductDataForCustomer(item) {
  const user = currentCustomer();
  if (!user) {
    openAccount("Sign in or create an account to save products.");
    return;
  }
  user.savedProducts = user.savedProducts || [];
  if (!user.savedProducts.some((saved) => saved.name === item.name)) {
    user.savedProducts.push(item);
  }
  saveCustomerState();
  renderAccount();
  renderAdminUsers();
  openAccount("Product saved.");
}

function selectedDetailProduct() {
  return adminState.customProducts[selectedProductIndex] || null;
}

function productDetailCustomerData(product, index) {
  return {
    name: product.name || "Handmade nail set",
    copy: product.description || "Handmade by Chey.",
    price: productCheckoutPrice({ ...product, index }),
    image: product.image || "",
    shape: detectProductShape(`${product.name || ""} ${product.description || ""}`) || ""
  };
}

function updateProductDetailQuantity(nextQuantity) {
  productDetailQuantity = Math.min(Math.max(Math.floor(Number(nextQuantity) || 1), 1), 10);
  const value = productDetailContent?.querySelector("[data-product-detail-quantity]");
  const decrease = productDetailContent?.querySelector("[data-product-detail-decrease]");
  const increase = productDetailContent?.querySelector("[data-product-detail-increase]");
  if (value) value.textContent = String(productDetailQuantity);
  if (decrease) decrease.disabled = productDetailQuantity <= 1;
  if (increase) increase.disabled = productDetailQuantity >= 10;
}

function renderProductDetail() {
  if (!productDetailContent) return false;
  const product = selectedDetailProduct();
  if (!product) {
    productDetailContent.innerHTML = `
      <div class="product-detail-empty">
        <p class="eyebrow">Product unavailable</p>
        <h2>This set is no longer in the Shop.</h2>
        <button class="button primary" type="button" data-product-detail-back>Back To Shop</button>
      </div>
    `;
    productDetailContent.querySelector("[data-product-detail-back]")?.addEventListener("click", () => showSitePage("shop", { updateHash: true, behavior: "smooth" }));
    return false;
  }

  const productForDisplay = { ...product, index: selectedProductIndex };
  const checkoutPrice = productCheckoutPrice(productForDisplay);
  const soldOut = /sold\s*out|unavailable/i.test(product.stock || "");
  const missingPrice = checkoutPrice <= 0;
  const discountLabel = productDiscountLabel(productForDisplay);
  const categoryLabel = optionLabel(categoryOptions, product.category, "Custom / handmade");
  const stockLabel = optionLabel(stockOptions, product.stock || "Available", product.stock || "Available");
  const skuMarkup = product.sku ? `<span><small>Product code</small><strong>${escapeHTML(product.sku)}</strong></span>` : "";

  productDetailContent.innerHTML = `
    <button class="product-detail-back" type="button" data-product-detail-back aria-label="Back to Shop">&larr; Back To Shop</button>
    <div class="product-detail-layout">
      <div class="product-detail-gallery">
        <div class="product-detail-photo photo-preview">
          ${productImageMarkup(product, selectedProductIndex)}
          ${discountLabel ? `<span class="product-sale-badge">${escapeHTML(discountLabel)}</span>` : ""}
        </div>
        <p>Tap the photo for a closer look.</p>
      </div>
      <div class="product-detail-info">
        <div class="product-detail-heading">
          <p class="product-tag">${escapeHTML(product.tag || "Handmade by Chey")}</p>
          <h1>${escapeHTML(product.name || "Handmade nail set")}</h1>
          <div class="product-detail-price">${productPriceMarkup(productForDisplay)}</div>
        </div>
        <p class="product-detail-description">${escapeHTML(product.description || "A handmade Pressed by Chey set, created and finished with care.")}</p>
        <div class="product-detail-facts" aria-label="Product details">
          <span><small>Availability</small><strong>${escapeHTML(stockLabel)}</strong></span>
          <span><small>Style</small><strong>${escapeHTML(categoryLabel)}</strong></span>
          ${skuMarkup}
        </div>
        <div class="product-detail-confidence">
          <strong>Made for a better fit</strong>
          <p>Save your sizing in your account and include any fit or application notes during checkout.</p>
        </div>
        <div class="product-detail-purchase">
          <div class="product-detail-quantity" aria-label="Quantity selector">
            <span>Quantity</span>
            <div>
              <button type="button" data-product-detail-decrease aria-label="Decrease quantity">&minus;</button>
              <strong data-product-detail-quantity aria-live="polite">${productDetailQuantity}</strong>
              <button type="button" data-product-detail-increase aria-label="Increase quantity">&plus;</button>
            </div>
          </div>
          <button class="button primary product-detail-add" type="button" data-product-detail-add${soldOut || missingPrice ? " disabled" : ""}>
            ${soldOut ? "Sold Out" : missingPrice ? "Price Coming Soon" : `Add To Bag - $${escapeHTML(checkoutPrice)}`}
          </button>
          <button class="button secondary product-detail-save" type="button" data-product-detail-save>Save This Set</button>
        </div>
        <p class="product-detail-status" data-product-detail-status role="status"></p>
      </div>
    </div>
  `;

  productDetailContent.querySelector("[data-product-detail-back]")?.addEventListener("click", () => showSitePage("shop", { updateHash: true, behavior: "smooth" }));
  productDetailContent.querySelector("[data-product-detail-decrease]")?.addEventListener("click", () => updateProductDetailQuantity(productDetailQuantity - 1));
  productDetailContent.querySelector("[data-product-detail-increase]")?.addEventListener("click", () => updateProductDetailQuantity(productDetailQuantity + 1));
  productDetailContent.querySelector("[data-product-detail-add]")?.addEventListener("click", () => {
    const item = productDetailCustomerData(product, selectedProductIndex);
    addToCart(item.name, item.price, {
      image: item.image,
      shape: item.shape,
      category: product.category || "",
      quantity: productDetailQuantity,
      sourceProductIndex: selectedProductIndex
    });
  });
  productDetailContent.querySelector("[data-product-detail-save]")?.addEventListener("click", () => {
    saveProductDataForCustomer(productDetailCustomerData(product, selectedProductIndex));
  });
  updateProductDetailQuantity(productDetailQuantity);
  return true;
}

function openProductDetail(index, options = {}) {
  const nextIndex = Number(index);
  if (!Number.isInteger(nextIndex) || !adminState.customProducts[nextIndex]) {
    showSitePage("shop", { updateHash: true, force: Boolean(options.force) });
    return false;
  }
  selectedProductIndex = nextIndex;
  productDetailQuantity = 1;
  renderProductDetail();
  if (options.updateHash !== false) history.replaceState(null, "", `#product-${nextIndex}`);
  showSitePage("product", { updateHash: false, force: Boolean(options.force), behavior: options.behavior || "smooth" });
  return true;
}

function checkoutCart() {
  if (!cart.length) return;
  const user = currentCustomer();
  if (!user) {
    openGuestCheckout("Add your contact info and continue to secure payment.");
    return;
  }
  if (cartHasOnlyQuoteRequests()) {
    saveAccountQuoteOrder(user);
    return;
  }
  startStripeCheckout({
    source: "account",
    customer: {
      mode: "account",
      name: user.name,
      email: user.email,
      notes: customerSizesSummary(user)
    }
  });
}

function openGuestCheckout(message = "Guest checkout is ready. Add your contact info and place the order.") {
  if (!cart.length) return;
  guestCheckout.hidden = false;
  guestCheckout.open = true;
  guestCheckoutStatus.textContent = message;
  requestAnimationFrame(() => {
    guestName.focus();
    guestCheckout.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    guestCheckoutStatus.textContent = "Enter a valid email so Chey can send order updates.";
    return;
  }
  if (cartHasOnlyQuoteRequests()) {
    saveGuestQuoteOrder({ name, email, phone, notes });
    return;
  }
  startStripeCheckout({
    source: "guest",
    customer: { mode: "guest", name, email, phone, notes }
  });
}

function cartQuoteItems() {
  return cart.filter((item) => item.customOrder || cartItemTotal(item) <= 0);
}

function cartHasOnlyQuoteRequests() {
  return cart.length > 0 && cartQuoteItems().length === cart.length;
}

function cartHasMixedQuoteAndPayItems() {
  const quoteCount = cartQuoteItems().length;
  return quoteCount > 0 && quoteCount < cart.length;
}

function setCheckoutMessage(message = "", isError = false) {
  if (checkoutStatus) {
    checkoutStatus.textContent = message;
    checkoutStatus.classList.toggle("is-error", Boolean(isError));
  }
  if (guestCheckout?.open && guestCheckoutStatus) {
    guestCheckoutStatus.textContent = message;
    guestCheckoutStatus.classList.toggle("is-error", Boolean(isError));
  }
}

function setCheckoutBusy(isBusy) {
  [checkoutButton, guestCheckoutButton, guestCheckoutOpen].forEach((button) => {
    if (button) button.disabled = Boolean(isBusy);
  });
}

function checkoutReturnBaseUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function checkoutProductIndex(value) {
  if (value === "" || value === null || value === undefined) return "";
  const index = Number(value);
  return Number.isInteger(index) && index >= 0 ? index : "";
}

function checkoutLineItems() {
  return cart.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: cartItemQuantity(item),
    customOrder: Boolean(item.customOrder),
    sourceProductIndex: checkoutProductIndex(item.sourceProductIndex),
    category: item.category || "",
    shape: item.shape || "",
    note: item.note || ""
  }));
}

function pendingCheckoutSnapshot(customer = {}) {
  return {
    createdAt: new Date().toISOString(),
    customer,
    items: cart.map((item) => ({ ...item, image: item.image ? "Reference photo attached" : "" })),
    total: cartTotalValue()
  };
}

async function startStripeCheckout({ source = "guest", customer = {} } = {}) {
  if (!cart.length) return;
  if (cartHasMixedQuoteAndPayItems()) {
    setCheckoutMessage("Payable products and quote-only custom requests need separate checkouts. Remove the quote request or pay for the ready products first.", true);
    return;
  }
  const total = cartTotalValue();
  if (total <= 0) {
    setCheckoutMessage("This bag needs Chey to review it before payment because it does not have a final price.", true);
    return;
  }

  setCheckoutBusy(true);
  setCheckoutMessage("Opening secure checkout...");
  try {
    sessionStorage.setItem(CHECKOUT_PENDING_ORDER_KEY, JSON.stringify(pendingCheckoutSnapshot({ ...customer, source })));
    const response = await fetch(STRIPE_CHECKOUT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: checkoutLineItems(),
        customer,
        source,
        returnBaseUrl: checkoutReturnBaseUrl()
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.url) {
      throw new Error(data.error || "Secure checkout could not start.");
    }
    window.location.assign(data.url);
  } catch (error) {
    setCheckoutBusy(false);
    setCheckoutMessage(error.message || "Secure checkout could not start.", true);
  }
}

function saveAccountQuoteOrder(user) {
  const total = cartTotalValue();
  user.orders = user.orders || [];
  user.orders.unshift({
    id: `Quote ${String(user.orders.length + 1).padStart(3, "0")}`,
    date: new Date().toLocaleDateString(),
    total,
    items: cart.map((item) => ({ ...item, image: item.image ? "Reference photo attached" : "" }))
  });
  cart.splice(0, cart.length);
  cartEmptyMessage = "Custom request saved for Chey to review.";
  saveCustomerState();
  renderCart();
  renderAccount();
  renderAdminUsers();
  closeCartDrawer();
  openAccount("Custom request saved for Chey to review before payment.");
}

function saveGuestQuoteOrder({ name, email, phone, notes }) {
  const total = cartTotalValue();
  guestOrders.unshift({
    id: `Guest ${String(guestOrders.length + 1).padStart(3, "0")}`,
    date: new Date().toLocaleString(),
    name,
    email,
    phone,
    notes,
    total,
    items: cart.map((item) => ({ ...item, image: item.image ? "Reference photo attached" : "" }))
  });
  cart.splice(0, cart.length);
  cartEmptyMessage = "Your guest order has been saved.";
  [guestName, guestEmail, guestPhone, guestNotes].forEach((input) => {
    input.value = "";
  });
  saveGuestOrders();
  renderCart();
  renderAdminGuestOrders();
  guestCheckout.open = false;
  guestCheckoutStatus.textContent = "";
  openCart();
}

function localPaidOrderFromServer(order = {}) {
  const total = Number(order.total || 0) / 100 || cartTotalValue();
  return {
    id: order.id || `Paid ${new Date().toLocaleDateString()}`,
    date: new Date(order.paidAt || Date.now()).toLocaleString(),
    total: total % 1 === 0 ? String(total) : total.toFixed(2),
    items: Array.isArray(order.items)
      ? order.items.map((item) => ({
          name: item.name,
          price: Number(item.unitAmount || 0) / 100,
          quantity: item.quantity,
          shape: item.category || "",
          image: item.image ? "Product photo attached" : ""
        }))
      : []
  };
}

function recordPaidCheckoutLocally(order = {}) {
  const paidOrder = localPaidOrderFromServer(order);
  const pending = readPendingCheckoutSnapshot();
  const email = (order.customer?.email || pending?.customer?.email || "").toLowerCase();
  const user = customerState.users.find((item) => item.email === email) || currentCustomer();
  if (user) {
    user.orders = user.orders || [];
    if (!user.orders.some((saved) => saved.id === paidOrder.id)) {
      user.orders.unshift(paidOrder);
      saveCustomerState();
    }
    renderAccount();
    renderAdminUsers();
    return;
  }

  if (!guestOrders.some((saved) => saved.id === paidOrder.id)) {
    guestOrders.unshift({
      ...paidOrder,
      name: order.customer?.name || pending?.customer?.name || "Guest customer",
      email,
      phone: order.customer?.phone || pending?.customer?.phone || "",
      notes: order.customer?.notes || pending?.customer?.notes || ""
    });
    saveGuestOrders();
    renderAdminGuestOrders();
  }
}

function readPendingCheckoutSnapshot() {
  try {
    return JSON.parse(sessionStorage.getItem(CHECKOUT_PENDING_ORDER_KEY) || "null");
  } catch {
    return null;
  }
}

async function handleCheckoutReturn() {
  const params = new URLSearchParams(window.location.search);
  const checkoutResult = params.get("checkout");
  if (!checkoutResult) return;

  openCart();
  if (checkoutResult === "cancel") {
    setCheckoutMessage("Payment was canceled. Your bag is still here when you are ready.", true);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.hash || "#shop"}`);
    return;
  }

  const sessionId = params.get("session_id");
  if (!sessionId) {
    setCheckoutMessage("Secure checkout sent you back, but the order confirmation was missing. Check the payment dashboard before remaking the order.", true);
    return;
  }

  setCheckoutMessage("Confirming payment...");
  try {
    const response = await fetch(`${STRIPE_CHECKOUT_STATUS_ENDPOINT}?session_id=${encodeURIComponent(sessionId)}`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Payment could not be verified.");
    }
    if (!data.paid) {
      setCheckoutMessage("Checkout returned without a completed payment. If this looks wrong, check the payment dashboard.", true);
      return;
    }
    recordPaidCheckoutLocally(data.order);
    cart.splice(0, cart.length);
    cartEmptyMessage = "Payment received. Thank you for your order.";
    renderCart();
    sessionStorage.removeItem(CHECKOUT_PENDING_ORDER_KEY);
    setCheckoutMessage("Payment received. Chey has the order details and will follow up with sizing/timing.");
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.hash || "#shop"}`);
  } catch (error) {
    setCheckoutMessage(error.message || "Payment verification failed. Check Stripe before remaking the order.", true);
  }
}

function renderAdminUsers() {
  if (!adminUserList) return;
  adminUserList.innerHTML = customerState.users.length
    ? customerState.users
        .map((user) => {
          const sizes = customerSizesSummary(user);
          return `
            <div class="admin-user-card">
              <strong>${escapeHTML(user.name)} · ${escapeHTML(user.email)}</strong>
              <p>${escapeHTML(user.createdAt ? `Created: ${user.createdAt}` : "Created date not saved")}</p>
              <p>${escapeHTML(user.lastLogin ? `Last login: ${user.lastLogin}` : "No login yet")}</p>
              <p>${escapeHTML(sizes)}</p>
              <p>${(user.savedProducts || []).length} saved products · ${(user.orders || []).length} orders</p>
              <p>${escapeHTML((user.orders || []).map((order) => order.id).join(", ") || "No order history")}</p>
              ${(user.orders || []).slice(0, 2).map(orderRequestNotesMarkup).join("")}
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
            <p>${escapeHTML((order.items || []).map(orderItemSummary).join(", "))}</p>
            ${orderRequestNotesMarkup(order)}
            ${order.notes ? `<p>${escapeHTML(order.notes)}</p>` : ""}
          </div>
        `)
        .join("")
    : `<div class="admin-user-card"><p>No guest orders yet.</p></div>`;
}

function formatOrderMoney(cents = 0, currency = "usd") {
  const amount = Number(cents || 0) / 100;
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: String(currency || "usd").toUpperCase() }).format(safeAmount);
  } catch {
    return `$${safeAmount.toFixed(2)}`;
  }
}

function orderCustomerName(order = {}) {
  return order.customer?.name || order.customerName || order.shipping?.name || "Customer";
}

function orderCustomerEmail(order = {}) {
  return order.customer?.email || order.customerEmail || "";
}

function orderCustomerPhone(order = {}) {
  return order.customer?.phone || order.customerPhone || "";
}

function orderShippingSummary(order = {}) {
  const address = order.shipping?.address;
  if (!address) return "Shipping address collected in checkout";
  return [
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(", "),
    address.country
  ].filter(Boolean).join(" - ");
}

function orderItemWorkflowSummary(item = {}) {
  const unit = Number(item.unitAmount || item.price || 0);
  const unitLabel = item.unitAmount ? formatOrderMoney(unit) : `$${unit}`;
  const qty = Number(item.quantity || 1);
  return `${item.name || "Product"} x ${qty} (${unitLabel}${item.category ? ` - ${item.category}` : ""})`;
}

function fulfillmentStatusOptions(selected = "") {
  return ["Payment pending", "Needs review", "Needs making", "Ready to ship", "Shipped", "Canceled"]
    .map((status) => `<option value="${escapeAttribute(status)}"${status === selected ? " selected" : ""}>${escapeHTML(status)}</option>`)
    .join("");
}

function renderAdminLiveOrders() {
  if (!adminLiveOrderList) return;
  adminLiveOrderList.innerHTML = liveOrders.length
    ? liveOrders
        .map((order) => {
          const status = order.fulfillmentStatus || (order.paymentStatus === "paid" ? "Needs review" : "Payment pending");
          const paid = order.paymentStatus === "paid";
          return `
            <article class="admin-live-order-card ${paid ? "is-paid" : "is-pending"}">
              <div class="admin-live-order-head">
                <div>
                  <span>${escapeHTML(paid ? "Paid order" : "Payment pending")}</span>
                  <strong>${escapeHTML(orderCustomerName(order))}</strong>
                  <p>${escapeHTML(order.id || "Order")}</p>
                </div>
                <div class="admin-live-order-total">
                  <strong>${formatOrderMoney(order.total || order.amountTotal, order.currency)}</strong>
                  <small>${escapeHTML(status)}</small>
                </div>
              </div>
              <div class="admin-live-order-grid">
                <section>
                  <h4>Products to make / ship</h4>
                  ${(order.items || []).map((item) => `<p>${escapeHTML(orderItemWorkflowSummary(item))}</p>`).join("") || "<p>No product line items saved.</p>"}
                </section>
                <section>
                  <h4>Customer</h4>
                  <p>${escapeHTML(orderCustomerEmail(order) || "No email saved")}</p>
                  <p>${escapeHTML(orderCustomerPhone(order) || "No phone saved")}</p>
                </section>
                <section>
                  <h4>Shipping</h4>
                  <p>${escapeHTML(orderShippingSummary(order))}</p>
                </section>
              </div>
              <div class="admin-live-order-actions">
                <label>Status
                  <select data-live-order-status="${escapeAttribute(order.id)}">
                    ${fulfillmentStatusOptions(status)}
                  </select>
                </label>
                <label>Chey notes
                  <textarea data-live-order-note="${escapeAttribute(order.id)}" placeholder="Sizing, make notes, tracking, pickup plan...">${escapeTextarea(order.adminNote || "")}</textarea>
                </label>
                <button type="button" data-save-live-order="${escapeAttribute(order.id)}">Save Order Update</button>
              </div>
            </article>
          `;
        })
        .join("")
    : `<div class="admin-user-card"><p>No live paid orders yet. New checkout orders will show here after customers start checkout.</p></div>`;
  autoGrowTextareas(adminLiveOrderList);
}

async function fetchAdminLiveOrders({ showStatus = true } = {}) {
  if (!adminLiveOrderList || !isAdminSignedIn()) return;
  if (showStatus) setAdminMessage(liveOrderStatus, "Loading live orders...");
  try {
    const response = await fetch(ADMIN_ORDERS_ENDPOINT, {
      headers: adminRemoteWriteHeaders()
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload?.ok === false) throw new Error(payload.error || "Could not load live orders.");
    liveOrders = Array.isArray(payload.orders) ? payload.orders : [];
    renderAdminLiveOrders();
    if (showStatus) setAdminMessage(liveOrderStatus, `Loaded ${liveOrders.length} live order${liveOrders.length === 1 ? "" : "s"}.`);
  } catch (error) {
    setAdminMessage(liveOrderStatus, error.message || "Could not load live orders.");
  }
}

async function saveAdminLiveOrderUpdate(orderId) {
  const statusSelect = adminLiveOrderList?.querySelector(`[data-live-order-status="${CSS.escape(orderId)}"]`);
  const noteField = adminLiveOrderList?.querySelector(`[data-live-order-note="${CSS.escape(orderId)}"]`);
  setAdminMessage(liveOrderStatus, "Saving order update...");
  try {
    const response = await fetch(ADMIN_ORDERS_ENDPOINT, {
      method: "PUT",
      headers: adminRemoteWriteHeaders(),
      body: JSON.stringify({
        orderId,
        fulfillmentStatus: statusSelect?.value || "Needs review",
        adminNote: noteField?.value || ""
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload?.ok === false) throw new Error(payload.error || "Could not save order update.");
    liveOrders = liveOrders.map((order) => (order.id === orderId ? payload.order : order));
    renderAdminLiveOrders();
    setAdminMessage(liveOrderStatus, "Order update saved.");
  } catch (error) {
    setAdminMessage(liveOrderStatus, error.message || "Could not save order update.");
  }
}

function handleAdminLiveOrderClick(event) {
  const button = event.target.closest("[data-save-live-order]");
  if (!button) return;
  saveAdminLiveOrderUpdate(button.dataset.saveLiveOrder);
}

document.querySelectorAll("[data-name]").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.name, button.dataset.price, {
    sourceProductIndex: checkoutProductIndex(button.dataset.productIndex)
  }));
});

accountButton.addEventListener("click", () => openAccount());
closeAccount.addEventListener("click", closeAccountPanel);
customerRegister.addEventListener("click", registerCustomer);
customerLogin.addEventListener("click", loginCustomer);
customerLogout.addEventListener("click", logoutCustomer);
adminContinueEditing?.addEventListener("click", showAdminPage);
adminOpenOrders?.addEventListener("click", showAdminOrdersPage);
adminExitMode?.addEventListener("click", logoutAdmin);
customOrderPhoto?.addEventListener("change", handleCustomOrderPhotoUpload);
customOrderPhotoRemove?.addEventListener("click", clearCustomOrderPhoto);
customOrderSubmit?.addEventListener("click", submitCustomOrderRequest);
customOrderName?.addEventListener("input", () => {
  if (customOrderStatus) customOrderStatus.textContent = "";
});
customOrderDescription?.addEventListener("input", () => {
  if (customOrderStatus) customOrderStatus.textContent = "";
});
saveSizesButton.addEventListener("click", saveCustomerSizes);
checkoutButton.addEventListener("click", checkoutCart);
guestCheckoutOpen.addEventListener("click", () => openGuestCheckout());
guestCheckoutButton.addEventListener("click", checkoutGuest);
refreshLiveOrdersButton?.addEventListener("click", () => fetchAdminLiveOrders());
adminLiveOrderList?.addEventListener("click", handleAdminLiveOrderClick);

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

function applyProductFilter(filter) {
  document.querySelectorAll(".product").forEach((product) => {
    if (product.dataset.inlineEditorCard === "true") {
      product.classList.remove("hidden");
      return;
    }
    const isMatch = filter === "all" || product.dataset.category === filter;
    product.classList.toggle("hidden", !isMatch);
  });
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    applyProductFilter(button.dataset.filter);
  });
});

function updateBuilder() {
  if (!builderPreview || !shade || !shape || !accent || !finishCard || !customAdd || !customDetails) return;
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
      ? "Your uploaded reference will be sent with your order so the design can be recreated for you."
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
  if (!builderPreview) return;
  const paths = shapePathLibrary[shapeName] || shapePathLibrary.almond;
  paths.forEach((path, index) => {
    builderPreview.querySelectorAll(`[data-nail-path="${index}"]`).forEach((nailPath) => {
      nailPath.setAttribute("d", path);
    });
    const clipPath = builderPreview.querySelector(`[data-nail-clip="${index}"]`);
    if (clipPath) clipPath.setAttribute("d", path);
  });
}

if (builderPreview && shade && shape && accent && customDetails && inspirationPhoto && removeInspiration) {
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
}

function applyLook(look) {
  if (!builderPreview || !finishCard || !customAdd) return;
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
  const defaults = lookLibrary[index];
  const detail = (adminState.lookDetails && adminState.lookDetails[index]) || {};
  const photo = (adminState.lookPhotos && adminState.lookPhotos[index]) || "";
  const photoFit = sanitizePhotoFit((adminState.lookPhotoFits && adminState.lookPhotoFits[index]) || detail.photoFit);
  const photoPosition = sanitizePhotoPosition((adminState.lookPhotoPositions && adminState.lookPhotoPositions[index]) || detail.photoPosition);
  const photoZoom = sanitizePhotoZoom((adminState.lookPhotoZooms && adminState.lookPhotoZooms[index]) || detail.photoZoom);
  const photoTransform = sanitizePhotoTransform((adminState.lookPhotoTransforms && adminState.lookPhotoTransforms[index]) || detail.photoTransform);
  const customName = detail.name && detail.name.trim() ? detail.name.trim() : "";
  const customCopy = detail.copy && detail.copy.trim() ? detail.copy.trim() : "";
  const productIndex = adminState.customProducts.findIndex((product) => Number(product.sourceLookIndex) === index);
  return {
    index,
    slotLabel: `Design Slot ${index + 1}`,
    name: customName || `Custom Design ${index + 1}`,
    base: defaults.base,
    accent: defaults.accent,
    finish: detail.finish && detail.finish.trim() ? detail.finish.trim() : defaults.finish,
    copy: customCopy || "Custom inspiration selected for your set.",
    price: detail.price && detail.price.trim() ? detail.price.trim() : "",
    salePrice: detail.salePrice && detail.salePrice.trim() ? detail.salePrice.trim() : "",
    discount: detail.discount && detail.discount.trim() ? detail.discount.trim() : "",
    stock: detail.stock && detail.stock.trim() ? detail.stock.trim() : "",
    sku: detail.sku && detail.sku.trim() ? detail.sku.trim() : "",
    tag: detail.tag && detail.tag.trim() ? detail.tag.trim() : "New from Chey",
    notes: detail.notes && detail.notes.trim() ? detail.notes.trim() : "",
    photo,
    photoFit,
    photoPosition,
    photoZoom,
    photoTransform,
    active: Boolean(photo || customName || customCopy || detail.price || detail.notes || detail.tag || detail.stock),
    published: productIndex >= 0,
    productIndex
  };
}

function updateLookCount() {
  if (!lookCountBadge) return;
  const count = lookLibrary.filter((_, index) => readLookData(index).active).length;
  lookCountBadge.textContent = `${count} saved design${count === 1 ? "" : "s"}`;
}

function renderLooks() {
  if (!lookGrid) {
    updateLookCount();
    return;
  }
  lookGrid.innerHTML = "";
  const activeLooks = lookLibrary.map((_, index) => readLookData(index)).filter((look) => look.active);
  if (!activeLooks.length) {
    const emptyState = document.createElement("article");
    emptyState.className = "look-empty-state";
    emptyState.innerHTML = `
      <strong>Design gallery coming soon.</strong>
      <p>Chey's uploaded custom designs will appear here as soon as they are added.</p>
    `;
    lookGrid.appendChild(emptyState);
    updateLookCount();
    return;
  }
  activeLooks.forEach((look) => {
    const button = document.createElement("button");
    button.className = `look-option${look.photo ? " has-photo" : ""}`;
    button.type = "button";
    button.dataset.name = look.name;
    button.style.setProperty("--look-base", look.base);
    button.style.setProperty("--look-accent", look.accent);
    if (look.photo) button.style.setProperty("--look-photo", `url("${look.photo}")`);
    applyLookFitProperties(button, look.photoFit, look.photoPosition, look.photoZoom);
    button.innerHTML = `
      <span class="look-photo" aria-hidden="true">
        ${look.photo ? `<img src="${escapeAttribute(look.photo)}" alt="" data-photo-fit="${escapeAttribute(look.photoFit)}" data-photo-position="${escapeAttribute(look.photoPosition)}" style="${photoTransformStyle(look.photoTransform, look.photoZoom)}" />` : ""}
        <span class="look-dot"></span>
      </span>
      <span class="look-copy">
        <strong>${escapeHTML(look.name)}</strong>
        <span>${escapeHTML(look.finish)}</span>
      </span>
    `;
    button.addEventListener("click", () => applyLook(look));
    lookGrid.appendChild(button);
  });
  updateLookCount();
}

function nailArtImages() {
  if (!builderPreview) return [];
  return Array.from(builderPreview.querySelectorAll(".nail-art"));
}

function setNailTexture(src) {
  if (!builderPreview) return;
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
  if (!inspirationPhoto || !inspirationPreviewImage || !inspirationName || !inspirationPreview) return;
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
  if (!inspirationPhoto || !inspirationPreviewImage || !inspirationName || !inspirationPreview) return;
  customInspirationSrc = "";
  inspirationPhoto.value = "";
  inspirationPreviewImage.removeAttribute("src");
  inspirationName.textContent = "Inspiration photo uploaded";
  inspirationPreview.hidden = true;
  updateBuilder();
}

function setPreviewDetail() {
  if (!accent || !builderPreview) return;
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
  return Array.from(document.querySelectorAll(".product")).filter((product) => product.dataset.inlineEditorCard !== "true");
}

function previewProductOnHand(product) {
  if (!builderPreview || !shape) return;
  const swatches = Array.from(product.querySelectorAll(".swatch-row span")).map((item) =>
    item.style.getPropertyValue("--swatch").trim()
  );
  const name = product.querySelector("h3").textContent.trim();
  const description = product.querySelector(".product-copy > p:not(.product-tag)").textContent.trim();
  const price = productPriceFromCard(product);
  const image = product.querySelector(".photo-preview img")?.getAttribute("src") || "";
  selectedLook = {
    name,
    base: swatches[0] || "#fff3f8",
    accent: swatches[1] || swatches[0] || "#ff9fc3",
    finish: product.dataset.category || "gloss",
    copy: description,
    photo: image,
    price: String(price)
  };
  const productShape = detectProductShape(`${name} ${description}`);
  if (productShape) shape.value = productShape;
  applyLook(selectedLook);
  document.querySelectorAll(".product").forEach((item) => item.classList.toggle("previewing", item === product));
}

function detectProductShape(text) {
  const copy = text.toLowerCase();
  if (copy.includes("coffin")) return "coffin";
  if (copy.includes("square")) return "square";
  if (copy.includes("almond") || copy.includes("oval")) return "almond";
  return "";
}

if (customAdd && customDetails && shade && shape) {
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
}

setupNailSizeDropdowns();
loadCustomerState();
loadGuestOrders();
renderCart();
renderAccount();
renderLooks();
updateBuilder();
setupProductTryOns();
setupPhotoZoom();
handleCheckoutReturn();

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
  lightbox.innerHTML = `<button type="button" aria-label="Close enlarged photo">×</button><img alt="Enlarged nail photo" />`;
  document.body.append(lightbox);
  const image = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector("button");
  const close = () => {
    lightbox.hidden = true;
    body.classList.remove("photo-lightbox-open");
    lightbox.style.removeProperty("background-image");
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
    const zoomTarget = event.target.closest(".look-photo, .photo-preview img, .photo-proof-grid img, .inspiration-preview img, .custom-order-preview img, .idea-image, .admin-control img");
    if (!zoomTarget) return;
    const src = zoomTarget.tagName === "IMG" ? zoomTarget.getAttribute("src") : imageUrlFromStyle(zoomTarget.closest(".look-option, .admin-look-preview") || zoomTarget);
    if (!src) return;
    image.onload = () => {
      const ratio = (image.naturalWidth || 1) / Math.max(image.naturalHeight || 1, 1);
      image.style.setProperty("--lightbox-ratio", String(ratio));
    };
    lightbox.style.backgroundImage = `linear-gradient(rgba(18, 8, 13, 0.82), rgba(18, 8, 13, 0.9)), url(${JSON.stringify(src)})`;
    image.src = src;
    body.classList.add("photo-lightbox-open");
    lightbox.hidden = false;
  });
}

function imageUrlFromStyle(element) {
  if (!element) return "";
  const value = element.style.getPropertyValue("--look-photo") || getComputedStyle(element).getPropertyValue("--look-photo") || "";
  const match = value.match(/url\(["']?(.+?)["']?\)/);
  return match ? match[1] : "";
}

async function setupAdmin() {
  bindAdminRemoteSyncEvents();
  loadAdminState();
  migrateLegacyAdminTextKeys();
  repairCorruptedQuickFieldCopy();
  markEditableText();
  migrateLegacyAdminCopy();
  applyAdminState();
  renderAdminVisibility();
  renderAdminContentFields();
  renderAdminLayoutControls();
  renderAdminImages();
  renderAdminProducts();
  renderAdminLookPhotos();
  renderAdminUsers();
  renderAdminGuestOrders();
  renderAdminLiveOrders();
  renderIdeas();

  const hadPendingRemoteState = Boolean(loadPendingRemoteAdminStateRecord());
  const flushedPendingState = hadPendingRemoteState
    ? await flushPendingRemoteAdminState({ statusTarget: adminContentStatus, showSuccess: true })
    : { ok: true, skipped: true };
  const shouldHydrateRemoteState = !hadPendingRemoteState || flushedPendingState.ok;
  const loadedRemoteState = shouldHydrateRemoteState ? await hydrateAdminStateFromRemote() : false;
  if (loadedRemoteState) {
    migrateLegacyAdminTextKeys();
    repairCorruptedQuickFieldCopy();
    markEditableText();
    migrateLegacyAdminCopy();
    applyAdminState();
    renderAdminImages();
    renderAdminProducts();
    renderAdminLookPhotos();
    renderIdeas();
  } else if (hadPendingRemoteState) {
    setAdminSaveMessage(adminContentStatus, ADMIN_LIVE_SAVE_FAILURE_MESSAGE);
    schedulePendingRemoteAdminStateFlush({
      statusTarget: adminContentStatus,
      showSuccess: true
    });
  }

  adminNav.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.hash = "adminPage";
    showAdminPage();
  });
  adminLogout.addEventListener("click", logoutAdmin);
  adminViewButtons.forEach((button) => {
    button.addEventListener("click", () => switchAdminView(button.dataset.adminView));
  });
  if (window.location.hash === "#adminPage") {
    showSitePage("home", { updateHash: true, force: true });
  } else {
    const productIndex = productIndexFromHash();
    if (productIndex >= 0) {
      openProductDetail(productIndex, { updateHash: false, force: true });
    } else {
      showSitePage(pageKeyFromHash(), { updateHash: false, force: true });
    }
  }
  [loginEmail, loginPassword].forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") loginCustomer();
    });
  });
  forgotPasswordButton.addEventListener("click", () => showPasswordReset(true));
  cancelResetPassword.addEventListener("click", () => showPasswordReset(false));
  sendResetCode.addEventListener("click", requestPasswordReset);
  verifyResetCode.addEventListener("click", verifyPasswordReset);
  [resetEmail, resetCode, resetNewPassword].forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      if (resetCodeStep.hidden) {
        requestPasswordReset();
      } else {
        verifyPasswordReset();
      }
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
  resetLayoutButton.addEventListener("click", resetLayoutState);
  if (saveProductChangesButton) saveProductChangesButton.addEventListener("click", saveProductChangesFromSection);
  setupDrawingPad();
  ideaPhoto.addEventListener("change", previewIdeaPhoto);
  saveIdeaButton.addEventListener("click", addDesignIdea);
  ideaList.addEventListener("click", handleIdeaListClick);
  ideaList.addEventListener("input", updateIdeaFromCard);
  document.addEventListener("click", handleInlineImageClick, true);
  document.addEventListener("click", handleInlineEditableClick, true);
  document.addEventListener("input", handleInlineEditableInput);
  document.addEventListener("blur", handleInlineEditableBlur, true);
  document.addEventListener("keydown", handleInlineEditKeydown, true);
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
  if (view === "orders") fetchAdminLiveOrders();
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

function customPageTextKey(pageKey, field) {
  return `customPage:${pageKey}:${field}`;
}

function customBlockTextKey(blockId, field) {
  return `customBlock:${blockId}:${field}`;
}

function renderCustomPages() {
  if (!pageBook) return;
  document.querySelectorAll(".custom-site-page").forEach((page) => page.remove());
  document.querySelectorAll("[data-custom-page-link]").forEach((link) => link.remove());

  const adminLink = document.querySelector("#adminNav");
  const navLinks = adminLink?.parentElement;
  const status = document.querySelector("#bookStatus");

  (adminState.customPages || []).forEach((page) => {
    const key = safeSlug(page.key, "page");
    if (!key) return;

    if (navLinks && !navLinks.querySelector(`[data-page-link="${key}"]`)) {
      const link = document.createElement("a");
      link.href = `#${key}`;
      link.dataset.pageLink = key;
      link.dataset.customPageLink = "true";
      link.textContent = page.label || page.title || "New Page";
      navLinks.insertBefore(link, adminLink || null);
    }

    const section = document.createElement("section");
    section.className = "site-page custom-site-page";
    section.dataset.pagePanel = key;
    section.hidden = true;
    section.setAttribute("aria-label", `${page.label || page.title || "Custom"} page`);
    section.innerHTML = `
      <div class="page-surface">
        <section class="section custom-page-section" aria-labelledby="${escapeAttribute(key)}-title">
          <div class="section-heading custom-page-heading" data-reveal>
            <p class="eyebrow" data-admin-text="${escapeAttribute(customPageTextKey(key, "eyebrow"))}">${escapeHTML(adminState.texts[customPageTextKey(key, "eyebrow")] || page.eyebrow || "Custom page")}</p>
            <h2 id="${escapeAttribute(key)}-title" data-admin-text="${escapeAttribute(customPageTextKey(key, "title"))}">${escapeHTML(adminState.texts[customPageTextKey(key, "title")] || page.title || page.label || "New Page")}</h2>
            <p class="custom-page-intro" data-admin-text="${escapeAttribute(customPageTextKey(key, "body"))}">${escapeHTML(adminState.texts[customPageTextKey(key, "body")] || page.body || "Click here to write this page.")}</p>
          </div>
          <div class="custom-block-list" data-custom-block-list="${escapeAttribute(key)}"></div>
        </section>
      </div>
    `;
    pageBook.insertBefore(section, status || null);
  });
}

function renderCustomBlocks() {
  document.querySelectorAll(".custom-site-block").forEach((block) => block.remove());
  (adminState.customBlocks || []).forEach((block) => {
    const pageKey = safeSlug(block.pageKey, "home");
    let list = document.querySelector(`[data-custom-block-list="${pageKey}"]`);
    if (!list) {
      const page = pageElement(pageKey);
      const surface = page?.querySelector(".page-surface");
      if (!surface) return;
      list = document.createElement("div");
      list.className = "custom-block-list generated";
      list.dataset.customBlockList = pageKey;
      surface.appendChild(list);
    }
    const card = document.createElement("article");
    card.className = "custom-site-block";
    card.dataset.customBlock = block.id;
    const titleKey = customBlockTextKey(block.id, "title");
    const bodyKey = customBlockTextKey(block.id, "body");
    card.innerHTML = `
      <span class="custom-block-kicker">Added section</span>
      <h3 data-admin-text="${escapeAttribute(titleKey)}">${escapeHTML(adminState.texts[titleKey] || block.title || "New section")}</h3>
      <p data-admin-text="${escapeAttribute(bodyKey)}">${escapeHTML(adminState.texts[bodyKey] || block.body || "Click here to add details.")}</p>
    `;
    list.appendChild(card);
  });
}

function defaultLayoutOrder() {
  return allLayoutSections().map((section) => section.key);
}

function ensureLayoutState() {
  const validKeys = defaultLayoutOrder();
  const savedOrder = Array.isArray(adminState.layoutOrder) ? adminState.layoutOrder.filter((key) => validKeys.includes(key)) : [];
  adminState.layoutOrder = [...savedOrder, ...validKeys.filter((key) => !savedOrder.includes(key))];
  adminState.hiddenSections = adminState.hiddenSections && typeof adminState.hiddenSections === "object"
    ? adminState.hiddenSections
    : {};
}

function setAdminMessage(target, message) {
  if (!target) return;
  target.textContent = message;
}

function textElementValue(selector) {
  return document.querySelector(selector)?.textContent?.trim() || "";
}

function renderAdminContentFields() {
  if (!adminContentList) return;
  adminContentList.innerHTML = "";
  quickContentFields.forEach((field, index) => {
    const card = document.createElement("label");
    card.className = "admin-control admin-copy-card";
    const fieldId = `adminCopyField-${index}`;
    const inputMarkup = field.multiline
      ? `<textarea id="${fieldId}" data-copy-field="${index}">${escapeTextarea(textElementValue(field.selector))}</textarea>`
      : `<input id="${fieldId}" data-copy-field="${index}" value="${escapeAttribute(textElementValue(field.selector))}" />`;
    card.innerHTML = `
      <span>${field.label}</span>
      ${inputMarkup}
    `;
    adminContentList.appendChild(card);
  });
  adminContentList.querySelectorAll("[data-copy-field]").forEach((fieldInput) => {
    fieldInput.addEventListener("input", () => {
      const field = quickContentFields[Number(fieldInput.dataset.copyField)];
      const target = document.querySelector(field.selector);
      if (!field || !target) return;
      target.textContent = fieldInput.value;
      saveTextEdits();
      localSaveAdminState();
      scheduleRemoteAdminStateSave({
        statusTarget: adminContentStatus,
        savingMessage: "Saving page content to the live website...",
        showSuccess: true,
        successMessage: "Page content saved to the live website."
      });
    });
  });
  autoGrowTextareas(adminContentList);
}

function layoutElementFor(key) {
  const config = allLayoutSections().find((item) => item.key === key);
  return config ? document.querySelector(config.selector) : null;
}

function applyLayoutState() {
  ensureLayoutState();
  if (!pageBook) return;
  const fragment = document.createDocumentFragment();
  let visibleIndex = 0;
  adminState.layoutOrder.forEach((key) => {
    const element = layoutElementFor(key);
    if (!element) return;
    const isHidden = Boolean(adminState.hiddenSections[key]);
    element.hidden = isHidden;
    if (!isHidden) {
      visibleIndex += 1;
      const meta = allLayoutSections().find((section) => section.key === key);
      element.dataset.pageNumber = String(visibleIndex);
      element.dataset.pageLabel = meta?.label || key;
    }
    fragment.appendChild(element);
  });
  pageBook.appendChild(fragment);
  updatePageLinkVisibility();
  const requestedKey = adminState.hiddenSections[pageKeyFromHash()] ? firstVisiblePageKey() : pageKeyFromHash();
  currentPageKey = adminState.hiddenSections[currentPageKey] ? requestedKey : currentPageKey;
  showSitePage(currentPageKey || requestedKey, { updateHash: false, force: true });
  schedulePageStateFromScroll();
  scheduleScrollChrome();
}

function renderAdminLayoutControls() {
  if (!adminLayoutList) return;
  ensureLayoutState();
  adminLayoutList.innerHTML = "";
  adminState.layoutOrder.forEach((key, index) => {
    const config = allLayoutSections().find((item) => item.key === key);
    if (!config) return;
    const card = document.createElement("div");
    card.className = "admin-control admin-layout-card";
    card.innerHTML = `
      <div class="admin-layout-copy">
        <strong>${config.label}</strong>
        <p>${config.note}</p>
      </div>
      <label class="admin-layout-visibility">
        <input type="checkbox" data-layout-visible="${key}" ${adminState.hiddenSections[key] ? "" : "checked"} />
        <span>Visible</span>
      </label>
      <div class="admin-layout-buttons">
        <button type="button" data-layout-move="${key}" data-direction="-1" ${index === 0 ? "disabled" : ""}>Up</button>
        <button type="button" data-layout-move="${key}" data-direction="1" ${index === adminState.layoutOrder.length - 1 ? "disabled" : ""}>Down</button>
      </div>
    `;
    adminLayoutList.appendChild(card);
  });
  adminLayoutList.querySelectorAll("[data-layout-visible]").forEach((input) => {
    input.addEventListener("change", async () => {
      adminState.hiddenSections[input.dataset.layoutVisible] = !input.checked;
      const result = await saveAdminState({
        statusTarget: adminLayoutStatus,
        savingMessage: "Saving layout to the live website...",
        successMessage: "Homepage layout saved to the live website."
      });
      applyLayoutState();
      renderAdminLayoutControls();
      if (!result.ok) return;
      setAdminMessage(adminLayoutStatus, "Homepage layout saved to the live website.");
    });
  });
  adminLayoutList.querySelectorAll("[data-layout-move]").forEach((button) => {
    button.addEventListener("click", async () => {
      const key = button.dataset.layoutMove;
      const direction = Number(button.dataset.direction);
      const currentIndex = adminState.layoutOrder.indexOf(key);
      const targetIndex = currentIndex + direction;
      if (currentIndex < 0 || targetIndex < 0 || targetIndex >= adminState.layoutOrder.length) return;
      [adminState.layoutOrder[currentIndex], adminState.layoutOrder[targetIndex]] = [adminState.layoutOrder[targetIndex], adminState.layoutOrder[currentIndex]];
      const result = await saveAdminState({
        statusTarget: adminLayoutStatus,
        savingMessage: "Saving layout to the live website...",
        successMessage: "Homepage layout saved to the live website."
      });
      applyLayoutState();
      renderAdminLayoutControls();
      if (!result.ok) return;
      setAdminMessage(adminLayoutStatus, "Homepage layout saved to the live website.");
    });
  });
}

async function resetLayoutState() {
  adminState.layoutOrder = defaultLayoutOrder();
  adminState.hiddenSections = {};
  const result = await saveAdminState({
    statusTarget: adminLayoutStatus,
    savingMessage: "Saving layout reset to the live website...",
    successMessage: "Homepage layout reset on the live website."
  });
  applyLayoutState();
  renderAdminLayoutControls();
  if (!result.ok) return;
  setAdminMessage(adminLayoutStatus, "Homepage layout reset on the live website.");
}

function loadAdminState() {
  try {
    const saved = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY) || "{}");
    adminState = normalizeAdminState(saved);
  } catch {
    adminState = defaultAdminState();
  }
  ensureLayoutState();
}

function editableElements() {
  return Array.from(
    document.querySelectorAll(
      [
        ".brand span:last-child",
        ".hero .eyebrow",
        "#hero-title",
        ".hero-text",
        ".hero-actions .button.primary",
        ".hero-actions .button.secondary",
        ".floating-tag",
        ".hero-stats span",
        ".trend-strip span",
        "#intro-title",
        ".feature h3",
        ".feature p",
        "#shop .eyebrow",
        "#shop-title",
        ".product-tag",
        ".product h3",
        ".product-copy > p:not(.product-tag)",
        ".product-bottom strong",
        "#fit .eyebrow",
        "#fit-title",
        ".fit-grid h3",
        ".fit-grid p",
        "#reviews .eyebrow",
        "#reviews-title",
        "blockquote",
        "figcaption",
        ".footer strong",
        ".footer p",
        "[data-admin-text]"
      ].join(",")
    )
  );
}

function migrateLegacyAdminTextKeys() {
  let changed = false;
  const quickTargetByElement = new Map(
    quickContentFields
      .map((field) => [document.querySelector(field.selector), field])
      .filter(([element]) => element)
  );

  editableElements().forEach((el, index) => {
    const legacyKey = `text-${index}`;
    if (!Object.prototype.hasOwnProperty.call(adminState.texts, legacyKey)) return;
    const field = quickTargetByElement.get(el);
    const legacyValue = adminState.texts[legacyKey];

    if (!field) {
      const nextKey = stableMiscFieldKey(index);
      if (!Object.prototype.hasOwnProperty.call(adminState.texts, nextKey)) {
        adminState.texts[nextKey] = legacyValue;
        changed = true;
      }
    }
    delete adminState.texts[legacyKey];
    changed = true;
  });

  if (changed) {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminState));
  }
  return changed;
}

function repairCorruptedQuickFieldCopy() {
  let changed = false;
  corruptedQuickCopyRules.forEach(({ key, matches }) => {
    const stableKey = stableQuickFieldKey({ key });
    const savedValue = adminState.texts[stableKey];
    if (!savedValue || !matches(savedValue)) return;
    delete adminState.texts[stableKey];
    changed = true;
  });

  if (changed) {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminState));
  }
  return changed;
}

function markEditableText() {
  const elements = editableElements();
  elements.forEach((el) => {
    if (el.dataset.adminProductField) return;
    if (el.dataset.adminText && (el.dataset.adminText.startsWith("customPage:") || el.dataset.adminText.startsWith("customBlock:"))) return;
    delete el.dataset.adminText;
  });

  const quickTargets = new Set();
  quickContentFields.forEach((field) => {
    const el = document.querySelector(field.selector);
    if (!el) return;
    el.dataset.adminText = stableQuickFieldKey(field);
    quickTargets.add(el);
  });

  elements.forEach((el, index) => {
    if (el.dataset.adminProductField) return;
    if (quickTargets.has(el) || el.dataset.adminText) return;
    el.dataset.adminText = stableMiscFieldKey(index);
  });
  applyHiddenTextState();
}

function applyHiddenTextState() {
  document.querySelectorAll("[data-admin-text]").forEach((el) => {
    const key = el.dataset.adminText;
    const hidden = Boolean(key && adminState.hiddenText?.[key]);
    el.hidden = hidden;
    el.classList.toggle("admin-text-hidden", hidden);
    applyTextOffset(el, key);
  });
  scheduleRemoveBubbleControls();
}

function sanitizeTextOffset(value = {}) {
  const source = value && typeof value === "object" ? value : {};
  const clamp = (number) => {
    const parsed = Number(number);
    if (!Number.isFinite(parsed)) return 0;
    return Math.min(900, Math.max(-900, parsed));
  };
  return {
    x: clamp(source.x),
    y: clamp(source.y)
  };
}

function applyTextOffset(el, key = el?.dataset?.adminText) {
  if (!el || !key) return;
  const offset = sanitizeTextOffset(adminState.textOffsets?.[key]);
  const hasOffset = Math.abs(offset.x) > 0.5 || Math.abs(offset.y) > 0.5;
  el.classList.toggle("admin-text-positioned", hasOffset);
  el.style.setProperty("--admin-text-x", `${offset.x.toFixed(1)}px`);
  el.style.setProperty("--admin-text-y", `${offset.y.toFixed(1)}px`);
}

function migrateLegacyAdminCopy() {
  let changed = false;
  legacyCopyMigrations.forEach(({ selector, from, to }) => {
    const fieldKey = document.querySelector(selector)?.dataset.adminText;
    if (!fieldKey) return;
    const savedValue = adminState.texts[fieldKey];
    if (normalizeCopyValue(savedValue) !== normalizeCopyValue(from)) return;
    adminState.texts[fieldKey] = to;
    changed = true;
  });
  if (changed) {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminState));
  }
  return changed;
}

function applyAdminState() {
  ensureLayoutState();
  renderCustomPages();
  renderCustomBlocks();
  markEditableText();
  Object.entries(adminState.texts).forEach(([key, value]) => {
    const el = document.querySelector(`[data-admin-text="${key}"]`);
    if (el) el.textContent = value;
  });
  applyHiddenTextState();
  Object.entries(adminState.images).forEach(([key, value]) => {
    applyImageValue(key, value);
  });
  Object.keys(adminState.imageFits || {}).forEach((key) => {
    applyImageFit(key);
  });
  applyLayoutState();
  renderLooks();
  renderCustomProducts();
  markEditableText();
  applyHiddenTextState();
  markInlineImageTargets();
  syncInlineEditMode();
  renderIdeas();
  renderAdminContentFields();
  renderAdminLayoutControls();
}

function toggleTextEditMode() {
  textEditMode = !textEditMode;
  renderCustomProducts();
  syncInlineEditMode();
  setInlineEditStatus(
    textEditMode
      ? "Click text to type, click photos to place them, or use the pink plus cards in Shop to add products."
      : "Click-to-edit is off."
  );
}

function saveTextEdits() {
  editableElements().forEach((el) => {
    if (!el.dataset.adminText) return;
    adminState.texts[el.dataset.adminText] = el.textContent.trim();
  });
}

async function saveAllAdminEdits(options = {}) {
  saveTextEdits();
  saveProductEdits();
  const statusTarget = options.statusTarget || adminEditStatus || adminContentStatus;
  const result = await saveAdminState({
    statusTarget,
    successMessage: options.successMessage || "Page content saved to the live website.",
    savingMessage: options.savingMessage || "Saving page content to the live website..."
  });
  applyAdminState();
  renderAdminProducts();
  renderAdminLookPhotos();
  if (result.ok && statusTarget !== addProductStatus) {
    setAdminMessage(statusTarget, options.successMessage || "Page content saved to the live website.");
  }
  return result;
}

async function saveProductChangesFromSection() {
  await saveAllAdminEdits({
    statusTarget: addProductStatus,
    savingMessage: "Saving product edits to the live website...",
    successMessage: "Product edits saved to the live website."
  });
}

const imageTargets = [
  { key: "hero", label: "Hero product image", type: "img", selector: ".hero-visual img" },
  { key: "fit-0", label: "Fit guide photo 1", type: "img", selector: ".photo-proof-grid img:nth-child(1)" },
  { key: "fit-1", label: "Fit guide photo 2", type: "img", selector: ".photo-proof-grid img:nth-child(2)" }
];

async function updateSitePhotoFromFile(target, file, preview, input) {
  if (!file) return;
  setAdminMessage(adminContentStatus, "Opening Photo Studio...");
  const studio = await preparePhotoInStudio(file, {
    title: `Adjust ${target.label}`,
    fit: adminState.imageFits[target.key],
    position: adminState.imagePositions[target.key],
    zoom: adminState.imageZooms[target.key],
    transform: adminState.imageTransforms[target.key]
  });
  if (input) input.value = "";
  if (!studio) {
    setAdminMessage(adminContentStatus, "Photo upload cancelled.");
    return;
  }

  adminState.imageFits[target.key] = studio.fit;
  adminState.imagePositions[target.key] = studio.position;
  adminState.imageZooms[target.key] = studio.zoom;
  adminState.imageTransforms[target.key] = studio.transform;
  if (preview) {
    preview.src = studio.dataUrl;
    applyPhotoFitToImage(preview, studio.fit, studio.position, studio.zoom, studio.transform);
  }

  setAdminMessage(adminContentStatus, "Uploading site photo to the live website...");
  const upload = await uploadAdminPhoto(studio.dataUrl, `site-${target.key}`);
  const imageUrl = upload.ok ? upload.url : studio.dataUrl;
  adminState.images[target.key] = imageUrl;
  applyImageValue(target.key, imageUrl);
  if (preview) {
    preview.src = imageUrl;
    applyPhotoFitToImage(preview, studio.fit, studio.position, studio.zoom, studio.transform);
  }
  if (!upload.ok) {
    localSaveAdminState();
    setAdminMessage(adminContentStatus, liveSaveFailureMessage(upload.error));
    return;
  }
  const result = await saveAdminState({
    statusTarget: adminContentStatus,
    savingMessage: "Saving site photo to the live website...",
    successMessage: "Site photo saved to the live website."
  });
  if (!result.ok) return;
  triggerPhotoBounce(preview);
  showAdminUploadCelebration("Site photo is live.");
  setAdminMessage(adminContentStatus, "Site photo saved to the live website.");
}

function renderAdminImages() {
  adminImageList.innerHTML = "";
  imageTargets.forEach((target) => {
    const card = document.createElement("div");
    card.className = "admin-control admin-photo-control";
    card.dataset.photoUploadDrop = target.key;
    const preview = document.createElement("img");
    preview.src = adminState.images[target.key] || currentImageValue(target) || "";
    applyPhotoFitToImage(preview, adminState.imageFits[target.key], adminState.imagePositions[target.key], adminState.imageZooms[target.key], adminState.imageTransforms[target.key]);
    const label = document.createElement("strong");
    label.textContent = target.label;
    const input = document.createElement("input");
    const inputId = `sitePhoto-${target.key}`;
    input.id = inputId;
    input.className = "hidden-file-input";
    input.type = "file";
    input.accept = "image/*";
    input.setAttribute("capture", "environment");
    const uploadLabel = document.createElement("label");
    uploadLabel.className = "professional-upload-zone";
    uploadLabel.htmlFor = inputId;
    uploadLabel.innerHTML = `
      <span>${preview.src ? "Replace Photo" : "Upload Photo"}</span>
      <small>Drop a photo here, or click to choose one.</small>
    `;
    const controls = document.createElement("div");
    controls.className = "photo-adjust-grid";
    controls.innerHTML = `
      <label class="photo-fit-control">
        Photo fit
        <select data-site-photo-fit="${escapeAttribute(target.key)}">
          ${photoFitOptionsMarkup(adminState.imageFits[target.key])}
        </select>
      </label>
      <label class="photo-fit-control">
        Focus
        <select data-site-photo-position="${escapeAttribute(target.key)}">
          ${photoPositionOptionsMarkup(adminState.imagePositions[target.key])}
        </select>
      </label>
      <label class="photo-fit-control photo-zoom-control">
        Zoom <span data-zoom-label="${escapeAttribute(target.key)}">${photoZoomPercent(adminState.imageZooms[target.key])}%</span>
        <input type="range" min="1" max="1.55" step="0.01" value="${sanitizePhotoZoom(adminState.imageZooms[target.key]).toFixed(2)}" data-site-photo-zoom="${escapeAttribute(target.key)}" />
      </label>
    `;
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      await updateSitePhotoFromFile(target, file, preview, input);
    });
    bindPhotoDropZone(card, (file) => updateSitePhotoFromFile(target, file, preview, input));

    const fitSelect = controls.querySelector("[data-site-photo-fit]");
    const positionSelect = controls.querySelector("[data-site-photo-position]");
    const zoomInput = controls.querySelector("[data-site-photo-zoom]");
    const zoomLabel = controls.querySelector("[data-zoom-label]");
    const applySitePhotoControls = () => {
      adminState.imageFits[target.key] = sanitizePhotoFit(fitSelect.value);
      adminState.imagePositions[target.key] = sanitizePhotoPosition(positionSelect.value);
      adminState.imageZooms[target.key] = sanitizePhotoZoom(zoomInput.value);
      applyImageFit(target.key);
      applyPhotoFitToImage(preview, adminState.imageFits[target.key], adminState.imagePositions[target.key], adminState.imageZooms[target.key], adminState.imageTransforms[target.key]);
      if (zoomLabel) zoomLabel.textContent = `${photoZoomPercent(adminState.imageZooms[target.key])}%`;
    };
    const saveSitePhotoControls = async () => {
      applySitePhotoControls();
      triggerPhotoBounce(preview);
      const result = await saveAdminState({
        statusTarget: adminContentStatus,
        savingMessage: "Saving photo adjustments to the live website...",
        successMessage: "Photo adjustments saved to the live website."
      });
      if (!result.ok) return;
      showAdminUploadCelebration("Photo adjustment is live.");
      setAdminMessage(adminContentStatus, "Photo adjustments saved to the live website.");
    };
    fitSelect.addEventListener("change", saveSitePhotoControls);
    positionSelect.addEventListener("change", saveSitePhotoControls);
    zoomInput.addEventListener("input", applySitePhotoControls);
    zoomInput.addEventListener("change", saveSitePhotoControls);
    card.append(label, preview, uploadLabel, controls, input);
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
    applyPhotoFitToImage(el, adminState.imageFits?.[key], adminState.imagePositions?.[key], adminState.imageZooms?.[key], adminState.imageTransforms?.[key]);
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

function setLookStatus(index, message) {
  const status = adminLookList?.querySelector(`[data-look-card="${index}"] [data-look-status]`);
  if (status) status.textContent = message;
  const inventoryStatus = adminInventoryPanel?.querySelector(`[data-inventory-card="${index}"] [data-inventory-status]`);
  if (inventoryStatus) inventoryStatus.textContent = message;
  if (adminInventoryStatus && !adminInventoryPanel?.hidden) adminInventoryStatus.textContent = message;
}

function productFromLook(look) {
  return {
    name: look.name,
    tag: look.tag || "New from Chey",
    description: look.copy,
    notes: look.notes || `Published from ${look.slotLabel}.`,
    price: look.price,
    salePrice: look.salePrice || "",
    discount: look.discount || "",
    stock: look.stock || "",
    sku: look.sku || "",
    category: look.finish || "custom",
    image: look.photo,
    imageFit: look.photoFit,
    imagePosition: look.photoPosition,
    imageZoom: look.photoZoom,
    imageTransform: look.photoTransform,
    sourceLookIndex: look.index,
    publishedAt: new Date().toLocaleString()
  };
}

const productToLookFieldMap = {
  name: "name",
  price: "price",
  salePrice: "salePrice",
  discount: "discount",
  stock: "stock",
  sku: "sku",
  category: "finish",
  description: "copy",
  notes: "notes",
  tag: "tag",
  imageFit: "photoFit",
  imagePosition: "photoPosition",
  imageZoom: "photoZoom",
  imageTransform: "photoTransform"
};

function syncPublishedProductBackToLook(product, updates = {}) {
  const sourceIndex = Number(product?.sourceLookIndex);
  if (!Number.isInteger(sourceIndex) || sourceIndex < 0 || sourceIndex >= lookLibrary.length) return;

  adminState.lookDetails[sourceIndex] = adminState.lookDetails[sourceIndex] || {};
  Object.entries(updates).forEach(([field, value]) => {
    const lookField = productToLookFieldMap[field];
    if (lookField) adminState.lookDetails[sourceIndex][lookField] = value;
  });

  if (Object.prototype.hasOwnProperty.call(updates, "image")) {
    adminState.lookPhotos[sourceIndex] = updates.image;
  }
  if (Object.prototype.hasOwnProperty.call(updates, "imageFit")) {
    adminState.lookPhotoFits[sourceIndex] = sanitizePhotoFit(updates.imageFit);
  }
  if (Object.prototype.hasOwnProperty.call(updates, "imagePosition")) {
    adminState.lookPhotoPositions[sourceIndex] = sanitizePhotoPosition(updates.imagePosition);
  }
  if (Object.prototype.hasOwnProperty.call(updates, "imageZoom")) {
    adminState.lookPhotoZooms[sourceIndex] = sanitizePhotoZoom(updates.imageZoom);
  }
  if (Object.prototype.hasOwnProperty.call(updates, "imageTransform")) {
    adminState.lookPhotoTransforms[sourceIndex] = sanitizePhotoTransform(updates.imageTransform);
  }
}

function applyImageFit(key) {
  if (key === "try-on") return;
  const target = imageTargets.find((item) => item.key === key);
  if (!target) return;
  const el = document.querySelector(target.selector);
  if (!el || target.type !== "img") return;
  applyPhotoFitToImage(el, adminState.imageFits?.[key], adminState.imagePositions?.[key], adminState.imageZooms?.[key], adminState.imageTransforms?.[key]);
}

async function publishLookToShop(index) {
  const look = readLookData(index);
  if (!look.price) {
    setLookStatus(index, "Add a price before publishing this design.");
    return false;
  }

  const product = productFromLook(look);
  const existingIndex = adminState.customProducts.findIndex((item) => Number(item.sourceLookIndex) === index);
  if (existingIndex >= 0) {
    adminState.customProducts[existingIndex] = {
      ...adminState.customProducts[existingIndex],
      ...product
    };
  } else {
    adminState.customProducts.unshift(product);
  }

  adminState.lookDetails[index] = {
    ...(adminState.lookDetails[index] || {}),
    publishedAt: product.publishedAt
  };
  setLookStatus(index, "Publishing this product to the live website...");
  const result = await saveAdminState({
    statusTarget: adminInventoryStatus || addProductStatus,
    savingMessage: "Publishing product to the live website...",
    successMessage: `${look.name} is published on the live website.`
  });
  renderCustomProducts();
  renderAdminProducts();
  renderAdminLookPhotos();
  renderAdminInventoryPanel();
  updateProductCount();
  if (!result.ok) {
    setLookStatus(index, liveSaveFailureMessage(result.error));
    return false;
  }
  setLookStatus(index, "Published to the Shop. Customers can buy this design now.");
  setAdminMessage(adminInventoryStatus, `${look.name} is published on the live website.`);
  setAdminMessage(addProductStatus, `${look.name} is published on the live website.`);
  return true;
}

async function removePublishedProduct(productIndex) {
  const index = Number(productIndex);
  const product = adminState.customProducts[index];
  if (!product) {
    setInlineEditStatus("That product is already withdrawn from the Shop.");
    return false;
  }

  const productName = product.name || "Product";
  const sourceIndex = ensureProductInventory(product);
  adminState.customProducts.splice(index, 1);
  if (Number.isInteger(sourceIndex) && adminState.lookDetails[sourceIndex]) {
    delete adminState.lookDetails[sourceIndex].publishedAt;
  }

  if (Number.isInteger(sourceIndex)) {
    setLookStatus(sourceIndex, `Withdrawing ${productName} from the Shop...`);
  }
  setInlineEditStatus(`Withdrawing ${productName} from the Shop...`);
  const result = await saveAdminState({
    statusTarget: adminInventoryStatus || adminEditStatus || addProductStatus,
    savingMessage: `Withdrawing ${productName} from the Shop...`,
    successMessage: `${productName} withdrawn from the Shop and kept in inventory.`
  });
  renderCustomProducts();
  renderAdminProducts();
  renderAdminLookPhotos();
  renderAdminInventoryPanel();
  updateProductCount();

  if (!result.ok) {
    if (Number.isInteger(sourceIndex)) setLookStatus(sourceIndex, liveSaveFailureMessage(result.error));
    setInlineEditStatus(liveSaveFailureMessage(result.error));
    return false;
  }

  if (Number.isInteger(sourceIndex)) {
    setLookStatus(sourceIndex, "Withdrawn from the Shop. This design is still saved in inventory.");
  }
  setAdminMessage(adminInventoryStatus, `${productName} withdrawn from the Shop and kept in inventory.`);
  setInlineEditStatus(`${productName} withdrawn from the Shop and kept in inventory.`);
  return true;
}

async function deleteInventoryProduct(sourceIndex, options = {}) {
  const index = Number(sourceIndex);
  if (!Number.isInteger(index) || index < 0 || index >= lookLibrary.length) return false;
  const look = readLookData(index);
  if (!look.active && !look.published) {
    setInlineEditStatus("That inventory item is already deleted.");
    return false;
  }
  if (!options.skipConfirm && !window.confirm(`Delete "${look.name || "this product"}" from inventory? This removes it from admin inventory and the Shop.`)) {
    setInlineEditStatus("Inventory delete cancelled.");
    return false;
  }

  const productIndex = adminState.customProducts.findIndex((product) => Number(product.sourceLookIndex) === index);
  if (productIndex >= 0) {
    adminState.customProducts.splice(productIndex, 1);
  }
  delete adminState.lookPhotos[index];
  delete adminState.lookPhotoFits[index];
  delete adminState.lookPhotoPositions[index];
  delete adminState.lookPhotoZooms[index];
  delete adminState.lookPhotoTransforms[index];
  delete adminState.lookDetails[index];

  if (selectedLook?.index === index) {
    selectedLook = null;
    updateBuilder();
  }

  const result = await saveAdminState({
    statusTarget: adminInventoryStatus || adminEditStatus || addProductStatus,
    savingMessage: `Deleting ${look.name || "inventory item"} from inventory...`,
    successMessage: `${look.name || "Inventory item"} deleted from inventory.`
  });
  renderLooks();
  renderCustomProducts();
  renderAdminProducts();
  renderAdminLookPhotos();
  renderAdminInventoryPanel();
  updateProductCount();
  updateLookCount();
  if (!result.ok) {
    setInlineEditStatus(liveSaveFailureMessage(result.error));
    return false;
  }
  setAdminMessage(adminInventoryStatus, `${look.name || "Inventory item"} deleted from inventory.`);
  setInlineEditStatus(`${look.name || "Inventory item"} deleted from inventory.`);
  return true;
}

async function deletePublishedProductInventory(productIndex) {
  const product = adminState.customProducts[Number(productIndex)];
  if (!product) return false;
  const productName = product.name || "this product";
  if (!window.confirm(`Delete "${productName}" from inventory? This removes it from admin inventory and the Shop.`)) {
    setInlineEditStatus("Inventory delete cancelled.");
    return false;
  }
  const sourceIndex = ensureProductInventory(product, { publishedAt: product.publishedAt });
  return deleteInventoryProduct(sourceIndex, { skipConfirm: true });
}

function nextProductLibrarySlotIndex() {
  const emptyIndex = lookLibrary.findIndex((_, index) => !readLookData(index).active && !readLookData(index).published);
  if (emptyIndex >= 0) return emptyIndex;
  return 0;
}

function writeProductToInventory(product, index, options = {}) {
  if (!product || !Number.isInteger(index) || index < 0 || index >= lookLibrary.length) return -1;
  adminState.lookDetails[index] = {
    ...(adminState.lookDetails[index] || {}),
    name: product.name || "",
    price: product.price || "",
    salePrice: product.salePrice || "",
    discount: product.discount || "",
    stock: product.stock || "",
    sku: product.sku || "",
    finish: product.category || "custom",
    copy: product.description || "",
    notes: product.notes || "",
    tag: product.tag || "New from Chey"
  };
  if (options.publishedAt || product.publishedAt) {
    adminState.lookDetails[index].publishedAt = options.publishedAt || product.publishedAt;
  } else {
    delete adminState.lookDetails[index].publishedAt;
  }
  adminState.lookPhotos[index] = product.image || "";
  adminState.lookPhotoFits[index] = sanitizePhotoFit(product.imageFit);
  adminState.lookPhotoPositions[index] = sanitizePhotoPosition(product.imagePosition);
  adminState.lookPhotoZooms[index] = sanitizePhotoZoom(product.imageZoom);
  adminState.lookPhotoTransforms[index] = sanitizePhotoTransform(product.imageTransform);
  visibleLookSlotCount = Math.max(visibleLookSlotCount, index + 1);
  return index;
}

function ensureProductInventory(product, options = {}) {
  const existingIndex = Number(product?.sourceLookIndex);
  if (Number.isInteger(existingIndex) && existingIndex >= 0 && existingIndex < lookLibrary.length) {
    writeProductToInventory(product, existingIndex, options);
    return existingIndex;
  }
  const index = nextProductLibrarySlotIndex();
  writeProductToInventory(product, index, options);
  product.sourceLookIndex = index;
  return index;
}

async function copyIdeaToProductLibrary(idea) {
  const index = nextProductLibrarySlotIndex();
  adminState.lookDetails[index] = {
    ...(adminState.lookDetails[index] || {}),
    name: idea.name || "",
    price: idea.price || "",
    finish: [idea.shape, idea.length, idea.status].filter(Boolean).join(", "),
    copy: [idea.shape, idea.length, idea.art].filter(Boolean).join(" - "),
    notes: [
      idea.colors ? `Colors: ${idea.colors}` : "",
      idea.materials ? `Materials: ${idea.materials}` : "",
      idea.notes ? `Notes: ${idea.notes}` : ""
    ].filter(Boolean).join("\n\n"),
    tag: "New design"
  };
  if (idea.image) {
    if (isPhotoDataUrl(idea.image)) {
      setAdminMessage(addProductStatus, "Uploading idea photo to the live website...");
      const upload = await uploadAdminPhoto(idea.image, `look-${index}`);
      adminState.lookPhotos[index] = upload.ok ? upload.url : idea.image;
      if (!upload.ok) {
        localSaveAdminState();
        setAdminMessage(addProductStatus, liveSaveFailureMessage(upload.error));
        return;
      }
    } else {
      adminState.lookPhotos[index] = idea.image;
    }
  }
  visibleLookSlotCount = Math.max(visibleLookSlotCount, index + 1);
  const result = await saveAdminState({
    statusTarget: addProductStatus,
    savingMessage: "Moving idea into the Product Library on the live website...",
    successMessage: "Idea moved into the Product Library on the live website."
  });
  renderLooks();
  renderAdminLookPhotos();
  updateLookCount();
  switchAdminView("site");
  adminLookList?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (!result.ok) {
    setLookStatus(index, liveSaveFailureMessage(result.error));
    return;
  }
  setLookStatus(index, "Idea copied here. Add or replace the nail photo, check the price, then publish it to the Shop.");
  setAdminMessage(addProductStatus, "Idea moved into the Product Library on the live website.");
}

async function updateLookPhotoFromFile(index, file, input) {
  if (!file) return;
  const look = readLookData(index);
  setLookStatus(index, "Opening Photo Studio...");
  const studio = await preparePhotoInStudio(file, {
    title: `Adjust ${look.name}`,
    fit: look.photo ? look.photoFit : "contain",
    position: look.photoPosition,
    zoom: look.photoZoom,
    transform: look.photoTransform,
    quality: 0.88
  });
  if (input) input.value = "";
  if (!studio) {
    setLookStatus(index, "Photo upload cancelled.");
    return;
  }

  adminState.lookPhotoFits[index] = studio.fit;
  adminState.lookPhotoPositions[index] = studio.position;
  adminState.lookPhotoZooms[index] = studio.zoom;
  adminState.lookPhotoTransforms[index] = studio.transform;
  setLookStatus(index, "Uploading nail photo to the live website...");
  const upload = await uploadAdminPhoto(studio.dataUrl, `look-${index}`);
  const photoUrl = upload.ok ? upload.url : studio.dataUrl;
  adminState.lookPhotos[index] = photoUrl;
  const productIndex = adminState.customProducts.findIndex((product) => Number(product.sourceLookIndex) === index);
  if (productIndex >= 0) {
    Object.assign(adminState.customProducts[productIndex], {
      image: photoUrl,
      imageFit: studio.fit,
      imagePosition: studio.position,
      imageZoom: studio.zoom,
      imageTransform: studio.transform
    });
  }
  if (!upload.ok) {
    localSaveAdminState();
    renderLooks();
    renderCustomProducts();
    renderAdminProducts();
    renderAdminLookPhotos();
    renderAdminInventoryPanel();
    updateLookCount();
    setLookStatus(index, liveSaveFailureMessage(upload.error));
    return;
  }
  const result = await saveAdminState({
    statusTarget: addProductStatus,
    savingMessage: "Saving product photo to the live website...",
    successMessage: "Product photo saved to the live website."
  });
  renderLooks();
  renderCustomProducts();
  renderAdminProducts();
  renderAdminLookPhotos();
  renderAdminInventoryPanel();
  updateLookCount();
  if (selectedLook?.index === index) applyLook(readLookData(index));
  if (!result.ok) {
    setLookStatus(index, liveSaveFailureMessage(result.error));
    return;
  }
  triggerPhotoBounce(adminLookList?.querySelector(`[data-look-card="${index}"] .admin-look-preview`));
  showAdminUploadCelebration("Product photo is live.");
  setLookStatus(index, "Photo saved to the live website. Add a price, then publish it to the Shop.");
}

function renderAdminLookPhotos() {
  if (!adminLookList) return;
  adminLookList.innerHTML = "";
  const activeIndices = lookLibrary
    .map((_, index) => index)
    .filter((index) => readLookData(index).active);
  const inactiveIndices = lookLibrary
    .map((_, index) => index)
    .filter((index) => !readLookData(index).active);
  const displayIndices = [...activeIndices, ...inactiveIndices.slice(0, Math.max(visibleLookSlotCount - activeIndices.length, 0))]
    .filter((index, position, list) => list.indexOf(index) === position)
    .sort((a, b) => a - b);
  displayIndices.forEach((index) => {
    const look = readLookData(index);
    const card = document.createElement("div");
    card.className = `admin-control admin-look-card${look.published ? " is-published" : ""}`;
    card.dataset.lookCard = String(index);
    card.style.setProperty("--look-base", look.base);
    card.style.setProperty("--look-accent", look.accent);
    if (look.photo) card.style.setProperty("--look-photo", `url("${look.photo}")`);
    applyLookFitProperties(card, look.photoFit, look.photoPosition, look.photoZoom);
    card.innerHTML = `
      <div class="admin-look-preview${look.photo ? " has-photo" : ""}" aria-hidden="true">
        ${look.photo ? `<img src="${escapeAttribute(look.photo)}" alt="" data-photo-fit="${escapeAttribute(look.photoFit)}" data-photo-position="${escapeAttribute(look.photoPosition)}" style="${photoTransformStyle(look.photoTransform, look.photoZoom)}" />` : `<span class="professional-upload-hint">Drop nail photo here</span>`}
        <span class="look-dot"></span>
        ${look.published ? `<span class="published-ribbon">In Shop</span>` : ""}
      </div>
      <div class="admin-look-copy">
        <span>${look.slotLabel}${look.published ? " - Published" : ""}</span>
        <label>Name <input value="${escapeAttribute((adminState.lookDetails[index] && adminState.lookDetails[index].name) || "")}" placeholder="${escapeAttribute(look.name)}" data-look-detail="${index}" data-look-field="name" /></label>
        <div class="admin-field-row">
          <label>Price <input value="${escapeAttribute((adminState.lookDetails[index] && adminState.lookDetails[index].price) || "")}" inputmode="decimal" placeholder="45" data-look-detail="${index}" data-look-field="price" /></label>
          <label>Style <input value="${escapeAttribute((adminState.lookDetails[index] && adminState.lookDetails[index].finish) || "")}" placeholder="chrome, aura, french" data-look-detail="${index}" data-look-field="finish" /></label>
        </div>
        <label>Description <textarea data-look-detail="${index}" data-look-field="copy" placeholder="Tell customers about the shape, finish, color, charms, and vibe.">${escapeTextarea((adminState.lookDetails[index] && adminState.lookDetails[index].copy) || "")}</textarea></label>
        <details class="admin-optional">
          <summary>Optional product details</summary>
          <label>Shop tag <input value="${escapeAttribute((adminState.lookDetails[index] && adminState.lookDetails[index].tag) || "")}" placeholder="New drop" data-look-detail="${index}" data-look-field="tag" /></label>
          <label>Private maker notes <textarea data-look-detail="${index}" data-look-field="notes" placeholder="Private notes for Chey only.">${escapeTextarea((adminState.lookDetails[index] && adminState.lookDetails[index].notes) || "")}</textarea></label>
        </details>
        <div class="look-publish-actions">
          <label class="tiny-upload" for="lookPhoto-${index}">${look.photo ? "Replace Nail Photo" : "Upload Nail Photo"}</label>
          <label class="photo-fit-control compact">Photo fit
            <select data-look-photo-fit="${index}">
              ${photoFitOptionsMarkup(look.photoFit)}
            </select>
          </label>
          <label class="photo-fit-control compact">Focus
            <select data-look-photo-position="${index}">
              ${photoPositionOptionsMarkup(look.photoPosition)}
            </select>
          </label>
          <label class="photo-fit-control compact photo-zoom-control">Zoom <span data-look-zoom-label="${index}">${photoZoomPercent(look.photoZoom)}%</span>
            <input type="range" min="1" max="1.55" step="0.01" value="${sanitizePhotoZoom(look.photoZoom).toFixed(2)}" data-look-photo-zoom="${index}" />
          </label>
          <button class="button primary" type="button" data-publish-look="${index}">${look.published ? "Update Shop Product" : "Publish To Shop"}</button>
          ${look.published ? `<button class="button danger" type="button" data-unpublish-look="${index}">Withdraw From Shop</button>` : ""}
          ${look.active ? `<button class="button danger subtle-danger" type="button" data-delete-inventory-look="${index}">Delete From Inventory</button>` : ""}
        </div>
        <small class="look-extract-note" data-look-status>${look.photo ? (look.published ? "This design is live in the Shop." : "Photo framed. Add a price, then publish it to the Shop.") : "Take a nail photo, upload it here, then publish it as a product."}</small>
        <input class="hidden-file-input" id="lookPhoto-${index}" type="file" accept="image/*" capture="environment" data-look-photo="${index}" />
      </div>
    `;
    adminLookList.appendChild(card);
    bindPhotoDropZone(card.querySelector(".admin-look-preview"), (file) => updateLookPhotoFromFile(index, file, card.querySelector("[data-look-photo]")));
  });
  adminLookList.querySelectorAll("[data-look-photo]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      await updateLookPhotoFromFile(Number(input.dataset.lookPhoto), file, input);
    });
  });
  const applyLookPhotoControls = (index, card) => {
    const fit = sanitizePhotoFit(card?.querySelector("[data-look-photo-fit]")?.value);
    const position = sanitizePhotoPosition(card?.querySelector("[data-look-photo-position]")?.value);
    const zoom = sanitizePhotoZoom(card?.querySelector("[data-look-photo-zoom]")?.value);
    const transform = sanitizePhotoTransform(adminState.lookPhotoTransforms[index]);
    adminState.lookPhotoFits[index] = fit;
    adminState.lookPhotoPositions[index] = position;
    adminState.lookPhotoZooms[index] = zoom;
    const productIndex = adminState.customProducts.findIndex((product) => Number(product.sourceLookIndex) === index);
    if (productIndex >= 0) {
      Object.assign(adminState.customProducts[productIndex], {
        imageFit: fit,
        imagePosition: position,
        imageZoom: zoom,
        imageTransform: transform
      });
    }
    applyLookFitProperties(card, fit, position, zoom);
    applyPhotoFitToImage(card?.querySelector(".admin-look-preview img"), fit, position, zoom, transform);
    const zoomLabel = card?.querySelector("[data-look-zoom-label]");
    if (zoomLabel) zoomLabel.textContent = `${photoZoomPercent(zoom)}%`;
    renderLooks();
    renderCustomProducts();
    if (selectedLook?.index === index) applyLook(readLookData(index));
    return { fit, position, zoom };
  };
  const saveLookPhotoControls = async (index, control) => {
    const card = control.closest(".admin-look-card");
    applyLookPhotoControls(index, card);
    const preview = card?.querySelector(".admin-look-preview");
    triggerPhotoBounce(preview);
    const result = await saveAdminState({
      statusTarget: addProductStatus,
      savingMessage: "Saving photo adjustments to the live website...",
      successMessage: "Photo adjustments saved to the live website."
    });
    if (!result.ok) {
      setLookStatus(index, liveSaveFailureMessage(result.error));
      return;
    }
    showAdminUploadCelebration("Photo adjustment is live.");
    setLookStatus(index, "Photo adjustments saved. Looking much better.");
  };
  adminLookList.querySelectorAll("[data-look-photo-fit]").forEach((select) => {
    select.addEventListener("change", async () => {
      await saveLookPhotoControls(Number(select.dataset.lookPhotoFit), select);
    });
  });
  adminLookList.querySelectorAll("[data-look-photo-position]").forEach((select) => {
    select.addEventListener("change", async () => {
      await saveLookPhotoControls(Number(select.dataset.lookPhotoPosition), select);
    });
  });
  adminLookList.querySelectorAll("[data-look-photo-zoom]").forEach((input) => {
    input.addEventListener("input", () => {
      applyLookPhotoControls(Number(input.dataset.lookPhotoZoom), input.closest(".admin-look-card"));
    });
    input.addEventListener("change", async () => {
      await saveLookPhotoControls(Number(input.dataset.lookPhotoZoom), input);
    });
  });
  adminLookList.querySelectorAll("[data-publish-look]").forEach((button) => {
    button.addEventListener("click", async () => {
      await publishLookToShop(Number(button.dataset.publishLook));
    });
  });
  adminLookList.querySelectorAll("[data-unpublish-look]").forEach((button) => {
    button.addEventListener("click", async () => {
      const look = readLookData(Number(button.dataset.unpublishLook));
      await removePublishedProduct(look.productIndex);
    });
  });
  adminLookList.querySelectorAll("[data-delete-inventory-look]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteInventoryProduct(Number(button.dataset.deleteInventoryLook));
    });
  });
  adminLookList.querySelectorAll("[data-look-detail]").forEach((field) => {
    field.addEventListener("input", () => {
      const index = field.dataset.lookDetail;
      const key = field.dataset.lookField;
      adminState.lookDetails[index] = adminState.lookDetails[index] || {};
      adminState.lookDetails[index][key] = field.value;
      localSaveAdminState();
      scheduleRemoteAdminStateSave({
        statusTarget: addProductStatus,
        savingMessage: "Saving product library changes to the live website...",
        showSuccess: true,
        successMessage: "Product library changes saved to the live website."
      });
      renderLooks();
      updateLookCount();
    });
  });
  if (displayIndices.length < lookLibrary.length) {
    const moreButton = document.createElement("button");
    moreButton.type = "button";
    moreButton.className = "tiny-upload admin-load-more";
    moreButton.textContent = `Show ${Math.min(LOOK_SLOT_BATCH_SIZE, lookLibrary.length - displayIndices.length)} more design slots`;
    moreButton.addEventListener("click", () => {
      visibleLookSlotCount = Math.min(lookLibrary.length, visibleLookSlotCount + LOOK_SLOT_BATCH_SIZE);
      renderAdminLookPhotos();
    });
    adminLookList.appendChild(moreButton);
  }
}

function renderAdminProducts() {
  if (!adminProductList) return;
  adminProductList.innerHTML = "";
  adminState.customProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "admin-control admin-product-card";
    card.dataset.customProductCard = String(index);
    card.innerHTML = `
      <div class="admin-product-photo">
        ${productImageMarkup(product, index)}
        <label class="professional-upload-zone compact-zone" for="customImage-${index}">
          <span>${product.image ? "Change Photo" : "Add Photo"}</span>
          <small>Drop here, or click to choose.</small>
        </label>
        <label class="photo-fit-control compact">Photo fit
          <select data-custom-product-fit="${index}">
            ${photoFitOptionsMarkup(product.imageFit)}
          </select>
        </label>
        <label class="photo-fit-control compact">Focus
          <select data-custom-product-position="${index}">
            ${photoPositionOptionsMarkup(product.imagePosition)}
          </select>
        </label>
        <label class="photo-fit-control compact photo-zoom-control">Zoom <span data-product-zoom-label="${index}">${photoZoomPercent(product.imageZoom)}%</span>
          <input type="range" min="0.25" max="2.5" step="0.01" value="${sanitizePhotoZoom(product.imageZoom).toFixed(2)}" data-custom-product-zoom="${index}" />
        </label>
        <input class="hidden-file-input" id="customImage-${index}" type="file" accept="image/*" capture="environment" data-custom-product-image="${index}" />
      </div>
      <div class="admin-product-fields">
        <div class="admin-product-head">
          <strong>Shop Product ${index + 1}</strong>
          <button class="delete-product" type="button" data-delete-custom-product="${index}">Withdraw</button>
        </div>
        <label>Name <input data-custom-product="${index}" data-field="name" value="${escapeAttribute(product.name)}" /></label>
        <div class="admin-field-row">
          <label>Price <input data-custom-product="${index}" data-field="price" value="${escapeAttribute(product.price)}" /></label>
          <label>Sale price <input data-custom-product="${index}" data-field="salePrice" value="${escapeAttribute(product.salePrice || "")}" /></label>
        </div>
        <div class="admin-field-row">
          <label>Discount
            <select data-custom-product="${index}" data-field="discount">
              ${optionMarkup(discountOptions, product.discount)}
            </select>
          </label>
          <label>Stock/status
            <select data-custom-product="${index}" data-field="stock">
              ${optionMarkup(stockOptions, product.stock)}
            </select>
          </label>
        </div>
        <div class="admin-field-row">
          <label>Style
            <select data-custom-product="${index}" data-field="category">
              ${optionMarkup(categoryOptions, product.category)}
            </select>
          </label>
          <label>SKU <input data-custom-product="${index}" data-field="sku" value="${escapeAttribute(product.sku || "")}" /></label>
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
    bindPhotoDropZone(card.querySelector(".admin-product-photo"), (file) => updatePublishedProductPhotoFromFile(index, file, card.querySelector("[data-custom-product-image]")));
  });
  if (!adminState.customProducts.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "admin-control";
    emptyState.innerHTML = "<p>No published shop products yet. Publish finished designs from the Product Library above.</p>";
    adminProductList.appendChild(emptyState);
  }
  updateProductCount();
  bindProductPhotoEditors();
  bindProductFitEditors();
  bindProductFieldEditors();
  adminProductList.querySelectorAll("[data-delete-custom-product]").forEach((button) => {
    button.addEventListener("click", async () => {
      await removePublishedProduct(Number(button.dataset.deleteCustomProduct));
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
  const count = adminState.customProducts.length;
  productCountBadge.textContent = `${count} live product${count === 1 ? "" : "s"}`;
}

async function updatePublishedProductPhotoFromFile(index, file, input) {
  const product = adminState.customProducts[index];
  if (!product || !file) return;
  setAdminMessage(addProductStatus, "Opening Photo Studio...");
  const studio = await preparePhotoInStudio(file, {
    title: `Adjust ${product.name || "shop product"}`,
    fit: product.imageFit,
    position: product.imagePosition,
    zoom: product.imageZoom,
    transform: product.imageTransform
  });
  if (input) input.value = "";
  if (!studio) {
    setAdminMessage(addProductStatus, "Photo upload cancelled.");
    return;
  }

  Object.assign(product, {
    imageFit: studio.fit,
    imagePosition: studio.position,
    imageZoom: studio.zoom,
    imageTransform: studio.transform
  });
  setAdminMessage(addProductStatus, "Uploading product photo to the live website...");
  const upload = await uploadAdminPhoto(studio.dataUrl, `product-${index}`);
  const imageUrl = upload.ok ? upload.url : studio.dataUrl;
  product.image = imageUrl;
  syncPublishedProductBackToLook(product, {
    image: imageUrl,
    imageFit: studio.fit,
    imagePosition: studio.position,
    imageZoom: studio.zoom,
    imageTransform: studio.transform
  });
  if (!upload.ok) {
    localSaveAdminState();
    renderCustomProducts();
    renderAdminLookPhotos();
    renderAdminProducts();
    renderAdminInventoryPanel();
    setAdminMessage(addProductStatus, liveSaveFailureMessage(upload.error));
    return;
  }
  const result = await saveAdminState({
    statusTarget: addProductStatus,
    savingMessage: "Saving product photo to the live website...",
    successMessage: "Product photo saved to the live website."
  });
  renderCustomProducts();
  renderAdminLookPhotos();
  renderAdminProducts();
  renderAdminInventoryPanel();
  if (!result.ok) return;
  triggerPhotoBounce(adminProductList?.querySelector(`[data-custom-product-card="${index}"] .admin-product-photo img`));
  showAdminUploadCelebration("Product photo is live.");
  setAdminMessage(addProductStatus, "Product photo saved to the live website.");
}

function bindProductPhotoEditors() {
  adminProductList.querySelectorAll("[data-custom-product-image]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      const index = Number(input.dataset.customProductImage);
      await updatePublishedProductPhotoFromFile(index, file, input);
    });
  });
}

function bindProductFitEditors() {
  const applyProductPhotoControls = (index, card) => {
    const product = adminState.customProducts[index];
    if (!product) return null;
    const fit = sanitizePhotoFit(card?.querySelector("[data-custom-product-fit]")?.value);
    const position = sanitizePhotoPosition(card?.querySelector("[data-custom-product-position]")?.value);
    const zoom = sanitizePhotoZoom(card?.querySelector("[data-custom-product-zoom]")?.value);
    const transform = sanitizePhotoTransform(product.imageTransform);
    Object.assign(product, {
      imageFit: fit,
      imagePosition: position,
      imageZoom: zoom,
      imageTransform: transform
    });
    syncPublishedProductBackToLook(product, {
      imageFit: fit,
      imagePosition: position,
      imageZoom: zoom,
      imageTransform: transform
    });
    const preview = card?.querySelector(".admin-product-photo img");
    applyPhotoFitToImage(preview, fit, position, zoom, transform);
    const zoomLabel = card?.querySelector("[data-product-zoom-label]");
    if (zoomLabel) zoomLabel.textContent = `${photoZoomPercent(zoom)}%`;
    renderCustomProducts();
    renderLooks();
    return { preview, fit, position, zoom };
  };
  const saveProductPhotoControls = async (index, control) => {
    const card = control.closest(".admin-product-card");
    const current = applyProductPhotoControls(index, card);
    if (!current) return;
    triggerPhotoBounce(current.preview);
    const result = await saveAdminState({
      statusTarget: addProductStatus,
      savingMessage: "Saving product photo adjustments to the live website...",
      successMessage: "Product photo adjustments saved to the live website."
    });
    if (!result.ok) return;
    showAdminUploadCelebration("Product photo adjustment is live.");
    setAdminMessage(addProductStatus, "Product photo adjustments saved to the live website.");
  };
  adminProductList.querySelectorAll("[data-custom-product-fit]").forEach((select) => {
    select.addEventListener("change", async () => {
      await saveProductPhotoControls(Number(select.dataset.customProductFit), select);
    });
  });
  adminProductList.querySelectorAll("[data-custom-product-position]").forEach((select) => {
    select.addEventListener("change", async () => {
      await saveProductPhotoControls(Number(select.dataset.customProductPosition), select);
    });
  });
  adminProductList.querySelectorAll("[data-custom-product-zoom]").forEach((input) => {
    input.addEventListener("input", () => {
      applyProductPhotoControls(Number(input.dataset.customProductZoom), input.closest(".admin-product-card"));
    });
    input.addEventListener("change", async () => {
      await saveProductPhotoControls(Number(input.dataset.customProductZoom), input);
    });
  });
}

function bindProductFieldEditors() {
  adminProductList.querySelectorAll("[data-custom-product]").forEach((input) => {
    const updateProductField = () => {
      const index = Number(input.dataset.customProduct);
      const field = input.dataset.field;
      if (!adminState.customProducts[index] || !field) return;
      const value = field === "price" || field === "salePrice" ? normalizeMoneyValue(input.value) : input.value;
      adminState.customProducts[index][field] = value;
      applyAutomaticDiscount(adminState.customProducts[index], field);
      if (field === "price" || field === "discount") {
        const card = input.closest(".admin-product-card");
        const saleInput = card?.querySelector('[data-field="salePrice"]');
        if (saleInput) saleInput.value = adminState.customProducts[index].salePrice || "";
      }
      syncPublishedProductBackToLook(adminState.customProducts[index], { [field]: value });
      if (field === "price" || field === "discount") {
        syncPublishedProductBackToLook(adminState.customProducts[index], { salePrice: adminState.customProducts[index].salePrice || "" });
      }
      localSaveAdminState();
      scheduleRemoteAdminStateSave({
        statusTarget: addProductStatus,
        savingMessage: "Saving product changes to the live website...",
        showSuccess: true,
        successMessage: "Product changes saved to the live website."
      });
      renderCustomProducts();
      renderAdminLookPhotos();
      updateLookCount();
    };
    input.addEventListener("input", updateProductField);
    input.addEventListener("change", updateProductField);
  });
}

function saveProductEdits() {
  adminProductList.querySelectorAll("[data-custom-product]").forEach((input) => {
    const index = Number(input.dataset.customProduct);
    const field = input.dataset.field;
    if (!adminState.customProducts[index] || !field) return;
    const value = field === "price" || field === "salePrice" ? normalizeMoneyValue(input.value) : input.value;
    adminState.customProducts[index][field] = value;
    applyAutomaticDiscount(adminState.customProducts[index], field);
    syncPublishedProductBackToLook(adminState.customProducts[index], { [field]: value });
    if (field === "price" || field === "discount") {
      syncPublishedProductBackToLook(adminState.customProducts[index], { salePrice: adminState.customProducts[index].salePrice || "" });
    }
  });
}

function exportAdminEdits() {
  saveTextEdits();
  saveProductEdits();
  localSaveAdminState();
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
  reader.onload = async () => {
    const imported = JSON.parse(reader.result);
    adminState = normalizeAdminState(imported);
    ensureLayoutState();
    const result = await saveAdminState({
      statusTarget: adminContentStatus,
      savingMessage: "Importing edits to the live website...",
      successMessage: "Imported edits saved to the live website."
    });
    applyAdminState();
    renderAdminImages();
    renderAdminProducts();
    renderAdminLookPhotos();
    renderIdeas();
    if (!result.ok) return;
  };
  reader.readAsText(file);
}

function resetAdminEdits() {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  window.location.reload();
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
  if (image) {
    ideaStatusMessage.textContent = "Uploading idea photo to the live website...";
    const upload = await uploadAdminPhoto(image, "idea");
    if (!upload.ok) {
      localSaveAdminState();
      ideaStatusMessage.textContent = liveSaveFailureMessage(upload.error);
      return;
    }
    image = upload.url;
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
  const result = await saveAdminState({
    statusTarget: ideaStatusMessage,
    savingMessage: "Saving idea to the live website...",
    successMessage: "Idea saved to the live website."
  });
  renderIdeas();
  if (!result.ok) return;
  [ideaName, ideaShape, ideaLength, ideaColors, ideaArt, ideaMaterials, ideaNotes, ideaPrice].forEach((input) => {
    input.value = "";
  });
  ideaStatus.value = "Idea";
  clearIdeaPhotoPreview();
  ideaStatusMessage.textContent = "Idea saved to the live website.";
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
              <button class="button secondary wide" type="button" data-idea-to-product="${index}">Send To Product Library</button>
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
  localSaveAdminState();
  scheduleRemoteAdminStateSave({
    statusTarget: ideaStatusMessage,
    savingMessage: "Saving idea changes to the live website...",
    showSuccess: true,
    successMessage: "Idea changes saved to the live website."
  });
  if (key === "name") {
    const title = field.closest(".idea-card")?.querySelector(".admin-product-head strong");
    if (title) title.textContent = field.value || "Untitled idea";
  }
}

async function handleIdeaListClick(event) {
  const deleteButton = event.target.closest("[data-delete-idea]");
  if (deleteButton) {
    adminState.ideas.splice(Number(deleteButton.dataset.deleteIdea), 1);
    const result = await saveAdminState({
      statusTarget: ideaStatusMessage,
      savingMessage: "Removing idea from the live website...",
      successMessage: "Idea removed from the live website."
    });
    renderIdeas();
    if (!result.ok) return;
    return;
  }
  const productButton = event.target.closest("[data-idea-to-product]");
  if (productButton) {
    const idea = adminState.ideas[Number(productButton.dataset.ideaToProduct)];
    if (!idea) return;
    await copyIdeaToProductLibrary(idea);
  }
}

function adminInlineEditingActive() {
  return textEditMode && isAdminSignedIn();
}

function inlineProductAddCardMarkup() {
  return `
    <article class="product inline-editor-card is-visible" data-inline-editor-card="true">
      <div class="inline-editor-card-inner">
        <span class="inline-plus-orb" aria-hidden="true">+</span>
        <span class="inline-editor-kicker">Admin only</span>
        <strong>Add product draft</strong>
        <p>Add private product drafts here first. Publish only when a product is ready for customers.</p>
        <button class="button primary" type="button" data-inline-add-product>Add Draft In Inventory</button>
      </div>
    </article>
  `;
}

function inlineInventoryCardMarkup(look) {
  return `
    <article class="product inline-editor-card inline-inventory-card is-visible" data-inline-editor-card="true" data-inline-inventory="${look.index}">
      <div class="nail-preview photo-preview" aria-hidden="true">
        ${look.photo ? `<img src="${escapeAttribute(look.photo)}" alt="" data-photo-fit="${escapeAttribute(look.photoFit)}" data-photo-position="${escapeAttribute(look.photoPosition)}" style="${photoTransformStyle(look.photoTransform, look.photoZoom)}" />` : ""}
      </div>
      <div class="inline-editor-card-inner">
        <span class="inline-editor-kicker">Inventory</span>
        <strong>${escapeHTML(look.name)}</strong>
        <p>${escapeHTML(look.copy || "Saved in inventory, not currently visible in the Shop.")}</p>
        <div class="inline-product-actions always-visible">
          <button class="button primary" type="button" data-inline-publish-inventory="${look.index}">Publish To Shop</button>
          <button class="button danger" type="button" data-inline-delete-inventory="${look.index}">Delete Inventory</button>
        </div>
      </div>
    </article>
  `;
}

function bindInlineShopEditorControls() {
  productGrid?.querySelectorAll("[data-inline-add-product]").forEach((button) => {
    button.addEventListener("click", startInlineProductAdd);
  });
  productGrid?.querySelectorAll("[data-inline-product-input]").forEach((input) => {
    input.addEventListener("input", updateInlineProductFormField);
    input.addEventListener("change", updateInlineProductFormField);
  });
  productGrid?.querySelectorAll("[data-inline-edit-product-photo]").forEach((button) => {
    button.addEventListener("click", async () => {
      await openProductPhotoPicker(Number(button.dataset.inlineEditProductPhoto));
    });
  });
  productGrid?.querySelectorAll("[data-inline-withdraw-product]").forEach((button) => {
    button.addEventListener("click", async () => {
      await removePublishedProduct(Number(button.dataset.inlineWithdrawProduct));
    });
  });
  productGrid?.querySelectorAll("[data-inline-delete-product-inventory]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deletePublishedProductInventory(Number(button.dataset.inlineDeleteProductInventory));
    });
  });
  productGrid?.querySelectorAll("[data-inline-publish-inventory]").forEach((button) => {
    button.addEventListener("click", async () => {
      await publishLookToShop(Number(button.dataset.inlinePublishInventory));
    });
  });
  productGrid?.querySelectorAll("[data-inline-delete-inventory]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteInventoryProduct(Number(button.dataset.inlineDeleteInventory));
    });
  });
}

async function openProductPhotoPicker(index) {
  const product = adminState.customProducts[index];
  if (!product) return;
  const image = productGrid?.querySelector(`[data-admin-product-image-index="${index}"]`);
  if (image) {
    await openInlineImagePicker(image);
    return;
  }
  ensureInlineImageInput();
  inlineImageEditTarget = {
    imageKey: "",
    productIndex: String(index),
    element: productGrid?.querySelector(`[data-admin-product-placeholder-index="${index}"]`) || null
  };
  adminInlineImageInput.value = "";
  adminInlineImageInput.click();
}

function updateInlineProductFormField(event) {
  if (!textEditMode || !isAdminSignedIn()) return;
  const input = event.target.closest("[data-inline-product-input]");
  if (!input) return;
  const index = Number(input.dataset.inlineProductIndex);
  const field = input.dataset.inlineProductInput;
  const product = adminState.customProducts[index];
  if (!product || !field) return;
  const value = field === "price" || field === "salePrice" ? normalizeMoneyValue(input.value) : input.value.trim();
  product[field] = value;
  applyAutomaticDiscount(product, field);
  if (field === "price" || field === "discount") {
    const saleInput = input.closest(".inline-product-store-fields")?.querySelector('[data-inline-product-input="salePrice"]');
    if (saleInput) saleInput.value = product.salePrice || "";
  }
  syncPublishedProductBackToLook(product, { [field]: value });
  if (field === "price" || field === "discount") {
    syncPublishedProductBackToLook(product, { salePrice: product.salePrice || "" });
  }
  if (event.type === "change") renderCustomProducts();
  queueInlineAdminSave("Saving product details...");
}

function renderCustomProducts() {
  productGrid.innerHTML = "";
  const canInlineEdit = adminInlineEditingActive();
  if (canInlineEdit) {
    productGrid.insertAdjacentHTML("beforeend", inlineProductAddCardMarkup());
  }
  if (!adminState.customProducts.length) {
    if (filterRow) filterRow.hidden = true;
    if (!canInlineEdit) {
      const emptyState = document.createElement("article");
      emptyState.className = "store-empty-state";
      emptyState.innerHTML = `
        <strong>New sets are being uploaded.</strong>
        <p>Check back soon for fresh product photos.</p>
      `;
      productGrid.appendChild(emptyState);
      return;
    }
  }
  if (filterRow) filterRow.hidden = !adminState.customProducts.length;
  adminState.customProducts.forEach((product, index) => {
    const productForDisplay = { ...product, index };
    const discountLabel = productDiscountLabel(productForDisplay);
    const checkoutPrice = productCheckoutPrice(productForDisplay);
    const soldOut = /sold\s*out|unavailable/i.test(product.stock || "");
    const missingPrice = checkoutPrice <= 0;
    const article = document.createElement("article");
    article.className = "product custom-added is-visible";
    article.dataset.category = product.category;
    article.dataset.adminProductIndex = String(index);
    article.tabIndex = 0;
    article.setAttribute("role", "link");
    article.setAttribute("aria-label", `View details for ${product.name || "this product"}`);
    article.innerHTML = `
      <div class="nail-preview photo-preview" aria-hidden="true">
        ${productImageMarkup(product, index)}
        ${discountLabel ? `<span class="product-sale-badge">${escapeHTML(discountLabel)}</span>` : ""}
        ${canInlineEdit ? `<div class="inline-product-actions photo-actions"><button type="button" data-inline-edit-product-photo="${index}">${product.image ? "Edit Photo" : "Add Photo"}</button></div>` : ""}
      </div>
      <div class="product-copy">
        <p class="product-tag" data-admin-product-index="${index}" data-admin-product-field="tag">${escapeHTML(product.tag)}</p>
        <h3 data-admin-product-index="${index}" data-admin-product-field="name">${escapeHTML(product.name)}</h3>
        <div class="swatch-row" aria-label="Color palette">
          <span style="--swatch: #ffe0eb"></span>
          <span style="--swatch: #f3659e"></span>
          <span style="--swatch: #fff7fb"></span>
        </div>
        <p data-admin-product-index="${index}" data-admin-product-field="description">${escapeHTML(product.description)}</p>
        ${product.stock ? `<p class="product-stock">${escapeHTML(product.stock)}</p>` : ""}
        <div class="product-bottom">
          ${productPriceMarkup(productForDisplay)}
          <button type="button" data-name="${escapeAttribute(product.name)}" data-price="${escapeAttribute(checkoutPrice)}" data-product-index="${index}"${soldOut || missingPrice ? " disabled" : ""}>${soldOut ? "Sold Out" : missingPrice ? "Set Price" : "Add"}</button>
        </div>
        ${canInlineEdit ? `
          <div class="inline-product-store-fields" aria-label="Admin product details">
            <strong>Store details</strong>
            <label>Regular price
              <input data-inline-product-index="${index}" data-inline-product-input="price" value="${escapeAttribute(product.price || "")}" inputmode="decimal" placeholder="45" />
            </label>
            <label>Sale price
              <input data-inline-product-index="${index}" data-inline-product-input="salePrice" value="${escapeAttribute(product.salePrice || "")}" inputmode="decimal" placeholder="Auto or custom" />
            </label>
            <label>Discount
              <select data-inline-product-index="${index}" data-inline-product-input="discount">
                ${optionMarkup(discountOptions, product.discount)}
              </select>
            </label>
            <label>Stock/status
              <select data-inline-product-index="${index}" data-inline-product-input="stock">
                ${optionMarkup(stockOptions, product.stock)}
              </select>
            </label>
            <label>Style/category
              <select data-inline-product-index="${index}" data-inline-product-input="category">
                ${optionMarkup(categoryOptions, product.category)}
              </select>
            </label>
            <label>Private notes
              <textarea data-inline-product-index="${index}" data-inline-product-input="notes" placeholder="Polish colors, charms, sizing notes, timing...">${escapeTextarea(product.notes || "")}</textarea>
            </label>
          </div>
          <div class="inline-product-actions">
            <button type="button" data-inline-withdraw-product="${index}">Withdraw From Shop</button>
            <button class="danger" type="button" data-inline-delete-product-inventory="${index}">Delete Forever</button>
          </div>
        ` : ""}
      </div>
    `;
    article.querySelector("[data-name]").addEventListener("click", (event) => {
      addToCart(event.currentTarget.dataset.name, event.currentTarget.dataset.price, {
        image: product.image || "",
        shape: detectProductShape(`${product.name || ""} ${product.description || ""}`) || "",
        category: product.category || "",
        sourceProductIndex: index
      });
    });
    article.addEventListener("click", (event) => {
      if (event.target.closest("button, a, input, select, textarea, label, [contenteditable='true']")) return;
      if (adminInlineEditingActive()) return;
      openProductDetail(index);
    });
    article.addEventListener("keydown", (event) => {
      if (event.target !== article || !["Enter", " "].includes(event.key) || adminInlineEditingActive()) return;
      event.preventDefault();
      openProductDetail(index);
    });
    productGrid.appendChild(article);
  });
  if (canInlineEdit) {
    lookLibrary
      .map((_, index) => readLookData(index))
      .filter((look) => look.active && !look.published)
      .forEach((look) => {
        productGrid.insertAdjacentHTML("beforeend", inlineInventoryCardMarkup(look));
      });
  }
  const activeFilter = document.querySelector(".filter.active")?.dataset.filter || "all";
  applyProductFilter(activeFilter);
  bindInlineShopEditorControls();
  setupProductTryOns();
  markEditableText();
  syncInlineEditMode();
  if (currentPageKey === "product" && selectedProductIndex >= 0) renderProductDetail();
}

setupAdmin().catch((error) => {
  console.error("Pressed by Chey startup failed", error);
});
