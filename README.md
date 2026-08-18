# SnipLink 🚀

SnipLink is a modern, fast, and secure URL Shortener application. It features a polished dashboard for link management, instant QR code generation, JWT-based user authentication, and detailed click analytics visualized with elegant charts.

It runs as a unified full-stack application leveraging Node.js/Express and a React SPA. It features a **dual-mode database backend** that automatically connects to MongoDB but seamlessly falls back to a persistent local JSON database if MongoDB is not configured or offline. This means you can run the entire application locally with zero database setup!

---

## ✨ Features

- **⚡ Sleek URL Shortening**: Instantly generate short, easy-to-share links.
- **📊 Interactive Analytics**: Monitor link performance, total clicks, referrer breakdown, and view click progression over time via interactive Recharts.
- **📸 QR Code Generator**: Automatically generate and download high-resolution QR codes for any shortened link.
- **🔒 Secure Authentication**: Complete user registration and login flows secured with JSON Web Tokens (JWT) and bcrypt password hashing.
- **💾 Zero-Config Database Fallback**: Automatically connects to **MongoDB** if `MONGODB_URI` is provided, otherwise falls back to a **local JSON database** (`.data_urls.json` / `.data_users.json`) so the app runs out-of-the-box.
- **🛡️ Speed & Safety**: Equipped with a custom rate-limiter for shortening API endpoints, route validation middleware, and global error handling.
- **📦 Production-Ready Bundler**: Integrates client assets via Vite and compiles the Express backend using `esbuild` for high-performance production hosting.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (SPA)
- **Tooling/Bundler**: Vite 6
- **Styling**: Tailwind CSS v4 + Framer Motion (for smooth transitions & UI feedback)
- **Charts**: Recharts (for analytics visualization)
- **Icons**: Lucide React
- **Router**: React Router v7
- **Feedback**: Canvas Confetti (delightful user interactions)

### Backend
- **Server**: Node.js & Express.js
- **Auth**: `jsonwebtoken` (JWT) & `bcryptjs` (password hashing)
- **Database ORM**: `mongoose` (MongoDB integration)
- **Compilation**: `esbuild` (bundling the Node.js server into a single file for production)

---

## 📁 Project Structure

```text
├── api/                   # Serverless endpoint handler (e.g. for serverless hosts)
├── assets/                # Static assets and graphics
├── backend/               # Express backend application
│   ├── config/            # Environment and Database configuration
│   ├── controllers/       # Controller logic (Auth, URLs, Stats, Redirects)
│   ├── middleware/        # Authentication, Validation, and Rate limiting
│   ├── models/            # Mongoose Schemas (User, Url, Click)
│   ├── routes/            # Express router setups
│   ├── services/          # Local cache and shortcode generator helper services
│   ├── utils/             # API response wrappers and regex validators
│   └── server.js          # Unified entrypoint hosting API and serving React assets
├── frontend/              # Vite + React Client application
│   ├── src/
│   │   ├── components/    # Reusable UI widgets (Navbar, Charts, QR/URL forms)
│   │   ├── context/       # Auth, Theme, and URL global state providers
│   │   ├── hooks/         # Custom hooks (useAuth, useUrls, etc.)
│   │   ├── pages/         # Page components (Home, Dashboard, Stats, Auth)
│   │   ├── services/      # Axios-based API client wrappers
│   │   └── main.jsx       # Client application entry point
└── dist/                  # Compiled production assets (populated on build)
```

---

## ⚙️ Environment Variables

To customize the application behavior, create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
APP_URL=http://localhost:3000
```

> [!NOTE]
> If `MONGODB_URI` is left blank, the application will store URLs and Users in local `.data_urls.json` and `.data_users.json` files in the root folder.

---

## 💻 Setup & Installation

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) (v18 or higher) installed on your machine.

### 2. Install Dependencies
Clone the repository and install all required modules in the project root:
```bash
npm install
```

### 3. Run in Development
Start the full-stack development environment:
```bash
npm run dev
```
*In development mode, the server runs and dynamically serves API requests while Vite handles frontend live reloading.*

### 4. Build & Run in Production
Compile the React frontend client and bundle the Express backend server:
```bash
# Clean and compile the application
npm run build

# Start the bundled server
npm start
```
*This compiles client assets into `dist/` and compiles the backend into `dist/server.cjs` via `esbuild`, running the entire application on the configured `PORT`.*

---

## 🔌 API Endpoints

### Authentication
* `POST /api/auth/register` - Create a new user account.
* `POST /api/auth/login` - Sign in and receive a JWT authorization token.

### URL Management
* `POST /api/urls` - Shorten a new destination URL (accepts optional JWT to link to user dashboard).
* `GET /api/urls` - Fetch all shortened URLs created by the authenticated user.
* `DELETE /api/urls/:id` - Delete a shortened URL entry (requires JWT).

### Redirection & Analytics
* `GET /:code` - Redirects visitors to the original URL and tracks click metadata.
* `GET /api/stats/:code` - Retrieve click analytics (historical timeline, referrers, total clicks) for a short code.

---

## 👤 Author

- **Vinayak** ([@vinayak833](https://github.com/vinayak833))
