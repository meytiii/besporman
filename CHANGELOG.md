# Changelog

All notable changes to the Besporman project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.5.3] - 2026-10-19

### Fixed
- **Navbar Mascot Indicator & ScrollSpy Restoration:** Resolved an issue where the anime mascot in the navbar froze above «ثبت سفارش» and failed to track sections during page scroll.
- **Accurate Document Geometry Calculation:** Replaced fragile `section.offsetTop` (which evaluated to `0` inside lazy-wrapped containers due to CSS containment) with dynamic viewport bounding calculations (`getBoundingClientRect().top + window.scrollY`), guaranteeing accurate scrollspy section matching across all viewport heights.
- **LazySection Anchor & ID Synchronization:** Added `:id="targetId || undefined"` to `.lazy-section-wrapper` in `LazySection.vue` and removed redundant `content-visibility: auto` to prevent CSS containment side-effects and layout shifts. All section anchors now exist in the DOM from initial render, ensuring smooth scrolling and instant anchor resolution.
- **Hero Boundary Clearance & Edge Snap:** Updated `TheHeader.vue` scrollspy to cleanly hide the mascot when viewing the Hero and Marquee banner (`scrollPosition < servicesTop`), seamlessly track active sections in reverse order, and snap to `contact` when scrolled to the bottom of the page.
- **Anchor Clearance Under Sticky Header:** Added `.lazy-section-wrapper[id]` to `scroll-margin-top` clearance rules in `base.css`.
- **Automated ScrollSpy Testing:** Added unit tests in `tests/navigation.spec.ts` verifying dynamic mascot position updates, opacity transitions, and hero boundary clearance.

---

## [2.5.2] - 2026-10-19

### Changed
- **Silent Marquee Pause & Resume:** Removed the pop-up status indicator badge («متوقف شد • دو ضربه برای حرکت» / «در حال حرکت») from `MarqueeBanner.vue`. Double-tap and double-click gestures now cleanly halt and resume scrolling directly without displaying temporary overlay messages.
- **Cleaned Up Obsolete Styles & State:** Removed unused badge state, timeout cleanup routines, and `.marquee-status-pill` CSS declarations.

---

## [2.5.1] - 2026-10-19

### Changed
- **Removed Loading Subtitle:** Removed the secondary subtitle text («آماده‌سازی کارگاه برنامه‌نویسی بسپر من») from `AppLoadingScreen.vue`, focusing the initial loading presentation purely on the liquid physics morph animation and the primary Lalezar title («داریم میرسیم عجله نکن!»).
- **Cleaned Up Obsolete Styles:** Removed unused `.loading-subtitle` CSS rules and streamlined the reduced-motion media query.

---

## [2.5.0] - 2026-10-18

### Added
- **Mobile Double-Tap Pause & Resume:** Enabled double-tap gesture interaction on the comment marquee for mobile devices. Double-tapping halts the marquee using the identical smooth kinematic deceleration curve (~0.7s to halt) as desktop hover, and double-tapping again resumes movement with the smooth acceleration curve (~0.8s to cruising speed).
- **Horizontal Touch Sweep & Scrubbing:** Added direct finger drag-and-swipe controls. Users on mobile can freely swipe left or right to browse between client review bubbles.
- **Continuous Modulo Math Wrap-Around:** Built seamless bidirectional dragging mathematics (`((rawX % tileWidth) + tileWidth) % tileWidth`), enabling users to sweep infinitely in either direction across the duplicate tile clone without seam jumps or edge boundaries.
- **Tactile State Feedback Pill:** Integrated an animated, floating feedback badge («متوقف شد • دو ضربه برای حرکت» / «در حال حرکت») with SVG pause/play glyphs and tactile cream-and-ink styling that appears briefly upon double-tapping.
- **Vertical Scroll Protection:** Configured `touch-action: pan-y;` on the marquee viewport along with direction-locking gesture math (`Math.abs(deltaY) > Math.abs(deltaX)`), ensuring native vertical page scrolling passes through smoothly and never gets intercepted or blocked by the marquee.
- **Comprehensive Mobile & Touch Test Suite:** Added unit tests in `tests/marquee.spec.ts` covering double-click/double-tap state transitions, status pill rendering, and touch gesture dragging.

---

## [2.4.2] - 2026-10-18

### Changed
- **Enlarged Testimonial Mascot Dimensions:** Increased `.marquee-mascot-box` height from `92px` to `190px` on desktop (and `70px` to `140px` on mobile), making the thumbs-up mascot prominently visible, crisp, and expressive next to the section title.
- **Removed Mascot Hover Animation:** Eliminated the hover scale and rotation effect from `.marquee-mascot-img` to maintain a grounded, clean, non-distracting visual presentation.
- **Enhanced Drop Shadow:** Applied `3px 3px 0 var(--color-border-bold)` tactile comic ink shadow to match the visual depth of the mascot and review bubbles.

---

## [2.4.1] - 2026-10-18

### Fixed
- **Loading Screen Font Rendering (Elimination of Fallback FOUT):** Resolved an issue where initial cold visits rendered the loading screen title «داریم میرسیم عجله نکن!» and subtitle in the system fallback font (Tahoma) instead of Lalezar and Vazirmatn.
- **Critical Typography Font Preloading:** Added `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `index.html` for `Lalezar-Regular.woff2`, `Vazirmatn-Regular.woff2`, `Vazirmatn-Medium.woff2`, and `Vazirmatn-Bold.woff2`, instructing browsers to download brand typography with highest priority during `<head>` parsing.
- **Display Typography `font-display: block`:** Updated `fonts.css` and `DESIGN_SYSTEM.md` to use `font-display: block;` for Lalezar, preventing the browser engine from painting unstyled system fallback fonts for display titles.
- **Font-Readiness Gating in `AppLoadingScreen`:** Added reactive font checking and explicit loading via `document.fonts.load('400 1em Lalezar')` and `document.fonts.ready`. The loading copy remains smoothly hidden at `opacity: 0` until Lalezar is confirmed ready by the browser, then gently transitions into view with zero FOUT. Repeat visits with cached fonts display immediately with no delay.

---

## [2.4.0] - 2026-10-18

### Added
- **Client Testimonial Section Title:** Added display heading «نظرات مشتریای عزیزمون» rendered via animated `TextReveal` (in Lalezar font) directly between the hero trust chips and the comment marquee chat bubbles in `MarqueeBanner.vue`.
- **Mascot Thumbs-Up Artwork (`besporman_like.webp`):** Converted the new authentic mascot image `pic/besporman_like.png` to high-performance WebP (`128 KB`, compressed with PIL method 6), and placed it beside the title with thumbs-up gesturing towards the text, complete with comic drop-shadow and tactile micro-hover feedback.
- **Isolated Marquee Track Area:** Refactored `.marquee-fade` and track elements inside `.marquee-track-area` to guarantee edge fades blend solely across moving bubbles without obscuring the section title or mascot header.

---

## [2.3.3] - 2026-10-18

### Changed
- **Mobile Marquee Chat Bubble Proportions:** Reduced the dimensions of `.comic-bubble` review bubbles on mobile devices (`max-width: 768px`) from `380px × 265px` down to `280px × 195px`, strictly preserving the ~1.43 comic vector aspect ratio while allowing adjacent bubbles to peek on screen.
- **Enlarged Review Typography:** Increased `.bubble-text` font size from `13.5px` to `15px` (`line-height: 1.55`) on mobile screens to significantly improve legibility and visual weight within the speech bubble area.
- **Calibrated Inner Bubble Spacing on Mobile:** Adjusted `.bubble-inner-content` offsets (`top: 22px; inset-inline-start: 34px; inset-inline-end: 24px; gap: 8px;`), author avatar size (`24px × 24px`), author margin (`margin-inline-start: 6px`), and star icons (`14px × 14px`) to ensure comfortable margins that never touch the comic ink border or the bottom speech tail.
- **Refined Mobile Edge Fade:** Decreased mobile `.marquee-fade` width from `60px` to `28px` to prevent edge gradients from washing out bubbles during entry and exit across 320px–390px mobile viewports.
- **Playwright Mobile Emulation Validation:** Thoroughly verified rendering, text bounds, and absence of horizontal overflow across 390px (iPhone), 360px (Android), and 320px (minimum mobile floor) viewports.

---

## [2.3.2] - 2026-10-18

### Fixed
- **Hero Title Highlight Color Restoration:** Resolved an issue where the brand highlight «بسپر من!» in the hero headline rendered black instead of red due to scoped CSS boundaries between `HeroSection.vue` and `TextReveal.vue`.
- **Global & Deep Title Highlight Scoping:** Added `:deep(.title-highlight)` in `HeroSection.vue`, defined `.text-reveal-segment.title-highlight` in `TextReveal.vue`, and added `.title-highlight` to `base.css` to guarantee vibrant comic red (`#D93829`) coloring on the brand text while preserving iron charcoal black on the surrounding words.
- **Robust Persian Text Normalization:** Enhanced `isHighlighted` matching in `TextReveal.vue` to flexibly handle full Persian words, punctuation, spaces, and zero-width non-joiner (ZWNJ) half-spaces.

---

## [2.3.1] - 2026-10-18

### Fixed
- **Initial Page Open Scroll-To-Top Assurance:** Resolved an issue where opening or refreshing the homepage without an anchor hash could restore previous scroll positions mid-page (near services) due to browser automatic scroll restoration and router `savedPosition` precedence.
- **Manual Scroll Restoration:** Configured `history.scrollRestoration = 'manual'` in `main.ts` and prioritized `{ top: 0, left: 0 }` for homepage visits without hashes in `router/index.ts`.
- **Loading Screen Initial Pinning:** Added proactive `window.scrollTo(0, 0)` during `AppLoadingScreen` mount and curtain dismissal when no anchor hash is present.
- **Header Active Tab Default:** Corrected `TheHeader.vue`'s initial `activeTab` value from `'services'` to empty string (`''`), hiding the mascot indicator and red pill at the top of the page until the user scrolls down into specific section bounds.
- **ScrollSpy Bounds:** Added near-top boundary detection in `handleScroll` (`scrollY < 350`) to cleanly clear active navigation pills while viewing the Hero section.
- **Git Push Governance Documentation:** Formally established and documented across all instruction files (`AGENTS.md`, `Agent.md`, `GEMINI.md`, and `.agents/rules/mandatory-skills.md`) that AI agents and contributors must strictly and exclusively push to the `main` branch, and are permanently forbidden from pushing to the `deploy` branch (reserved strictly for the human owner).

---

## [2.3.0] - 2026-10-17

### Added
- **Full-Screen Tactile Studio Loading Screen (`AppLoadingScreen.vue`):** Implemented an initial entrance loading curtain with retro halftone parchment paper background (`--color-canvas`, `#FAF7F0`), sliding up smoothly via cubic-bezier curtain easing upon asset readiness.
- **2-Second Minimum Display & Asset Readiness Orchestration:** Enforced a strict minimum 2-second display duration paired with proactive asset verification (`document.fonts.ready`, DOM existence of `.site-header`, and completion of top images/mascots `complete && naturalHeight > 0`) before dismissing the loading screen.
- **Lalezar Persian Loading Typography:** Rendered rhythmic title «داریم میرسیم عجله نکن!» in Lalezar display font with text-shadow and pulsing comic ellipsis dots (`. . .`).
- **Liquid Wave Physics Loader (`LiquidLoader.vue`):** Developed a 7-column multi-frequency liquid wave simulation with surface tension elasticity, rising bubble physics, internal light shimmer, and peak droplet launches, styled in Besporman's branded comic ink gradients.
- **Preserved React Component References:** Placed `liquid-loader.tsx` and `liquid-loader-demo.tsx` in `src/components/ui/` for cross-framework documentation.
- **Unit Testing Suite:** Added `tests/loader.spec.ts` validating liquid column structures, DOM layers, and loading screen lifecycles.

---

## [2.2.0] - 2026-10-17

### Added
- **Viewport-Aware Lazy Loading (`LazySection.vue`):** Implemented intersection-based lazy loading with 450px rootMargin anticipation, SSR safety, route-hash synchronization, and `content-visibility: auto` to optimize rendering performance across below-the-fold sections.
- **Authentic Parchment Skeleton Loaders (`SectionSkeleton.vue`):** Designed lightweight tactile skeleton placeholders matching the neo-brutalist paper aesthetic (`--primitive-cream-100` canvas and `--color-border-bold` ink borders) with subtle non-glitzy shimmer animations.
- **Word-by-Word Text Reveal Animation (`TextReveal.vue`):** Implemented native Vue 3 text reveal with `fade-in-blur`, `blur`, `scale`, `slide`, and `fade` presets. Tailored specifically for Persian typography to maintain cursive ligatures, non-breaking half-spaces (ZWNJ), and screen-reader accessibility (`.sr-only`), staggered with smooth cubic-bezier easing.
- **Section Heading & Badge Reveals:** Integrated `TextReveal` across all major website titles, subtitles, and badges:
  - Hero headline: «خیالت از توسعه نرم‌افزار راحت؛ کار رو بسپر من!»
  - Services: «تخصص‌های تیم»، «خدمات تخصصی و زمینه کاری ما»، and descriptive subtitle.
  - Projects: «پورتفولیو و نتایج»، «نمونه‌کارها و پروژه‌های واقعی»، and descriptive subtitle.
  - Process: «مراحل کار»، «چگونه کارها را به ما می‌سپارید؟»، and descriptive subtitle.
  - Contact: «ارتباط با استودیو»، «ثبت سفارش و آغاز گفتگو»، and descriptive subtitle.
  - About: «داستان و ارزش‌های تیم» and «چرا «بسپر من» ساخته شد؟».
- **Playful Comic Scroll Pop-up Kinematics (`.comic-pop`):** Added spring overshoot physics (`cubic-bezier(0.34, 1.56, 0.64, 1)`) with alternating retro comic tilts and staggered entrance delays on service cards, process step boxes, and about callouts upon scrolling into view.
- **UI Components Directory (`src/components/ui/`):** Established dedicated UI directory containing standard motion components, including native `TextReveal.vue` and preserved external React templates (`text-reveal.tsx`, `demo.tsx`).

---

## [2.1.1] - 2026-10-17

### Fixed
- **Cross-Route Navbar & Footer Section Navigation:** Resolved an issue where clicking navigation items (e.g., «درباره ما», «خدمات», «ثبت سفارش») or footer quick links while viewing a project detail page (`/projects/:slug`) simply updated the URL fragment (e.g., `/projects/besporman-web#about`) without returning to the homepage. Navigation now cleanly transitions to the homepage (`/`) and smoothly scrolls to the requested anchor target.
- **Vue Router Async Scroll Restoration:** Added polling retry in router `scrollBehavior` to reliably find and scroll to section targets (`to.hash`) across lazy-mounted view transitions.
- **Header Active Tab & Mascot Synchronization:** Synchronized `activeTab` with route and hash changes to keep the anime mascot indicator resting accurately above «نمونه‌کارها» on project detail pages, and dynamically tracking target sections upon cross-route return.
- **ScrollSpy Query Selector Safety:** Replaced fragile `document.querySelector(item.href)` with `document.getElementById(item.id)` to prevent invalid DOM selector exceptions with absolute path hashes.

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
