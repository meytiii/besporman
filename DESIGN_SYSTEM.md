# Besporman (بسپر من) — Canonical Design System Specification

> **Status:** Canonical Source of Truth (Approved by Owner)  
> **Version:** 2.1.0  
> **Applicability:** All AI Coding Agents, Pair Programmers, and Frontend Engineers  
> **Repository:** `meytiii/besporman`  
> **Target Framework:** Vue 3 (Composition API, `<script setup lang="ts">`) · Vite · TypeScript Strict Mode  
> **Routing Architecture:** Vue Router 4 (HTML5 History Mode)  
> **Language & Direction:** Persian-First (`<html lang="fa" dir="rtl">`) · Right-to-Left (RTL)

---

## 1. Brand Identity, Aesthetic Philosophy & Anti-Slop Gates

### 1.1 Studio Overview & Core Disciplines
**Besporman (بسپر من — "Leave it to me")** is a specialized Iranian software development team delivering high-reliability digital products across three distinct disciplines:
1. **طراحی و توسعه وب‌سایت (Web Design & Development):** High-performance, responsive, bespoke web platforms.
2. **بات‌های اختصاصی تلگرام (Telegram Bots):** Automated workflows, transactional tools, customer onboarding bots, and Telegram Mini-Apps.
3. **اپلیکیشن‌های ویندوز (Windows Applications):** Native desktop utilities, business automation software, and performant local GUI tools.

The studio's name encapsulates an ethos of decisive craftsmanship, absolute reliability, and relief for the client. When a client hands a project to Besporman, technical friction evaporates.

### 1.2 Creative Direction: Vintage Persian Comic Art × Neo-Brutalist Engineering
The visual identity fuses **1950s Iranian comic-book art and print culture** with **disciplined, tactile neo-brutalist engineering**. It communicates wit, warmth, and approachable mastery without sacrificing professional credibility.

```
┌────────────────────────────────────────────────────────────────────────┐
│  VINTAGE COMIC INFLUENCE         NEO-BRUTALIST ENGINEERING             │
│  - Warm paper canvas (#FAF7F0)   - Crisp 2px/3px black ink borders     │
│  - Expressive character frontman - Unblurred physical offset shadows   │
│  - Display poster lettering      - Strict 8-state interactive matrix   │
│  - Playful, direct Persian copy  - WCAG 2.2 AA accessibility floors    │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Strict Anti-Slop Enforcements
In adherence to `/hallmark`, `/high-end-visual-design`, and repository rules:
* ❌ **No Arbitrary Purple/Neon Glows or Dark Mesh Gradients:** The brand operates exclusively on an authentic editorial warm paper canvas.
* ❌ **No Dark-Mode Flips:** Besporman is designed with a coherent, unified tactile paper identity. Uncontrolled dark theme flipping is barred.
* ❌ **No Fake UI Chrome:** No decorative faux-browser bars, fake traffic-light window dots, or synthetic code windows.
* ❌ **No Fabricated Metrics or Testimonials:** Zero synthetic conversion stats ("500k+ users", "99.9% happiness") or invented client logos.
* ❌ **No Emojis as UI Icons:** Use purposeful, monochrome SVG glyphs (Phosphor or Tabler icons) sized consistently.
* ❌ **No Horizontal Scroll Bugs:** Root elements must have `overflow-x: clip`. Responsive behavior must be verified down to $320\text{px}$ viewport width.
* ❌ **No Faux-Bolding:** Display faces like Lalezar must never be synthetically bolded (`font-synthesis: none;`).

---

## 2. Technical Stack & Hosting Prerequisites

### 2.1 Core Framework & Tooling
* **Framework:** Vue 3 using Composition API and `<script setup lang="ts">`.
* **Language:** TypeScript in strict mode (`noImplicitAny: true`, zero `any`).
* **Build Tool:** Vite with fast HMR and tree-shaking.
* **Routing:** Vue Router 4 using HTML5 History Mode (`createWebHistory()`).
  * **Homepage:** A single-page scrolling layout incorporating Hero, Services, Marquee, Projects Overview, and **Inquiry/Contact section (`#contact`)**.
  * **Project Detail Routes:** Dedicated routes (`/projects/:slug`) for comprehensive case studies.
* **Styling Architecture:** Vanilla CSS Custom Properties (`assets/css/tokens.css`), scoped component styles, with zero heavy runtime CSS dependencies.

### 2.2 Hosting Portability & Server Fallback Prerequisites
Vue Router HTML5 history mode produces clean URLs (e.g. `/projects/warehouse-bot`), which requires the production web server to rewrite all incoming non-asset requests back to `/index.html`:
* **Nginx:** `try_files $uri $uri/ /index.html;`
* **Cloudflare Pages:** `_redirects` file with `/* /index.html 200`
* **Netlify:** `_redirects` file with `/* /index.html 200`
* **Apache:** `.htaccess` with `RewriteRule ^ index.html [L]`
* *Standard GitHub Pages Note:* Does not natively support history fallback without custom 404 workarounds; static deployment target must be designated accordingly.

---

## 3. Color System, Design Tokens & Verified Contrast Matrix

### 3.1 3-Tier Design Tokens (Primitives → Semantics → Components)
```css
:root {
  /* ==========================================================================
     1. Primitive Swatches
     ========================================================================== */
  --primitive-cream-50:   #FAF7F0; /* Primary Parchment Paper Canvas */
  --primitive-cream-100:  #F4EFE6; /* Elevated Card / Surface */
  --primitive-cream-200:  #EBE3D5; /* Subtle Inset / Framing Surface */
  --primitive-ink-950:    #0E0F12; /* Deep Charcoal Black Ink */
  --primitive-ink-800:    #27272A; /* Secondary Ink / Deep Muted */
  --primitive-ink-600:    #52525B; /* Accessible Muted Copy */
  --primitive-ink-500:    #71717A; /* Accessible Structural Border */
  --primitive-ink-400:    #78716C; /* Warm Slate / Secondary Border */
  --primitive-red-600:    #D93829; /* Restrained Comic Accent Red (Display/Buttons) */
  --primitive-red-700:    #C92A1D; /* Calibrated Red for Small Body Text */
  --primitive-red-800:    #B91C1C; /* Hover State for Red Buttons */
  --primitive-red-900:    #991B1B; /* Active / Pressed State */
  --primitive-sage-100:   #E2E8DF; /* Vintage Comic Soft Green */
  --primitive-tan-100:    #F0EAD6; /* Secondary Warm Comic Neutral */
  --primitive-white:      #FFFFFF; /* High-Contrast Knockout */

  /* ==========================================================================
     2. Semantic Color Tokens
     ========================================================================== */
  --color-canvas:         var(--primitive-cream-50);
  --color-surface:        var(--primitive-cream-100);
  --color-surface-sunken: var(--primitive-cream-200);
  --color-ink-primary:    var(--primitive-ink-950);
  --color-ink-muted:      var(--primitive-ink-600);
  
  /* Dual-Red Strategy: Display/CTA vs Body Text */
  --color-accent:         var(--primitive-red-600); /* Buttons & Display (>= 24px) */
  --color-accent-text:    var(--primitive-red-700); /* Small text links & errors (< 24px) */
  --color-accent-hover:   var(--primitive-red-800);
  --color-accent-active:  var(--primitive-red-900);
  
  --color-border-bold:    var(--primitive-ink-950);
  --color-border-subtle:  var(--primitive-ink-400);

  /* Status & Feedback Semantics */
  --color-error-bg:       #FEE2E2;
  --color-error-text:     #991B1B;
  --color-success-bg:     #DCFCE7;
  --color-success-text:   #166534;
  --color-warning-bg:     #FEF9C3;
  --color-warning-text:   #854D0E;
  --color-info-bg:        #DBEAFE;
  --color-info-text:      #1E40AF;

  /* Inactive / Disabled Semantics */
  --color-disabled-bg:     #E4E4E7;
  --color-disabled-text:   #71717A;
  --color-disabled-border: #A1A1AA;
}
```

### 3.2 Mathematically Verified Contrast Matrix (WCAG 2.2 AA)
All ratios are calculated from relative luminance: $\text{Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$.
* **Small Text Threshold:** $\ge 4.5:1$ (for text $< 18\text{pt}$ / $24\text{px}$ or $< 14\text{pt}$ / $18.5\text{px}$ bold).
* **Large Text Threshold:** $\ge 3.0:1$ (for text $\ge 18\text{pt}$ / $24\text{px}$ or $\ge 14\text{pt}$ / $18.5\text{px}$ bold).
* **Non-Text UI Components:** $\ge 3.0:1$ (for active control boundaries, focus indicators, and state borders).
* *Exemption Note:* Inactive/disabled controls are legally exempt under WCAG 1.4.3 & 1.4.11.

| Intended Usage Role | Foreground Token | Background Surface | Calculated Ratio | Small Text ($\ge 4.5:1$) | Large Text ($\ge 3.0:1$) | Non-Text UI ($\ge 3.0:1$) | Compliance Status & Usage Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Body Text** | `--color-ink-primary` (`#0E0F12`) | `--color-canvas` (`#FAF7F0`) | **17.91 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** All body copy, list text, form values |
| **Secondary Metadata** | `--color-ink-muted` (`#52525B`) | `--color-canvas` (`#FAF7F0`) | **7.22 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Dates, category subtitles, helper text |
| **Display Heading / CTA** | `--color-accent` (`#D93829`) | `--color-canvas` (`#FAF7F0`) | **4.32 : 1** | ❌ Fail | ✅ Pass | ✅ Pass | **Restricted:** Headings $\ge 24\text{px}$ & badges only. **Banned for body text.** |
| **Small Inline Red Text** | `--color-accent-text` (`#C92A1D`) | `--color-canvas` (`#FAF7F0`) | **5.12 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Small text links, inline validation alerts |
| **Card Body Copy** | `--color-ink-primary` (`#0E0F12`) | `--color-surface` (`#F4EFE6`) | **16.73 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Text inside elevated cards and dialogs |
| **Card Secondary Copy** | `--color-ink-muted` (`#52525B`) | `--color-surface` (`#F4EFE6`) | **6.75 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Card footer tags, dates, tooltips |
| **Sage Badge Copy** | `--color-ink-primary` (`#0E0F12`) | `--primitive-sage-100` (`#E2E8DF`) | **15.37 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Telegram category tags & callouts |
| **Tan Badge Copy** | `--color-ink-primary` (`#0E0F12`) | `--primitive-tan-100` (`#F0EAD6`) | **15.92 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Windows category tags & info chips |
| **Primary Button Text (Default)**| `--primitive-white` (`#FFFFFF`) | `--color-accent` (`#D93829`) | **4.62 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Default primary CTA button label |
| **Primary Button Text (Hover)**  | `--primitive-white` (`#FFFFFF`) | `--color-accent-hover` (`#B91C1C`) | **6.47 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Hovered button label |
| **Primary Button Text (Active)** | `--primitive-white` (`#FFFFFF`) | `--color-accent-active` (`#991B1B`) | **8.31 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Mechanically depressed button label |
| **Disabled Button Text** | `--color-disabled-text` (`#71717A`) | `--color-disabled-bg` (`#E4E4E7`) | **3.81 : 1** | N/A (Exempt) | ✅ Pass | ✅ Pass | **Approved:** Inactive button (exempt under WCAG 1.4.3) |
| **Focus Indicator Ring** | `--color-ink-primary` (`#0E0F12`) | `--color-canvas` (`#FAF7F0`) | **17.91 : 1** | N/A | N/A | ✅ Pass | **Approved:** 2px solid keyboard focus indicator |
| **Neo-Brutalist Border**| `--color-border-bold` (`#0E0F12`) | `--color-canvas` (`#FAF7F0`) | **17.91 : 1** | N/A | N/A | ✅ Pass | **Approved:** Primary container and button outlines |
| **Input Control Boundary** | `--color-border-subtle` (`#78716C`) | `--color-canvas` (`#FAF7F0`) | **4.48 : 1** | N/A | N/A | ✅ Pass | **Approved:** Form input borders (WCAG 1.4.11 $\ge 3.0:1$) |
| **Disabled Border** | `--color-disabled-border` (`#A1A1AA`) | `--color-canvas` (`#FAF7F0`) | **2.40 : 1** | N/A (Exempt) | N/A | N/A (Exempt) | **Approved:** Inactive control boundary (exempt) |
| **Error Banner Text** | `--color-error-text` (`#991B1B`) | `--color-error-bg` (`#FEE2E2`) | **6.80 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Form error summary banner |
| **Success Banner Text** | `--color-success-text` (`#166534`)| `--color-success-bg` (`#DCFCE7`)| **6.49 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Confirmation notification message |
| **Warning Banner Text** | `--color-warning-text` (`#854D0E`)| `--color-warning-bg` (`#FEF9C3`)| **6.38 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Advisory notice banner |
| **Info Banner Text** | `--color-info-text` (`#1E40AF`) | `--color-info-bg` (`#DBEAFE`) | **7.15 : 1** | ✅ Pass | ✅ Pass | ✅ Pass | **Approved:** Informational callout text |

---

## 4. Typography System & Self-Hosted Asset Pipeline

### 4.1 Typeface Selection & Licenses
* **Lalezar (لاله‌زار):** Borna Izadpanah — **SIL Open Font License 1.1 (OFL-1.1)**.
  * Role: Display headings, hero title, comic sign callouts.
  * Weight: **Single weight only (Regular 400)**. Faux-bolding barred via `font-synthesis: none;`.
* **Vazirmatn (وزیرمتن):** Saber Rastikerdar — **SIL Open Font License 1.1 (OFL-1.1)**.
  * Role: Primary interface, body paragraphs, technical parameters, and Persian numerals.
  * Packaged Weights: **Regular (400)**, **Medium (500)**, **Bold (700)**.

### 4.2 Asset Pipeline: Vite Imported Assets Strategy
Font files reside in `src/assets/fonts/` to leverage Vite's content-hashing, asset bundling, and base-path flexibility:
```css
/* src/assets/css/fonts.css */
@font-face {
  font-family: 'Lalezar';
  src: url('../fonts/Lalezar-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block; /* Block fallback font rendering to ensure zero FOUT on display typography */
}

@font-face {
  font-family: 'Vazirmatn';
  src: url('../fonts/Vazirmatn-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Vazirmatn';
  src: url('../fonts/Vazirmatn-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Vazirmatn';
  src: url('../fonts/Vazirmatn-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### 4.3 Typography Scale (Major Third - 1.25 Modular System)
```css
:root {
  --font-display: 'Lalezar', -apple-system, sans-serif;
  --font-body:    'Vazirmatn', -apple-system, BlinkMacSystemFont, Tahoma, sans-serif;
  --font-mono:    'Cascadia Code', 'Consolas', 'Courier New', monospace;

  --text-xs:    clamp(0.75rem,  0.70rem + 0.25vw, 0.8125rem); /* 12px - 13px */
  --text-sm:    clamp(0.875rem, 0.82rem + 0.28vw, 0.9375rem); /* 14px - 15px */
  --text-base:  clamp(1.00rem,  0.95rem + 0.25vw, 1.0625rem); /* 16px - 17px */
  --text-lg:    clamp(1.1875rem,1.10rem + 0.44vw, 1.25rem);   /* 19px - 20px */
  --text-xl:    clamp(1.4375rem,1.30rem + 0.69vw, 1.5625rem); /* 23px - 25px */
  --text-2xl:   clamp(1.75rem,  1.55rem + 1.00vw, 2.00rem);   /* 28px - 32px */
  --text-3xl:   clamp(2.1875rem,1.90rem + 1.44vw, 2.50rem);   /* 35px - 40px */
  --text-4xl:   clamp(2.75rem,  2.30rem + 2.25vw, 3.25rem);   /* 44px - 52px */
  --text-hero:  clamp(3.25rem,  2.70rem + 2.75vw, 4.25rem);   /* 52px - 68px */

  --leading-tight:  1.25;
  --leading-snug:   1.40;
  --leading-normal: 1.65; /* Strict minimum for Persian body text */
  --leading-loose:  1.85;
}
```

### 4.4 Persian Cursive Protection & Scoped Tracking
```css
/* Zero letter-spacing strictly enforced for Persian */
:lang(fa), [dir="rtl"], body {
  font-family: var(--font-body);
  letter-spacing: 0;
  font-synthesis: none;
}

/* Latin and code blocks retain normal character spacing */
:lang(en), [dir="ltr"], code, pre, kbd, .font-mono, .font-latin {
  letter-spacing: normal;
}
```

---

## 5. Mascot Specification & 2-Second Hard-Cut Mechanics

### 5.1 Physical Asset Inventory (Verified Repository Facts)
* `pic/besporman1.png` (Pose 1: pointing to self): Canvas $470 \times 1200\text{px}$, visible bounds `[0, 20, 468, 1200]`, visible height $1180\text{px}$.
* `pic/besporman2.png` (Pose 2: pointing down): Canvas $607 \times 1498\text{px}$, visible bounds `[0, 1, 607, 1498]`, visible height $1497\text{px}$.
* **Shoe Baseline Grounding:** Both assets touch the bottom canvas edge with **exactly $0\text{px}$ bottom padding**. Anchoring both layers at `bottom: 0` grounds their shoes on an identical baseline plane.

### 5.2 Interaction Model: The Approved 2-Second Hard Cut
* **Cadence:** Instantaneous **hard cut between Pose 1 and Pose 2 every ~2 seconds**.
* **Zero Opacity Transition:** Transition is strictly `transition: none;`. The swap is abrupt and mechanical, mimicking classic vintage comic frames.
* **Removal of Speculative Triggers:** No CTA hover overrides or 6-second timers.

### 5.3 Provisional Normalization Coordinate Model
```css
/* Outer Stage Grounds Character */
.mascot-stage {
  position: relative;
  width: 320px;
  height: 480px;
  margin-inline: auto;
  overflow: visible;
}

.mascot-layer {
  position: absolute;
  bottom: 0;
  left: 50%;
  pointer-events: none;
  user-select: none;
  transition: none !important; /* Abrupt mechanical cut */
}

/* Normalized height and horizontal anchor offset */
.mascot-layer--pose1 {
  height: 488px;
  width: auto;
  transform: translateX(-50.4%); /* Aligns head center at stage center */
}

.mascot-layer--pose2 {
  height: 480px;
  width: auto;
  transform: translateX(-45.6%); /* Aligns head center at stage center */
}
```
*Note: These mathematical coordinates are provisional and will be visually validated and fine-tuned during Phase 3 browser testing.*

---

## 6. Continuous Request Marquee Kinematics & Accessibility

### 6.1 Geometric Proof of the Seamless Loop
* **Leftward Translation:** Matches Persian RTL reading flow (incoming items arrive from the right). In CSS Cartesian coordinates, leftward travel requires a **negative translation: `translateX(0)` $\rightarrow$ `translateX(-50%)`**.
* **Track Geometry:**
  * Track contains Tile A and an identical clone Tile B placed side-by-side: Total Track Width $T = 2W$.
  * Keyframe translation: $\Delta X = -50\% \times T = -W$.
  * At $t = 100\%$, Tile B lands exactly on the starting coordinates of Tile A. When the animation loops to $t = 0$, the reset is seamless.
* **Seam Integrity Rules:**
  * Mandatory `dir="ltr"` container isolation on the track.
  * Mandatory `gap: 0;` (flex gaps strictly forbidden on the track).
  * Mandatory `animation-timing-function: linear;` (zero pause/acceleration).
  * Hardware-accelerated via `will-change: transform; transform: translate3d(0, 0, 0);`.

### 6.2 Illustrative Fictional Requests (Not Testimonials)
The marquee displays humorous, stylized project requests illustrating team capabilities—**never fake client reviews**:
* «یه بات تلگرام می‌خوام که سفارشات مشتری رو خودکار ثبت کنه و فاکتور بفرسته»
* «یه وب‌سایت شخصی و خفن برای نمونه‌کارهام نیاز دارم»
* «یه نرم‌افزار ویندوز می‌خوایم که فایل‌های اکسل انبار رو مرتب کنه»

### 6.3 Accessibility & WCAG 2.2.2 Controls
1. **Explicit Keyboard Pause/Play Button:**
   * A dedicated button adjacent to the marquee.
   * State: `type="button"`, `aria-pressed="false"` (playing) and `aria-pressed="true"` (paused).
   * Accessible name: `aria-label="توقف انیمیشن نواری"` / `aria-label="پخش انیمیشن نواری"`.
   * Operable via `Enter` and `Space`.
   * *Enhancement:* Auto-pauses on `:hover` and `:focus-within`.
2. **Screen Reader Transcription:** Graphic track marked `aria-hidden="true"`; clean text transcription rendered in an adjacent `<ul class="sr-only">`.
3. **Reduced Motion Alternative:** When `prefers-reduced-motion: reduce` is detected, animation is disabled (`animation: none !important;`), clone Tile B is hidden (`display: none;`), and Tile A renders as an unclipped, static flex row or scrollable container.

---

## 7. Flexible Project Content Model (`ProjectItem`)

To guarantee data honesty without requiring fabricated case studies or metrics, the content model strictly separates **mandatory rendering keys** from **optional metadata**.

```typescript
// types/project.ts

export type ProjectCategory = 'web' | 'telegram-bot' | 'windows-app';

export type ProjectStatus = 'verified' | 'in-progress' | 'archived';

export interface ProjectItem {
  // --- Mandatory Core Fields (Required to render every project card) ---
  id: string;                                // Stable identifier (e.g. 'prj-01')
  slug: string;                              // URL slug for routing (e.g. 'warehouse-bot')
  titleFa: string;                           // Authentic Persian project title
  category: ProjectCategory;                 // Category mapping
  summaryFa: string;                         // 1-2 sentence honest summary
  status: ProjectStatus;                     // Verification status

  // --- Optional Metadata (Gracefully omitted when absent) ---
  featuredImage?: string;                    // Screenshot (fallback category plate used if undefined)
  galleryImages?: string[];                  // Additional screenshots (block omitted if empty)
  completedYearFa?: string;                  // e.g. '۱۴۰۲'
  clientNameFa?: string;                     // Client name (omitted if confidential/internal)
  technologies?: string[];                   // e.g. ['Vue 3', 'Python', 'SQLite']
  externalUrl?: string;                      // Live public link (button hidden if absent)
  telegramUrl?: string;                      // Direct t.me bot link (button hidden if absent)
  caseStudyMarkdownFa?: string;              // Detailed writeup (fallback to summary if absent)
  keyHighlightsFa?: string[];                // Bulleted deliverables (rendered if present)
}
```

---

## 8. Decoupled Form Architecture & Telegram Contact Boundary

### 8.1 Prevention of False Submission Success
* ❌ **No Mock Success:** The application will **never** simulate a successful submission response or claim "پیام شما با موفقیت ارسال شد" when no backend is wired.
* **Development Stub Behavior:** The development submission adapter returns an explicit `not_configured` result:
```typescript
// services/contactAdapter.ts
export interface SubmissionResult {
  success: boolean;
  code: 'SENT' | 'NOT_CONFIGURED' | 'ERROR';
  messageFa: string;
}

export const developmentContactAdapter = async (): Promise<SubmissionResult> => {
  return {
    success: false,
    code: 'NOT_CONFIGURED',
    messageFa: 'سرویس ثبت فرم هنوز به درگاه ارسال متصل نشده است. لطفاً از طریق دکمه تلگرام مستقیم پیام دهید.'
  };
};
```

### 8.2 Decoupled Telegram Architecture
* **Direct Telegram Contact:** A prominent secondary CTA button links directly to Telegram (`https://t.me/<username>`). This is a standard direct link, **completely separate** from the form.
* **Zero Speculative Credentials:** No bot tokens, usernames, endpoints, or webhooks are created in code. The form submission adapter remains an abstract interface ready for a real endpoint when provided by the owner.

---

## 9. Eight-State Component Interaction Architecture

Every interactive element strictly implements the mandatory 8-state model:
1. **Default:** Solid 2px ink border, crisp 3px unblurred offset shadow.
2. **Hover:** 1px mechanical shift (`translate(-1px, -1px)`), shadow expands to 4px.
3. **Focus-Visible:** 2px solid ink outline with 3px offset, high contrast, never obscured.
4. **Active:** 2px mechanical depression (`translate(2px, 2px)`), shadow collapses to 1px.
5. **Disabled:** Muted background (`--color-disabled-bg`), opacity 0.6, `cursor: not-allowed`.
6. **Loading:** Marked `aria-busy="true"`, accessible loading spinner, text preserved.
7. **Error:** Marked `aria-invalid="true"`, linked via `aria-describedby` to error message.
8. **Success / Selected:** Marked `aria-current="page"` (navigation) or `aria-pressed="true"` (toggle). *Note: `aria-selected` is used strictly for tabs or listboxes.*

### 9.1 Sticky Header Anchor Clearance
```css
section[id], [tabindex="-1"] {
  scroll-margin-top: calc(var(--header-height, 72px) + 24px);
}
```

### 9.2 Universal Button Architecture & Gliding Arrow Badge Standard

All buttons across the Besporman platform adhere strictly to the **Button-in-Button Gliding Arrow Badge** pattern (conforming to `/high-end-visual-design` and `/impeccable` active skills):

#### 1. Markup Anatomy
Every button MUST be structured with a dedicated label span and nested circular arrow badge:
```html
<a href="#target" class="btn btn-primary">
  <span class="btn-text">عنوان دکمه</span>
  <span class="btn-arrow" aria-hidden="true">←</span>
</a>
```
- **`.btn`**: Neo-brutalist tactile button container with bold border (`2px solid var(--color-border-bold)`), offset shadow (`var(--shadow-md)`), and `overflow: hidden`.
- **`.btn-text`**: Inner label wrapper with `position: relative; z-index: 2;` and synchronized translation transition.
- **`.btn-arrow`**: Absolute-positioned circular badge (`width: 30px; height: 30px; border-radius: 9999px`) enclosing the directional glyph (`←`, `↗`, `↑`).

#### 2. Motion & Kinematics Specification
- **Default State:**
  - `padding-inline-start: var(--space-6)` ($24\text{px}$)
  - `padding-inline-end: 58px` (generous clearance for arrow badge)
  - Arrow badge anchored at `inset-inline-end: 10px; top: 50%; transform: translateY(-50%) rotate(0deg);`
- **Hover Gliding State:**
  - **Padding Swap:** `padding-inline-start: 58px; padding-inline-end: var(--space-6);` with `cubic-bezier(0.4, 0, 0.2, 1)` easing across $0.45\text{s}$.
  - **Badge Trajectory:** Glides from right to left across the button to `inset-inline-end: calc(100% - 40px);`.
  - **Rotational Tilt:** Rotates dynamically by $-45^\circ$ (`transform: translateY(-50%) rotate(-45deg);`).
  - **Tactile Hover Lift:** Button lifts `translate(-1px, -1px)` and shadow deepens to `var(--shadow-hover)` ($4\text{px}$).
- **Active State (Mechanical Click):**
  - Instant depression `translate(2px, 2px)` with shadow collapse to `var(--shadow-active)` ($1\text{px}$).

#### 3. Variant Matrix
- **Primary (`.btn-primary`):** Comic red background (`var(--color-accent)`), white text (`var(--primitive-white)`). Arrow badge background: `rgba(255, 255, 255, 0.25)` (hover: `0.38`).
- **Secondary (`.btn-secondary`):** Parchment surface (`var(--color-surface)`), dark ink text (`var(--color-ink-primary)`). Arrow badge background: `rgba(14, 15, 18, 0.08)` (hover: `0.16`).
- **Compact (`.btn-sm`):** `min-height: 40px`, padding swap $48\text{px} \leftrightarrow 20\text{px}$ (`padding-inline-end: 48px; padding-inline-start: var(--space-5)`), arrow badge $24\text{px} \times 24\text{px}$ (`inset-inline-end: 8px` $\rightarrow$ `calc(100% - 32px)`).

#### 4. Reduced Motion & Accessibility
Under `prefers-reduced-motion: reduce`, all spatial transitions and badge gliding animations are immediately disabled (`transition: none !important`), maintaining static, accessible layouts.

---

## 10. Implementation Readiness Table

| Specification Domain | Status Classification | Evidence & Basis | Phase 3 Requirement |
| :--- | :--- | :--- | :--- |
| **Asset Dimensions & Baseline** | **Verified Fact** | Tested `pic/` assets: 0px bottom padding confirmed on both PNGs | Ground layers at `bottom: 0` |
| **Color Contrast Ratios** | **Calculated Proof** | Formula calculation: Dual red tokens (`#D93829` & `#C92A1D`) | Enforce token usage rules |
| **Marquee -50% Kinematics** | **Calculated Proof** | Geometric proof: $2W$ track shifts by exactly $-W$ with `gap: 0` | Set `gap: 0; dir="ltr"` on track container |
| **Mascot Alignment Tuning** | **Provisional Specification** | Coordinates computed; awaiting visual browser calibration | Perform visual browser calibration in Phase 3 |
| **Marquee Loop Smoothness** | **Provisional Specification** | Math verified; 60fps continuous visual seam untested in browser | Test 60fps performance across viewports |
| **Font Selection & Packaging** | **Approved Specification** | OFL 1.1 license verified; WOFF2 files to be placed in `src/assets/fonts/` | Add self-hosted font files in setup |
| **Project Schema (`ProjectItem`)**| **Approved Specification** | Flexible minimal schema ready | Create `types/project.ts` and `src/data/projects.ts` |
| **Telegram Submission Handler** | **Backend Dependent** | Decoupled adapter ready; direct link configured | Configure adapter when endpoint provided |
| **Server History Fallback** | **Hosting Dependent** | Rewrite rules defined for Nginx, Cloudflare, Netlify | Apply server config on target host |
