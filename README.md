# Nadir Code

A playable first edition of an original, twenty-case puzzle hunt inspired by Hakari's format. Dark green and lime styling, responsive layout, local progress, and a final puzzle using earlier answers.

## Play locally

Open `dist/index.html` in a browser or run `npm run dev` to launch with Cloudflare Pages local emulator. Keep the other files in `dist` beside it. Browser storage support for local files varies; use a local HTTP server for reliable saved progress.

## Cloudflare Deployment

This repository is **Cloudflare Ready** for Cloudflare Pages and Workers.

- **Build**: `npm run build`
- **Deploy via CLI**: `npm run deploy` (requires Wrangler)
- **Local Dev / Edge Emulator**: `npm run dev`
- **Verification Tests**: `npm run test`

For detailed step-by-step instructions, see [CLOUDFLARE.md](file:///c:/Users/Deejf/Downloads/Nadir%20Code/nadir-code/CLOUDFLARE.md).

### Edge API Functions Included
- `GET /api/health`: Cloudflare Edge health status endpoint.
- `POST /api/check`: Server-side edge answer validation (`{ level: 1, answer: "8198" }`).

## Validation

All 20 cases verified and tests pass: run `npm run test` to confirm puzzle logic, answer hashes, and audio asset validity.

