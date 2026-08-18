# SnipLink 🚀

SnipLink is a modern, fast, and secure URL Shortener application. It features a polished dashboard for link management, instant QR code generation, JWT authentication, and detailed click analytics with clean charts.

It runs as a unified full-stack Node.js / Express and React SPA, and features a dual-mode database backend that connects to MongoDB but seamlessly falls back to a persistent JSON-based database if MongoDB is not configured or offline.

---

## ✨ Features

- **Sleek URL Shortening**: Instantly generate short, easy-to-share links.
- **Detailed Analytics**: Monitor link performance, total clicks, referrer breakdown, and view click progression over time via interactive Recharts.
- **QR Code Generator**: Easily generate and download QR codes for any shortened link.
- **User Authentication**: Secure signup and login with JWT and bcrypt password hashing.
- **Out-of-the-box Hybrid Database**: Connects to **MongoDB** if `MONGODB_URI` is provided, otherwise falls back to a **local JSON database** (`.data_urls.json` / `.data_users.json`) so it runs without database setup.
- **Production Build Ready**: Integrates Vite client builds and Express server compilation via `esbuild`.
- **Vercel Serverless Support**: Configuration file `vercel.json` and serverless handler `api/index.js` included for instant serverless deployments.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 6, Tailwind CSS v4, React Router v7, Recharts, Framer Motion, Lucide React, Canvas Confetti.
- **Backend**: Node.js, Express.js, JWT (`jsonwebtoken`), `bcryptjs`, `mongoose`, `dotenv`.
- **Bundler & Build Tools**: `esbuild` (compiling backend into unified CJS bundle for production).

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory to customize the application behavior:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
APP_URL=http://localhost:3000
```

> [!NOTE]
> If `MONGODB_URI` is left blank, the app will store URLs and Users in local `.data_urls.json` and `.data_users.json` files in the root folder.

---

## 💻 Setup & Installation

### 1. Clone & Install Dependencies
First, clone the repository or open it in your project workspace. Then, install dependencies:
```bash
npm install
```

### 2. Run in Development
Start the full-stack development environment:
```bash
npm run dev
```
*Vite dev server handles frontend rendering, routing backend API requests directly.*

### 3. Build & Run in Production
Compile the React frontend client and bundle the Express backend:
```bash
# Clean and build the application
npm run build

# Start the compiled server
npm start
```
*This bundles the client into `dist/` and runs the backend using the compiled CJS server.*

---

## ☁️ Deployment

### Deploying to Vercel
The repository includes standard `vercel.json` configurations to deploy both frontend assets and Express API endpoints seamlessly:
1. Make sure you have the [Vercel CLI](https://vercel.com/cli) installed or connect the repository to Vercel's Git Integration.
2. Ensure you add `MONGODB_URI` and `JWT_SECRET` inside your Vercel Project environment variables.
3. Deploy directly using the CLI:
   ```bash
   vercel --prod
   ```

### Deploying to Render
A `render.yaml` blueprint is included for deploying to [Render](https://render.com) using standard infrastructure-as-code:
1. Push your repository to GitHub.
2. In Render, select **Blueprints** -> **New Blueprint Instance**.
3. Select your repository to deploy the web service automatically.
