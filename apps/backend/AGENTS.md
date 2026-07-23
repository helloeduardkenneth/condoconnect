# Backend API Service

## Overview

NestJS backend application for CondoConnect providing REST APIs, WebSocket real time gateways, and PostgreSQL access via Prisma ORM.

## Key files

| File | Owns |
|---|---|
| `src/main.ts` | NestJS bootstrap entrypoint |
| `src/app.module.ts` | Root NestJS application module |
| `prisma/schema.prisma` | PostgreSQL database schema and model definitions |

## Commands

```bash
# Start backend server in watch mode
pnpm --filter @condoconnect/backend dev

# Build backend production bundle
pnpm --filter @condoconnect/backend build
```

## Conventions

- Clean Architecture layer separation: `domain`, `application`, `infrastructure`, `presentation`.
- Primary relational persistence via Prisma ORM connected to PostgreSQL.
- WebSocket gateway for real time security gate alerts.

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
