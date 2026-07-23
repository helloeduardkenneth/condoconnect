# Scope: CondoConnect

CondoConnect is a production grade community management platform for condominiums, villages, and gated communities serving residents, property administrators, and security guards.

**Build approach:** Tracer Bullet (Build end to end working vertical slices through database, backend API, and mobile UI for each feature).
**Workflow:** Full (After development, run check verify, test suite, second model code review, and document creation).

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | in-progress |
| 2 | Coding standards & tooling | Foundation | planned |
| 3 | Data model | Foundation | planned |
| 4 | Design system & UI foundation | Foundation | planned |
| 5 | Multi tenant authentication & core access loop | Slice 1 | planned |
| 6 | Gate pass & visitor management | Slice 2 | planned |
| 7 | Maintenance requests & work orders | Slice 3 | planned |
| 8 | Amenity & facility booking | Slice 4 | planned |
| 9 | Community announcements & bulletin board | Slice 5 | planned |

## Foundations

### 1. Stack & architecture · in-progress
Decide the technology stack and scaffold a runnable monorepo with mobile app and backend service so every later slice builds on real structure.
**Done when:** the stack is recorded in a spec and the empty scaffold boots locally and passes build.
- [x] Decide the stack (spec): `/architect stack & architecture`
- [x] Scaffold from the decision: `/develop stack & architecture`
- [ ] Smoke check it runs: `/test`
Spec 0001 · code in `./`

### 2. Coding standards & tooling · in-progress
Capture project conventions, then install lint, format, and type check enforcement from the real scaffolded project.
**Done when:** root `AGENTS.md` reflects the real stack, and linting and formatting check run clean.
- [x] Capture conventions + tooling choices: `/audit`
- [ ] Install the tooling: `/develop tooling`
- [ ] Check it runs clean: `/test`

### 3. Data model · needs a decision
Core multi tenant entities every feature builds on including tenants, properties, units, residents, staff, and access permissions.
**Done when:** database schema and relationships support multi tenant isolation and core operations without a breaking migration.
- [ ] Design it (spec): `/architect data model`

### 4. Design system & UI foundation · needs a decision
Visual language, layout primitives, and base components so mobile screens for residents, admins, and security guards feel cohesive and accessible.
**Done when:** `design.md` covers typography, colors, spacing, and base mobile components handle touch targets and focus states cleanly.
- [ ] Design it (spec): `/architect design system & UI foundation`

## Slice 1: Core access loop

### 5. Multi tenant authentication & core access loop · needs a decision
User registration and authentication supporting email, phone OTP, social login, biometrics, and passkeys with role based access control across properties. This slice is the walking skeleton.
**Done when:** a user can authenticate, join or manage a property tenant, and view their role specific home dashboard.
- [ ] Design it (spec): `/architect multi tenant authentication & core access loop`

## Slice 2: Visitor access

### 6. Gate pass & visitor management · needs a decision
Residents generate digital visitor passes with QR codes, and security guards scan passes at the gate to validate guest entry in real time.
**Done when:** residents can create passes, guards can scan and verify QR codes at the gate, and entry logs record arrival times.
- [ ] Design it (spec): `/architect gate pass & visitor management`

## Slice 3: Maintenance

### 7. Maintenance requests & work orders · needs a decision
Residents report unit or common area issues with photo attachments, and property admins assign work orders to staff for resolution.
**Done when:** residents submit issues with photos, admins assign work orders, and status updates notify residents upon completion.
- [ ] Design it (spec): `/architect maintenance requests & work orders`

## Slice 4: Facility booking

### 8. Amenity & facility booking · needs a decision
Residents browse community amenities like clubhouses or sports courts, view available time slots, and reserve bookings.
**Done when:** residents select time slots to reserve amenities and property admins view or manage booking schedules.
- [ ] Design it (spec): `/architect amenity & facility booking`

## Slice 5: Announcements

### 9. Community announcements & bulletin board · needs a decision
Property administrators broadcast official notices and emergency alerts to residents with target property scoping.
**Done when:** admins publish announcements, residents receive push notifications, and notices display in the community feed.
- [ ] Design it (spec): `/architect community announcements & bulletin board`

## Deferred
Out of scope for the current build pass, kept so the plan stays honest.
- **Community billing & dues payment**: billing statement generation, payment gateway integration, and receipt history · needs a decision
- **Resident directory & community chat**: opt in resident directory and neighbor messaging · needs a decision
- **Vehicle registration & parking management**: resident vehicle tags and visitor parking slot allocation · needs a decision
- **Package & delivery logging**: security guard package receipt logging and resident pickup notifications · needs a decision

## Legend

**The decision box.** Every feature carries exactly one, the sub task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <feature>` |
| `in-progress` (designed) | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones rolled up from the spec**; `Verify it` + `Test it` boxes; any surfaced follow up enrolled |
| `in-progress` (building) | `/develop` | milestone sub boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | the tier's last required stage (`Vibe` → `/develop`; `Lean` → `/check verify`; `Medium`/`Full` → `/test`), then `/sync` | the tier's required boxes ticked; `/sync` captures the slice's conventions into `AGENTS.md` |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre workflow) and `dropped` (de scoped, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Workflow tier tag** beside a heading (e.g. `· Full`, `· Vibe`) overrides the project default `**Workflow:**` tier for that one feature; no tag = inherit. It is the single rigor dial (there is no separate "weight").
- **Workflow** (header line) is the project default tier, the stages each feature runs **after** `/develop`: **Vibe** = nothing after `/develop` (rely on its build time self check); **Lean** = `/check verify`; **Medium** = `/check verify` then `/test`; **Full** = `/check verify`, `/test`, a fresh model `/check review`, then `/document` (and most features need a spec). The tier also sets what closes a feature to `done`, the last required stage marks it: **Vibe** → `/develop` (build + self check); **Lean** → `/check verify` on PASS; **Medium**/**Full** → `/test` (with verify passed). At every tier an `Assumed` spec still blocks `done` until `/architect` ratifies it, and `/architect` still gates any feature that needs a decision (tier does not turn the gate off). A feature's own tier tag overrides this default. `/develop` reads the effective tier to scale the next steps it recommends.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.
