# AGENTS.md

This file describes how agents should work in this repository.
It is intended for automated coding agents and contributors.
Follow the guidance below for commands, style, and conventions.

## Repository Overview

- App: BitScout (Expo + React Native).
- Language: TypeScript (strict mode enabled).
- Primary entry: `index.ts` and `src/app.tsx`.
- API: mempool.space via axios (`src/api`).

## Commands

### Install

- `yarn install`

### Development

- Start Metro dev server: `yarn start`
- iOS device/simulator: `yarn ios`
- Android device/emulator: `yarn android`
- Prebuild native projects: `npx expo prebuild`

### Lint

- `yarn lint`
  - Runs Expo lint (ESLint + Prettier integration).

### Tests

- No test runner configured in `package.json`.
- There are currently no `test` scripts or test folders.
- If tests are added later, document single-test invocation here.

### Builds

- EAS build configuration lives in `eas.json`.
- Typical Expo build flows use `eas build` (not scripted here).

## Environment

- Requires `EXPO_PUBLIC_BASE_URL` set in `.env` for API base URL.
- Keep `.env` files private; never commit secrets.

## Code Style

### Formatting

- Prettier is the default formatter; format-on-save is enabled.
- ESLint uses `eslint-config-expo`, `eslint-plugin-prettier`, and
  `@tanstack/eslint-plugin-query`.
- Prefer running `yarn lint` instead of manual lint invocations.

### TypeScript

- `strict` mode is enabled in `tsconfig.json`.
- Prefer `type` aliases for object/union types.
- Avoid `any`; use narrow, explicit types.
- Prefer `unknown` over `any` when needed, then narrow.
- Avoid non-null assertions unless justified.

### Imports

- Use path alias `@/` for `src/*`.
- Keep imports grouped and ordered:
  1. Side-effect imports (e.g., global styles).
  2. Local alias imports (`@/...`).
  3. External packages.
  4. Relative imports.
- Run organize imports (editor setting is enabled).

### React / React Native

- Use function components and hooks.
- Component names are PascalCase.
- Hooks are `useX`-prefixed and live in `src/hooks`.
- Keep component props in a `Props` type alias.
- Prefer early returns for loading/empty states.

### State Management

- Zustand is used for app state (`src/stores`).
- Keep store state types explicit and minimal.
- Use persisted storage via MMKV where applicable.

### Query / Data

- Use TanStack Query hooks in `src/api/queries.ts`.
- Keep `queryKey` stable and deterministic.
- Use `enabled` to gate queries on missing params.
- Keep API calls in `src/api/endpoints.ts` only.

### Styling

- Tailwind-style class names are used via Uniwind.
- Prefer `className` props; avoid inline styles unless needed.
- Tailwind class name helpers are registered in `.vscode/settings.json`.

### Naming Conventions

- Components: `PascalCase`.
- Hooks: `useCamelCase`.
- Functions/variables: `camelCase`.
- Constants: `UPPER_SNAKE_CASE`.
- Types/interfaces: `PascalCase`.

### Error Handling

- Use `try/catch` for async flows and return safe fallbacks.
- Avoid throwing in UI components; use graceful UI states.
- Log unexpected errors with `console.error` in boundaries.

### Utilities

- Place shared logic in `src/utils/index.ts`.
- Keep utilities pure when possible.
- Avoid side effects in helpers unless they are clearly scoped.

## Files and Structure

- `src/app.tsx`: app bootstrap and providers.
- `src/components`: UI components.
- `src/screens`: screen-level components.
- `src/hooks`: reusable hooks.
- `src/api`: API endpoints and query hooks.
- `src/stores`: Zustand stores.
- `src/types`: TypeScript types.
- `src/utils`: shared utility functions.

## Lint/Format Notes

- `eslint-config-prettier` disables conflicting stylistic rules.
- `eslint-plugin-prettier` reports formatting issues as lint errors.
- TypeScript ESLint rule `no-empty-object-type` is disabled.

## Editor Expectations

- Prettier is set as the default formatter.
- Format on save is enabled.
- Code actions on save are explicit (fixAll/organizeImports).

## Contribution Guidelines

- Keep changes minimal and focused.
- Update types and usage together.
- Prefer descriptive names over abbreviations.
- Avoid adding new dependencies without justification.
- Do not add inline comments unless requested.
- Do not introduce one-letter variable names.

## Notes for Agents

- No Cursor or Copilot rules were found in this repo.
- If new rules are added under `.cursor/` or `.github/`,
  update this file accordingly.
- Keep this file up to date with new scripts or tooling changes.
