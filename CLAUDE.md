# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project overview

`badbug` is Alex "Frost"'s personal portfolio / entertainment site (brand: "badbug Entertainment").
Stack: Vue 3 (Composition API), Vite, vue-router 5, Sass.

## Structure

- `src/main.js` — app entry, mounts `App.vue` with the router.
- `src/router/index.js` — route definitions (Home, About, Portfolio, Contacts).
- `src/App.vue` — root layout (Header + `router-view` + footer).
- `src/components/Header.vue` — nav header.
- `src/views/<Name>View/<Name>View.vue` — one folder per page.
- `src/assets/css/` — global Sass (`reset.scss`, `style.scss`).
- `src/assets/img/` — images.

## Commands

- `npm install`
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview a production build
- `npm run lint` — ESLint with `--fix` (flat config in `eslint.config.js`)

## Conventions

- Composition API only — use `<script setup>`. Do not introduce Options API
  (`export default { data() {...} }`) in new or edited components.
- Omit `<script>` entirely from a `.vue` file if the component has no logic.
- ESLint flat config: single quotes, 4-space indent, required semicolons,
  `no-console` allowed. Keep new rules/style additions in `eslint.config.js`
  consistent with the existing rule block rather than adding a second config file.
- Page copy (About, Home) is intentionally playful/self-deprecating — don't
  "clean up" or neutralize the tone when editing content unless asked to.
- Reuse the existing `.tab` / `h1.title` markup pattern (see `style.scss`) for
  new pages instead of introducing new top-level layout classes.

## Notes

- `vue-router` is on v5 and `vite` on v8 (bumped together — v5 of vue-router
  requires vite ^7 or ^8 as an optional peer).
- `npm install` prints `EBADENGINE` warnings for a transitive `@babel/*`
  dependency wanting Node 22+; this is non-blocking on Node 20.20.2 and does
  not indicate a broken install.
