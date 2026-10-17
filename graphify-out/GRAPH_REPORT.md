# Graph Report - besporman  (2026-10-17)

## Corpus Check
- 37 files · ~602,117 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 219 nodes · 248 edges · 18 communities (16 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `83969317`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ProjectDetailView.vue
- ContactSection.vue
- TheHeader.vue
- MarqueeBanner.vue
- compilerOptions
- devDependencies
- package.json
- HomeView.vue
- compilerOptions
- include
- vite-env.d.ts
- Anti-AI-Slop & Authentic Paper Brand Identity
- Besporman — Agent Rules (GEMINI.md)
- Besporman — Agent Instructions (Agent.md)
- CustomCursor.vue
- App.vue

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `compilerOptions` - 7 edges
3. `include` - 6 edges
4. `scripts` - 5 edges
5. `updateMascotPosition()` - 5 edges
6. `router` - 5 edges
7. `ContactSubmissionAdapter` - 5 edges
8. `Besporman — Agent Rules (GEMINI.md)` - 5 edges
9. `closeMobileMenu()` - 4 edges
10. `projectsData` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Telegram Bot Contact Form Webhook Architecture` --references--> `ContactSubmissionAdapter`  [EXTRACTED]
  backend_tasks_2026-10-17.md → src/services/contactAdapter.ts
- `Frontend/Backend ContactSubmissionAdapter Boundary` --references--> `handleSubmit()`  [EXTRACTED]
  AGENTS.md → src/components/ContactSection.vue
- `Mascot & Brand Visual Asset Preservation` --references--> `currentPose`  [EXTRACTED]
  AGENTS.md → src/components/HeroSection.vue
- `Besporman Portfolio & Services Overview` --references--> `projectsData`  [EXTRACTED]
  README.md → src/data/projects.ts
- `Vue 3 Composition API & Strict TypeScript Standards` --references--> `router`  [EXTRACTED]
  AGENTS.md → src/router/index.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Decoupled Contact Form Submission Flow** — src_components_contactsection_handlesubmit, src_services_contactadapter_contactsubmissionadapter, src_services_contactadapter_developmentcontactadapter, agents_md_contact_adapter_boundary, backend_tasks_md_telegram_bot_spec [EXTRACTED 1.00]
- **Parchment & Paper Brand Identity Pipeline** — design_system_md_tokens_palette, design_system_md_vazirmatn_typography, design_system_md_double_bezel_cards, design_system_md_eight_interactive_states, design_system_md_anti_slop_gates, src_app [EXTRACTED 1.00]

## Communities (18 total, 2 thin omitted)

### Community 0 - "ProjectDetailView.vue"
Cohesion: 0.11
Nodes (17): Besporman Portfolio & Services Overview, activeCategory, categories, featuredProject, filteredProjectsCount, filteredSecondaryProjects, projectsData, ProjectCategory (+9 more)

### Community 1 - "ContactSection.vue"
Cohesion: 0.13
Nodes (16): Frontend/Backend ContactSubmissionAdapter Boundary, Telegram Bot Contact Form Webhook Architecture, 8-State Interactive Element Matrix, errors, FeedbackState, form, FormErrors, handleSubmit() (+8 more)

### Community 2 - "TheHeader.vue"
Cohesion: 0.10
Nodes (21): activeTab, closeMobileMenu(), handleKeyDown(), handleMobileNavClick(), handleMouseEnter(), handleMouseLeave(), handleNavClick(), handleOutsideClick() (+13 more)

### Community 3 - "MarqueeBanner.vue"
Cohesion: 0.10
Nodes (17): ALL_REVIEWS, BUBBLE_THEMES, generateRandomReviewList(), getRandomRating(), isHovered, measureTile(), ReviewItem, reviewList (+9 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): DOM, DOM.Iterable, ESNext, compilerOptions, baseUrl, esModuleInterop, isolatedModules, jsx (+10 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): jsdom, devDependencies, jsdom, typescript, vite, @vitejs/plugin-vue, vitest, @vue/test-utils (+7 more)

### Community 6 - "package.json"
Cohesion: 0.13
Nodes (14): dependencies, vue, vue-router, name, private, scripts, build, dev (+6 more)

### Community 7 - "HomeView.vue"
Cohesion: 0.20
Nodes (5): Mascot & Brand Visual Asset Preservation, Double-Bezel Machined Card Architecture, Parchment & Iron Charcoal Design Palette, currentPose, router

### Community 8 - "compilerOptions"
Cohesion: 0.18
Nodes (10): vite.config.ts, vitest.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck (+2 more)

### Community 9 - "include"
Cohesion: 0.25
Nodes (7): src/**/*.d.ts, src/**/*.ts, src/**/*.tsx, src/**/*.vue, tests/**/*.ts, include, references

### Community 14 - "Besporman — Agent Rules (GEMINI.md)"
Cohesion: 0.33
Nodes (5): Active Skills & Rules Mandate, Besporman — Agent Rules (GEMINI.md), Engineering Standards, graphify, Knowledge Graph & Token Conservation (`/graphify`)

### Community 15 - "Besporman — Agent Instructions (Agent.md)"
Cohesion: 0.40
Nodes (4): 1. Single Source of Truth Notice, 2. Core Non-Negotiable Rules Summary, Besporman — Agent Instructions (Agent.md), graphify

### Community 16 - "CustomCursor.vue"
Cohesion: 0.12
Nodes (11): bursts, checkTargetState(), ComicBurst, cursorContainerRef, handlePointerMove(), isInteractive, isPressed, isSupported (+3 more)

### Community 17 - "App.vue"
Cohesion: 0.21
Nodes (7): Vue 3 Composition API & Strict TypeScript Standards, Persian RTL First-Class & CSS Logical Properties, 10 Mandatory Active Engineering Skills, Persian Vazirmatn & Lalezar Typography Rules, HTML5 RTL Document Entrypoint & SEO Meta, app, router

## Knowledge Gaps
- **111 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `8-State Interactive Element Matrix` connect `ContactSection.vue` to `TheHeader.vue`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `Parchment & Iron Charcoal Design Palette` connect `HomeView.vue` to `App.vue`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `router` connect `App.vue` to `ProjectDetailView.vue`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ProjectDetailView.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.11231884057971014 - nodes in this community are weakly interconnected._
- **Should `ContactSection.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._
- **Should `TheHeader.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.10333333333333333 - nodes in this community are weakly interconnected._