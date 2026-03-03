<div align="center">

# Lisbon

A spike exploring how to run two React Router v7 SPAs side-by-side in a Rails 8 app — one data mode, one framework mode — both served by Rails with no Node process.

<br />

![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br /><br />

</div>

## About the Project

Research into running React Router v7's data mode and framework mode in parallel inside a single Rails app. The goal: prove that a team can adopt framework mode incrementally — one route at a time — without rewriting or replacing the existing data-mode SPA.

This repo answers three questions:

1. **Can Rails serve a framework-mode SPA as static files?** Yes. With `ssr: false`, the build produces plain HTML, JS, and CSS. Rails reads the built `index.html`, injects a CSRF token, and serves it.

2. **Can both modes run simultaneously?** Yes. Data mode at `/`, framework mode at `/app`. They share components, auth, and API.

3. **Can it run without Node?** Yes. Both apps pre-build to static assets. Rails serves everything.

<br />

## Architecture

```
localhost:3000/          → Data-mode SPA (createBrowserRouter, vite-ruby)
localhost:3000/app       → Framework-mode SPA (pre-built, served by Rails)
localhost:3000/api/*     → Rails JSON API (Devise-backed auth)
```

<br />

The two SPAs share components from `app/frontend/data-spa/`:

```
app/frontend/
├── data-spa/           # Shared: pages, layouts, auth, API helpers
│   ├── layouts/        # Root layout (header, footer, auth guard)
│   ├── pages/          # Home, sign-in, sign-up, forgot-password, account
│   ├── lib/            # api.ts, auth-context.tsx
│   └── routes.tsx      # Data-mode router (createBrowserRouter)
├── spa/                # Framework-mode app directory
│   ├── root.tsx        # HTML shell + clientLoader for auth
│   └── routes.ts       # Route config (references data-spa/ components)
├── entrypoints/
│   └── application.tsx # Data-mode Vite entrypoint
└── stylesheets/
    └── application.css # Tailwind
```

<br />

## How It Works

**Data-mode SPA** — Rails renders an HTML shell with `vite_javascript_tag`. React mounts on `DOMContentLoaded`, reads server-rendered props from a `data-react-props` attribute, and boots the router.

**Framework-mode SPA** — `npm run build:spa` compiles to `build/client/`. `SpaController` reads the built `index.html`, injects a CSRF meta tag, and renders it. A `SpaAssets` Rack middleware strips the `/app` URL prefix to serve static assets.

<br />

## Prerequisites

* Ruby 3.3 + Bundler
* Node.js + npm
* SQLite

<br />

## Running the App

Clone the repo

```bash
git clone git@github.com:user/lisbon.git && cd lisbon
```

Install dependencies and set up the database

```bash
bundle install && npm install
bin/rails db:prepare
```

Build the framework-mode SPA

```bash
npm run build:spa
```

Start the app

```bash
bin/dev
```

You should now be able to visit:

**Data-mode SPA**: http://localhost:3000

**Framework-mode SPA**: http://localhost:3000/app

<br />

### Fully pre-built (no Vite dev server)

```bash
npm run build:spa
VITE_RUBY_PUBLIC_OUTPUT_DIR=vite-dev bin/vite build --force
bin/rails s
```

<br />

## Key Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite config for data-mode SPA (vite-ruby + React) |
| `vite.config.rr.ts` | Vite config for framework-mode build (reactRouter plugin) |
| `react-router.config.ts` | Framework-mode: `ssr: false`, `basename: "/app"` |
| `app/controllers/spa_controller.rb` | Serves framework-mode HTML with CSRF injection |
| `lib/middleware/spa_assets.rb` | Strips `/app` prefix to serve build assets |
| `app/controllers/api/base_controller.rb` | API base with CSRF cookie + error handling |

<br />

## Findings

**What works well:**
- Framework mode with `ssr: false` produces self-contained static files — no Node server needed
- Rails can inject per-request data (CSRF tokens, server-rendered props) into the built HTML
- Both apps share components without duplication
- The `reactRouter()` plugin handles code splitting, route manifests, and type generation

**Constraints:**
- `reactRouter()` and `vite-plugin-ruby` cannot share a Vite config — each app needs its own
- Framework mode has no HMR when served as pre-built files — rebuild and refresh
- Components used as framework-mode route modules need `export default`
