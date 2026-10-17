# Besporman Mandatory Skills & Rules Specification

> **Status:** Active Project Rule  
> **Applicability:** All AI Coding Agents, Pair Programmers, and Contributors  
> **Enforcement:** Mandatory for all tasks in `meytiii/besporman`

The following 10 skills are installed locally in `.agents/skills/` and are officially activated as non-negotiable project rules:

---

## 1. Hallmark (`/hallmark`) — Anti-AI-Slop & Structural Discipline
- **Rule:** Every page or component generated must pass Hallmark's anti-slop gates.
- **Enforcement:**
  - Banned: Arbitrary purple/neon glows, dark mesh gradient blobs, generic template layouts.
  - Banned: Re-drawn UI chrome (fake browser traffic-light dots or fake window bars).
  - Banned: Fabricated statistics, fake client logos, and invented testimonials.
  - Locked Tokens: All colors and fonts must reference named design tokens (`var(--color-...)`), zero mid-render inline value improvisation.
  - Mobile verification down to 320px with `overflow-x: clip` on root; zero horizontal scroll.
  - Typography purity: Display headers must be roman (`font-style: normal`), no italic headers.

---

## 2. Impeccable (`/impeccable`) — High-Craft Design & 8-State Integrity
- **Rule:** Approach every interface as an award-winning design director with production-grade craft.
- **Enforcement:**
  - **All 8 States Mandatory:** Every interactive element must define and implement all 8 states:
    1. Default
    2. Hover
    3. Focus-Visible (visible high-contrast ring)
    4. Active (mechanical 1px-2px depression with tactile shadow reduction)
    5. Disabled
    6. Loading (`aria-busy="true"` + accessible indicator)
    7. Error (inline descriptive message + error border)
    8. Success / Selected
  - Tactile physical feedback on all user interactions.

---

## 3. High-End Visual Design (`/high-end-visual-design`) — Agency-Caliber Aesthetics
- **Rule:** Elevate the website to feel like a $150k+ bespoke digital atelier, avoiding cheap defaults.
- **Enforcement:**
  - Double-Bezel / Machined Architecture: Major cards, inputs, and containers must use nested frames (outer shell with subtle tint/border + inner core with distinct surface) to simulate physical machined hardware.
  - Button-in-Button Trailing Icons: Directional arrows/icons inside buttons must be nested inside their own dedicated circular enclosure.
  - Generous spatial rhythm: Major sections breathe with expansive vertical padding (`py-20` to `py-32`).

---

## 4. UI/UX Pro Max (`/ui-ux-pro-max`) — Interaction, Layout & Performance Guardrails
- **Rule:** Adhere to strict interaction, responsive, and performance intelligence.
- **Enforcement:**
  - Touch Targets: Minimum 44×44px on all touch viewports.
  - Z-Index Scale: Systemic layering only (`1`, `5`, `50`, `100`, `200`, `300`); no arbitrary `z-50` or `z-[9999]`.
  - Contrast: WCAG 2.2 AA floor (≥ 4.5:1 for body copy, ≥ 3.0:1 for large display and essential borders).
  - No Layout Shift: Viewport stability with `min-h-[100dvh]` rather than `h-screen`.

---

## 5. UX/UI Agent Skills (`/ux-ui-agent-skills`) — 3-Tier Token Architecture & Design Standards
- **Rule:** Ground every visual element in a 3-Tier Token Architecture (Primitives → Semantics → Components) in DTCG format.
- **Enforcement:**
  - Components consume component-level or semantic tokens; never hardcode raw hex/rgb values.
  - Dark mode swaps at the semantic layer while primitives stay rock-solid.
  - Modular Major Third (1.25) typographic scale.
  - Atomic design organization (Atoms → Molecules → Organisms → Templates → Pages).

---

## 6. Graphify (`/graphify`) — Codebase Knowledge & Architectural Modularity
- **Rule:** Maintain modular, decoupled code architecture, always leverage the knowledge graph for token conservation, and keep the graph synchronized.
- **Enforcement:**
  - **Token Efficiency First:** Always consult `graphify-out/` (`graphify query "<question>"`, `graphify path "<A>" "<B>"`, `graphify explain "<concept>"`, or `graphify-out/wiki/index.md`) before doing broad file searches or grepping. This returns focused subgraphs and prevents context-window bloat.
  - **Graph Maintenance on Major Changes:** Whenever modifications result in a large git diff or when the graph has not been refreshed for a long while, execute `graphify update .` (or full `/graphify .`) to re-sync AST nodes, god nodes, and community clusters.
  - Maintain clean import boundaries between components, utilities, and assets.
  - Keep components focused and cohesive with zero circular dependencies.
  - Enable effortless AST extraction and knowledge graph visualization.

---

## 7. Caveman (`/caveman`) — Token-Efficient Communication Mode
- **Rule:** Eliminate conversational fluff, sycophancy, and filler tokens while preserving 100% technical substance.
- **Enforcement:**
  - Active whenever terse or compressed communication is beneficial to preserve context window.
  - Keep all technical terms, code blocks, API names, and exact error strings verbatim.
  - Drop pleasantries, filler words, and decorative preambles.

---

## 8. Design-Taste-Frontend (`/design-taste-frontend`) — Variance, Motion & Anti-Slop Layouts
- **Rule:** Calibrate layout dials and enforce strict structural variance.
- **Enforcement:**
  - Baseline dials for Besporman: Variance: 8, Motion: 6, Density: 4.
  - Eyebrow Restraint: Maximum 1 eyebrow label per 3 sections.
  - Zigzag Alternation Cap: Maximum 2 consecutive alternating split layouts before breaking cadence with a full-width or distinct layout.
  - Marquee Cap: At most one continuous marquee per page, purposefully motivated.
  - Descender clearance on all headings (`leading-[1.1]` min).

---

## 9. Humanizer (`/humanizer`) — Natural Human Voice & Anti-Corporate Copy
- **Rule:** Eliminate all 24 AI writing patterns in both Persian and English text.
- **Enforcement:**
  - Banned: Significance inflation ("marking a pivotal moment", "delving into the tapestry").
  - Banned: Empty buzzwords ("world-class", "game-changing", "seamless synergy").
  - Banned: Formulaic triplets and fake corporate enthusiasm.
  - Persian copy must be direct, authentic, respectful, and culturally grounded.

---

## 10. Modern Web Guidance (`/modern-web-guidance`) — Standards-Based Web APIs
- **Rule:** Leverage modern, standardized web platform capabilities before adding external dependencies.
- **Enforcement:**
  - Target Baseline Widely Available features; check browser support and provide lightweight fallbacks when necessary.
  - Use native CSS Logical Properties (`margin-inline-start`, `padding-inline-start`, etc.) for all layouts.
  - Prefer modern CSS (`:has()`, container queries, View Transitions, CSS scroll-driven animations) over bulky runtime libraries.
  - Hardware-accelerate motion using exclusively `transform` and `opacity`.

---

## 11. Version Management & SemVer Protocol
- **Rule:** Maintain synchronized Semantic Versioning (`MAJOR.MINOR.PATCH`) in `package.json` and `CHANGELOG.md`.
- **Enforcement:**
  - Whenever major architectural revisions, new core subsystem additions, or milestone features are added, bump the application version in `package.json` / `package-lock.json` (e.g. `npm version <newversion> --no-git-tag-version`).
  - Document all version updates with release dates and categorized entries (`Added`, `Changed`, `Fixed`, `Removed`) in `CHANGELOG.md`.

---

## 12. Git Push Governance & Branch Restriction
- **Rule:** Strict protection of the `deploy` branch.
- **Enforcement:**
  - 🛑 **NEVER push to `deploy`:** AI Agents and pair programmers are strictly prohibited from pushing directly to the `deploy` branch. Pushing to `deploy` is reserved solely for the human owner.
  - ✅ **Push strictly to `main`:** All agent commits, enhancements, and bug fixes must be pushed exclusively to the `main` branch (`git push origin main`).

