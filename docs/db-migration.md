# Migration Guide: Feature-Local Types and Data Shapes

## Purpose
This repo is moving from a central `src/types/dbTables.types.ts` model to feature-local types and shapes.

Goal:
- Keep type ownership near the feature that uses it.
- Reduce drift between API data, mappers, and UI props.
- Make refactors safer by shrinking blast radius.

## Source of Truth Rule
- DB-generated types remain in `src/types/database.types.ts`.
- Feature/domain types must live in `src/features/<domain>/<feature>/types/*`.
- UI components and queries should import from feature modules, not from `src/types/dbTables.types.ts`.

## Target Folder Pattern
For each feature:

```txt
src/features/<domain>/<feature>/
  api/
    <feature>.api.ts
  mappers/
    <feature>.mapper.ts
  schemas/
    <feature>.schema.ts
  types/
    models.ts
  index.ts
```

Examples already migrated:
- `src/features/vault/myProfile`
- `src/features/vault/myPlaces`
- `src/features/vault/myCircle`
- `src/features/shops`, `watchlist`, `myProducts`, `orders`, `offers`

## Import Rules
- Allowed in app/components/lib wrappers:
  - `@/src/features/...` (preferred)
  - `@/lib/protected/queries/...` wrappers for compatibility
- Avoid new imports from:
  - `@/src/types/dbTables.types`

## Data Flow Contract
1. API layer reads raw DB/RPC data.
2. Mapper layer converts to feature model types.
3. Components consume only feature model types.
4. Page-level ad hoc shapes should be replaced with typed feature models or explicit view-models.

## Compatibility Layer Strategy
During migration only:
- Legacy query files may re-export feature modules.
- Central types may temporarily re-export feature types.

After migration completion:
- Remove temporary re-exports.
- Keep `dbTables.types.ts` limited to shopping transitional types or remove fully.

## Naming Conventions
- Use `myProfile`, `myPlaces`, `myCircle` for vault feature names.
- Keep file names focused and explicit:
  - `models.ts` for domain models
  - `*.api.ts` for RPC/data access
  - `*.mapper.ts` for transformation logic

## Type Safety Rules
- Do not add `any` to feature models.
- Prefer narrow unions (`"Home" | "Work" | ...`) and explicit optional fields.
- Avoid index signatures like `[key: string]: any` unless absolutely unavoidable.

## Route/Page Documentation Guidance
Do not create Markdown files for every route by default.

Use docs where they provide leverage:
- Create one `README.md` per feature domain when workflows are non-trivial.
  - Example: `src/features/vault/README.md`
- Add route-level `README.md` only for complex pages with unusual orchestration.
- Keep simple routes self-documented with clear component and type names.

## PR Checklist for New/Migrated Features
- [ ] Types live under feature `types/`.
- [ ] API functions typed with feature models.
- [ ] UI props avoid `any`.
- [ ] No new imports from `src/types/dbTables.types.ts`.
- [ ] `npx tsc --noEmit` passes.
- [ ] Targeted eslint passes for touched files.
