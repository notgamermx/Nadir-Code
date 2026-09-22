# Cloudflare Pages & Workers Deployment Guide for Nadir Code

This codebase is optimized for seamless deployment to **Cloudflare Pages** and **Cloudflare Workers**.

---

## ⚡ Quick Deployment (via Wrangler CLI)

If you have Node.js and Wrangler installed:

1. **Log in to Cloudflare**:
   ```bash
   npx wrangler login
   ```

2. **Deploy to Cloudflare Pages**:
   ```bash
   npm run deploy
   ```

Wrangler will upload `dist/` as static assets and deploy your Edge Functions from `functions/`.

---

## 🌐 Git-Integrated Deployment (Cloudflare Dashboard)

To deploy automatically on every `git push`:

1. Connect your repository to **Cloudflare Pages** via [dash.cloudflare.com](https://dash.cloudflare.com).
2. Create a new Pages Project from your Git provider.
3. Configure build settings:
   - **Framework preset**: `None` / `Static Site`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

Cloudflare Pages will automatically attach edge headers from `dist/_headers`, routing rules from `dist/_routes.json`, and edge API functions from `functions/`.

---

## 🧪 Local Preview & Development

Run local emulator with Cloudflare Functions and Pages support:

```bash
npm run dev
```

Or run test verification:
```bash
npm run test
```

---

## 🔒 Included Cloudflare Features

- **Security Headers (`_headers`)**: Enforces Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options, and X-Content-Type-Options.
- **Edge API (`functions/api/check.js`)**: Serverless edge endpoint for validating puzzle answers (`POST /api/check`).
- **Edge Health Endpoint (`functions/api/health.js`)**: Real-time status API (`GET /api/health`).
- **Cache Optimization**: Immutable 1-year caching for JavaScript, CSS, audio, and image assets; zero-cache for index.html updates.
