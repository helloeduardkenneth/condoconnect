# Mobile App

## Overview

React Native Expo mobile application for CondoConnect residents, administrators, and security guards.

## Key files

| File | Owns |
|---|---|
| `App.tsx` | Main React Native application entry component |
| `package.json` | Mobile dependencies and Expo scripts |

## Commands

```bash
# Start Expo development server
pnpm --filter @condoconnect/mobile dev

# Run TypeScript type check
pnpm --filter @condoconnect/mobile typecheck
```

## Conventions

- Use NativeWind for utility first styling.
- Use Zustand for local client state and TanStack Query for server data caching.
- Colocate components, state stores, and types by feature.

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
