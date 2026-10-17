# Besporman — Agent & Contributor Instructions (AGENTS.md)

> **Status:** Proposed Project Instruction Guide (Pending Owner Review)  
> **Repository:** `meytiii/besporman`  
> **Applicability:** All AI Coding Agents, Pair Programmers, and Human Developers

---

## 1. Project Overview & Role

You are an expert full-stack engineer and UI/UX designer working on **Besporman (بسپر من)**.
Besporman is an Iranian software development studio specializing in:
1. **Web Design & Development (طراحی و توسعه وب‌سایت)**
2. **Telegram Bots (بات‌های تلگرام)**
3. **Windows Applications (اپلیکیشن‌های ویندوز)**

All visual design, token structures, and layout standards are governed by [DESIGN_SYSTEM.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/DESIGN_SYSTEM.md).

---

## 2. Core Architecture & Technology Stack

- **Framework:** **Nuxt 4** (Vue 3, Composition API, `<script setup lang="ts">`)
- **Language:** **TypeScript** (Strict mode, zero `any`)
- **Styling:** **Vanilla CSS Custom Properties** (`assets/css/tokens.css`), scoped component styles, with optional Tailwind utilities constrained strictly to design system tokens.
- **Iconography:** **Phosphor Icons** (`@phosphor-icons/vue`) or Tabler Icons SVG glyphs. Emojis are strictly banned as UI icons.
- **Language & Direction:** Persian-first (`fa`), Right-to-Left (`dir="rtl"`).

---

## 3. Persian-First & RTL Engineering Rules

1. **Logical CSS Properties:**
   - Always use `margin-inline-start`, `margin-inline-end`, `padding-inline-start`, `padding-inline-end`, and `inset-inline-start`.
   - Never use hardcoded directional `left`/`right` for layout positioning unless specifically handling an isolated LTR block.
2. **Typography Protection:**
   - Primary Persian font: **Vazirmatn** (self-hosted WOFF2).
   - Never apply `letter-spacing` (tracking) to Persian text. Cursive ligatures must remain intact.
   - Body line-height must never drop below `1.65`.
   - Persian punctuation: `«` and `»` for quotes, `؟` for questions, `،` for commas.
3. **Numeral Handling:**
   - Persian numerals (`۰-۹`) for UI copy, dates, counters, and steps.
   - Latin numerals (`0-9`) for technical specifications, code blocks, Telegram commands, and URLs.
4. **Isolated LTR Enclaves:**
   - Code snippets, URLs, and git commands must explicitly have `dir="ltr"`.

---

## 4. Anti-Slop Directives (Strict Enforcement)

Every agent working on this repository must reject generic AI cliches:
- ❌ **No Arbitrary Purple/Neon Glows or Dark Mesh Gradients:** Stick to the approved palette (Parchment, Iron Charcoal, Vintage Neon Amber, Industrial Vermilion).
- ❌ **No Fake Client Logos or Fabricated Testimonials:** Only display authentic projects and verified descriptions.
- ❌ **No Invented Metrics:** Do not fabricate conversion numbers or vanity statistics.
- ❌ **No Re-Drawn Fake UI Chrome:** Do not wrap images in fake browser bars or fake window controls.
- ❌ **No Emojis as UI Icons:** Use deliberate, consistent SVG glyphs.
- ❌ **No Horizontal Scroll Bugs:** Root elements must have `overflow-x: clip`. Verify responsiveness down to 320px viewport width.
- ❌ **All 8 States Required:** Every interactive element must define: default, hover, focus-visible, active, disabled, loading, error, and success states.

---

## 5. Workflow and Safety Rules

1. **Inspection First:** Before making any file modifications, always inspect existing code, directory structures, and configurations. Never overwrite established conventions without justification.
2. **Approval Gates:** Do not implement full feature suites or speculative backends without owner authorization.
3. **Commit Standards:** Use Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`). Keep commit messages concise, descriptive, and under 50 characters for the summary line.
4. **Documentation Sync:** Any change to tokens, layout architecture, or component behavior must be updated in [DESIGN_SYSTEM.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/DESIGN_SYSTEM.md).
