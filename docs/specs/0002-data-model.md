# 0002. Core data model

**Date**: 2026-07-23
**Status**: Proposed

## Summary

This specification defines the core multi tenant relational database schema for CondoConnect using Prisma ORM and PostgreSQL. The schema models property hierarchies (Tenant -> Property -> Building -> Unit), user accounts, multi property membership roles, unit occupancy, and registered vehicles. Soft deletes and audit timestamps are included across all entities.

## Context

CondoConnect requires a solid multi tenant data model that guarantees data isolation across properties while allowing users to belong to multiple condominiums or gated communities under different roles (for example, a resident in property A who is an administrator in property B). The schema must isolate authentication credentials into separate identity models while providing structured relationships for unit occupancy and vehicle registration.

## Requirements

**User stories**:
- As a system administrator, I want tenant and property hierarchy entities so that multiple condominium complexes operate with complete data isolation.
- As a user, I want multi property membership roles so that I can access different properties as a resident, administrator, or security guard.
- As a property administrator, I want unit occupancy and vehicle tracking so that resident records and vehicle stickers remain accurate.

**Acceptance criteria**:
- **AC-1**: Database schema defines Tenant, Property, Building, and Unit entities with foreign key cascading and multi tenant indexing.
- **AC-2**: User entity includes profile attributes (email, phoneNumber, status, lastLoginAt) while decoupling auth credentials to dedicated identity modules.
- **AC-3**: UserProperty membership model supports user roles (RESIDENT, ADMIN, GUARD), status (PENDING, ACTIVE, SUSPENDED), and property scoping.
- **AC-4**: UnitOccupant entity models occupancy types (OWNER, TENANT, FAMILY_MEMBER), move in/out dates, and emergency contacts.
- **AC-5**: Vehicle entity relates directly to UnitOccupant with plate numbers, vehicle details, sticker numbers, and active status flags.
- **AC-6**: Soft deletion (`deletedAt`) and audit timestamps (`createdAt`, `updatedAt`) are enforced across every entity.
- **AC-7**: Prisma ORM schema generates type safe database client interfaces without migration errors.
- **AC-8**: Foreign key indexes optimize multi tenant queries filtering by tenantId and propertyId.

## Options considered

### Option 1: Multi Tenant Normalized Relational Schema with Separate Vehicle Entity (Chosen)

A normalized relational database design using PostgreSQL and Prisma ORM. Models a clear four tier hierarchy (Tenant -> Property -> Building -> Unit), explicit UserProperty membership, separate UnitOccupant records, and decoupled Vehicle entities.

**Pros**:
- Strict relational constraints and multi tenant data isolation.
- Flexible role assignments allowing users distinct access levels per property.
- Clean separation between core user identity and property specific occupancy records.

**Cons**:
- Requires relational join queries for deep hierarchy lookups (mitigated by composite indexing).

### Option 2: Single Property Flat Schema with Embedded Vehicle Strings

A simplified schema embedding vehicle registration directly into user or unit records without building or property hierarchy layers.

**Pros**:
- Fewer database tables initially.

**Cons**:
- Incapable of supporting multi building complexes or multi property SaaS tenants.
- Prevents tracking multiple vehicles per occupant cleanly.

## Decision

**Chosen option**: Option 1: Multi Tenant Normalized Relational Schema with Separate Vehicle Entity

Adopt a normalized PostgreSQL database schema with Prisma ORM defining Tenant, Property, Building, Unit, User, UserProperty, UnitOccupant, and Vehicle entities.

## Rationale

This schema provides a production ready foundation that supports complex property structures and multi property user roles. Storing vehicles as a dedicated entity allows residents to register multiple cars or motorcycles with individual sticker tracking. Decoupling authentication credentials from the User entity keeps identity management modular for future passkey and social login integrations.

## Feature design

**Data model sketch**:

- **Tenant**: `id` (UUID PK), `name` (String), `slug` (String Unique), `address` (String), `createdAt` (DateTime), `updatedAt` (DateTime), `deletedAt` (DateTime Nullable)
- **Property**: `id` (UUID PK), `tenantId` (UUID FK), `name` (String), `address` (String), `propertyType` (Enum: CONDO, VILLAGE, GATED_COMMUNITY), `createdAt` (DateTime), `updatedAt` (DateTime), `deletedAt` (DateTime Nullable)
- **Building**: `id` (UUID PK), `propertyId` (UUID FK), `name` (String), `totalFloors` (Int Nullable), `createdAt` (DateTime), `updatedAt` (DateTime), `deletedAt` (DateTime Nullable)
- **Unit**: `id` (UUID PK), `buildingId` (UUID FK), `unitNumber` (String), `floorNumber` (Int Nullable), `status` (Enum: AVAILABLE, OCCUPIED, MAINTENANCE), `createdAt` (DateTime), `updatedAt` (DateTime), `deletedAt` (DateTime Nullable)
- **User**: `id` (UUID PK), `email` (String Unique), `phoneNumber` (String Unique), `fullName` (String), `avatarUrl` (String Nullable), `status` (Enum: ACTIVE, INVITED, SUSPENDED), `lastLoginAt` (DateTime Nullable), `createdAt` (DateTime), `updatedAt` (DateTime), `deletedAt` (DateTime Nullable)
- **UserProperty**: `id` (UUID PK), `userId` (UUID FK), `propertyId` (UUID FK), `role` (Enum: RESIDENT, ADMIN, GUARD), `status` (Enum: PENDING, ACTIVE, SUSPENDED), `joinedAt` (DateTime), `invitedBy` (UUID Nullable), `isPrimaryProperty` (Boolean), `createdAt` (DateTime), `updatedAt` (DateTime), `deletedAt` (DateTime Nullable)
- **UnitOccupant**: `id` (UUID PK), `userId` (UUID FK), `unitId` (UUID FK), `occupancyType` (Enum: OWNER, TENANT, FAMILY_MEMBER), `isPrimaryContact` (Boolean), `moveInDate` (DateTime), `moveOutDate` (DateTime Nullable), `emergencyContactName` (String Nullable), `emergencyContactPhone` (String Nullable), `createdAt` (DateTime), `updatedAt` (DateTime), `deletedAt` (DateTime Nullable)
- **Vehicle**: `id` (UUID PK), `occupantId` (UUID FK), `plateNumber` (String Unique), `make` (String), `model` (String), `color` (String), `stickerNumber` (String Nullable Unique), `status` (Enum: ACTIVE, INACTIVE), `createdAt` (DateTime), `updatedAt` (DateTime), `deletedAt` (DateTime Nullable)

**Key invariants**:
- Every Property belongs to a valid Tenant.
- Every Unit number is unique within its Building.
- UserProperty membership combines `userId` and `propertyId` as a unique composite index.
- Soft deleted records (`deletedAt != null`) are filtered from standard queries.

**Security model**:
- Multi tenant isolation: All queries for property data must filter by `propertyId` and `tenantId`.
- UserProperty memberships govern authorization checks for resident, admin, and guard endpoints.

**Critical test scenarios**:
- Multi property role isolation: User accesses Property A as RESIDENT and Property B as ADMIN, verifies **AC-3**
- Unit occupant vehicle registration: Occupant registers multiple vehicles with unique plate numbers, verifies **AC-5**
- Soft delete filtering: Soft deleted unit or user record is excluded from queries, verifies **AC-6**

## Build plan

1. Update `apps/backend/prisma/schema.prisma` with core entities, enums, soft delete fields, and indexes, satisfies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-6**
2. Run Prisma schema generation and local migration script, satisfies **AC-7**, **AC-8**
3. Add seed data script for initial test tenant, properties, buildings, units, and users, satisfies **AC-1**, **AC-3**

## Consequences

**Positive**:
- Production ready multi tenant database schema supporting complex property structures.
- Flexible role assignments across multiple properties per user account.
- Dedicated vehicle management for security gate validation.

**Negative / tradeoffs**:
- Soft delete filtering requires query middleware or explicit Prisma extensions.

**Neutral**:
- Auth credentials remain unmodeled in this schema and will be added by future authentication modules.

## Follow-up

- [ ] Execute build plan via `/develop data model`
- [ ] Create Prisma extension for automated `deletedAt` query filtering
