# CondoConnect

## Stack

- **Language / Runtime**: TypeScript, Node.js
- **Framework**: React Native (Expo) for Mobile, NestJS for Backend
- **Key dependencies**: Prisma, PostgreSQL, NativeWind, Zustand, TanStack Query
- **Package manager**: pnpm (monorepo)

## Build approach

Tracer Bullet (Build end to end working vertical slices through database, backend API, and mobile UI for each feature).

## Commands

```bash
# Install
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# Test
pnpm test
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`.

## Rules

- Clean Architecture: Code is organized in domain, application, infrastructure, and presentation layers. Outer layers depend on inner layers, never the reverse. Domain logic has zero framework imports.
- Type strictness: `strict` mode enforced across TypeScript packages with no `any` types and strict null checks.
- Module structure: `folder-by-feature` colocation of components, services, state stores, and types within feature subdirectories.
- Standards: Validate environment variables at startup, use explicit error handling patterns, named exports only, WCAG AA accessibility baseline for UI, and conventional commit messages.
- Pre commit enforcements: Run lint, format, and typecheck checks on staged files before commit.
- Testing gate: Unit and integration tests using Jest and React Native Testing Library required before releases.
- Continuous integration: GitHub Actions workflow enforcing lint, typecheck, build, and test checks on pull requests and pushes.
- Git milestone reminders: Proactively suggest or remind the user to commit working changes to git whenever a major milestone is completed (scaffolding setup, approved spec creation, or feature verification).

## Agent skills

- [architect](.agents/skills/architect/): `architect`, Design features, architectures, and specs
- [audit](.agents/skills/audit/): `audit`, Bootstrap AI context and AGENTS.md documentation
- [check](.agents/skills/check/): `check`, Code review and app verification
- [debug](.agents/skills/debug/): `debug`, Locate and fix bugs
- [develop](.agents/skills/develop/): `develop`, Build features from approved specs
- [document](.agents/skills/document/): `document`, Draft human facing release notes and documentation
- [scope](.agents/skills/scope/): `scope`, Product scoping and feature lifecycle planning
- [sync](.agents/skills/sync/): `sync`, Keep context files and knowledge in sync
- [test](.agents/skills/test/): `test`, Create test suites for built features

## Context files

- [apps/mobile/AGENTS.md](apps/mobile/AGENTS.md) (React Native Expo mobile app)
- [apps/backend/AGENTS.md](apps/backend/AGENTS.md) (NestJS backend API service)
- [packages/types/AGENTS.md](packages/types/AGENTS.md) (Shared TypeScript types package)

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
