# Besporman

Portfolio and client intake website for Besporman, a freelance software development team based in Iran focusing on website development, Telegram bots, and Windows desktop tools.

<p align="center">
  <img src="pic/home.png" alt="Besporman preview" width="100%">
</p>

## Overview

The site is built with Vue 3 and TypeScript, designed with an authentic paper-and-ink aesthetic. It presents the team's services, portfolio projects, and direct contact options with full RTL support and custom typography.

## Tech stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Vue Router 4
- Vanilla CSS with custom design tokens

## Getting started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

## Knowledge Graph (`graphify-out/`)

The repository includes a persistent architectural knowledge graph for token-efficient agent navigation and codebase comprehension:
- **Interactive Visualizer:** Open [`graphify-out/graph.html`](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/graphify-out/graph.html) directly in any browser.
- **Audit Report:** Read [`graphify-out/GRAPH_REPORT.md`](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/graphify-out/GRAPH_REPORT.md) for community clusters, god nodes, and cross-cutting connections.
- **Wiki Navigation:** Browse [`graphify-out/wiki/index.md`](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/graphify-out/wiki/index.md) for fast, low-token exploration.
- **Query & Update:**
  ```bash
  graphify query "<question>"     # Query graph without reading entire codebase
  graphify path "<A>" "<B>"       # Find shortest relationship path between symbols
  graphify update .               # Incrementally update graph after major diffs
  ```

