# Changelog

All notable changes to the Besporman project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.10.0] - 2026-10-25

### Added
- **Pointing Hand Dropdown Cursor Module (`SmoothDropdown.vue`, `CustomCursor.vue`):**
  - Converted and integrated authentic vintage manicule engraving asset (`pic/webp/cursor_dropdown.webp`) pointing left towards options.
  - Positioned cursor on the right edge (`inset-inline-start`) of hovered dropdown options in submit request forms.
  - Smooth spring gliding transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) moving the indicator vertically between hovered options without layout shifts.
  - Choreographed handoff coordination with `CustomCursor.vue`: default upright cursor smoothly scales down and fades out when mouse enters the dropdown flyout, seamlessly handing off focus to the dropdown manicule.
  - Dedicated right-side gutter (`padding-inline-start: 56px`) with micro-kinetic text nudge (`translateX(-3px)`) and tactile mousedown click punch (`translateX(-4px)`).
  - Keyboard navigation (ArrowDown, ArrowUp, Enter/Space) automatically synchronizing indicator position.
  - Full `prefers-reduced-motion` safety fallbacks.

---

## [2.9.9] - 2026-10-23

### Changed
- **Unified Keyframed Tactile Animations for Telegram Direct Button (`ContactSection.vue`):**
  - Upgraded the Telegram direct button (`.telegram-btn`, `.neo-telegram-btn`) to match the submit button's tactile neo-brutalist interaction suite:
    - Multi-phase keyframed spring hover lift (`btn-hover-keyframe`) with 6px tactile drop shadow.
    - Luminous sheen glide sweep across the button surface (`btn-sheen-sweep`).
    - Fixed docked arrow badge architecture with elastic forward spring nudge (`btn-arrow-spring`), eliminating cross-button jumping.
    - Tactile active press state (`translate(2px, 2px)` with shadow contraction) and smooth cubic-bezier return transition.
    - Subtle label nudge (`translateX(-2px)`) on hover and `prefers-reduced-motion` compliance.

---

## [2.9.8] - 2026-10-23

### Changed
- **Minimalist 404 Return Home Button (`Error404Page.vue`):**
  - Removed arrow icon from the `برگرد به خونه` button on the 404 page for a cleaner, centered typography look.

---

## [2.9.7] - 2026-10-23

### Changed
- **404 Page Copy Refinement (`Error404Page.vue`, `tests/not-found.spec.ts`):**
  - Updated headline to warm conversational Persian: `«به نظر میاد صفحه‌ای که دنبالشی توی آسمونا گم شده!»`.
  - Updated subtext to gentle prompt: `«میخوای خیلی آروم به صفحه اصلی برگردیم؟»`.
  - Updated return button call to action to: `«برگرد به خونه»`.
  - Synchronized unit test assertions in `tests/not-found.spec.ts`.

---

## [2.9.6] - 2026-10-23

### Added
- **Atmospheric Cloud Backdrop 404 Page (`Error404Page.vue`, `NotFoundView.vue`, `tests/not-found.spec.ts`):**
  - Integrated the layered SVG cloud and sky backdrop (`#1e3266` deep twilight blue sky, `#356cb1` mid-layer cloud ridge, and `#FAF7F0` billowing foreground cloud wave) into a dedicated reusable component `src/components/ui/Error404Page.vue`.
  - Added subtle floating cloud drift animations (`cloudDriftSlow`, `cloudDriftFast`) and floating 404 title animation (`floatTitle`) with `prefers-reduced-motion` compliance.
  - Fully translated copy to natural, warm Persian:
    - Giant display title `۴۰۴` in Lalezar typography.
    - Headline: `«اوپس! به نظر می‌رسد صفحه‌ای که به دنبال آن بودید میان ابرها گم شده است.»`.
    - Reassuring subtext: `«آدرسی که وارد کرده‌اید وجود ندارد یا ممکن است تغییر کرده باشد. نگران نباشید، همه چیز سر جایش است!»`.
    - Tactile return home button: `«بازگشت به صفحه اصلی»` linking to `/` via Vue Router with neo-brutalist pill button styling and `AppButtonArrow`.
  - Added comprehensive unit test suite in `tests/not-found.spec.ts` verifying SVG layers, Persian translations, and navigation target.

---

## [2.9.5] - 2026-10-23

### Added
- **Keyboard Layout Auto-Transposition & Mobile Language Alerts (`keyboardLayout.ts`, `AppToast.vue`, `ContactSection.vue`):**
  - Implemented desktop automatic QWERTY-to-Persian layout transposition for the Full Name field (e.g. typing `d` on an English keyboard layout instantly outputs `ی` with seamless caret preservation).
  - Added reverse Persian-to-English transposition for the Telegram ID and Link / Documentation inputs (e.g. typing `ی` on a Persian layout instantly outputs `d`).
  - Created neo-brutalist tactile toast notification system (`AppToast.vue`) that alerts mobile users with warning toasts when their virtual keyboard language mismatches expected field language.
  - Added comprehensive unit test suite (`tests/keyboard-layout.spec.ts`) validating transposition and normalization across 18 edge cases.

### Changed
- **Full Name Requirement (`ContactSection.vue`, `tests/contact.spec.ts`):**
  - Updated field label from `نام یا نام‌خانوادگی:` to `نام و نام خانوادگی :`.
  - Enforced strict validation requiring both first and last name in Persian script before form submission is permitted.
- **Iranian Mobile Phone Number Validation (`ContactSection.vue`, `keyboardLayout.ts`):**
  - Added phone normalization and validation enforcing 11-digit Iranian numbers starting with `09` (e.g. `09123456789`).
  - Added support for Persian/Arabic numeral auto-conversion and international prefix stripping (`+989...` / `00989...` -> `09...`).
- **Unrestricted Description Input:**
  - Preserved complete multilingual flexibility for the project description (`#project-message`) allowing unrestricted Persian, English, code snippets, and symbols with the existing 30-character threshold.

---

## [2.9.4] - 2026-10-23

### Added
- **Banner Illustration in Process Section (`ProcessSection.vue`, `pic/webp/request_steps.webp`):**
  - Integrated `pic/webp/request_steps.webp` inside a brutalist bordered side frame within `.process-main-card`, mirroring the exact double-panel card architecture of the About section (`AboutSection.vue`).
  - Positioned the 4 process steps on the right column (`.process-content`) and the banner illustration on the left column (`.process-side-panel`) with responsive stacked behavior on mobile screens.
  - Converted `request_steps.png` to optimized WebP (`25.9 KB`) adhering strictly to project WebP-only asset policy.
- **WebP Migration for Cursor Asset (`CustomCursor.vue`, `AppLoadingScreen.vue`, `pic/webp/cursor.webp`):**
  - Converted custom pointer cursor to WebP format (`cursor.webp`), updating component imports and preloading arrays to enforce strict WebP compliance across the entire codebase.

### Changed
- **Process Section Layout & DOM Architecture (`ProcessSection.vue`):**
  - Restructured the 4 process steps into a balanced 2x2 grid inside `.process-main-card`.
  - Removed duplicate `id="process"` on the `<section>` element to ensure clean single-target DOM anchor navigation via `LazySection`.

---

## [2.9.3] - 2026-10-23

### Changed
- **Smooth Keyframed Tactile Submit Button Animations (`ContactSection.vue`):**
  - Replaced the abrupt 120ms transition on `.neo-submit-btn` with a fluid, multi-phase keyframed spring hover animation (`btn-hover-keyframe`).
  - Added an elegant luminous sheen glide sweep across the button surface (`btn-sheen-sweep`) on hover.
  - Docked the nested arrow badge cleanly within the flex layout, preventing it from jumping across long button widths, and added an elastic keyframed nudge animation (`btn-arrow-spring`) in the direction of Persian reading flow.
  - Implemented tactile active press feedback and smooth spring settling upon cursor release (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## [2.9.2] - 2026-10-23

### Changed
- **Unified Telegram Deep Link (`ContactSection.vue`, `projects.ts`, `tests/contact.spec.ts`):**
  - Updated all direct Telegram action links across the project to point to the official project bot: `https://t.me/besporman_bot`.
  - Added dedicated `telegramUrl: 'https://t.me/besporman_bot'` to the Telegram Bot project item (`prj-02`) enabling direct bot launch from project details.

---

## [2.9.1] - 2026-10-23

### Changed
- **Official Telegram Brand Icon Integration (`ContactSection.vue`):**
  - Replaced the generic paper airplane line/polygon SVG with the authentic Telegram brand icon (official blue circular badge with brutalist border and signature white cutout airplane in direct contact card, and official Telegram logo in the contact method switcher).
- **Simplified Telegram Contact Placeholder (`ContactSection.vue`):**
  - Updated placeholder for Telegram input to strictly display `مثال: @telegram`, removing redundant `یا شماره همراه` text.
  - Refined validation message to `لطفاً آیدی تلگرام خود را وارد کنید (مثال: @telegram).` with updated test assertion in `tests/contact.spec.ts`.

---

## [2.9.0] - 2026-10-23

### Added
- **Animated Circular Progress Bar (`AnimatedCircularProgressBar.vue`, `animated-circular-progress-bar.tsx`):**
  - Integrated a dynamic circular progress gauge at the head of the project inquiry card.
  - Smoothly completes in real-time as fields are filled: Project Stage (15%), Name (15%), Contact Info (20%), Estimated Budget (15%), Timeline (15%), and Description (20% proportional up to 30 characters).
  - Persian numeral counter with Vazirmatn typography, responsive SVG stroke calculations, and full `role="progressbar"` accessibility.
- **Smooth Dropdown Component (`SmoothDropdown.vue`, `smooth-dropdown.tsx`):**
  - Built custom accessible neo-brutalist dropdown menu featuring kinetic left-bar indicator, spring transition flyouts, checkmark indicators, keyboard navigation, and outside-click handling.
  - Follows dynamic trigger label format: `{Title}: ...` which morphs to `{Title}: [Selected Option]` upon selection.
- **High-Leverage Inquiries Filtering Fields:**
  - **Estimated Budget Range (`budgetRange`):** Standardized tiers (`< 10M`, `10M-30M MVP`, `30M-70M Full Production`, `70M+ Enterprise`, `Need Estimate`) to align client expectations and filter low-intent inquiries.
  - **Target Timeline / Urgency (`timeline`):** Defined urgency intervals (`Immediate < 2 weeks`, `1-2 months`, `Flexible / Planning stage`).
  - **Reference Link Input (`referenceLink`):** Optional dedicated single-line field with LTR enclave for Figma, GitHub, or documentation URLs.
- **Preferred Contact Method Toggle (`contactMethod`):**
  - Added dedicated toggle switcher for `[تلگرام]` vs `[تماس / پیامک]` with dynamic placeholder and input mode adjustments to prevent broken usernames or omitted dial codes.
- **Guided Description Field with Mini-Prompt & Character Counter:**
  - Upgraded textarea placeholder to act as a structured mini-prompt: `«۱. هدف اصلی پروژه چیست؟ ۲. مخاطبان آن چه کسانی هستند؟ ۳. آیا دیزاین یا سیستم قبلی دارید؟»`.
  - Added a live character counter requiring **minimum 30 characters** with dynamic color feedback to prevent one-sentence low-intent submissions.

### Changed
- **Removed Legacy Service Category Selector:**
  - Removed old 3 category buttons (web, bot, windows) in favor of 3 Project Stage pills: `ایده جدید` (New idea), `ارتقا یا توسعه پروژه فعلی` (Upgrading existing system), and `مشاوره فنی` (Technical consultation).
- **Neo-Brutalist Focus States & Action-Driven CTA:**
  - Replaced submit button text with action-driven copy: `دریافت مشاوره و برآورد هزینه` (with subtext `ثبت و ارسال پیام`).
  - Added response time badge directly below submit button: `«پاسخگویی معمولاً در کمتر از ۲۴ ساعت در تلگرام»`.
  - Upgraded focus states across all inputs to switch to accent red (`#D93829`) with 3px brutalist borders and offset box-shadows.
- **Backend Boundary & Validation Adapter (`contactAdapter.ts`):**
  - Updated `ContactMessagePayload` interface with new structured inquiry fields.
  - Updated `DevelopmentContactAdapter` to enforce 30-character message minimum while continuing to return honest `NOT_CONFIGURED` status.
- **Test Suite Updates (`tests/contact.spec.ts`):**
  - Added test coverage for real-time progress bar calculation, stage selection, contact info validation, and 30-char description threshold.

---

## [2.8.5] - 2026-10-23

### Fixed
- **Loading Screen Image Asset Readiness Barrier (`AppLoadingScreen.vue`):**
  - Resolved issue where loading screen dismissed before critical visual assets and header were loaded.
  - Implemented explicit preloading and GPU bitmap decoding (`img.decode()`) for all critical assets (`header_1.webp`, `header_2.webp`, `header_3.webp`, `besporman1.webp`, `besporman2.webp`, `neon_sign_off.webp`, `neon_sign_on.webp`, `favicon.png`, `cursor.png`).
  - Added full document image verification (`waitForDomImages`) and window `load` event listener to ensure that the loading curtain never lifts while assets are still pending.
  - Added above-the-fold `<link rel="preload">` resource hints in `index.html` for instant parallel browser fetching.
- **Removed Raw Formatting Asterisks from Project Showcase (`ProjectDetailView.vue`, `projects.ts`):**
  - Removed raw markdown `**` formatting asterisks from `caseStudyMarkdownFa` in `src/data/projects.ts`.
  - Upgraded case study parsing in `src/views/ProjectDetailView.vue` to strip all markdown asterisks and properly render subheadings (`<h3>`) and clean paragraphs (`<p>`).
  - Added unit test assertion in `tests/project-detail.spec.ts` guaranteeing no formatting asterisks appear in case study output.

---

## [2.8.4] - 2026-10-22

### Changed
- **Section Titles Typing & Fast Backspacing Effect (`TypingEffect.vue`):**
  - Replaced the sand grain dissolution canvas with a realistic typing and held-Backspace reverse clearing animation across all 6 section headings.
  - **Cadence & Timings:**
    - Forward typing character-by-character at `typingSpeed = 65ms`.
    - 2-second hold period (`holdDelay = 2000ms`) once the full title is typed.
    - Rapid reverse clearing at `deletingSpeed = 25ms` (~2.6x quicker than forward typing), simulating a held Backspace key.
    - 1.5-second pause (`clearedDelay = 1500ms`) once cleared before starting to type again.
  - **Tactile Micro-Interactions:** Cursor stays solid during active typing/deleting and blinks during hold pauses.
  - **Performance & Zero CLS:** Completely removed the canvas particle simulation, reducing bundle size and GPU overhead while preserving full Zero Cumulative Layout Shift via ghost text geometry and screen-reader accessibility.
  - **Test Suite:** Added comprehensive unit tests in `tests/typing-effect.spec.ts` covering full cycle timings and reduced motion compliance.

---

## [2.8.3] - 2026-10-22

### Changed
- **ModernLoader Topbar Layout Refinement:**
  - Removed the `LIVE` status pill indicator from the loader top bar.
  - Positioned the official Besporman mascot favicon badge on the top right corner of the window.
  - Removed text titles (such as `Besporman.app`) across both desktop and mobile viewports, achieving a minimalist, symmetric, and distraction-free macOS coding window header.
  - Balanced window control dots on the left (`min-width: 48px`) with the favicon badge on the right (`min-width: 48px`), centering the Persian typewriter status copy on all screen widths down to 320px.

---

## [2.8.2] - 2026-10-22

### Added
- **Featured Website Showcase Image (`besporman_website_showcase.webp`):** Converted raw `pic/website_showcase.png` to high-performance WebP (303KB, 90% compression quality) and integrated it into the featured project card in `ProjectsSection.vue` and `ProjectDetailView.vue`, replacing the legacy "Besporman Core" placeholder box.
- **Strict WebP Format Enforcement:** Mandated WebP (`.webp`) as the exclusive raster image format across the entire repository in `AGENTS.md`, `GEMINI.md`, and `DESIGN_SYSTEM.md`. Banned PNG, JPEG, JPG, and GIF from production UI and components (with sole exceptions for `/favicon.png` and vector SVGs in `pic/svg/`).

---

## [2.8.1] - 2026-10-22

### Added
- **Flickering Text Effect for Navbar Brand Title (`FlickeringText.vue`):** Applied an animated deterministic value noise flickering effect to the `بسپر من` title in `TheHeader.vue`.
  - Driven by odd-prime hashing and smoothstep value noise interpolation across individual character lanes and a shared lane (`correlation: 0.5`).
  - Multi-tier bloom halo using comic accent red (`#D93829`) with tight-to-wide radial falloff layers.
  - Seamlessly integrates with Vazirmatn cursive ligatures without breaking character shapes.
  - Full `prefers-reduced-motion` compliance with static rendering fallback.
  - Preserved `brandTextRef` anchor element for desktop mascot stage positioning.
- **Reference UI Component:** Saved `src/components/ui/flickering-text.tsx` reference component.

---

## [2.8.0] - 2026-10-22

### Added
- **Modern macOS Code IDE Streaming Loader (`ModernLoader.vue`):** Replaced legacy liquid droplet loader with an authentic macOS coding window loader in `src/components/AppLoadingScreen.vue`.
  - Top bar features 3 macOS window controls (`#FF5F56` close, `#FFBD2E` minimize, `#27C93F` maximize), official Besporman app favicon badge (`/favicon.png`), an animated typewriter displaying Persian status copy (`«در حال راه‌اندازی استودیو...»`, `«بارگذاری ماژول‌های پروژه...»`, etc.), and a pulsating `LIVE` status pill.
  - Editor body streams simulated syntax-highlighted code blocks with dynamic colors (brand accent red, cyan, emerald, warm amber, royal blue, purple slate), indentation, circle tokens, divider lines, and a blinking cursor at the active line.
  - Features sliding buffer memory management to prevent memory leaks during long-running sessions, and `?debug_loader=1` query parameter for developer inspection.
- **Interactive Mouse/Touch Tracking Eyes (`EyeTracking.vue`):** Integrated hardware-accelerated pupil-tracking eyes in `src/components/ProjectsSection.vue` directly below the section heading:
  - Damped spring physics (`stiffness: 300, damping: 25`) with independent eye calculations.
  - Proximity-based reactive pupil dilation, desynchronized natural blinking intervals, and idle micro-movement wandering routines.
  - High-contrast comic glints/reflections and 2px deep ink borders matching the studio's tactile paper aesthetic.
- **Reference UI Components:** Added reference React components `src/components/ui/modern-loader.tsx` and `src/components/ui/eye-tracking.tsx` to maintain component library standard documentation.

### Changed
- **Loading Screen Architecture:** Updated `AppLoadingScreen.vue` to host `ModernLoader.vue` with optimized desktop and mobile dimensions (320px floor compliant).
- **Test Suite Updates:** Extended `tests/loader.spec.ts` with tests verifying `ModernLoader` window controls, favicon badge, typewriter title container, code lines, and `AppLoadingScreen`.

---

## [2.7.0] - 2026-10-22

### Added
- **Typing Effect with Sand Dissolution Particle Physics (`TypingEffect.vue`):** Implemented an animated Persian-first typing component in `src/components/ui/TypingEffect.vue`. Features character-by-character cadence, a pulsing accent-red comic ink cursor, a 3-second hold period (`rotationInterval = 3000ms`), and a custom HTML5 canvas sand grain dissolution simulation where the text breaks apart into warm amber, tan, and ink particles floating upward and drifting away into the air.
- **Zero-CLS Ghost Layout Preservation:** Employs an invisible ghost text layer that locks the exact line wrap, width, and height of the full title, preventing any layout shifts (Cumulative Layout Shift = 0.00) during typing or dissolution.
- **Full Title Integration Across All 6 Sections:** Replaced static reveal headings with `TypingEffect` across:
  1. Hero: «خیالت از توسعه نرم‌افزار راحت؛ کار رو بسپر من!» (with «بسپر من!» highlighted in comic accent red).
  2. Reviews: «نظرات مشتریای عزیزمون».
  3. Services: «خدمات تخصصی و زمینه کاری ما».
  4. Process: «چگونه کارها را به ما می‌سپارید؟».
  5. Projects: «نمونه‌کارها و پروژه‌های واقعی».
  6. Contact: «ثبت سفارش و آغاز گفتگو».
- **Accessibility & Motion Floors:** Added `.sr-only` screen-reader titles for SEO and WCAG AA compliance, and `prefers-reduced-motion` detection that provides static rendering without infinite loops or particle animations.
- **Reference UI Component:** Added `src/components/ui/typing-effect.tsx` as reference matching the project UI component structure.

---

## [2.6.0] - 2026-10-22

### Added
- **Curved SVG Arrow Badge & Morphing Animation Component (`AppButtonArrow.vue`):** Replaced legacy unicode text glyph arrows across all buttons with tactile curved SVG square badges. Implemented hardware-accelerated dual-vector crossfade morphing (`.arrow-idle` / `.arrow-hover`) where the curved arrow glides across the button to the opposite edge and smoothly morphs into its paired curve direction on hover.
- **Directional Curve Pairings:** Calibrated exact SVG pairings across all 4 interaction dimensions:
  - `left` (forward action in Persian RTL): Idle curves down-left (`curve-arrow-left-sqaure`) → Hover curves up-left (`curve-arrow-left-sqaure-2`).
  - `external` / `right` (outbound/external actions): Idle curves up-right (`curve-arrow-right-square`) → Hover curves down-right (`curve-arrow-right-square-2`).
  - `up` (back to top action): Idle curves up-left (`curve-arrow-up-square`) → Hover curves up-right (`curve-arrow-up-square-2`).
  - `down`: Idle curves down-right (`curve-arrow-down-square`) → Hover curves down-left (`curve-arrow-down-square-2`).

### Changed
- **Design System Color Alignment on Button Badges:** Matched all 8 curved SVG icons in `pic/svg/` and `AppButtonArrow.vue` to the design system palette (`#FEF3C7` Warm Amber for background chips, `#0E0F12` Iron Charcoal for ink strokes and borders).
- **Button Badge Architecture & CSS Modernization:** Replaced obsolete circular background styles and text-glyph `rotate(-45deg)` declarations in `base.css`, `TheHeader.vue`, `HeroSection.vue`, and `NotFoundView.vue` with centralized `.btn-arrow` morphing and gliding trajectory rules.

---

## [2.5.5] - 2026-10-22

### Changed
- **Zero-Gap Navbar Button Architecture:** Removed the `var(--space-2)` (8px) gap between desktop navbar buttons (`.nav-list { gap: 0; }`). All five navigation links now abut with zero pixel gap, creating continuous, seamless horizontal hitboxes.
- **Continuous Hover Intent & Debounced Exit:** Moved mouseleave event handling to the parent `.nav-list` container and introduced a 60ms debounce window. Sweeping the cursor across adjacent links transitions `hoveredTab` directly without dropping to null, preventing mascot animation jitter, glitchy bob/wiggle toggling, or false resets towards the brand title.
- **Refined Pill Inset Aesthetics:** Applied `inset: 0 2px` to `.nav-pill-active` and `.nav-pill-hover`, maintaining crisp discrete visual separation between active and hovered tabs while preserving edge-to-edge interactive hitboxes.
- **SVG Asset Reorganization:** Relocated all project SVG vector assets (`star-empty.svg`, `star-favorite-svgrepo-com.svg`, `star-full.svg`, `star-half.svg`, and UI arrow icons) into a dedicated `pic/svg/` subdirectory for structured asset organization and documented vector sources in `StarRating.vue`.
- **Circular Brand Logo Frame Architecture:** Updated header and footer brand logo badges to circular frames (`border-radius: var(--border-radius-full)`), with a calibrated 2px subtle uniform margin between the circular frame's comic border and the circular logo.

### Added
- **Automated Continuous Hover Testing:** Added unit tests in `tests/navigation.spec.ts` asserting uninterrupted hover continuity during adjacent link cursor transfers and graceful debounced container exits.

---

## [2.5.4] - 2026-10-19

### Added
- **Brand Title Mascot Perch & Smooth Leap Animation:** Configured the anime mascot to stay comfortably perched on the left edge of the «بسپر من» title when viewing the top of the page (Hero & Marquee), rather than fading away.
- **Hardware-Accelerated 3D Header Kinematics:** Promoted the mascot indicator to the parent `.header-container` coordinate space with `translate3d()` and GPU compositing (`will-change: transform`). When scrolling down from the top, the mascot smoothly leaps from the brand title over to «خدمات» (`cubic-bezier(0.34, 1.4, 0.64, 1)`), and seamlessly returns to the brand title when scrolling back up.
- **Brand Hover Micro-Interaction:** Added `@mouseenter="handleMouseEnter('brand')"` on the brand link, allowing the mascot to happily wiggle and display sparkles when hovering over the brand logo.
- **Responsive Mobile Isolation:** Isolated the desktop mascot within a media query (`@media (max-width: 859px) { display: none; }`) to ensure mobile layout clarity alongside the morph menu button.

### Removed
- **Project Filter Tabs:** Removed category filter tab buttons («همه پروژه‌ها», «طراحی وب‌سایت», «بات‌های تلگرام», «نرم‌افزارهای ویندوز») from `ProjectsSection.vue`, presenting all authentic portfolio projects in a unified, distraction-free gallery starting with the featured project card.

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
