# Graph Report - besporman  (2026-10-22)

## Corpus Check
- 53 files · ~826,335 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 351 nodes · 421 edges · 22 communities (19 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f61432da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ProjectDetailView.vue
- ContactSection.vue
- TheHeader.vue
- MarqueeBanner.vue
- compilerOptions
- devDependencies
- LazySection.vue
- Changelog
- compilerOptions
- ui/TextReveal.vue
- vite-env.d.ts
- Anti-AI-Slop & Authentic Paper Brand Identity
- Besporman — Agent Rules (GEMINI.md)
- Besporman — Agent Instructions (Agent.md)
- CustomCursor.vue
- App.vue
- text-reveal.tsx
- AppLoadingScreen.vue
- liquid-loader-demo.tsx

## God Nodes (most connected - your core abstractions)
1. `Changelog` - 20 edges
2. `compilerOptions` - 15 edges
3. `updateMascotPosition()` - 8 edges
4. `useScrollReveal()` - 8 edges
5. `compilerOptions` - 7 edges
6. `Besporman — Agent Rules (GEMINI.md)` - 7 edges
7. `scripts` - 5 edges
8. `router` - 5 edges
9. `ContactSubmissionAdapter` - 5 edges
10. `include` - 5 edges

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

## Communities (22 total, 3 thin omitted)

### Community 0 - "ProjectDetailView.vue"
Cohesion: 0.15
Nodes (12): Besporman Portfolio & Services Overview, projectsData, ProjectCategory, ProjectItem, ProjectStatus, categoryLabel, currentIndex, formattedParagraphs (+4 more)

### Community 1 - "ContactSection.vue"
Cohesion: 0.13
Nodes (16): Frontend/Backend ContactSubmissionAdapter Boundary, Telegram Bot Contact Form Webhook Architecture, 8-State Interactive Element Matrix, errors, FeedbackState, form, FormErrors, handleSubmit() (+8 more)

### Community 2 - "TheHeader.vue"
Cohesion: 0.08
Nodes (29): activeTab, brandTextRef, closeMobileMenu(), handleBrandClick(), handleBrandLeave(), handleKeyDown(), handleMobileNavClick(), handleMouseEnter() (+21 more)

### Community 3 - "MarqueeBanner.vue"
Cohesion: 0.07
Nodes (28): ALL_REVIEWS, BUBBLE_THEMES, generateRandomReviewList(), getRandomRating(), handleDoubleClick(), handleMouseDown(), handleTouchEnd(), handleTouchMove() (+20 more)

### Community 4 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ESNext, src/components/ui/*.tsx, src/**/*.d.ts, src/**/*.ts, src/**/*.vue, tests/**/*.ts (+18 more)

### Community 5 - "devDependencies"
Cohesion: 0.07
Nodes (29): jsdom, dependencies, vue, vue-router, devDependencies, jsdom, typescript, vite (+21 more)

### Community 6 - "LazySection.vue"
Cohesion: 0.25
Nodes (5): Props, route, shouldRender, wrapperRef, Props

### Community 7 - "Changelog"
Cohesion: 0.04
Nodes (45): [1.0.0] - 2026-10-17, [2.0.0] - 2026-10-17, [2.1.0] - 2026-10-17, [2.1.1] - 2026-10-17, [2.2.0] - 2026-10-17, [2.3.0] - 2026-10-17, [2.3.1] - 2026-10-18, [2.3.2] - 2026-10-18 (+37 more)

### Community 8 - "compilerOptions"
Cohesion: 0.18
Nodes (10): vite.config.ts, vitest.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck (+2 more)

### Community 9 - "ui/TextReveal.vue"
Cohesion: 0.11
Nodes (17): Mascot & Brand Visual Asset Preservation, Double-Bezel Machined Card Architecture, currentPose, featuredProject, filteredSecondaryProjects, computedRootStyle, containerRef, duration (+9 more)

### Community 14 - "Besporman — Agent Rules (GEMINI.md)"
Cohesion: 0.25
Nodes (7): Active Skills & Rules Mandate, Besporman — Agent Rules (GEMINI.md), Engineering Standards, Git Push & Branch Governance, graphify, Knowledge Graph & Token Conservation (`/graphify`), Version Management Protocol (SemVer)

### Community 15 - "Besporman — Agent Instructions (Agent.md)"
Cohesion: 0.40
Nodes (4): 1. Single Source of Truth Notice, 2. Core Non-Negotiable Rules Summary, Besporman — Agent Instructions (Agent.md), graphify

### Community 16 - "CustomCursor.vue"
Cohesion: 0.12
Nodes (11): bursts, checkTargetState(), ComicBurst, cursorContainerRef, handlePointerMove(), isInteractive, isPressed, isSupported (+3 more)

### Community 17 - "App.vue"
Cohesion: 0.12
Nodes (11): Vue 3 Composition API & Strict TypeScript Standards, Persian RTL First-Class & CSS Logical Properties, 10 Mandatory Active Engineering Skills, Parchment & Iron Charcoal Design Palette, Persian Vazirmatn & Lalezar Typography Rules, HTML5 RTL Document Entrypoint & SEO Meta, footerNavItems, route (+3 more)

### Community 18 - "text-reveal.tsx"
Cohesion: 0.18
Nodes (9): defaultContainerVariants, defaultItemVariants, defaultStaggerTimes, presetVariants, splitText(), TextReveal(), TextRevealPer, TextRevealPreset (+1 more)

### Community 19 - "AppLoadingScreen.vue"
Cohesion: 0.14
Nodes (13): areTopElementsLoaded(), ensureFontsLoaded(), isExiting, isFontReady, isImageLoaded(), isVisible, waitForReadiness(), brandPalettes (+5 more)

## Knowledge Gaps
- **178 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+173 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Parchment & Iron Charcoal Design Palette` connect `App.vue` to `ui/TextReveal.vue`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `8-State Interactive Element Matrix` connect `ContactSection.vue` to `TheHeader.vue`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `useScrollReveal()` connect `ui/TextReveal.vue` to `ContactSection.vue`, `MarqueeBanner.vue`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _178 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ContactSection.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._
- **Should `TheHeader.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._
- **Should `MarqueeBanner.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._