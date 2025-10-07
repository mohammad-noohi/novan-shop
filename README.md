# Novan Shop 🛒

**Novan Shop** is a modern, fully responsive **online store** integrated with a **CMS Admin Dashboard**.

### 🛠️ Technologies Used

[![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-brightgreen?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.12-skyblue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-2.0-purple)](https://www.radix-ui.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.2.1-red?logo=react&logoColor=white)](https://recharts.org/)
[![json-server](https://img.shields.io/badge/json--server-0.17.4-orange)](https://github.com/typicode/json-server)
[![json-server-auth](https://img.shields.io/badge/json--server--auth-2.1.0-lightgrey)](https://github.com/jeremyben/json-server-auth)
[![jsPDF](https://img.shields.io/badge/jsPDF-3.0.3-yellow)](https://github.com/parallax/jsPDF)
[![XLSX](https://img.shields.io/badge/XLSX-0.18.5-green)](https://github.com/SheetJS/sheetjs)
[![Sonner](https://img.shields.io/badge/Sonner-2.0.7-pink)](https://github.com/muhammederdem/sonner)
[![React Router](https://img.shields.io/badge/React_Router-7.8.1-red)](https://reactrouter.com/)

---

### 🎨 Screenshots

#### 🏬 Online Store

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="./screenshots/home.png"  alt="" width="400" />
  <img src="./screenshots/cart.png"  alt="" width="400" />
  <img src="./screenshots/empty-cart.png"  alt="" width="400" />
  <img src="./screenshots/cart-drawer.png"  alt="" width="400" />
  <img src="./screenshots/login.png"  alt="" width="400" />
  <img src="./screenshots/register.png"  alt="" width="400" />
</div>

<div style="display: flex; flex-wrap: wrap; gap: 10px;margin-top : 20px;">
  <img src="./screenshots/dark/dark-home.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-cart.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-empty-cart.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-cart-drawer.png" alt="" width="400" />
</div>

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  
</div>

#### 📊 Admin Dashboard

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="./screenshots/admin-home.png" alt="" width="400" />
  <img src="./screenshots/admin-products.png" alt="" width="400" />
  <img src="./screenshots/admin-orders.png" alt="" width="400" />
  <img src="./screenshots/admin-users.png" alt="" width="400" />
  <img src="./screenshots/admin-profile.png" alt="" width="400" />
  <img src="./screenshots/user-view-modal.png" alt="" width="400" />
  <img src="./screenshots/user-edit-modal.png" alt="" width="400" />
  <img src="./screenshots/user-password-modal.png" alt="" width="400" />
  <img src="./screenshots/product-view-modal.png" alt="" width="400" />
  <img src="./screenshots/product-edit-modal.png" alt="" width="400" />
</div>

<div style="display: flex; flex-wrap: wrap; gap: 10px;margin-top : 20px">
  <img src="./screenshots/dark/dark-damin-home.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-admin-products.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-damin-orders.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-admin-users.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-admin-profile.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-user-view-modal.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-user-edit-modal.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-user-password-modal.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-product-view-modal.png" alt="" width="400" />
  <img src="./screenshots/dark/dark-product-edit-modal.png" alt="" width="400" />
</div>

---

### Features 💡

#### Admin Dashboard

- 🔑 **Authentication & Authorization** (JWT + `json-server-auth`)
- 🔒 **Protected Routes**
- 👋 **Personalized Navbar Greeting**
- 🛠️ **CRUD Management** (Products, Users, Orders, Tickets, Comments, Discounts)
- ✨ **Shimmer / Skeleton Loading**
- ✏️🗑️ **Row Actions** (Edit/Delete)
- 📝 **Form Validations**
- 🌗 **Light/Dark Theme Toggle**
- 🔍 **Search & Filter**
- ↕️ **Sorting**
- 📄 **Export Data** (JSON/CSV)
- 📊 **Analytics Dashboard**
- 🔢 **Pagination**
- 🔔 **Notifications**
- 👤 **Profile Management & Logout**
- 📱 **Fully Responsive**

#### Online Store

- 🛍️ **Product Listing & Details** (Fallback images + loading spinner)
- 🔎 **Search & Filter**
- 🛒 **Shopping Cart**
- 🧾 **Checkout & PDF Invoice**
- 🎟️ **Discount / Coupon Codes**
- 📜 **Order History**
- 🔢 **Pagination**
- 🌗 **Theme Toggle**
- 📝 **Form Validations**
- ✨ **Fallback Images & Loading**

### 📂 Folder Structure

```bash
project-root/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── routes.js
├── data/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

### ⚙️ Installation

```bash
git clone https://github.com/your-username/novan-shop.git
cd novan-shop
npm install
npm run server  # json-server-auth
npm run dev
```

### 📄 License

MIT License

---

✨ Developed with ❤️ by Mohammad Noohi
