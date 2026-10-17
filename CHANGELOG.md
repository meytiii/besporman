# Changelog

All notable changes to the Besporman project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-10-17

### Added
- **Universal Button-in-Button Gliding Arrow Badge Animation:** Implemented global tactile button matrix in `base.css` with dynamic gliding arrow badge kinematics (`cubic-bezier(0.4, 0, 0.2, 1)` easing, 45-degree hover tilt, and bidirectional padding swap) across all buttons throughout the entire website (header CTA, hero actions, contact form submit, direct Telegram link, project showcase, project detail actions, 404 return, and back-to-top button).
- **Secondary Project Card Action Buttons:** Replaced plain text «جزئیات پروژه» link on secondary project cards with the primary tactile «مشاهده بررسی تخصصی پروژه» button with the gliding arrow badge animation.
- **Design System Button Standard:** Formally documented the Button-in-Button Gliding Arrow Badge specification and motion physics in Section 9.2 of `DESIGN_SYSTEM.md`.

### Changed
- **Project Completion Year:** Updated completion year of the core studio platform project (`besporman-web`) to **۱۴۰۵** (`completedYearFa: '۱۴۰۵'`).

### Fixed
- **Button Arrow Badge Clearance:** Removed conflicting scoped `.btn-sm` padding override and expanded button padding to $48\text{px}$ (compact) and $58\text{px}$ (standard) to eliminate text collision and guarantee generous clearance around circular arrow badges.

---

## [2.0.0] - 2026-10-17

### Added
- **Vintage Comic Hand Custom Cursor:** Interactive custom cursor featuring the retro comic pointing hand with physical hover tilts, click press mechanics, and automatic suppression of standard Windows default cursors across the entire page DOM.
- **Liquid Morph Mobile Navigation Menu:** Floating amber/iron-charcoal action button morphing into a full-height cascade navigation drawer with kinetic dual-line roll transitions.
- **Anime Mascot Indicator:** Gliding mascot tab tracker with smooth physics-based cubic-bezier easing across desktop navigation tabs.
- **Comic Strip Backdrop Marquee:** Infinite angled background reel in the hero section displaying vintage comic panels behind the mascot and neon sign.
- **Dynamic Speech Bubble Marquee Reviews:** Continuous customer testimonials marquee featuring 28 randomized reviews, color-tinted comic dialogue bubbles, star ratings, and optimized WebP assets.
- **Synchronized Mascot & Neon Hero:** 1.5-second rhythm pose alternation between standard and thumbs-up poses synchronized with glowing retro neon sign on/off states.
- **Automated Deployment Pipeline:** GitHub Actions workflow deploying production builds directly to GitHub Pages from the `deploy` branch.
- **Project Knowledge Graph:** Full repository AST mapping, community detection, and architectural relationships via Graphify.

### Changed
- **Version Baseline:** Upgraded application version to `2.0.0` following comprehensive frontend milestone implementation and interactive feature expansion.
- **Typography & Layout:** Refined descender clearance, Persian punctuation standards, and mobile 320px viewport safety.

---

## [1.0.0] - 2026-10-17

### Added
- **Core Application Framework:** Initial Vue 3 (Composition API, `<script setup lang="ts">`) + Vite + TypeScript strict mode setup.
- **Design System Tokens:** Parchment Canvas (`#FAF7F0`), Iron Charcoal (`#0E0F12`), Comic Accent Red (`#D93829` / `#C92A1D`), Sage (`#E2E8DF`), and Tan (`#F0EAD6`) CSS custom properties.
- **Persian-First Typography:** Full RTL document direction, Vazirmatn body copy, and Lalezar display heading typography.
- **Navigation & Routing:** Vue Router 4 with HTML5 History mode supporting home hash scrolling (`#contact`, `#services`) and dedicated project routes (`/projects/:slug`).
- **Contact Intake Subsystem:** Decoupled `ContactSubmissionAdapter` with strict validation and safe development stub returning `NOT_CONFIGURED`.
- **Automated Test Suite:** Vitest unit and component test harness for contact forms and critical UI flows.
