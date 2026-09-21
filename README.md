# Oompa Loompa's Crew

Front-End Developer technical test for Napptilus Tech Labs. A Single Page
Application to list and inspect Willy Wonka's Oompa Loompa workers, built
with React, Redux Toolkit and React Router.

## Tech stack

- **React 19** + **Vite** — UI and dev/build tooling.
- **React Router** — client-side routing (`/` and `/{id}`), no full page
  reloads.
- **Redux Toolkit** — global state, async data fetching (`createAsyncThunk`)
  and a 1-day cache rule enforced via each thunk's `condition` option.
- **Tailwind CSS 3** — styling.
- Native `fetch` — no HTTP client dependency.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node)

## Getting started

```bash
git clone https://github.com/edu444477/frontend-developer-test.git
cd frontend-developer-test
npm install
npm run dev
```

The app runs at `http://localhost:5173`. It talks directly to Napptilus's
public API, so no backend or environment variables are needed.

## Available scripts

| Command           | Description                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Starts the Vite dev server with HMR.      |
| `npm run build`    | Type-checks nothing (plain JS) and builds a production bundle into `dist/`. |
| `npm run preview`  | Serves the production build locally.      |
| `npm run lint`     | Runs `oxlint` over the codebase.          |

## Project structure

```
src/
  components/   Reusable UI pieces (Header, SearchBar, OompaLoompaCard)
  views/        Route-level pages (MainView at "/", DetailView at "/:id")
  store/        Redux Toolkit store, the oompaLoompas slice, and the
                localStorage persistence used for the 1-day cache
  services/     API access layer (fetch calls + response normalization)
  utils/        Small helpers shared by more than one view/component
```

## Key technical decisions

- **1-day cache, enforced at the store level.** Each `createAsyncThunk`
  (list and detail) has a `condition` function that skips the request
  entirely if the relevant data was already fetched less than a day ago.
  The Redux store is persisted to `localStorage` on every change (and
  read back as `preloadedState` on boot) so this rule survives page
  reloads, not just the current tab session.
- **Infinite scroll via `IntersectionObserver`**, with the render position
  (how many items are shown) kept separate from the fetch position (how
  many pages have been downloaded). A fresh visit always starts by
  showing one page's worth of items and reveals more as the user scrolls,
  even if the full list is already cached from a previous visit.
- **Filtering is entirely client-side**, over whatever has already been
  downloaded, and never triggers a network request — per the test's
  spec. Infinite scroll is paused while a filter is active.
- **`dangerouslySetInnerHTML`** is used for the detail description, since
  some entries contain real HTML that must render interpreted, not
  escaped. This is safe here because the HTML comes from Napptilus's own
  trusted API, not from user input.
