# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Lapizlazuli: pnpm-workspace monorepo, two apps that talk over HTTP (no shared runtime code):

- `apps/landing-page` — Next.js 15 (App Router) storefront, port `3000`.
- `apps/headless-cmd` — Strapi 5 headless CMS (products/categories/orders), port `1337`, SQLite locally.

`packages/shared-types` exists but is empty (`.keep` only) and is **not** listed in `pnpm-workspace.yaml`'s `packages` field (only `apps/*` is) — it isn't a real workspace member yet. Frontend types in `apps/landing-page/types/` are hand-duplicated from the Strapi content-type schemas in `apps/headless-cmd/src/api/*/content-types/*/schema.json`; there's no codegen link between the two, so when a Strapi schema changes, the corresponding frontend type must be updated by hand.

## Commands

Run from repo root unless noted. No root-level build/lint/test scripts exist — each app is driven independently.

```bash
pnpm install                 # from repo root, installs both apps
```

**Backend (`apps/headless-cmd`, Strapi):**
```bash
cd apps/headless-cmd
pnpm run dev                 # strapi develop, http://localhost:1337 (admin at /admin)
pnpm run build                # strapi build
pnpm run start                 # strapi start (production)
pnpm run seed:example          # node ./scripts/seed.js
```
No lint/test scripts are defined for this app.

**Frontend (`apps/landing-page`, Next.js):**
```bash
cd apps/landing-page
pnpm run dev                   # next dev --turbopack, http://localhost:3000 (auto-bumps to 3001 if busy)
pnpm run build
pnpm run start
pnpm run lint                  # next lint
```
No test runner is configured for this app.

### First-time local setup gotcha
Strapi's Public role denies API access by default. After first `strapi develop`, in the admin (`/admin`) go to Settings → Users & Permissions plugin → Roles → Public, and enable `find`/`findOne` for **Product** and **Category** — otherwise the frontend gets `403` even with data loaded. Content created in the Strapi admin must be **Published**, not just saved, or it won't show up in the storefront.

## Architecture

### Backend (Strapi) content model
Content types live under `apps/headless-cmd/src/api/<type>/` (`content-types/`, `controllers/`, `routes/`, `services/`), each following Strapi 5's factory pattern (`createCoreController`/`createCoreRouter`). Types: `product`, `category`, `order`, `article`, `author`, `about`, `global`.

- `product` has a `dynamiczone` field `details` accepting shared components `product.jewelry-attributes` and `product.clothing-attributes` (defined in `src/components/product/*.json`) — this is how per-category-specific product attributes (material, color, size) are modeled without separate content types.
- `category` has a one-to-many relation to `product` and to `article`.
- `order.products` is a raw `json` field (not a relation) — it stores whatever product payload the frontend sent at checkout time, not a live reference to `product` rows.
- Most controllers/routes are untouched Strapi core factories. The one meaningful customization is `apps/headless-cmd/src/api/order/controllers/order.ts`: its `create` action builds Stripe `line_items` from the incoming `products` array (looking up live price via the product service, `unit_amount` computed as `price + 100`), creates a Stripe Checkout Session, then persists the order with the Stripe session id. Any change to checkout flow / pricing logic goes here.
- Stripe secret key (`STRIPE_KEY`) and `CLIENT_URL` (used for Stripe success/cancel redirect URLs) are read from env in the order controller — see `apps/headless-cmd/.env.example` for the full required env var list (add `STRIPE_KEY`/`CLIENT_URL` there too if missing; the checked-in example doesn't currently list them).

### Frontend (Next.js) data flow
- No Strapi SDK is used — data hooks in `apps/landing-page/api/*.tsx` are hand-rolled client hooks (`useEffect` + `fetch`) that call the Strapi REST API directly, e.g. `${NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=...&populate=*`. Follow this same pattern (raw fetch + Strapi filter/populate query params) when adding new data-fetching hooks, rather than introducing a new client library.
- `apps/landing-page/api/payments.ts` sets up a separate axios instance pointed at the backend for the Stripe checkout call.
- Cart state (`hooks/use-cart.tsx`) and loved-products state (`hooks/use-loved-products.tsx`) are client-side Zustand stores with `persist`/`localStorage`, not server state — cart contents are only sent to the backend at checkout (`order` create).
- Routing follows Next App Router with a route group: `app/(routes)/{about,cart,category,customizer,faq,loved-products,product}` — `(routes)` doesn't affect the URL path.
- `app/(routes)/customizer` + `canvas/index.tsx` are stubs (empty divs) intended for a `@react-three/fiber`/`three`/`drei`/`maath`-based 3D product customizer — not yet implemented.
- UI components are shadcn/ui (`components.json`, style `new-york`, Radix primitives under `components/ui/`) with Tailwind v4 (`@tailwindcss/postcss`, no separate `tailwind.config` — see `components.json`'s `tailwind.config: ""`).
- i18n via `i18next`/`react-i18next` with `i18next-http-backend` loading JSON from `public/locales/{en,es}/welcome.json`; default/fallback language is `es` (`app/config/i18next.config.js`).
- Path alias `@/*` maps to the app root (`tsconfig.json`), matching shadcn's `@/components`, `@/lib`, `@/hooks` aliases.

### Environment variables
- Backend: `HOST`, `PORT`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `DATABASE_CLIENT` (defaults to `postgres` in `config/database.ts` but the app is normally run with `sqlite` locally per README), `STRIPE_KEY`, `CLIENT_URL`.
- Frontend: `NEXT_PUBLIC_BACKEND_URL` (Strapi base URL), `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
