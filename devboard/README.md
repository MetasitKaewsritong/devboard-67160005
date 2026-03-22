# DevBoard

DevBoard is a React + Vite single-page app built across 4 progressive tasks:

- Task 1: Components, props, list rendering
- Task 2: State, events, search, favorites, add post form
- Task 3: API integration with loading/error handling
- Task 4: Multi-page routing with React Router + favorites via Context + Vercel deploy

## Tech Stack

- React 19
- Vite 5
- React Router DOM 6
- JSONPlaceholder API

## Run Locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Build / Lint

```bash
npm run build
npm run lint
```

## Routes

- `/` Home page (posts + add post form)
- `/posts/:id` Post detail page
- `/profile` Members page
- `/favorites` Favorite posts page

## Deployment Note (Vercel SPA Routing)

This project includes Vercel rewrites so direct URL access (for example `/profile`) resolves to `index.html`, then React Router handles the page route.
