# Besporman — Agent Instructions (Agent.md)

> **Role:** Companion Instruction Pointer  
> **Master Canonical Source of Truth:** [AGENTS.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/AGENTS.md)  
> **Design System Source of Truth:** [DESIGN_SYSTEM.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/DESIGN_SYSTEM.md)  
> **Mandatory Active Skills:** [.agents/rules/mandatory-skills.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/.agents/rules/mandatory-skills.md)

---

## 1. Single Source of Truth Notice

To prevent competing or contradictory directives across different AI agent tools:
* **[AGENTS.md](file:///c:/Users/Mahdi/Desktop/Stuf/Github/besporman/AGENTS.md)** is the authoritative, canonical project instruction document for `meytiii/besporman`.
* All coding agents, subagents, and contributors MUST read and follow `AGENTS.md` and `DESIGN_SYSTEM.md` before inspecting or modifying code.

---

## 2. Core Non-Negotiable Rules Summary

1. **Framework & Architecture:**
   * Vue 3 (Composition API, `<script setup lang="ts">`) + Vite + TypeScript strict mode (`noImplicitAny: true`).
   * Vue Router 4 (HTML5 History Mode) with single-page scrolling homepage (`#contact`) and dedicated `/projects/:slug` routes.
   * Scoped CSS Custom Properties (`assets/css/tokens.css`).
2. **Language & Direction:**
   * Persian-First (`<html lang="fa" dir="rtl">`) with Vazirmatn body typography and Lalezar display headings.
   * Zero `letter-spacing` on Persian text.
3. **Approved Brand Palette:**
   * Parchment Canvas (`#FAF7F0`), Iron Charcoal (`#0E0F12`), Comic Accent Red (`#D93829` display / `#C92A1D` text), Sage (`#E2E8DF`), and Tan (`#F0EAD6`).
   * Strictly no dark-mode flips, generic gradients, or synthetic neon.
4. **Asset Preservation:**
   * Never modify, replace, overwrite, or delete authentic mascot images (`pic/besporman1.png`, `pic/besporman2.png`) or `favicon.png`.
5. **Frontend / Backend Boundary:**
   * Client code must NEVER contain hardcoded secrets, Telegram bot tokens, or fake submission endpoints.
   * Form UI is decoupled via `ContactSubmissionAdapter`. Development stubs return `NOT_CONFIGURED`.
   * Backend tasks, serverless functions, and bot endpoints are documented in `backend_tasks_YYYY-MM-DD.md`.
6. **Active Skills Mandate:**
   * All 10 skills in `.agents/skills/` (`/hallmark`, `/impeccable`, `/high-end-visual-design`, `/ui-ux-pro-max`, `/ux-ui-agent-skills`, `/graphify`, `/caveman`, `/design-taste-frontend`, `/humanizer`, `/modern-web-guidance`) are permanently active.
7. **Verification & Commit Standards:**
   * Verify all changes (responsive 320px, RTL layout, zero console errors).
   * Commit with Conventional Commits and push to `main` at the end of each completed task.
