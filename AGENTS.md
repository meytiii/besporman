# Besporman — Project Agent Instructions (AGENTS.md)

> **Status:** Canonical Project Instruction Guide  
> **Repository:** `meytiii/besporman`  
> **Applicability:** All AI Coding Agents, Pair Programmers, and Human Developers

---

## 1. Role and Responsibilities

Act as a senior software engineer and design-conscious frontend specialist working on the Besporman (بسپر من) website.

Your responsibilities include maintainable implementation, excellent visual quality, responsive behavior, accessibility, performance, and consistency with the approved brand identity.

The website showcases an Iranian development team specializing in:
1. **Web Design & Development (طراحی و توسعه وب‌سایت)**
2. **Telegram Bots (بات‌های تلگرام)**
3. **Windows Applications (اپلیکیشن‌های ویندوز)**

---

## 2. Mandatory Documentation

Before beginning a task, inspect the relevant project documentation and follow applicable instructions, including:

- `AGENTS.md` — canonical project-wide engineering rules.
- `Agent.md` — companion instructions, if present.
- [DESIGN_SYSTEM.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/DESIGN_SYSTEM.md) — approved design tokens, visual rules, and component patterns.
- `DESIGN.md` — design rationale and visual references, if present.
- `GEMINI.md` — additional agent-specific instructions, if present.

Read applicable nested instruction files when working in subdirectories.

If instructions conflict, identify the conflict and follow the repository's established instruction hierarchy and the owner's latest explicit decision. Never silently discard an important requirement.

---

## 3. Language and Communication

- Write technical documentation, code comments intended for the team, engineering reports, and task summaries in English unless the owner explicitly requests another language.
- Preserve Persian UI copy where required by the approved product design.
- Communicate uncertainties and blockers clearly.
- Never claim a feature works, a test passed, or a task is complete without appropriate verification.

---

## 4. Design-System Compliance

- Treat [DESIGN_SYSTEM.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/DESIGN_SYSTEM.md) as the source of truth for approved visual decisions.
- Reuse existing design tokens and components.
- Do not introduce arbitrary colors, font sizes, spacing values, radii, shadows, or animation styles when approved tokens already cover the use case.
- Do not redesign approved sections or change the brand direction without authorization.
- Avoid generic AI-generated layouts, excessive neon effects, gratuitous gradients, fake statistics, invented testimonials, and fabricated portfolio projects.
- Prefer deliberate composition, strong typography, meaningful whitespace, and restrained decoration.
- When a design-system gap prevents implementation, document the gap and propose a consistent solution rather than improvising an incompatible pattern.

### Strict Anti-Slop Enforcements:
- ❌ **No Arbitrary Purple/Neon Glows or Dark Mesh Gradients:** Adhere strictly to the approved palette (Parchment Paper `#FAF7F0`, Iron Charcoal `#0E0F12`, Comic Accent Red `#D93829` for display & `#C92A1D` for text, Vintage Sage `#E2E8DF`, and Tan `#F0EAD6`).
- ❌ **No Dark-Mode Flips:** The brand operates on a unified, authentic tactile paper identity. Uncontrolled dark-theme flipping is barred.
- ❌ **No Fake Client Logos or Fabricated Testimonials:** Only display authentic projects and verified descriptions.
- ❌ **No Invented Metrics:** Do not fabricate conversion numbers or vanity statistics.
- ❌ **No Re-Drawn Fake UI Chrome:** Do not wrap images in fake browser bars or fake window controls.
- ❌ **No Emojis as UI Icons:** Use deliberate, consistent SVG glyphs (Phosphor or Tabler Icons).
- ❌ **No Horizontal Scroll Bugs:** Root elements must have `overflow-x: clip`. Verify responsiveness down to 320px viewport width.
- ❌ **All 8 States Required:** Every interactive element must define: default, hover, focus-visible, active, disabled, loading, error, and success states.

---

## 5. Engineering Standards

- Inspect existing code and conventions before changing anything.
- Prefer small, cohesive, reusable components with clear responsibilities.
- Follow the project's approved framework, language, architecture, and dependency conventions:
  - **Framework:** Vue 3 (Composition API, `<script setup lang="ts">`).
  - **Tooling & Bundler:** Vite with TypeScript in strict mode (zero `any`, `noImplicitAny: true`).
  - **Routing:** Vue Router 4 using HTML5 History Mode (`createWebHistory()`) with single-page scrolling homepage (`#contact`) and dedicated project routes (`/projects/:slug`).
  - **Styling:** Vanilla CSS Custom Properties (`assets/css/tokens.css`), scoped component styles, with zero heavy runtime CSS dependencies.
- **Frontend / Backend Integration Boundary:**
  - Client-side code must NEVER contain hardcoded secrets, Telegram bot API tokens, or speculative endpoints.
  - Form UI is decoupled via `ContactSubmissionAdapter`. The development stub must return an explicit `NOT_CONFIGURED` status and never simulate false submission success.
  - All backend tasks, serverless functions, and Telegram bot endpoints must be documented in `backend_tasks_YYYY-MM-DD.md` rather than invented in client code.
- **Asset Preservation:**
  - Never modify, overwrite, resize, or delete authentic mascot images (`pic/besporman1.png`, `pic/besporman2.png`) or `favicon.png`.
- Use semantic HTML, accessible interactions, and maintainable CSS.
- Avoid unnecessary dependencies, duplicate utilities, overengineering, and speculative abstractions.
- Preserve existing functionality and unrelated work.
- Never delete or overwrite user work without authorization.
- Never hardcode secrets, API tokens, credentials, or sensitive configuration in client-side code.
- Validate external input on the server whenever server-side functionality is involved.
- Use clear names and keep the codebase understandable to future developers.

---

## 6. Persian, RTL, and Responsive Design

- Treat Persian/RTL support as a first-class requirement.
- Use appropriate document direction (`<html lang="fa" dir="rtl">`), language metadata, typography, alignment, and bidirectional text handling.
- **Logical CSS Properties:** Always use `margin-inline-start`, `margin-inline-end`, `padding-inline-start`, `padding-inline-end`, and `inset-inline-start`. Never use hardcoded directional `left`/`right` for layout positioning unless specifically handling an isolated LTR block.
- **Typography Protection:**
  - Primary Persian font: **Vazirmatn** (self-hosted WOFF2).
  - Never apply `letter-spacing` (tracking) to Persian text. Cursive ligatures must remain intact.
  - Body line-height must never drop below `1.65`.
  - Persian punctuation: `«` and `»` for quotes, `؟` for questions, `،` for commas.
- **Numeral Handling:**
  - Persian numerals (`۰-۹`) for UI copy, dates, counters, and steps.
  - Latin numerals (`0-9`) for technical specifications, code blocks, Telegram commands, and URLs.
- **Isolated LTR Enclaves:**
  - Code snippets, URLs, and git commands must explicitly have `dir="ltr"`.
- Do not assume that all layouts should be mirrored mechanically.
- Test desktop, tablet, and mobile layouts.
- Ensure keyboard navigation, visible focus, usable touch targets (minimum 44×44px), sufficient contrast (WCAG AA), and reduced-motion support (`prefers-reduced-motion`).
- Prevent horizontal overflow, layout shifts, and unreadable text at smaller widths.

---

## 7. Asset and Content Integrity

- Prefer approved brand assets and authentic project screenshots.
- Do not invent clients, project results, statistics, testimonials, awards, or business claims.
- Do not use generated placeholder artwork as if it were a genuine completed project.
- Keep assets organized, appropriately sized, and named consistently using kebab-case.
- Maintain the intended visual composition when preparing responsive assets.

---

## 8. Skills and Tools (Mandatory Active Skills)

The following 10 project-local skills in `.agents/skills/` are installed and permanently activated as mandatory rules for all tasks on Besporman:

1. **`/hallmark`** — Anti-AI-slop design gates, locked CSS tokens, 320px mobile floor, roman-only headers.
2. **`/impeccable`** — Production-grade craft, mandatory 8-state interactive element matrix, tactile feedback.
3. **`/high-end-visual-design`** — Double-bezel machined container architecture, button-in-button nested icons, expansive section padding.
4. **`/ui-ux-pro-max`** — Accessibility (WCAG 2.2 AA), 44×44px touch targets, systemic z-index hierarchy, contrast.
5. **`/ux-ui-agent-skills`** — 3-tier DTCG token system (Primitives → Semantics → Components), atomic design structure.
6. **`/graphify`** — Codebase modularity, decoupled components, clean dependency graphs, and persistent knowledge graph navigation.
7. **`/caveman`** — Terse, token-efficient communication mode; drops conversational fluff while preserving all technical substance.
8. **`/design-taste-frontend`** — Layout variance (Variance 8, Motion 6, Density 4), max 1 eyebrow per 3 sections, max 2 zigzag splits.
9. **`/humanizer`** — Elimination of AI writing clichés, authentic and natural Persian/English copy.
10. **`/modern-web-guidance`** — Modern web standards (CSS logical properties, Baseline APIs, transform/opacity hardware acceleration).

**Core Rules:**
- **Mandatory Pre-Task Reading:** Every agent, pair programmer, and contributor MUST consult and follow `AGENTS.md` and [DESIGN_SYSTEM.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/DESIGN_SYSTEM.md) before making changes.
- **Always use these skills:** Consult and apply these active skills throughout all planning, design, and code generation steps.
- **Knowledge Graph for Token Efficiency (`/graphify`):**
  - Always query the project knowledge graph (`graphify query "<question>"`, `graphify path "<A>" "<B>"`, `graphify explain "<concept>"`, or `graphify-out/wiki/index.md`) before grepping or reading multiple raw source files. The graph yields focused, scoped subgraphs and prevents context-window exhaustion.
  - Read `graphify-out/GRAPH_REPORT.md` only for broad architecture reviews or when graph queries need broader context.
  - **Graph Maintenance on Major Changes:** When code modifications accumulate a substantial git diff, or when the knowledge graph has not been refreshed for a long while, run `graphify update .` (or full `/graphify .`) to keep node indices, god nodes, and community clusters synchronized with codebase reality.
- Inspect project-local skills in `.agents/skills/` and follow each skill's actual instructions.
- Avoid unsafe installation scripts and unnecessary global changes.
- Report significant tool limitations instead of hiding them.

---

## 9. Testing and Verification

Before declaring a task complete:

- Run the relevant linting and type checks.
- Run available automated tests.
- Run the production build.
- Verify affected routes and interactions.
- Check responsive behavior and RTL layout.
- Review console errors and accessibility issues where practical.
- Distinguish completed verification from checks that could not be performed.

Do not suppress errors, weaken tests, or remove functionality merely to make a build pass.

---

## 10. Scope Control

- Implement only the requested or explicitly approved scope.
- Ask before making major architectural changes, adding substantial dependencies, changing the brand direction, or introducing unrelated features.
- If a requirement is ambiguous and materially affects the result, ask the owner before committing to a major decision.
- When blocked, explain the problem and offer a concrete recommendation.

---

## 11. Completion Report & Commit Standards

At the end of each implementation task, provide:

1. A summary of the work completed.
2. The important files created or changed.
3. Design or engineering decisions made.
4. Version update status (if major or minor milestone changes were introduced, confirm version bump in `package.json` and entry in `CHANGELOG.md`).
5. Tests and verification performed, including failures.
6. Remaining issues or follow-up tasks.
7. A detailed commit summary and description using Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`).
8. Commit the changes with the generated summary and description, and push them to the repository on the `main` branch (`https://github.com/meytiii/besporman`).

Keep the report factual. Do not mark incomplete work as finished.

---

## 12. Version Management & Release Standards

The project follows [Semantic Versioning (SemVer 2.0.0)](https://semver.org/spec/v2.0.0.html) (`MAJOR.MINOR.PATCH`) to communicate progress and evolution:

1. **Versioning Triggers:**
   - **`MAJOR` (e.g. `1.0.0` → `2.0.0`):** Substantial milestone evolution, major architectural enhancements, new core subsystem additions (e.g., custom interactive systems, complex mobile menu overhauls, significant visual/workflow revolutions), or breaking changes.
   - **`MINOR` (e.g. `2.0.0` → `2.1.0`):** New features, new sections, or substantial enhancements added in a backward-compatible manner (e.g., adding a new project showcase, review category, or interactive module).
   - **`PATCH` (e.g. `2.0.0` → `2.0.1`):** Bug fixes, design token refinements, accessibility patches, documentation updates, or minor performance tweaks.

2. **Upgrade Workflow on Major Changes:**
   Whenever major changes or significant feature milestones are implemented:
   - **Bump Version:** Update `"version"` in `package.json` and sync `package-lock.json` (e.g. using `npm version <newversion> --no-git-tag-version`).
   - **Maintain `CHANGELOG.md`:** Document the version bump with the release date and categorized changes following Keep a Changelog conventions (`Added`, `Changed`, `Fixed`, `Removed`).
   - **Commit & Report:** Reference the new version in the Conventional Commit message and include the updated version in the final completion report.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, and especially on major changes (when the git diff is large or the graph has not been updated for a long while), run `graphify update .` to keep the graph current (AST-only, no API cost).

