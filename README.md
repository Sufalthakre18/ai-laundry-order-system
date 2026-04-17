# 🧺 AI Laundry Order Management System

A lightweight, AI-assisted full-stack web application for managing dry cleaning and laundry orders.

🔗 **Live Demo:** https://ai-laundry-order-system.vercel.app/
📦 **GitHub Repository:** https://github.com/Sufalthakre18/ai-laundry-order-system

---

## 🚀 Overview

This project simulates a real-world **laundry business management system** where store owners can:

* Create and manage customer orders
* Track order status
* Calculate billing automatically
* View business insights via dashboard

Built with a strong focus on:

* ⚡ Speed of execution
* 🤖 AI-assisted development
* 🧠 Practical problem solving

---

## ✨ Features Implemented

### 🧾 Order Management

* Create orders with:

  * Customer name & phone
  * Multiple garments
  * Quantity & pricing
* Auto-calculated total bill
* Unique Order ID generation

### 🔄 Order Status Workflow

* RECEIVED → PROCESSING → READY → DELIVERED
* Update status dynamically from UI

### 🔍 Order Listing & Filters

* View all orders
* Search by:

  * Customer name
  * Phone number
  * Garment type
* Filter by order status

### 📊 Dashboard

* Total orders
* Total revenue
* Orders grouped by status

### 🎨 UI/UX

* Clean and modern interface
* Responsive layout
* Smooth interactions & feedback

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* CSS (custom styling)

### Backend

* Node.js
* Express.js

### Data Storage

* In-memory store (Map)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Sufalthakre18/ai-laundry-order-system.git
cd ai-laundry-order-system
```

---

### 2. Run Backend

```bash
cd backend
npm install
node index.js
```

Backend runs at:

```
http://localhost:5000
```

---

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 4. Environment Setup

Create `.env` inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🤖 AI Usage Report

### Tools Used

* ChatGPT
* GitHub Copilot

---

### Where AI Helped

* Initial API structure and routing
* React component scaffolding
* Form handling and state management
* UI styling improvements
* Debugging suggestions

---

### Sample Prompts

* “Build a Node.js Express API for order management system”
* “Create React form for dynamic garments input”
* “Fix API error handling and improve structure”
* “Improve UI/UX for dashboard layout”

---

### What AI Got Wrong

* Over-engineered code in some places
* Missing validations
* Inconsistent API responses
* UI alignment issues

---

### Improvements Made

* Simplified architecture
* Added proper validations
* Cleaned API structure
* Fixed edge cases in forms
* Improved UI responsiveness

---

## ⚖️ Tradeoffs

### What was skipped

* Database integration (used in-memory for speed)
* Authentication system
* Advanced error handling
* Role-based access

---

### What I would improve

* Add MongoDB / SQL database
* Add authentication (JWT)
* Add pagination & performance optimizations
* Add analytics & reports
* Improve UI animations

---

## 🧠 Key Learnings

* How to build fast using AI tools
* Importance of debugging AI-generated code
* Structuring APIs for real-world use
* Managing frontend + backend integration
* Handling production deployment

---

## 📌 Conclusion

This project demonstrates:

* Fast execution
* Strong AI usage
* Practical full-stack development
* Real-world problem solving

---

## 🙌 Thank You

Looking forward to feedback and opportunity to contribute!
