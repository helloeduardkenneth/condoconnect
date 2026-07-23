# 0001. Stack and architecture

**Date**: 2026-07-23
**Status**: Proposed

## Summary

This specification establishes the technology stack and monorepo architecture for CondoConnect. The system uses a pnpm monorepo with React Native Expo for mobile and NestJS for the backend. Storage is managed by PostgreSQL with Prisma ORM, and real time alerts run through WebSockets.

## Context

CondoConnect requires a scalable platform for residents, administrators, and security guards across multiple gated communities. The system must support real time gate access alerts, offline tolerant mobile experiences, strict multi tenant data isolation, and low operational overhead. A monorepo structure is chosen to colocate shared TypeScript types, data contracts, and client logic while keeping mobile and backend apps decoupled.

## Requirements

**User stories**:
- As a developer, I want a unified monorepo structure so that code and TypeScript contracts can be shared cleanly across mobile and backend.
- As a system administrator, I want a reliable NestJS backend and PostgreSQL database so that multi tenant data remains isolated and performant.
- As a security guard and resident, I want real time WebSocket alerts so that gate entries and visitor arrivals update instantly.

**Acceptance criteria**:
- **AC-1**: pnpm monorepo with Turborepo orchestration boots mobile and backend apps locally with zero configuration errors.
- **AC-2**: NestJS backend initializes with Clean Architecture layers (domain, application, infrastructure, presentation) and Prisma ORM connected to PostgreSQL.
- **AC-3**: React Native Expo mobile app configures NativeWind styling, Zustand client state, and TanStack Query server cache.
- **AC-4**: NestJS WebSocket gateway establishes bidirectional real time socket connections for gate alerts.
- **AC-5**: Custom NestJS Auth module handles JWT authentication, phone OTP validation, social OAuth, and biometric passkey verification.

## Options considered

### Option 1: pnpm Monorepo with React Native Expo, NestJS, Prisma, and WebSockets (Chosen)

A unified TypeScript monorepo using pnpm and Turborepo. React Native Expo powers the cross platform mobile app, while NestJS Modular Clean Architecture handles the API and WebSocket gateway. PostgreSQL with Prisma provides type safe data persistence.

**Pros**:
- Single language stack across mobile and backend with shared type definitions.
- Clean Architecture separation isolates business rules from frameworks and database adapters.
- Real time bidirectional socket connections for instant security gate alerts.

**Cons**:
- Monorepo build configuration requires initial setup discipline.

### Option 2: Separate Repositories with Express and MongoDB

Decoupled mobile and backend repositories using Express and MongoDB.

**Pros**:
- Independent repository versioning.

**Cons**:
- Duplicate type definitions and lack of end to end type safety.
- Document database lacks relational constraints needed for multi tenant property hierarchies.

## Decision

**Chosen option**: Option 1: pnpm Monorepo with React Native Expo, NestJS, Prisma, and WebSockets

Adopt a pnpm monorepo with Turborepo, React Native Expo mobile app, NestJS Clean Architecture backend, PostgreSQL with Prisma ORM, and Socket.io WebSockets.

## Rationale

This stack maximizes developer velocity by sharing TypeScript types and data validation schemas between mobile and backend. NestJS Modular Clean Architecture provides clear layer separation for complex multi tenant property domain logic. PostgreSQL with Prisma guarantees data integrity and multi tenant isolation, while WebSockets deliver instant gate arrival alerts.

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript | Full stack type safety and shared interfaces |
| Monorepo | pnpm workspaces with Turborepo | High performance caching and task execution |
| Mobile Framework | React Native (Expo) | Cross platform iOS and Android app delivery |
| Mobile Styling | NativeWind | Utility first styling with Tailwind conventions |
| Mobile State | Zustand + TanStack Query | Client UI state and server query cache separation |
| Backend Framework | NestJS (Modular Clean Architecture) | Layered enterprise backend architecture |
| Primary DB | PostgreSQL | Robust relational database with multi tenant indexing |
| ORM | Prisma ORM | Type safe database client and migration engine |
| Realtime Gateway | WebSockets (Socket.io) | Bidirectional real time gate access alerts |
| Auth | Custom NestJS Auth (Passport + JWT + OTP) | Multi provider authentication and passkeys |
| Package Manager | pnpm | Fast disk space efficient dependency management |

## Consequences

**Positive**:
- Shared type definitions across mobile and backend eliminate contract mismatches.
- High throughput real time gate alerting.
- Type safe database queries and automated migrations via Prisma.

**Negative / tradeoffs**:
- Monorepo tooling setup requires pre commit enforcement and CI workspace configuration.

**Neutral**:
- Team builds both mobile app and backend services using unified TypeScript conventions.

## Follow-up

- [x] Execute scaffold subtask via `/develop stack & architecture`
- [ ] Configure GitHub Actions workflow for monorepo linting, typechecking, and testing

## References

**Project sources**:
- `AGENTS.md` stack and rules specifications
- `docs/scope/scope.md` initial project scope

**Practices & standards**:
- Clean Architecture layer separation
- Twelve Factor App configuration principles

**Links**:
- NestJS Documentation: https://docs.nestjs.com
- Expo Documentation: https://docs.expo.dev
- Prisma Documentation: https://www.prisma.io/docs
- Turborepo Documentation: https://turbo.build/repo/docs
