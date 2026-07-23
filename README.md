# CondoConnect

A production-grade community management platform for condominiums, villages, and gated communities — serving residents, property administrators, and security guards from a single mobile app.

Real-time gate access, multi-tenant property hierarchies, and offline-tolerant resident workflows, built end-to-end as vertical slices through database, backend API, and mobile UI.

## At a glance

- **Mobile app** for residents, admins, and guards (iOS + Android)
- **Backend API** with real-time WebSocket gate alerts
- **Multi-tenant by design** — every property is an isolated data scope
- **Tracer Bullet build approach** — every feature ships as a working end-to-end slice

## Stack

| Layer | Choice |
|---|---|
| Language | TypeScript (strict, no `any`) |
| Monorepo | pnpm workspaces + Turborepo |
| Mobile | React Native (Expo), NativeWind, Zustand, TanStack Query |
| Backend | NestJS (Modular Clean Architecture), Socket.io |
| Database | PostgreSQL + Prisma ORM |
| Auth | Custom NestJS Auth (JWT, phone OTP, social OAuth, passkeys) |

See [`docs/specs/0001-stack-architecture.md`](./docs/specs/0001-stack-architecture.md) for the full decision record.

## Repository layout

```
CondoConnect/
├── apps/
│   ├── backend/         # NestJS API + WebSocket gateway
│   └── mobile/          # React Native (Expo) app
├── packages/
│   └── types/           # Shared TypeScript contracts
├── docs/
│   ├── architecture/    # System diagrams and design notes
│   ├── database/        # Schema, migrations, data model docs
│   ├── api/             # API references and contracts
│   ├── ui/              # Design system and UI specs
│   ├── specs/           # Feature specifications (NNNN-title.md)
│   ├── scope/           # Product scope and feature lifecycle
│   ├── tasks/           # Tracked work and milestones
│   ├── adrs/            # Architecture decision records
│   └── releases/        # Release notes
├── scripts/             # Repo automation and tooling
└── assets/              # Static assets and brand files
```

## Quick start

Requires Node.js >= 20 and pnpm 9.

```bash
# Install dependencies
pnpm install

# Run mobile + backend in dev mode
pnpm dev

# Build all packages and apps
pnpm build

# Type check, lint, and test the workspace
pnpm typecheck
pnpm lint
pnpm test
```

Individual app commands live in `apps/backend` and `apps/mobile`.

## Build approach: Tracer Bullet

Features are built as end-to-end vertical slices, not horizontal layers. Every slice exercises the full stack:

1. **Database** — schema and migrations
2. **Backend API** — domain, application, infrastructure, presentation layers
3. **Mobile UI** — screens, state, and server cache wiring

This catches integration friction early and keeps every feature shippable on its own.

See [`docs/scope/scope.md`](./docs/scope/scope.md) for the current feature plan and lifecycle.

## Architecture rules

- **Clean Architecture** — code is organized in `domain`, `application`, `infrastructure`, and `presentation` layers. Outer layers depend on inner layers, never the reverse. Domain logic has zero framework imports.
- **Type strictness** — TypeScript `strict` mode enforced across all packages.
- **Folder-by-feature** — components, services, state stores, and types colocate within feature subdirectories.
- **Named exports only**, explicit error handling, validated environment variables at startup.
- **WCAG AA** accessibility baseline for UI.
- **Conventional commits** for all changes.
- **Pre-commit** runs lint, format, and typecheck on staged files.
- **Testing** — Jest + React Native Testing Library; unit and integration tests required before release.
- **CI** — GitHub Actions enforces lint, typecheck, build, and test on every PR and push.

## Specifications

Feature specs live in [`docs/specs/`](./docs/specs/), named `NNNN-title.md`. The first spec, [0001 — Stack and architecture](./docs/specs/0001-stack-architecture.md), records the foundational stack decision.

## Documentation map

- [`docs/scope/scope.md`](./docs/scope/scope.md) — current features, phases, and lifecycle state
- [`docs/specs/`](./docs/specs/) — approved feature specifications
- [`docs/architecture/`](./docs/architecture/) — system architecture and diagrams
- [`docs/database/`](./docs/database/) — schema documentation
- [`docs/api/`](./docs/api/) — API contracts and references
- [`docs/ui/`](./docs/ui/) — design system
- [`docs/adrs/`](./docs/adrs/) — architecture decision records
- [`docs/releases/`](./docs/releases/) — release notes

## Contributing

1. Read [`AGENTS.md`](./AGENTS.md) for the full project context and conventions
2. Check the current scope in [`docs/scope/scope.md`](./docs/scope/scope.md) to see what's next
3. Create or update a spec in [`docs/specs/`](./docs/specs/) for any non-trivial feature before building
4. Follow Conventional Commits and ensure all pre-commit checks pass

## License

See [LICENSE](./LICENSE).
