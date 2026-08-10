# badbug

Personal portfolio site for Alex "Frost" (badbug Entertainment) — a web developer with
~15 years of experience in JS and front-end work.

Built with Vue 3 (Composition API, `<script setup>`), Vite, vue-router, and Sass.

## Pages

- **Home** — welcome page with a short, tongue-in-cheek intro and a rundown of the stack.
- **About** — bio and a long list of personal facts/trivia.
- **Portfolio** — links to past projects and demos (animations, mini apps, client sites).
- **Contacts** — how to get in touch.

## Project structure

```
src/
  App.vue              root layout (Header + router-view + footer)
  main.js              app entry point
  router/index.js       route definitions
  components/Header.vue nav header
  views/<Name>View/      one folder per page
  assets/css/           global Sass (reset.scss, style.scss)
  assets/img/           images
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
