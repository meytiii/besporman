# Besporman — Agent Rules (GEMINI.md)

> **Repository:** `meytiii/besporman`  
> **Master Guidelines:** Governed by `AGENTS.md`, `DESIGN_SYSTEM.md`, and `.agents/rules/mandatory-skills.md`.

## Active Skills & Rules Mandate
The following 11 project-local skills in `.agents/skills/` are installed and permanently active as project rules:

1. **`/hallmark`** — Anti-AI-slop design gates, locked CSS tokens, 320px mobile floor, roman-only headers.
2. **`/impeccable`** — Production-grade craft, mandatory 8-state interactive element matrix, tactile feedback.
3. **`/high-end-visual-design`** — Double-bezel machined container architecture, button-in-button nested icons, expansive section padding.
4. **`/ui-ux-pro-max`** — Accessibility (WCAG 2.2 AA), 44×44px touch targets, systemic z-index hierarchy, contrast.
5. **`/ux-ui-agent-skills`** — 3-tier DTCG token system (Primitives → Semantics → Components), atomic design structure.
6. **`/graphify`** — Codebase modularity, decoupled components, clean dependency graphs.
7. **`/caveman`** — Terse, token-efficient communication mode; drops conversational fluff while preserving all technical substance.
8. **`/design-taste-frontend`** — Layout variance (Variance 8, Motion 6, Density 4), max 1 eyebrow per 3 sections, max 2 zigzag splits.
9. **`/humanizer`** — Elimination of AI writing clichés, authentic and natural Persian/English copy.
10. **`/modern-web-guidance`** — Modern web standards (CSS logical properties, Baseline APIs, transform/opacity hardware acceleration).

## Knowledge Graph & Token Conservation (`/graphify`)
- **Always Check Graph First:** For questions about codebase architecture, components, data flow, or relations, always query `graphify-out/` first (`graphify query "<question>"`, `graphify path "<A>" "<B>"`, `graphify explain "<concept>"`, or browse `graphify-out/wiki/index.md`) to minimize prompt token consumption.
- **Update on Major Changes:** When code modifications result in a large git diff or when the graph has not been updated for a long period, refresh the knowledge graph using `graphify update .` (or full `/graphify .`).

## Engineering Standards
- **Framework:** Vue 3 (Composition API, `<script setup lang="ts">`) + Vite + TypeScript strict mode (zero `any`).
- **Routing:** Vue Router 4 (HTML5 History Mode) with single-page scrolling homepage (`#contact`) and dedicated `/projects/:slug` routes.
- **Direction:** Persian-first (`<html lang="fa" dir="rtl">`), Vazirmatn typography, zero `letter-spacing` on Persian.
- **Styling:** Vanilla CSS Custom Properties (`assets/css/tokens.css`) adhering strictly to [DESIGN_SYSTEM.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/DESIGN_SYSTEM.md).
- **Image Formats (Strict WebP Only):** All images across UI code, cards, showcases, headers, and backgrounds MUST use `.webp` exclusively. Banned: PNG, JPEG, JPG, GIF (sole exceptions: SVGs in `pic/svg/` for icons and `/favicon.png` for tab favicon). All new images must be converted to WebP before code integration.

## Version Management Protocol (SemVer)
- **Version Bumping on Major Changes:** Whenever major architectural changes, substantial new features, or comprehensive redesigns are introduced, upgrade the version in `package.json` (and `package-lock.json`) following Semantic Versioning (`MAJOR.MINOR.PATCH`).
- **Changelog Maintenance:** Document all notable changes under the corresponding version in `CHANGELOG.md` (`Added`, `Changed`, `Fixed`, `Removed`).

## Git Push & Branch Governance
- 🛑 **STRICT BAN ON PUSHING TO `deploy`:** AI Agents must NEVER push directly to the `deploy` branch. Only the repository owner is permitted to push to `deploy`.
- ✅ **PUSH EXCLUSIVELY TO `main`:** All commits and updates by agents must be pushed strictly to the `main` branch (`git push origin main`).


## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, and especially on major changes (when the git diff is large or the graph has not been updated for a long while), run `graphify update .` to keep the graph current (AST-only, no API cost).

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.agents/skills/antislop/SKILL.md`
- UI / visual: `antislop-ui`: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `antislop-copywriting`: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `antislop-human`: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `antislop-layoutmobile`: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `antislop-code`: `.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.
<!-- antislop:end -->
