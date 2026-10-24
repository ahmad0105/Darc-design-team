# DARC Design Team Workspace

A unified, high-performance architectural and engineering operations platform for the DARC Design Team.

## Architecture

- **Frontend:** Single Page Application (SPA) built with Vanilla JavaScript (ES Modules), styled with responsive modern CSS, bundled via **Vite**, and deployed globally on **Cloudflare Workers Assets**.
  - Production URL: `https://panel.darc-design.bond`
- **Backend:** High-performance RESTful API powered by **Hono** running on **Cloudflare Workers** with zero cold starts, global edge caching, and ETag-driven synchronization.
  - Production URL: `https://api.darc-design.bond`
- **Database:** Supabase PostgreSQL with Row Level Security (RLS) and connection pooling.
- **File Storage:** Google Drive API Integration (5TB Quota) for drawings and deliverables.

## Quick Start (Development)

### Prerequisites
- **Node.js**: version 20.0.0 or higher

### 1. Frontend Development
```bash
npm install
npm run dev
```
Runs the Vite development server with hot-module reloading on `http://localhost:5173`.

### 2. Backend Development
```bash
cd darc-cloud-backend
npm install
npx wrangler dev
```
Runs the Cloudflare Worker API locally on `http://localhost:8787`.

## Production Build & Deployment

### Build Frontend
```bash
npm run build
```

### Deploy to Cloudflare
- **Frontend:**
  ```bash
  npm run deploy
  ```
- **Backend:**
  ```bash
  npm run deploy:backend
  ```

## Security & Reliability
- Strict CORS guard permitting only authorized origins.
- Resilient Offline Outbox with automatic background replay upon network reconnection.
- Automatic document review notifications and drawing versioning (V1, V2, V3).
- Real-time tab-to-tab sync via `BroadcastChannel` and ETag validation.
