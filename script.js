/* =========================================================
   SmartShop AI - script.js  (plain JavaScript, no libraries)
   ========================================================= */

// ---------- Settings (change these easily) ----------
const BRAND_FIRST = "Shop";      // website name = BRAND_FIRST + BRAND_LAST
const BRAND_LAST = "Verse";
const ORDER_PREFIX = "SV";       // order id looks like SV-483920
const USE_PHOTOS = false;        // true = load photos from images/1.jpg, 2.jpg ... (falls back to artwork)

// ---------- Data ----------
const categories = [
  { name: "Electronics", icon: "🎧" }, { name: "Fashion", icon: "👗" },
  { name: "Home", icon: "🏠" },        { name: "Grocery", icon: "🛒" },
  { name: "Beauty", icon: "💄" },      { name: "Sports", icon: "⚽" }
];

// Products: [name, price, old price (MRP), category, sub-category, icon]
// Ratings and reviews are generated automatically below.
const productRows = [
  // ---- Fashion ----
  ["Floral Summer Dress", 799, 1599, "Fashion", "Dresses", "👗"],
  ["A-Line Cotton Dress", 699, 1399, "Fashion", "Dresses", "👗"],
  ["Bodycon Dress", 899, 1799, "Fashion", "Dresses", "👗"],
  ["Casual Midi Dress", 999, 1999, "Fashion", "Dresses", "👗"],
  ["Maxi Dress", 1199, 2299, "Fashion", "Dresses", "👗"],
  ["Wrap Dress", 1299, 2599, "Fashion", "Dresses", "👗"],
  ["Evening Cocktail Dress", 1999, 3999, "Fashion", "Dresses", "👗"],
  ["Party Wear Gown", 2499, 4999, "Fashion", "Dresses", "👗"],
  ["Cotton Saree", 899, 1799, "Fashion", "Ethnic Wear", "🥻"],
  ["Printed Kurta Set", 799, 1599, "Fashion", "Ethnic Wear", "👘"],
  ["Anarkali Kurti", 1099, 2199, "Fashion", "Ethnic Wear", "👘"],
  ["Silk Saree", 2999, 5999, "Fashion", "Ethnic Wear", "🥻"],
  ["Men's Sherwani", 4999, 8999, "Fashion", "Ethnic Wear", "🤵"],
  ["Designer Lehenga", 5999, 11999, "Fashion", "Ethnic Wear", "👘"],
  ["Flip Flops", 199, 399, "Fashion", "Shoes", "🩴"],
  ["Ladies Sandals", 599, 1199, "Fashion", "Shoes", "👡"],
  ["Canvas Sneakers", 999, 1999, "Fashion", "Shoes", "👟"],
  ["Slip-on Loafers", 1099, 1999, "Fashion", "Shoes", "👞"],
  ["High Heels", 1299, 2499, "Fashion", "Shoes", "👠"],
  ["Ankle Boots", 1799, 3299, "Fashion", "Shoes", "👢"],
  ["Formal Leather Shoes", 1999, 3499, "Fashion", "Shoes", "👞"],
  ["Running Shoes", 2199, 3999, "Fashion", "Shoes", "👟"],
  ["Trail Sports Shoes", 2499, 4499, "Fashion", "Shoes", "🥾"],
  ["Cotton T-Shirt", 199, 499, "Fashion", "Men's Wear", "👕"],
  ["Cargo Shorts", 499, 999, "Fashion", "Men's Wear", "🩳"],
  ["Polo T-Shirt", 499, 999, "Fashion", "Men's Wear", "👕"],
  ["Track Pants", 599, 1199, "Fashion", "Men's Wear", "👖"],
  ["Formal Shirt", 799, 1499, "Fashion", "Men's Wear", "👔"],
  ["Slim Fit Jeans", 999, 1999, "Fashion", "Men's Wear", "👖"],
  ["Hooded Sweatshirt", 1199, 2199, "Fashion", "Men's Wear", "🧥"],
  ["Denim Jacket", 3299, 4999, "Fashion", "Men's Wear", "🧥"],
  ["Baseball Cap", 249, 499, "Fashion", "Bags & Accessories", "🧢"],
  ["Winter Gloves", 299, 599, "Fashion", "Bags & Accessories", "🧤"],
  ["Silk Scarf", 349, 699, "Fashion", "Bags & Accessories", "🧣"],
  ["Leather Wallet", 499, 999, "Fashion", "Bags & Accessories", "👛"],
  ["Sling Bag", 599, 1199, "Fashion", "Bags & Accessories", "👜"],
  ["Sunglasses", 799, 1499, "Fashion", "Bags & Accessories", "🕶️"],
  ["Travel Backpack", 999, 1999, "Fashion", "Bags & Accessories", "🎒"],
  ["Analog Wrist Watch", 1499, 2999, "Fashion", "Bags & Accessories", "⌚"],
  ["Ladies Handbag", 4499, 7999, "Fashion", "Bags & Accessories", "👜"],
  // ---- Electronics ----
  ["Wired Earphones", 149, 299, "Electronics", "Audio", "🎧"],
  ["Neckband Earphones", 799, 1499, "Electronics", "Audio", "🎧"],
  ["Wireless Earbuds", 1499, 2999, "Electronics", "Audio", "🎧"],
  ["Bluetooth Speaker", 1799, 3499, "Electronics", "Audio", "🔊"],
  ["Soundbar", 4999, 8999, "Electronics", "Audio", "🔊"],
  ["Noise-Cancelling Headphones", 7999, 12999, "Electronics", "Audio", "🎧"],
  ["Budget Smartphone", 8999, 11999, "Electronics", "Mobiles & Laptops", "📱"],
  ["Tablet 10 inch", 12999, 17999, "Electronics", "Mobiles & Laptops", "📱"],
  ["Smartphone 128GB", 14999, 19999, "Electronics", "Mobiles & Laptops", "📱"],
  ["Laptop 15.6 inch", 44999, 59999, "Electronics", "Mobiles & Laptops", "💻"],
  ["Gaming Laptop", 69999, 89999, "Electronics", "Mobiles & Laptops", "💻"],
  ["USB Cable", 149, 299, "Electronics", "Accessories", "🔌"],
  ["Pen Drive 64GB", 399, 699, "Electronics", "Accessories", "💾"],
  ["Phone Charger", 499, 999, "Electronics", "Accessories", "🔌"],
  ["Laptop Stand", 799, 1499, "Electronics", "Accessories", "💻"],
  ["Gaming Mouse", 899, 1599, "Electronics", "Accessories", "🖱️"],
  ["Power Bank 20000mAh", 1299, 2199, "Electronics", "Accessories", "🔋"],
  ["HD Webcam", 1299, 2299, "Electronics", "Accessories", "📷"],
  ["Mechanical Keyboard", 2499, 3999, "Electronics", "Accessories", "⌨️"],
  ["Fitness Band", 1499, 2999, "Electronics", "Wearables", "⌚"],
  ["Smart Watch", 2999, 5999, "Electronics", "Wearables", "⌚"],
  ["Premium Smart Watch", 8999, 14999, "Electronics", "Wearables", "⌚"],
  ["4K Action Camera", 3999, 6999, "Electronics", "Cameras & TV", "📷"],
  ["Smart TV 32 inch", 12999, 18999, "Electronics", "Cameras & TV", "📺"],
  ["Smart TV 43 inch", 22999, 32999, "Electronics", "Cameras & TV", "📺"],
  ["Gaming Console", 29999, 39999, "Electronics", "Cameras & TV", "🎮"],
  ["DSLR Camera", 39999, 49999, "Electronics", "Cameras & TV", "📷"],
  // ---- Home ----
  ["Knife Set", 499, 999, "Home", "Kitchen", "🔪"],
  ["Coffee Mug Set", 449, 799, "Home", "Kitchen", "☕"],
  ["Non-stick Pan", 599, 1199, "Home", "Kitchen", "🍳"],
  ["Pressure Cooker", 1299, 2199, "Home", "Kitchen", "🍲"],
  ["Dinner Set 24 pcs", 1499, 2999, "Home", "Kitchen", "🍽️"],
  ["Mixer Grinder", 2499, 3999, "Home", "Kitchen", "🍹"],
  ["Air Fryer", 5999, 9999, "Home", "Kitchen", "🍟"],
  ["Photo Frame", 249, 499, "Home", "Decor", "🖼️"],
  ["Scented Candles", 299, 599, "Home", "Decor", "🕯️"],
  ["Indoor Plant Pot", 349, 599, "Home", "Decor", "🪴"],
  ["Cushion Cover Set", 399, 799, "Home", "Decor", "🛋️"],
  ["Flower Vase", 399, 799, "Home", "Decor", "🏺"],
  ["Wall Clock", 549, 999, "Home", "Decor", "🕰️"],
  ["Table Lamp", 699, 1199, "Home", "Decor", "💡"],
  ["Bed Sheet Set", 899, 1799, "Home", "Furniture & Bedding", "🛏️"],
  ["Bookshelf", 2999, 4999, "Home", "Furniture & Bedding", "📚"],
  ["Study Table", 3499, 5999, "Home", "Furniture & Bedding", "🪑"],
  ["Office Chair", 4999, 8999, "Home", "Furniture & Bedding", "🪑"],
  ["Orthopedic Mattress", 8999, 14999, "Home", "Furniture & Bedding", "🛏️"],
  // ---- Grocery ----
  ["Toor Dal 1kg", 149, 199, "Grocery", "Staples", "🫘"],
  ["Cooking Oil 1L", 149, 199, "Grocery", "Staples", "🫒"],
  ["Wheat Flour 5kg", 249, 349, "Grocery", "Staples", "🌾"],
  ["Basmati Rice 5kg", 649, 799, "Grocery", "Staples", "🍚"],
  ["Potato Chips Combo", 99, 149, "Grocery", "Snacks & Drinks", "🍿"],
  ["Cookies Pack", 129, 199, "Grocery", "Snacks & Drinks", "🍪"],
  ["Chocolate Box", 199, 299, "Grocery", "Snacks & Drinks", "🍫"],
  ["Fruit Juice Pack", 199, 299, "Grocery", "Snacks & Drinks", "🧃"],
  ["Green Tea (100 bags)", 249, 399, "Grocery", "Snacks & Drinks", "🍵"],
  ["Coffee Powder", 299, 449, "Grocery", "Snacks & Drinks", "☕"],
  ["Pure Honey 500g", 349, 480, "Grocery", "Snacks & Drinks", "🍯"],
  ["Dry Fruits Pack", 549, 799, "Grocery", "Snacks & Drinks", "🥜"],
  ["Fresh Milk 1L", 129, 149, "Grocery", "Fresh", "🥛"],
  ["Eggs (30 pcs)", 199, 249, "Grocery", "Fresh", "🥚"],
  ["Vegetable Box", 299, 449, "Grocery", "Fresh", "🥦"],
  ["Fresh Fruit Basket", 399, 599, "Grocery", "Fresh", "🍎"],
  // ---- Beauty ----
  ["Face Wash", 99, 199, "Beauty", "Skincare", "🧴"],
  ["Face Mask Pack", 199, 399, "Beauty", "Skincare", "🎭"],
  ["Sunscreen SPF 50", 299, 499, "Beauty", "Skincare", "🧴"],
  ["Moisturiser", 349, 599, "Beauty", "Skincare", "🧴"],
  ["Face Serum", 599, 999, "Beauty", "Skincare", "🧪"],
  ["Kajal Pencil", 149, 249, "Beauty", "Makeup", "🖋️"],
  ["Nail Polish Set", 249, 499, "Beauty", "Makeup", "💅"],
  ["Matte Lipstick", 299, 599, "Beauty", "Makeup", "💄"],
  ["Makeup Brush Set", 499, 999, "Beauty", "Makeup", "🖌️"],
  ["Foundation", 699, 1199, "Beauty", "Makeup", "🎨"],
  ["Body Spray", 249, 449, "Beauty", "Fragrance & Hair", "🌸"],
  ["Shampoo 500ml", 249, 399, "Beauty", "Fragrance & Hair", "🧴"],
  ["Perfume 100ml", 1199, 1999, "Beauty", "Fragrance & Hair", "🌸"],
  ["Beard Trimmer", 1299, 2299, "Beauty", "Fragrance & Hair", "🪒"],
  ["Hair Dryer", 999, 1799, "Beauty", "Fragrance & Hair", "💇"],
  // ---- Sports ----
  ["Skipping Rope", 149, 299, "Sports", "Fitness", "🏃"],
  ["Steel Water Bottle", 149, 299, "Sports", "Fitness", "🥤"],
  ["Gym Gloves", 249, 499, "Sports", "Fitness", "🧤"],
  ["Resistance Bands", 299, 599, "Sports", "Fitness", "💪"],
  ["Yoga Mat", 599, 1199, "Sports", "Fitness", "🧘"],
  ["Dumbbell Set 10kg", 1499, 2499, "Sports", "Fitness", "🏋️"],
  ["Treadmill", 24999, 39999, "Sports", "Fitness", "🏃"],
  ["Swimming Goggles", 299, 599, "Sports", "Games & Outdoor", "🥽"],
  ["Football", 399, 799, "Sports", "Games & Outdoor", "⚽"],
  ["Basketball", 599, 1099, "Sports", "Games & Outdoor", "🏀"],
  ["Badminton Racket", 799, 1399, "Sports", "Games & Outdoor", "🏸"],
  ["Cricket Bat", 1299, 2299, "Sports", "Games & Outdoor", "🏏"],
  ["Tennis Racket", 1499, 2699, "Sports", "Games & Outdoor", "🎾"],
  ["Mountain Cycle", 8999, 13999, "Sports", "Games & Outdoor", "🚲"]
];
const products = productRows.map((r, i) => ({
  id: i + 1, name: r[0], price: r[1], old: r[2], cat: r[3], sub: r[4], icon: r[5],
  rating: Math.round((3.9 + ((i * 7) % 8) / 10) * 10) / 10,     // 3.9 to 4.6
  reviews: 120 + ((i * 937) % 3000)
}));

// Home page slider banners
const slides = [
  { bg: "linear-gradient(120deg,#1e3a8a,#3b82f6)", title: "Electronics Mega Sale", text: "Up to 50% off on earbuds, watches and more.", icon: "🎧", cat: "Electronics" },
  { bg: "linear-gradient(120deg,#be185d,#f472b6)", title: "Fashion Fest", text: "Fresh styles for every season. Use code SMART10 for extra 10% off.", icon: "👗", cat: "Fashion" },
  { bg: "linear-gradient(120deg,#15803d,#84cc16)", title: "Fresh Grocery Deals", text: "Daily essentials at the best prices.", icon: "🛒", cat: "Grocery" }
];

// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);
const money = (n) => "₹" + n.toLocaleString("en-IN");
const load = (key, fallback) => JSON.parse(localStorage.getItem(key)) || fallback;
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const user = () => sessionStorage.getItem("currentUser");   // login is asked again in a new browser session
const off = (p) => Math.round((1 - p.price / p.old) * 100);          // discount %
const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

let isSignup = false;
let slideNo = 0;
const PAGE_SIZE = 24;     // products shown at a time
const state = { cat: "All", sub: "All", sort: "low", search: "", limit: PAGE_SIZE };
let couponMsg = "";

// Draws a colourful product picture (SVG) so no external images are needed.
// Tip: to use a real photo, add  image: "images/earbuds.jpg"  to a product.
const palettes = {
  Electronics: [["#1e3a8a", "#60a5fa"], ["#0f766e", "#5eead4"]],
  Fashion:     [["#9d174d", "#f9a8d4"], ["#6d28d9", "#c4b5fd"]],
  Home:        [["#b45309", "#fcd34d"], ["#166534", "#86efac"]],
  Grocery:     [["#15803d", "#bef264"], ["#c2410c", "#fdba74"]],
  Beauty:      [["#be185d", "#fbcfe8"], ["#7c3aed", "#ddd6fe"]],
  Sports:      [["#0369a1", "#7dd3fc"], ["#b91c1c", "#fca5a5"]]
};
function artFor(p) {
  const [c1, c2] = palettes[p.cat][p.id % 2];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="r" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#g)"/>
    <circle cx="340" cy="45" r="95" fill="#fff" opacity=".12"/>
    <circle cx="40" cy="120" r="70" fill="#fff" opacity=".08"/>
    <rect y="215" width="400" height="85" fill="url(#f)"/>
    <circle cx="200" cy="130" r="115" fill="url(#r)"/>
    <ellipse cx="200" cy="236" rx="95" ry="16" fill="#000" opacity=".25"/>
    <text x="200" y="212" font-size="150" text-anchor="middle">${p.icon}</text>
    <text x="52" y="70" font-size="22" opacity=".8">✦</text><text x="338" y="150" font-size="18" opacity=".7">✦</text><text x="318" y="250" font-size="14" opacity=".6">✦</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
// Picture used on cards: photo from images/ folder (if enabled) or the artwork above
function productImage(p) {
  return USE_PHOTOS ? `images/${p.id}.jpg` : artFor(p);
}
// If a photo file is missing, show the artwork instead
function imgFallback(img, id) {
  img.onerror = null;
  img.src = artFor(products.find((p) => p.id === id));
}

function toast(text) {
  const t = $("toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 1600);
}

// ---------- Per-user storage ----------
const getCart = () => load("cart_" + user(), []);
const setCart = (c) => save("cart_" + user(), c);
const getWish = () => load("wish_" + user(), []);
const getOrders = () => load("orders_" + user(), []);

function cartDetails() {
  return getCart().map((i) => {
    const p = products.find((x) => x.id === i.id);
    return { ...p, qty: i.qty, lineTotal: p.price * i.qty };
  });
}
// Price calculation: subtotal, coupon discount, delivery and final total
function totals(items) {
  const sub = items.reduce((s, i) => s + i.lineTotal, 0);
  const disc = localStorage.getItem("coupon_" + user()) === "SMART10" ? Math.round(sub * 0.1) : 0;
  const ship = sub === 0 || sub >= 999 ? 0 : 49;
  return { sub, disc, ship, total: sub - disc + ship };
}
function updateCartCount() {
  $("cartCount").textContent = getCart().reduce((s, i) => s + i.qty, 0);
}

// ---------- Page switching ----------
function showPage(name) {
  if (name !== "login" && !user()) name = "login";
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  $("page-" + name).classList.add("active");
  $("header").classList.toggle("hidden", name === "login");
  document.querySelectorAll("nav button[data-page]").forEach((b) => b.classList.toggle("current", b.dataset.page === name));
  if (name === "home") renderHome();
  if (name === "products") renderProducts();
  if (name === "cart") renderCart();
  if (name === "checkout") renderCheckout();
  window.scrollTo(0, 0);
}
const activePage = () => document.querySelector(".page.active").id.replace("page-", "");

// ---------- 1. LOGIN (any username and password works) ----------
function setAuthMode(signup) {
  isSignup = signup;
  $("authTitle").textContent = signup ? "Create Account" : "Login";
  $("authBtn").textContent = signup ? "Create Account" : "Login";
  $("switchText").textContent = signup ? "Already have an account?" : "New here?";
  $("switchLink").textContent = signup ? "Login" : "Create Account";
  $("authMsg").textContent = "";
}
function handleAuth() {
  const name = $("username").value.trim();
  if (name === "" || $("password").value === "") { $("authMsg").textContent = "Please enter username and password."; return; }
  sessionStorage.setItem("currentUser", name);
  $("username").value = ""; $("password").value = "";
  updateCartCount();
  showPage("home");
}
function logout() {
  sessionStorage.removeItem("currentUser");
  $("headerSearch").value = ""; state.search = ""; setFilter("All");
  showPage("login");
}

// ---------- 2. HOME / DASHBOARD ----------
function slideHTML() {
  const s = slides[slideNo];
  return `<div class="hero" style="background:${s.bg}">
      <button class="hero-arrow prev" data-slide="-1" aria-label="Previous">‹</button>
      <div><h1>${s.title}</h1><p>${s.text}</p><button class="btn accent" data-cat="${s.cat}">Shop ${s.cat}</button></div>
      <div class="big-emoji">${s.icon}</div>
      <button class="hero-arrow next" data-slide="1" aria-label="Next">›</button>
      <div class="dots">${slides.map((_, i) => `<button data-dot="${i}" class="${i === slideNo ? "on" : ""}" aria-label="Slide ${i + 1}"></button>`).join("")}</div>
    </div>`;
}
function productCard(p) {
  const liked = getWish().includes(p.id);
  return `<div class="card">
    <div class="img-wrap">
      <img src="${productImage(p)}" alt="${p.name}" loading="lazy" onerror="imgFallback(this,${p.id})">
      <span class="off">${off(p)}% OFF</span>
      <button class="heart ${liked ? "on" : ""}" data-wish="${p.id}" aria-label="Add to wishlist">${liked ? "♥" : "♡"}</button>
    </div>
    <div class="info">
      <span class="cat-name">${p.cat}</span>
      <strong>${p.name}</strong>
      <span class="stars">${stars(p.rating)} <small>${p.rating} (${p.reviews.toLocaleString("en-IN")})</small></span>
      <div class="price-row"><span class="price">${money(p.price)}</span><span class="old">${money(p.old)}</span></div>
      <button class="btn primary" data-add="${p.id}">Add to Cart</button>
    </div>
  </div>`;
}
function renderHome() {
  const items = cartDetails();
  const t = totals(items);
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const deal = products.reduce((a, b) => (off(b) > off(a) ? b : a));
  const trending = [...products].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 4);
  const orders = getOrders().slice(-3).reverse();

  $("page-home").innerHTML = `
    <div id="hero">${slideHTML()}</div>
    <div class="greeting">${hello}, ${user()}! 👋</div>
    <p class="hint" style="margin:0">Here is your shopping dashboard.</p>

    <div class="stats">
      <button class="stat" data-page="cart"><div class="ic">🛒</div><div><strong>${items.reduce((s, i) => s + i.qty, 0)}</strong><span>Items in cart</span></div></button>
      <button class="stat" data-page="cart"><div class="ic">💰</div><div><strong>${money(t.sub)}</strong><span>Cart value</span></div></button>
      <button class="stat" data-chip="__wish"><div class="ic">❤️</div><div><strong>${getWish().length}</strong><span>Wishlist</span></div></button>
      <button class="stat" data-page="home"><div class="ic">📦</div><div><strong>${getOrders().length}</strong><span>Orders placed</span></div></button>
    </div>

    <h2 class="section-title">Shop by category</h2>
    <div class="categories">${categories.map((c) => `<button class="cat" data-cat="${c.name}"><span class="icon">${c.icon}</span>${c.name}</button>`).join("")}</div>

    <h2 class="section-title">Deal of the day</h2>
    <div class="deal">
      <img src="${productImage(deal)}" alt="${deal.name}" onerror="imgFallback(this,${deal.id})">
      <div class="deal-body">
        <span class="cat-name">${deal.cat}</span>
        <h2 style="margin:0">${deal.name}</h2>
        <div class="price-row"><span class="price">${money(deal.price)}</span><span class="old">${money(deal.old)}</span><span class="off" style="position:static">${off(deal)}% OFF</span></div>
        <div>Ends in: <span class="timer" id="countdown"></span></div>
        <div><button class="btn primary" data-add="${deal.id}">Add to Cart</button></div>
      </div>
    </div>

    <div class="section-title"><h2 style="margin:0">Trending now</h2><a data-page="products">View all</a></div>
    <div class="grid">${trending.map(productCard).join("")}</div>

    ${orders.length ? `<h2 class="section-title">Recent orders</h2><div class="orders-list">${orders.map((o) =>
      `<div class="line"><span><strong>${o.id}</strong> · ${o.date} · ${o.items.length} item(s)</span><strong>${money(o.total)}</strong></div>`).join("")}</div>` : ""}
  `;
  tickCountdown();
}
function tickCountdown() {
  const el = $("countdown");
  if (!el) return;
  const end = new Date(); end.setHours(23, 59, 59, 999);
  let s = Math.max(0, Math.floor((end - new Date()) / 1000));
  const pad = (n) => String(n).padStart(2, "0");
  el.innerHTML = `<span>${pad(Math.floor(s / 3600))}h</span><span>${pad(Math.floor(s % 3600 / 60))}m</span><span>${pad(s % 60)}s</span>`;
}
function moveSlide(step) {
  slideNo = (slideNo + step + slides.length) % slides.length;
  if ($("hero")) $("hero").innerHTML = slideHTML();
}

// ---------- 3. PRODUCTS ----------
function renderProducts() {
  // category chips
  const chipList = ["All", ...categories.map((c) => c.name), "__wish"];
  $("chips").innerHTML = chipList.map((c) =>
    `<button class="chip ${state.cat === c ? "on" : ""}" data-chip="${c}">${c === "__wish" ? "❤ Wishlist" : c}</button>`).join("");

  // sub-category chips (e.g. Fashion -> Dresses, Shoes ...)
  const subs = [...new Set(products.filter((p) => p.cat === state.cat).map((p) => p.sub))];
  $("subChips").innerHTML = subs.length
    ? ["All", ...subs].map((x) => `<button class="chip small ${state.sub === x ? "on" : ""}" data-sub="${x}">${x}</button>`).join("")
    : "";

  // filter + search + sort
  const wish = getWish();
  let list = products.filter((p) =>
    (state.cat === "All" || (state.cat === "__wish" ? wish.includes(p.id) : p.cat === state.cat)) &&
    (state.sub === "All" || p.sub === state.sub) &&
    p.name.toLowerCase().includes(state.search.toLowerCase()));
  if (state.sort === "low") list.sort((a, b) => a.price - b.price);
  if (state.sort === "high") list.sort((a, b) => b.price - a.price);
  if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);

  const title = state.cat === "All" ? "All Products" : state.cat === "__wish" ? "My Wishlist" : state.cat;
  $("productsTitle").textContent = state.sub !== "All" ? `${title} › ${state.sub}` : title;
  $("sortSelect").value = state.sort;
  $("resultCount").textContent = `Showing ${Math.min(state.limit, list.length)} of ${list.length} product(s)` + (state.search ? ` for "${state.search}"` : "");
  $("productGrid").innerHTML = list.slice(0, state.limit).map(productCard).join("");
  $("moreWrap").innerHTML = list.length > state.limit ? `<button class="btn primary" data-more="1">Show more products</button>` : "";
  $("noResults").classList.toggle("hidden", list.length > 0);
}
// Reset filters helper
function setFilter(cat, sub) { state.cat = cat; state.sub = sub || "All"; state.limit = PAGE_SIZE; }

// ---------- 4. CART ----------
function addToCart(id) {
  const cart = getCart();
  const found = cart.find((i) => i.id === id);
  if (found) found.qty++; else cart.push({ id: id, qty: 1 });
  setCart(cart);
  updateCartCount();
  toast("Added to cart 🛒");
}
function changeQty(id, step) {
  let cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += step;
  if (item.qty < 1) cart = cart.filter((i) => i.id !== id);
  setCart(cart); updateCartCount(); renderCart();
}
function removeItem(id) { setCart(getCart().filter((i) => i.id !== id)); updateCartCount(); renderCart(); }
function toggleWish(id) {
  let w = getWish();
  w = w.includes(id) ? w.filter((x) => x !== id) : [...w, id];
  save("wish_" + user(), w);
  toast(w.includes(id) ? "Saved to wishlist ❤" : "Removed from wishlist");
  const page = activePage();
  if (page === "products") renderProducts();
  if (page === "home") renderHome();
}
function applyCoupon() {
  const code = $("couponInput").value.trim().toUpperCase();
  if (code === "SMART10") { localStorage.setItem("coupon_" + user(), "SMART10"); couponMsg = "Coupon applied: 10% off!"; }
  else couponMsg = "Invalid coupon code.";
  renderCart();
}

function summaryRows(t) {
  return `<div class="sum-row"><span>Subtotal</span><span>${money(t.sub)}</span></div>
    ${t.disc ? `<div class="sum-row green"><span>Coupon (SMART10)</span><span>− ${money(t.disc)}</span></div>` : ""}
    <div class="sum-row"><span>Delivery</span><span>${t.ship ? money(t.ship) : "FREE"}</span></div>
    <div class="total-row"><span>Total</span><strong>${money(t.total)}</strong></div>`;
}
function renderCart() {
  const items = cartDetails();
  if (items.length === 0) {
    $("cartWrap").innerHTML = `<div class="empty">Your cart is empty.<br><button class="btn primary" data-page="products">Browse Products</button></div>`;
    return;
  }
  const t = totals(items);
  const applied = t.disc > 0;
  const left = 999 - t.sub;
  $("cartWrap").innerHTML = `<div class="cart-layout">
    <div>
      ${items.map((i) => `<div class="cart-row">
        <img src="${productImage(i)}" alt="${i.name}" onerror="imgFallback(this,${i.id})">
        <div><strong>${i.name}</strong><br><span class="cat-name">${money(i.price)} each</span></div>
        <div class="qty"><button data-minus="${i.id}" aria-label="Decrease">−</button><span>${i.qty}</span><button data-plus="${i.id}" aria-label="Increase">+</button></div>
        <strong class="line-total">${money(i.lineTotal)}</strong>
        <button class="remove" data-remove="${i.id}">Remove</button></div>`).join("")}
    </div>
    <div class="summary">
      <strong>${left > 0 ? `Add ${money(left)} more for FREE delivery` : "🎉 You get FREE delivery!"}</strong>
      <div class="progress"><div style="width:${Math.min(100, t.sub / 999 * 100)}%"></div></div>
      <div class="coupon"><input type="text" id="couponInput" placeholder="Coupon code (try SMART10)" value="${applied ? "SMART10" : ""}"><button class="btn primary small" id="couponBtn">Apply</button></div>
      <p class="msg ${applied ? "good" : ""}">${couponMsg}</p>
      ${summaryRows(t)}
      <button id="checkoutBtn" class="btn primary full">Proceed to Checkout</button>
    </div></div>`;
  couponMsg = "";
}

// ---------- 5. CHECKOUT ----------
function renderCheckout() {
  const items = cartDetails();
  $("checkoutSummary").innerHTML = items.map((i) =>
    `<div class="line"><span>${i.name} × ${i.qty}</span><span>${money(i.lineTotal)}</span></div>`).join("") + summaryRows(totals(items));
  $("checkoutMsg").textContent = "";
}
function placeOrder() {
  const v = (id) => $(id).value.trim();
  const msg = $("checkoutMsg");
  if (!v("custName") || !v("custMobile") || !v("custAddress") || !v("custCity") || !v("custPin")) { msg.textContent = "Please fill in all fields."; return; }
  if (!/^[0-9]{10}$/.test(v("custMobile"))) { msg.textContent = "Mobile number must be 10 digits."; return; }
  if (!/^[0-9]{6}$/.test(v("custPin"))) { msg.textContent = "PIN code must be 6 digits."; return; }

  const items = cartDetails();
  if (items.length === 0) { showPage("cart"); return; }
  const t = totals(items);
  const order = { id: ORDER_PREFIX + "-" + Math.floor(100000 + Math.random() * 900000), date: new Date().toLocaleDateString("en-IN"), items: items, ...t };

  save("orders_" + user(), [...getOrders(), order]);
  save("lastOrder", order);
  setCart([]); localStorage.removeItem("coupon_" + user());
  updateCartCount();
  ["custName", "custMobile", "custAddress", "custCity", "custPin"].forEach((id) => ($(id).value = ""));

  // ---------- 6. CONFIRMATION ----------
  $("orderId").textContent = order.id;
  $("orderItems").innerHTML = order.items.map((i) =>
    `<div class="line"><span>${i.icon} ${i.name} × ${i.qty}</span><span>${money(i.lineTotal)}</span></div>`).join("") + summaryRows(order);
  showPage("confirm");
}

// ---------- Events ----------
$("authBtn").addEventListener("click", handleAuth);
$("switchLink").addEventListener("click", (e) => { e.preventDefault(); setAuthMode(!isSignup); });
$("password").addEventListener("keydown", (e) => { if (e.key === "Enter") handleAuth(); });
$("logoutBtn").addEventListener("click", logout);
$("placeOrderBtn").addEventListener("click", placeOrder);
$("continueBtn").addEventListener("click", () => { setFilter("All"); showPage("products"); });
$("sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; state.limit = PAGE_SIZE; renderProducts(); });
$("headerSearch").addEventListener("input", (e) => {
  state.search = e.target.value; setFilter("All");
  if (activePage() === "products") renderProducts(); else showPage("products");
});

// One click handler for all buttons (including ones created by JavaScript)
document.addEventListener("click", (e) => {
  const t = e.target.closest("button, .logo, a[data-page]");
  if (!t) return;
  const d = t.dataset;
  if (d.page) { if (d.page === "products") { setFilter("All"); state.search = ""; $("headerSearch").value = ""; } showPage(d.page); }
  if (d.cat) { setFilter(d.cat); state.search = ""; $("headerSearch").value = ""; showPage("products"); }
  if (d.chip) { setFilter(d.chip); if (activePage() === "products") renderProducts(); else showPage("products"); }
  if (d.sub) { state.sub = d.sub; state.limit = PAGE_SIZE; renderProducts(); }
  if (d.more) { state.limit += PAGE_SIZE; renderProducts(); }
  if (d.add) addToCart(Number(d.add));
  if (d.wish) toggleWish(Number(d.wish));
  if (d.plus) changeQty(Number(d.plus), 1);
  if (d.minus) changeQty(Number(d.minus), -1);
  if (d.remove) removeItem(Number(d.remove));
  if (d.slide) moveSlide(Number(d.slide));
  if (d.dot) { slideNo = Number(d.dot); moveSlide(0); }
  if (t.id === "couponBtn") applyCoupon();
  if (t.id === "checkoutBtn") showPage("checkout");
});

// Auto-slide banner and countdown (only while the Home page is open)
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
setInterval(() => { if (user() && activePage() === "home" && !reduceMotion) moveSlide(1); }, 4500);
setInterval(() => { if (user() && activePage() === "home") tickCountdown(); }, 1000);

// ---------- Start ----------
document.title = BRAND_FIRST + BRAND_LAST;
document.querySelectorAll(".brand-name").forEach((el) => (el.innerHTML = `${BRAND_FIRST}<b>${BRAND_LAST}</b>`));
// Picture collage on the login page (6 popular products)
$("loginCollage").innerHTML = ["Floral Summer Dress", "Running Shoes", "Wireless Earbuds", "Silk Saree", "Ladies Handbag", "Smart Watch"].map((name) => {
  const p = products.find((x) => x.name === name);
  return `<img src="${productImage(p)}" alt="${p.name}" onerror="imgFallback(this,${p.id})">`;
}).join("");
setAuthMode(false);
if (user()) { updateCartCount(); showPage("home"); } else showPage("login");