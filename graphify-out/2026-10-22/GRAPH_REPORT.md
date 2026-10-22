# Graph Report - besporman  (2026-10-22)

## Corpus Check
- 61 files · ~857,662 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 457 nodes · 539 edges · 48 communities (29 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ae7f71a6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- EyeTracking.vue
- ContactSection.vue
- TheHeader.vue
- MarqueeBanner.vue
- compilerOptions
- devDependencies
- FlickeringText.vue
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
- ModernLoader.vue
- liquid-loader-demo.tsx
- TypingEffect.vue
- typing-effect.tsx
- eye-tracking.tsx
- [2.1.0] - 2026-10-17
- modern-loader.tsx
- [2.0.0] - 2026-10-17
- [2.5.4] - 2026-10-19
- [2.5.5] - 2026-10-22
- [2.6.0] - 2026-10-22
- [2.8.0] - 2026-10-22
- flickering-text.tsx
- [2.1.1] - 2026-10-17
- [2.2.0] - 2026-10-17
- [2.3.0] - 2026-10-17
- [2.3.1] - 2026-10-18
- LazySection.vue
- [2.3.2] - 2026-10-18
- [2.4.0] - 2026-10-18
- [2.3.3] - 2026-10-18
- [2.5.3] - 2026-10-19
- [2.5.1] - 2026-10-19
- [2.7.0] - 2026-10-22
- [2.8.1] - 2026-10-22
- [2.4.2] - 2026-10-18
- [2.8.2] - 2026-10-22
- [2.5.2] - 2026-10-19

## God Nodes (most connected - your core abstractions)
1. `Changelog` - 25 edges
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

## Communities (48 total, 19 thin omitted)

### Community 0 - "EyeTracking.vue"
Cohesion: 0.10
Nodes (13): blinkTimers, eyeElements, EyeOffset, eyeOffsets, eyeStyle, irisSize, isBlinking, maxOffset (+5 more)

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

### Community 6 - "FlickeringText.vue"
Cohesion: 0.19
Nodes (11): charElements, FlickeringTextProps, generateGlowShadow(), GLOW_LAYERS, noiseAt(), props, randomAt(), rootRef (+3 more)

### Community 7 - "Changelog"
Cohesion: 0.20
Nodes (9): [1.0.0] - 2026-10-17, [2.4.1] - 2026-10-18, [2.5.0] - 2026-10-18, [2.8.3] - 2026-10-22, Added, Added, Changed, Changelog (+1 more)

### Community 8 - "compilerOptions"
Cohesion: 0.18
Nodes (10): vite.config.ts, vitest.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck (+2 more)

### Community 9 - "ui/TextReveal.vue"
Cohesion: 0.07
Nodes (29): Mascot & Brand Visual Asset Preservation, Double-Bezel Machined Card Architecture, Besporman Portfolio & Services Overview, currentPose, featuredProject, filteredSecondaryProjects, computedRootStyle, containerRef (+21 more)

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

### Community 19 - "ModernLoader.vue"
Cohesion: 0.06
Nodes (30): areTopElementsLoaded(), ensureFontsLoaded(), isExiting, isFontReady, isImageLoaded(), isVisible, waitForReadiness(), brandPalettes (+22 more)

### Community 22 - "TypingEffect.vue"
Cohesion: 0.12
Nodes (18): canvasRef, charIndex, clearTimers(), currentText, currentTextIndex, displayedText, isDissolving, isInView (+10 more)

### Community 23 - "typing-effect.tsx"
Cohesion: 0.50
Nodes (4): cn(), DEMO, TypingEffect(), TypingEffectProps

### Community 25 - "[2.1.0] - 2026-10-17"
Cohesion: 0.50
Nodes (4): [2.1.0] - 2026-10-17, Added, Changed, Fixed

### Community 27 - "[2.0.0] - 2026-10-17"
Cohesion: 0.67
Nodes (3): [2.0.0] - 2026-10-17, Added, Changed

### Community 28 - "[2.5.4] - 2026-10-19"
Cohesion: 0.67
Nodes (3): [2.5.4] - 2026-10-19, Added, Removed

### Community 29 - "[2.5.5] - 2026-10-22"
Cohesion: 0.67
Nodes (3): [2.5.5] - 2026-10-22, Added, Changed

### Community 30 - "[2.6.0] - 2026-10-22"
Cohesion: 0.67
Nodes (3): [2.6.0] - 2026-10-22, Added, Changed

### Community 31 - "[2.8.0] - 2026-10-22"
Cohesion: 0.67
Nodes (3): [2.8.0] - 2026-10-22, Added, Changed

### Community 32 - "flickering-text.tsx"
Cohesion: 0.36
Nodes (7): DEFAULT_LINES, FlickeringText(), FlickeringTextProps, GLOW_LAYERS, glowShadow(), noiseAt(), randomAt()

### Community 37 - "LazySection.vue"
Cohesion: 0.25
Nodes (5): Props, route, shouldRender, wrapperRef, Props

## Knowledge Gaps
- **240 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+235 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Parchment & Iron Charcoal Design Palette` connect `App.vue` to `ui/TextReveal.vue`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `8-State Interactive Element Matrix` connect `ContactSection.vue` to `TheHeader.vue`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Changelog` connect `Changelog` to `[2.1.0] - 2026-10-17`, `[2.0.0] - 2026-10-17`, `[2.5.4] - 2026-10-19`, `[2.5.5] - 2026-10-22`, `[2.6.0] - 2026-10-22`, `[2.8.0] - 2026-10-22`, `[2.1.1] - 2026-10-17`, `[2.2.0] - 2026-10-17`, `[2.3.0] - 2026-10-17`, `[2.3.1] - 2026-10-18`, `[2.3.2] - 2026-10-18`, `[2.4.0] - 2026-10-18`, `[2.3.3] - 2026-10-18`, `[2.5.3] - 2026-10-19`, `[2.5.1] - 2026-10-19`, `[2.7.0] - 2026-10-22`, `[2.8.1] - 2026-10-22`, `[2.4.2] - 2026-10-18`, `[2.8.2] - 2026-10-22`, `[2.5.2] - 2026-10-19`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _240 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `EyeTracking.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `ContactSection.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._
- **Should `TheHeader.vue` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._