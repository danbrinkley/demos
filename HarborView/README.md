# Harbor View Workspace

The Week 1 build of Harbor View Workspace — the staff-facing digital workplace for
Harbor Community Services (a fictional nonprofit). This build implements the
Workspace Home screen per `harbor-view-build-brief-001.md`.

## Stack

Vite + React + TypeScript, plain CSS with design tokens, React Router, and
Vitest + React Testing Library. No component library, no state-management
library, no backend — all data is deterministic local sample data behind a
small adapter layer (see `src/data/adapters.ts`).

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Type-check (`tsc -b`) and produce a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run oxlint |
| `npm run test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |

## Project structure

```
src/
  data/         Normalized types, deterministic sample data, selectors, and the adapter layer
  state/        WorkspaceDataContext — the single source of truth for work-item state
  components/
    common/     Reusable primitives (StatusIndicator, EmptyState, IconButton, LiveRegion)
    shell/      The Harbor View application shell (nav, search, alert, notifications, account)
  features/
    home/       Workspace Home — greeting, What needs you, Needs your attention, This week
  routes/       Resources and News placeholders
```
