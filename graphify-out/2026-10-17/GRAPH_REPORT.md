# Graph Report - besporman  (2026-10-17)

## Corpus Check
- 63 files · ~406,282 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 166 nodes · 187 edges · 14 communities (12 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Portfolio & Project Showcase
- Contact Form & Submission Adapter
- App Shell & Persian Layout
- Social Proof & Dynamic Ratings
- TypeScript App Configuration
- Build & Testing Toolchain
- Project Metadata & Scripts
- Homepage Narrative & Brand Mascot
- Vite & Node Build Config
- TypeScript Project References
- Vite Environment Definitions
- Design System Brand Safeguards

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `compilerOptions` - 7 edges
3. `include` - 6 edges
4. `scripts` - 5 edges
5. `router` - 5 edges
6. `ContactSubmissionAdapter` - 5 edges
7. `projectsData` - 4 edges
8. `DevelopmentContactAdapter` - 4 edges
9. `lib` - 4 edges
10. `Frontend/Backend ContactSubmissionAdapter Boundary` - 4 edges

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

## Communities (14 total, 2 thin omitted)

### Community 0 - "Portfolio & Project Showcase"
Cohesion: 0.11
Nodes (17): Besporman Portfolio & Services Overview, activeCategory, categories, featuredProject, filteredProjectsCount, filteredSecondaryProjects, projectsData, ProjectCategory (+9 more)

### Community 1 - "Contact Form & Submission Adapter"
Cohesion: 0.14
Nodes (15): Frontend/Backend ContactSubmissionAdapter Boundary, Telegram Bot Contact Form Webhook Architecture, errors, FeedbackState, form, FormErrors, handleSubmit(), isLoading (+7 more)

### Community 2 - "App Shell & Persian Layout"
Cohesion: 0.13
Nodes (10): Vue 3 Composition API & Strict TypeScript Standards, Persian RTL First-Class & CSS Logical Properties, 10 Mandatory Active Engineering Skills, 8-State Interactive Element Matrix, Persian Vazirmatn & Lalezar Typography Rules, HTML5 RTL Document Entrypoint & SEO Meta, isMobileMenuOpen, isScrolled (+2 more)

### Community 3 - "Social Proof & Dynamic Ratings"
Cohesion: 0.12
Nodes (13): getRandomRating(), initialReviews, isHovered, measureTile(), ReviewItem, reviewList, tileRefA, trackRef (+5 more)

### Community 4 - "TypeScript App Configuration"
Cohesion: 0.11
Nodes (18): DOM, DOM.Iterable, ESNext, compilerOptions, baseUrl, esModuleInterop, isolatedModules, jsx (+10 more)

### Community 5 - "Build & Testing Toolchain"
Cohesion: 0.13
Nodes (15): jsdom, devDependencies, jsdom, typescript, vite, @vitejs/plugin-vue, vitest, @vue/test-utils (+7 more)

### Community 6 - "Project Metadata & Scripts"
Cohesion: 0.13
Nodes (14): dependencies, vue, vue-router, name, private, scripts, build, dev (+6 more)

### Community 7 - "Homepage Narrative & Brand Mascot"
Cohesion: 0.20
Nodes (5): Mascot & Brand Visual Asset Preservation, Double-Bezel Machined Card Architecture, Parchment & Iron Charcoal Design Palette, currentPose, router

### Community 8 - "Vite & Node Build Config"
Cohesion: 0.18
Nodes (10): vite.config.ts, vitest.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck (+2 more)

### Community 9 - "TypeScript Project References"
Cohesion: 0.25
Nodes (7): src/**/*.d.ts, src/**/*.ts, src/**/*.tsx, src/**/*.vue, tests/**/*.ts, include, references

## Knowledge Gaps
- **83 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+78 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `8-State Interactive Element Matrix` connect `App Shell & Persian Layout` to `Contact Form & Submission Adapter`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Build & Testing Toolchain` to `Project Metadata & Scripts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `TypeScript App Configuration` to `TypeScript Project References`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _83 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio & Project Showcase` be split into smaller, more focused modules?**
  _Cohesion score 0.11231884057971014 - nodes in this community are weakly interconnected._
- **Should `Contact Form & Submission Adapter` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._
- **Should `App Shell & Persian Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.12631578947368421 - nodes in this community are weakly interconnected._