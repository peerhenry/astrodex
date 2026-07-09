# AstroDex

An open-source astronomical database, API, and Web UI for cataloging celestial objects.

## 🚀 Phase 1 MVP Stack

AstroDex uses a highly decoupled, modern, and environment-agnostic stack:

- **Database:** PostgreSQL + PostGIS / PgSphere (celestial indexing)
- **Backend / API:** Directus (TypeScript, automated REST/GraphQL, built-in RBAC)
- **Frontend:** Nuxt 3 (TypeScript + Vue, SSR enabled for SEO/rich previews)
- **CI/CD:** GitHub Actions (quality gates: lint, build, test)
- **Deployment:** Coolify (Docker-based container orchestration on Hetzner VPS)

## Run locally

Copy the contents of `.env.example` to `.env` and enter missing values.
Then from the root of the project run:

```bash
docker compose up -d database directus
```

And then from `/apps/frontend` run:

```bash
pnpm dev
```