# Shared Types Package

## Overview

Shared TypeScript type definitions and domain interfaces used across CondoConnect mobile and backend applications.

## Key files

| File | Owns |
|---|---|
| `src/index.ts` | Shared domain entity interfaces (User, Tenant) |

## Commands

```bash
# Build TypeScript declarations
pnpm --filter @condoconnect/types build

# Run type check
pnpm --filter @condoconnect/types typecheck
```

## Conventions

- Export plain TypeScript interfaces and types with zero framework dependencies.
- Use explicit named exports.

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
