# Besporman Design System Specification
**Version:** 1.0.0-draft  
**Status:** Implementation-Ready / Pending Owner Decision Gates  
**Target Architecture:** Nuxt 4 (Vue 3 + TypeScript) · Vanilla CSS Custom Properties  
**Language & Direction:** Persian-First (Farsi) · Right-to-Left (RTL)  
**Author:** Senior UI/UX Designer & Frontend Architect

---

## 1. Brand Overview and Design Philosophy

### 1.1 Brand Essence
**Besporman (بسپر من)** is a specialized Iranian software engineering studio delivering high-reliability digital solutions across three focused disciplines:
1. **Web Design & Engineering (طراحی و توسعه وب‌سایت)** — Modern web applications, client portals, and bespoke web platforms.
2. **Telegram Bot Systems (بات‌های اختصاصی تلگرام)** — Automation pipelines, business logic bots, customer onboarding, and payment-ready Telegram mini-apps.
3. **Windows Desktop Applications (اپلیکیشن‌های ویندوز)** — Native, performant utility tools, internal enterprise software, and desktop GUI clients.

The name «بسپر من» translates literally to *"Leave it to me"* or *"Hand it over to me"*. It encapsulates an ethos of decisive craftsmanship, absolute reliability, and relief for the client. When a client hands a project to Besporman, the technical friction evaporates.

### 1.2 Design Philosophy: The Industrial Craft & Vintage Character
The visual identity fuses **Neo-Brutalist structural discipline** with a **warm, character-driven vintage workshop narrative**.
- **Not a sterile corporate agency:** Besporman is not another interchangeable SaaS template with stock 3D purple spheres. It feels like an authentic, high-end technical atelier.
- **Physicality and Tactility:** Heavy hairline-to-solid architectural borders (1.5px–2px), purposeful geometric framing, honest ink-and-paper contrasts, tactile pressed buttons with hard offset shadows, and authentic vintage neon luminescence.
- **Narrative Personality:** The illustrated character serves as the studio's living frontman—a trusted, charismatic craftsman who points to the neon workshop sign («بسپر من») and directly back to himself, promising personal accountability.

---

## 2. Audience, Positioning, and Design Goals

### 2.1 Target Audience
1. **Iranian Business Owners & Entrepreneurs:** Looking for serious developers who can deliver custom, bug-free web solutions without endless excuses or delayed schedules.
2. **Online Businesses & Community Operators:** Requiring robust Telegram bots for automation, order processing, and channel workflow management.
3. **Organizations & Industrial Clients:** Requiring dedicated Windows desktop tools that integrate with local hardware, databases, and offline workflows.

### 2.2 Brand Positioning
| Competitor Slop | Besporman Position |
| :--- | :--- |
| Over-promising "world-class AI synergy" | Tangible, proven capabilities with verified code deliverables |
| Faceless agency with fake stock photos | Character-driven identity backed by human developers |
| Cookie-cutter Tailwind templates | Custom art-directed layout combining neo-brutalism and vintage charm |
| Broken Persian typography and mirrored LTR bugs | Native Persian-first typography, proper numerals, and culturally grounded RTL layouts |

### 2.3 Strategic Design Goals
1. **Instant Emotional Connection:** The animated character and vintage neon hero immediately establish trust, approachability, and memorable brand recall within the first 3 seconds.
2. **Technical Honesty:** Every component, project case study, and metric displayed must be authentic. No fake testimonials or invented client logos.
3. **Flawless Persian/RTL Execution:** Zero layout shifts, no awkward line-breaks, strict font hierarchy, and culturally harmonious typography.
4. **Extreme Performance & Accessibility:** 100% Lighthouse target score, sub-second First Contentful Paint, full keyboard navigation, and complete adherence to WCAG 2.2 AA.

---

## 3. Approved Art Direction and Reference Analysis

### 3.1 Art Direction Pillars: Neo-Brutalist Workshop
```
┌─────────────────────────────────────────────────────────────┐
│                   NEO-BRUTALIST WORKSHOP                    │
├──────────────────────────────┬──────────────────────────────┤
│ PHYSICAL STRUCTURE           │ CHARACTER & LIGHT            │
│ • Solid 1.5px / 2px borders   │ • Expressive 2-frame loop    │
│ • Hard 3px / 4px drop-shadows│ • Warm neon glow on sign     │
│ • Asymmetric column rhythm   │ • Editorial Persian bubbles  │
│ • Modular section dividers   │ • Tactile mechanical states  │
└──────────────────────────────┴──────────────────────────────┘
```

1. **High Contrast Architectural Grids:** Containers sit on crisp 1.5px borders using `#18181B` (Zinc-900 / Iron Black) on light surfaces or `#27272A` on dark surfaces.
2. **Tactile Offset Shadows (The Hard Edge):** Elements do not use blurry, generic Gaussian drop-shadows. Interactive cards and buttons use hard, non-blurred offsets (`box-shadow: 3px 3px 0px var(--border-color)`), giving the tactile sensation of physical mechanical stamps.
3. **Vintage Neon & Workshop Enamel:** The brand accent colors pull from authentic vintage workshop signs:
   - **Neon Amber-Gold (`#F59E0B` / OKLCH `0.78 0.18 75`):** The glow of the «بسپر من» workshop sign.
   - **Industrial Vermilion / Electric Tangerine (`#EA580C` / OKLCH `0.62 0.22 42`):** Primary action triggers.
   - **Parchment Canvas (`#FAF9F5` / OKLCH `0.98 0.01 85`):** Natural editorial paper tone that relieves digital eye-strain.
   - **Iron Charcoal (`#121214` / OKLCH `0.18 0.01 260`):** Grounded, heavy structural contrast.

### 3.2 Reference Analysis & Translation
- **Retro Advertising & Print Posters:** Bold headlines, frame borders, clear badge stamps, deliberate negative space.
- **Modern Indie Engineering (Linear / GitHub / Awwwards Brutalism):** High-density technical metadata, monospace chips for tech stacks (e.g. `Vue 3`, `Nuxt 4`, `C#`, `Python`), clear data hierarchy.
- **Persian Editorial Tradition:** Respecting the natural flow of Persian calligraphy and modern Naskh typography. Generous line-heights (1.65–1.85) to prevent character clashing between ascenders (*sar-kash*) and descenders (*kāseh*).

---

## 4. Explicit Design Principles and Anti-Patterns

### 4.1 Core Design Principles
1. **Restraint Over Decoration:** If an element does not serve navigation, comprehension, brand identity, or feedback, delete it.
2. **Physical Feedback:** Every click, tap, and hover must feel physical (1px depression on active state, border transition, and crisp contrast shift).
3. **Narrative Rhythm:** Alternate section layouts. Do not repeat the same 3-card grid across the page.
4. **Honest Copy:** Straightforward, friendly Persian prose. Avoid hyperbolic buzzwords.
5. **No Visual Ambiguity:** Clear focus rings on keyboard navigation, high contrast text ratios (minimum 4.5:1 for body copy).

### 4.2 Prohibited Anti-Patterns (The Anti-AI-Slop Code)
The following patterns are strictly banned from Besporman code and design:

```
❌ BANNED: Arbitrary purple/violet gradients & dark mesh blobs
❌ BANNED: Blurry, glowing cards with generic glassmorphism
❌ BANNED: Fake client logos (Acme Corp, fictitious startup names)
❌ BANNED: Fabricated statistics ("99.9% conversion boost", "50,000+ teams")
❌ BANNED: Fake testimonials from imaginary CTOs
❌ BANNED: Emojis used as interface icons (🚀, 💡, ⚡)
❌ BANNED: Re-drawn fake browser chrome or fake macOS window traffic-light dots
❌ BANNED: Italic display headlines in Persian or Latin
❌ BANNED: Endless zigzag layouts (max 2 consecutive alternating splits)
❌ BANNED: More than 1 eyebrow tag per 3 sections
❌ BANNED: Floating badges or tags slapped onto the main character
❌ BANNED: Continuous un-throttled scroll listeners that cause mobile jank
```

---

## 5. Color Palette and Design Tokens

The Besporman color system is structured in a strict **3-Tier Token Architecture** (Primitives → Semantics → Components) defined in standard CSS Custom Properties and OKLCH for perceptual uniformity.

```
┌─────────────────────────────────────────────────────────────┐
│ 1. PRIMITIVE TOKENS (Raw values: palette definition)       │
├─────────────────────────────────────────────────────────────┤
│ 2. SEMANTIC TOKENS (Role-based: surface, text, action)      │
├─────────────────────────────────────────────────────────────┤
│ 3. COMPONENT TOKENS (Scoped: button, marquee, hero-sign)    │
└─────────────────────────────────────────────────────────────┘
```

### 5.1 Primitive Color Tokens
```css
:root {
  /* Canvas & Paper Primitives */
  --primitive-paper-50:  oklch(0.99 0.005 85);   /* #FDFCF9 */
  --primitive-paper-100: oklch(0.975 0.012 85);  /* #FAF7F0 - Main Canvas */
  --primitive-paper-200: oklch(0.94 0.018 85);   /* #F2EDE2 - Card Surface */
  --primitive-paper-300: oklch(0.88 0.025 85);   /* #E2DAC8 - Border Light */

  /* Iron & Charcoal Primitives */
  --primitive-iron-950:  oklch(0.14 0.01 260);   /* #0E0F12 - Darkest Charcoal */
  --primitive-iron-900:  oklch(0.18 0.01 260);   /* #16171B - Dark Surface */
  --primitive-iron-800:  oklch(0.25 0.015 260);  /* #24262D - Card Dark */
  --primitive-iron-700:  oklch(0.35 0.02 260);   /* #3B3E48 - Border Dark */
  --primitive-iron-500:  oklch(0.55 0.02 260);   /* #717584 - Muted Neutral */
  --primitive-iron-200:  oklch(0.85 0.01 260);   /* #D5D7DF - Subtle Separator */

  /* Amber & Neon Sign Primitives */
  --primitive-amber-400: oklch(0.82 0.17 78);    /* #FBBF24 - Neon Core */
  --primitive-amber-500: oklch(0.76 0.19 72);    /* #F59E0B - Vintage Neon Sign */
  --primitive-amber-600: oklch(0.66 0.19 65);    /* #D97706 - Sign Outline */
  --primitive-amber-900: oklch(0.32 0.08 65);    /* #451A03 - Warm Deep Wash */

  /* Vermilion & Action Primitives */
  --primitive-vermilion-500: oklch(0.63 0.22 42); /* #EA580C - Industrial Orange */
  --primitive-vermilion-600: oklch(0.56 0.22 38); /* #C2410C - Action Hover */
  --primitive-vermilion-700: oklch(0.48 0.20 35); /* #9A3412 - Action Pressed */

  /* Functional Status Primitives */
  --primitive-emerald-600: oklch(0.60 0.18 150); /* #059669 - Success/Live */
  --primitive-crimson-600: oklch(0.55 0.22 25);  /* #DC2626 - Error/Alert */
  --primitive-azure-600:   oklch(0.58 0.20 240); /* #2563EB - Telegram Bot Blue */
}
```

### 5.2 Semantic Tokens (Default Light / Warm Vintage Workshop Theme)
```css
:root {
  /* Surfaces */
  --color-surface-canvas:    var(--primitive-paper-100);
  --color-surface-card:      var(--primitive-paper-50);
  --color-surface-subtle:    var(--primitive-paper-200);
  --color-surface-inverse:   var(--primitive-iron-900);

  /* Typography */
  --color-text-primary:      var(--primitive-iron-950);
  --color-text-secondary:    oklch(0.38 0.02 260); /* WCAG AAA on canvas (9.2:1) */
  --color-text-muted:        oklch(0.48 0.02 260); /* WCAG AA on canvas (4.8:1) */
  --color-text-inverse:      var(--primitive-paper-50);
  --color-text-accent:       var(--primitive-vermilion-600);

  /* Borders & Dividers */
  --color-border-default:    var(--primitive-iron-950);
  --color-border-subtle:     var(--primitive-paper-300);
  --color-border-accent:     var(--primitive-amber-500);

  /* Actions & Interactivity */
  --color-action-primary:    var(--primitive-vermilion-500);
  --color-action-primary-hover: var(--primitive-vermilion-600);
  --color-action-primary-active: var(--primitive-vermilion-700);
  --color-action-primary-text:  #FFFFFF;

  --color-action-secondary:  var(--primitive-paper-50);
  --color-action-secondary-hover: var(--primitive-paper-200);
  --color-action-secondary-text: var(--primitive-iron-950);

  /* Brand Signature Neon */
  --color-brand-neon:        var(--primitive-amber-500);
  --color-brand-neon-glow:   oklch(0.76 0.19 72 / 0.35);
  --color-brand-telegram:    var(--primitive-azure-600);

  /* Status */
  --color-status-success:    var(--primitive-emerald-600);
  --color-status-error:      var(--primitive-crimson-600);
}
```

### 5.3 Dark Mode Adaptation Strategy
Besporman defaults to the tactile light workshop aesthetic. A deliberate dark workshop theme swaps semantic tokens without breaking architectural border contrast:
```css
[data-theme="dark"] {
  --color-surface-canvas:    var(--primitive-iron-950);
  --color-surface-card:      var(--primitive-iron-900);
  --color-surface-subtle:    var(--primitive-iron-800);
  --color-surface-inverse:   var(--primitive-paper-100);

  --color-text-primary:      var(--primitive-paper-50);
  --color-text-secondary:    var(--primitive-iron-200);
  --color-text-muted:        var(--primitive-iron-500);
  --color-text-inverse:      var(--primitive-iron-950);

  --color-border-default:    var(--primitive-iron-700);
  --color-border-subtle:     oklch(0.28 0.015 260);

  --color-action-secondary:  var(--primitive-iron-800);
  --color-action-secondary-hover: var(--primitive-iron-700);
  --color-action-secondary-text: var(--primitive-paper-50);
}
```

---

## 6. Typography System and Font-Loading Strategy

### 6.1 Font Stack Hierarchy
```
┌─────────────────────────────────────────────────────────────┐
│ 1. PRIMARY PERSIAN TEXT & DISPLAY: VAZIRMATN (Variable)    │
│    Weights: 400 (Regular), 500 (Medium), 700 (Bold),       │
│             900 (Black / Display Headlines)                 │
├─────────────────────────────────────────────────────────────┤
│ 2. LATIN DISPLAY & NUMERALS: SPACE GROTESK / OUTFIT        │
│    Weights: 500 (Medium), 700 (Bold)                        │
├─────────────────────────────────────────────────────────────┤
│ 3. MONOSPACE & TECHNICAL CODES: JETBRAINS MONO             │
│    Used for: versions, /commands, code parameters, specs    │
└─────────────────────────────────────────────────────────────┘
```

```css
:root {
  /* Font Family Definitions */
  --font-persian-sans: "Vazirmatn", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Tahoma, sans-serif;
  --font-latin-display: "Space Grotesk", var(--font-persian-sans);
  --font-mono: "JetBrains Mono", "Cascadia Code", "Courier New", monospace;

  /* Typography Scale - Major Third (1.25) Modular System */
  --text-xs:    clamp(0.75rem,  0.70rem + 0.25vw, 0.8125rem); /* 12px - 13px */
  --text-sm:    clamp(0.875rem, 0.82rem + 0.28vw, 0.9375rem); /* 14px - 15px */
  --text-base:  clamp(1.00rem,  0.95rem + 0.25vw, 1.0625rem); /* 16px - 17px */
  --text-lg:    clamp(1.1875rem,1.10rem + 0.44vw, 1.25rem);   /* 19px - 20px */
  --text-xl:    clamp(1.4375rem,1.30rem + 0.69vw, 1.5625rem); /* 23px - 25px */
  --text-2xl:   clamp(1.75rem,  1.55rem + 1.00vw, 2.00rem);   /* 28px - 32px */
  --text-3xl:   clamp(2.1875rem,1.90rem + 1.44vw, 2.50rem);   /* 35px - 40px */
  --text-4xl:   clamp(2.75rem,  2.30rem + 2.25vw, 3.25rem);   /* 44px - 52px */
  --text-hero:  clamp(3.25rem,  2.70rem + 2.75vw, 4.25rem);   /* 52px - 68px */

  /* Leading (Line Heights) - Specially Calibrated for Persian */
  --leading-tight:   1.25; /* Headings only */
  --leading-snug:    1.45; /* Subheadings */
  --leading-normal:  1.70; /* Standard Persian Body Text */
  --leading-relaxed: 1.85; /* Editorial Long-form & Quotes */
}
```

### 6.2 Persian Typographic Rules
1. **Letter-Spacing Prohibition:** CSS `letter-spacing` (tracking) is strictly banned on Persian text (`letter-spacing: 0 !important`). Increasing letter spacing detaches cursive Arabic/Persian letter ligatures and creates broken, amateur typography.
2. **Line Height Clearance:** Persian characters utilize vertical extensions (*alef*, *kāf*, *lām* upwards; *ye*, *re*, *mīm* downwards). Body text line-height must never drop below `1.65`.
3. **Punctuation & Quotation Marks:**
   - Use standard Persian quotation marks: `«` and `»` (never Latin quotes `"` or `“`).
   - Use Persian question mark: `؟` (U+061F).
   - Use Persian comma: `،` (U+060C) and semicolon `؛` (U+061B).
4. **Numeral Policy:**
   - **User Interface & Copy:** Persian numerals (`۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹`) for section numbers, dates, steps, and persuasive copy.
   - **Technical Contexts:** Latin numerals (`0-9`) for technical specifications, code blocks, Telegram bot command syntax (`/start`), and framework versions (`Vue 3.5`).
5. **Font Loading Strategy:**
   - Self-hosted WOFF2 files with `@font-face` and `font-display: swap`.
   - Preload primary weights: `Vazirmatn-Regular.woff2` and `Vazirmatn-Bold.woff2`.

---

## 7. Spacing, Grid, Container, and Breakpoint Systems

### 7.1 Spacing Scale (Base Unit: 4px)
```css
:root {
  --space-1:   0.25rem;  /* 4px */
  --space-2:   0.50rem;  /* 8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1.00rem;  /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.50rem;  /* 24px */
  --space-8:   2.00rem;  /* 32px */
  --space-10:  2.50rem;  /* 40px */
  --space-12:  3.00rem;  /* 48px */
  --space-16:  4.00rem;  /* 64px */
  --space-20:  5.00rem;  /* 80px */
  --space-24:  6.00rem;  /* 96px */
  --space-32:  8.00rem;  /* 128px */
}
```

### 7.2 Layout Containers & Breakpoints
```css
:root {
  --container-max:     1280px;
  --container-wide:    1440px;
  --container-padding: clamp(1rem, 4vw, 2.5rem);
}
```

| Breakpoint Name | Token Range | Behavior & Column Structure |
| :--- | :--- | :--- |
| `sm` (Mobile) | `320px – 639px` | 4-column layout · 16px gutter · Single column stacked sections |
| `md` (Tablet) | `640px – 1023px` | 8-column layout · 24px gutter · 2-column project split |
| `lg` (Desktop) | `1024px – 1439px` | 12-column layout · 32px gutter · Alternating editorial layout |
| `xl` (Wide) | `≥ 1440px` | 12-column layout · Centered max-1280px with expansive margins |

---

## 8. Borders, Radii, Shadows, Layering, and Separators

### 8.1 Borders & Dividers
```css
:root {
  --border-width-hairline: 1px;
  --border-width-base:     1.5px;
  --border-width-heavy:    2.5px;

  /* Separators */
  --divider-industrial: 1.5px solid var(--color-border-default);
  --divider-dashed:     1.5px dashed var(--color-border-subtle);
}
```

### 8.2 Corner Radii (Restrained Neo-Brutalist Geometry)
Besporman rejects arbitrarily rounded, pill-shaped cards. Structural containers maintain sharp-to-subtle mechanical edges:
```css
:root {
  --radius-none: 0px;       /* Layout frames, section dividers, image viewports */
  --radius-sm:   3px;       /* Tags, chips, inline badges */
  --radius-md:   6px;       /* Cards, inputs, buttons */
  --radius-lg:   10px;      /* Modals, showcase frames */
  --radius-pill: 9999px;    /* Only for request bubble tags & specific status pills */
}
```

### 8.3 Tactile Drop-Shadows (The Hard Edge)
```css
:root {
  /* Hard Neo-brutalist Offset Shadows */
  --shadow-flat:        none;
  --shadow-sm:          2px 2px 0px var(--color-border-default);
  --shadow-base:        3px 3px 0px var(--color-border-default);
  --shadow-lg:          5px 5px 0px var(--color-border-default);
  --shadow-hover:       4px 4px 0px var(--color-border-default);
  --shadow-pressed:     1px 1px 0px var(--color-border-default);

  /* Neon Ambient Glow (Restrained to the «بسپر من» sign only) */
  --shadow-neon-sign:   0 0 12px var(--color-brand-neon-glow), 0 0 24px oklch(0.76 0.19 72 / 0.18);
}
```

### 8.4 Z-Index Hierarchy
```css
:root {
  --z-base:        1;
  --z-artwork:     5;
  --z-sticky-nav:  50;
  --z-popover:     100;
  --z-modal-scrim: 200;
  --z-modal-box:   210;
  --z-toast:       300;
}
```

---

## 9. Motion and Animation Specifications

### 9.1 Motion Philosophy
Motion in Besporman exists strictly to **communicate physical state, reinforce brand character, and direct focus**. Random floating particles or infinite looping card rotations are prohibited.

```css
:root {
  /* Durations */
  --duration-instant:  80ms;   /* Mechanical button press */
  --duration-fast:     150ms;  /* Hover color shifts, focus rings */
  --duration-normal:   250ms;  /* Card reveals, drawer transitions */
  --duration-slow:     400ms;  /* Modal entrance, tab morphs */

  /* Easing Curves */
  --ease-mechanical: cubic-bezier(0.2, 0, 0, 1);       /* Quick mechanical response */
  --ease-tactile:    cubic-bezier(0.16, 1, 0.3, 1);    /* Physical spring return */
  --ease-smooth:     cubic-bezier(0.4, 0, 0.2, 1);     /* Standard ease */
}
```

### 9.2 Reduced-Motion Enforcement (Accessibility Non-Negotiable)
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .marquee-track {
    animation: none !important;
    overflow-x: auto !important;
  }
  .character-hero-frame {
    transition: none !important;
  }
}
```

---

## 10. Illustration, Iconography, and Asset Guidelines

### 10.1 Iconography System
- **Authorized Source:** Phosphor Icons (`@phosphor-icons/vue`) or Tabler Icons.
- **Weight / Stroke:** Regular / Bold (`stroke-width: 1.75px` or `2.0px`), harmonized across the site.
- **Directional Awareness:** Icons indicating direction (arrows, chevrons, send icons) must be RTL-aware. E.g., an arrow pointing to "forward/next" points Left (`←`) in RTL, not Right (`→`).
- **Emoji Replacement:** Zero UI emojis. Use crisp SVG icon glyphs.

### 10.2 Asset Architecture and Naming Conventions
All assets reside in `/assets/` and follow strict kebab-case naming:
```
assets/
├── brand/
│   ├── favicon.png (Studio Icon / Hand with Code Card)
│   ├── besporman-wordmark.svg
│   ├── besporman-sign-neon.svg
│   └── besporman-sign-dark.svg
├── character/ (and repository `pic/` source directory)
│   ├── pic/besporman2.png (Frame A: character pointing down toward sign, 607x1498)
│   ├── pic/besporman1.png (Frame B: character pointing to chest/self, 470x1200)
│   ├── character-frame-a-pointing-sign.webp (and .svg)
│   ├── character-frame-b-pointing-self.webp (and .svg)
│   └── character-marquee-bust.webp
├── marquee/
│   ├── marquee-customer-01.svg
│   ├── marquee-customer-02.svg
│   └── marquee-customer-03.svg
└── projects/
    ├── project-01-web-[slug].webp
    ├── project-02-bot-[slug].webp
    └── project-03-win-[slug].webp
```

---

## 11. Component Conventions and Reusable Patterns

### 11.1 The 8-State Interactive Requirement
Every interactive component (Buttons, Form Inputs, Dropdowns, Cards) must implement all **8 required states**:
1. **Default** — Balanced surface with `--shadow-base`.
2. **Hover** — 1px elevation lift, background tint, `--shadow-hover`.
3. **Focus-Visible** — High-contrast double outline (`outline: 2px solid var(--color-border-default); outline-offset: 2px`).
4. **Active (Pressed)** — Physical depression: `transform: translate(2px, 2px); box-shadow: var(--shadow-pressed)`.
5. **Disabled** — `opacity: 0.55; cursor: not-allowed; box-shadow: none; pointer-events: none`.
6. **Loading** — Visual spinner/skeleton, `aria-busy="true"`, text preserved or replaced with accessible indicator.
7. **Error / Invalid** — Crisp red border (`--color-status-error`), descriptive inline helper message below element.
8. **Success / Selected** — Accent indicator (`--color-status-success` or checked badge).

### 11.2 Button Component Specification
```html
<!-- Canonical Primary Button Markup -->
<button class="btn btn-primary" type="button">
  <span class="btn-label">درخواستتو همین الان ثبت کن</span>
  <svg class="btn-icon" aria-hidden="true" viewBox="0 0 24 24"><!-- Arrow Left (RTL Forward) --></svg>
</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-persian-sans);
  font-size: var(--text-base);
  font-weight: 700;
  line-height: 1;
  border-radius: var(--radius-md);
  border: var(--border-width-base) solid var(--color-border-default);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: transform var(--duration-instant) var(--ease-mechanical),
              box-shadow var(--duration-instant) var(--ease-mechanical),
              background-color var(--duration-fast) var(--ease-smooth);
}

.btn-primary {
  background-color: var(--color-action-primary);
  color: var(--color-action-primary-text);
  box-shadow: var(--shadow-base);
}

.btn-primary:hover {
  background-color: var(--color-action-primary-hover);
  transform: translate(-1px, -1px);
  box-shadow: var(--shadow-hover);
}

.btn-primary:active {
  background-color: var(--color-action-primary-active);
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-pressed);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-border-default);
  outline-offset: 3px;
}
```

---

## 12. Besporman Hero and Character Specifications

```
┌─────────────────────────────────────────────────────────────┐
│                      HERO SECTION (RTL)                     │
├──────────────────────────────┬──────────────────────────────┤
│ RIGHT COLUMN (Content Lead)  │ LEFT COLUMN (Visual Stage)   │
│ • Eyebrow: تیم توسعه بسپر من │ • Animated Sign: «بسپر من»    │
│ • H1 Headline (max 2 lines)  │ • Character Illustration:    │
│ • Subtitle (max 20 words)    │   Frame A: points to Sign    │
│ • CTAs: Telegram + Form      │   Frame B: points to Self    │
│ • Status: در دسترس برای پروژه │   (~2.0s loop cycle)         │
└──────────────────────────────┴──────────────────────────────┘
```

### 12.1 Visual Composition & Layering
1. **Right Column (Persian Lead):**
   - Brand Eyebrow Tag: `تیم تخصصی طراحی وب، بات تلگرام و نرم‌افزار ویندوز`
   - Primary Headline: Bold, confident statement of craftsmanship and peace of mind.
   - Subtext: Concise explanation of what Besporman builds (under 20 words).
   - Dual Actions: Primary Button leading to Project Form + Secondary Button to Telegram Bot.
   - Verified Availability Indicator: Live status chip (`● ظرفیت پذیرش پروژه جدید: فعال`).
2. **Left Column (The Workshop Stage):**
   - **The «بسپر من» Sign:** Mounted above/beside the character. Styled as an authentic vintage neon sign with a subtle, non-distracting flicker effect or ambient warm glow (`--shadow-neon-sign`).
   - **The Character Illustration:** The studio's illustrated mascot standing proudly on an industrial workbench or clean floor pedestal.

### 12.2 Two-Frame Character Cycle Specifications
The animation consists of exactly two matching character illustrations:
- **Frame A:** The character gestures or points toward the illuminated «بسپر من» sign.
- **Frame B:** The character points toward himself with an assured, friendly expression.

```
Cycle Timing:
0.0s ──────────────── 1.9s ── 2.0s ──────────────── 3.9s ── 4.0s
[     Frame A Active     ] ──> [     Frame B Active     ] ──> Loop
      (Points to Sign)                (Points to Self)
```

- **Cycle Duration:** 4.0 seconds total (approx. 2.0s per frame).
- **Transition Style:** Instant mechanical cut or ultra-fast crossfade (80ms–120ms). No gooey morphing or distracting cartoon squash/stretch.
- **Asset Specifications:**
  - Ratio: `3:4` or `1:1` bounding container.
  - Transparent Background: WebP format (lossless/near-lossless) with high-density SVG fallback.
  - Absolute Anchor Alignment: The character's feet and torso anchor at identical pixel coordinates in both frames so there is **zero jitter** or position drift during the cycle.
- **Legibility Guarantee:** The neon sign text «بسپر من» must remain sharp SVG typography so it is 100% readable even on small mobile screens.

```vue
<!-- Nuxt 4 / Vue 3 Hero Character Implementation Pattern -->
<template>
  <div class="character-stage" aria-label="تصویر متحرک کاراکتر بسپر من">
    <!-- Illuminated Sign -->
    <div class="neon-sign" aria-hidden="true">
      <span class="neon-text">بسپر من</span>
    </div>

    <!-- Dual Frame Character -->
    <div class="character-viewport">
      <img
        src="/pic/besporman2.png"
        alt="کاراکتر بسپر من در حال اشاره به تابلو (Frame A)"
        class="character-frame"
        :class="{ 'is-active': currentFrame === 'A' }"
        width="607"
        height="1498"
      />
      <img
        src="/pic/besporman1.png"
        alt="کاراکتر بسپر من در حال اشاره به خود (Frame B)"
        class="character-frame"
        :class="{ 'is-active': currentFrame === 'B' }"
        width="470"
        height="1200"
      />
    </div>
  </div>
</template>

<style scoped>
.character-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 420px;
}
.neon-sign {
  border: var(--border-width-heavy) solid var(--color-border-default);
  background: var(--color-surface-canvas);
  color: var(--color-brand-neon);
  padding: var(--space-2) var(--space-6);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm), var(--shadow-neon-sign);
  font-family: var(--font-persian-sans);
  font-weight: 900;
  font-size: var(--text-2xl);
  margin-bottom: var(--space-4);
}
.character-viewport {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 3 / 4;
}
.character-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom center;
  opacity: 0;
  transition: opacity 100ms var(--ease-mechanical);
  pointer-events: none;
}
.character-frame.is-active {
  opacity: 1;
  pointer-events: auto;
}
</style>
```

---

## 13. Moving Request Marquee Specifications

### 13.1 Concept and Visual Narrative
Directly beneath the hero, a full-bleed horizontal marquee scrolls continuously from **Right to Left** (harmonizing with the Persian reading direction). It represents the bustling workshop stream of incoming client needs:
- Illustrated client vignettes (e.g. store owner, trader, bot operator).
- Persian speech/request bubbles containing realistic inquiries:
  - *«یه بات تلگرام می‌خوام که سفارش مشتری رو ثبت کنه و فاکتور بفرسته»*
  - *«یه لندینگ‌پیج سریع و اختصاصی برای معرفی استارتاپمون»*
  - *«یه نرم‌افزار ویندوز برای مدیریت فاکتورها و انبارداری محلی»*
- Repeated character mascot micro-illustrations greeting customers.
- Intentional negative space and subtle mechanical dividers.

### 13.2 Technical & Accessibility Requirements
1. **Direction & Velocity:** Smooth, constant linear velocity (approx. 45px per second).
2. **Infinite Continuity:** Dual-track duplication so the loop has zero visible seam or jump.
3. **Interactive Pause:** The marquee automatically pauses upon `:hover` and `:focus-within` so users can comfortably read request bubbles.
4. **Accessibility (Screen Reader Sanitation):** The duplicate marquee track is marked with `aria-hidden="true"` so assistive screen readers read the list of requests exactly once.
5. **Reduced Motion:** If `prefers-reduced-motion: reduce` is detected, the animation halts and transforms into a clean horizontal scrollable track.

```css
/* Continuous Marquee CSS */
.marquee-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-top: var(--divider-industrial);
  border-bottom: var(--divider-industrial);
  background-color: var(--color-surface-subtle);
  padding: var(--space-4) 0;
}

.marquee-track {
  display: flex;
  gap: var(--space-8);
  width: max-content;
  animation: marquee-rtl 40s linear infinite;
  will-change: transform;
}

.marquee-container:hover .marquee-track,
.marquee-container:focus-within .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-rtl {
  from { transform: translateX(0); }
  to   { transform: translateX(50%); } /* In RTL direction, translateX moves positive */
}
```

---

## 14. Project Showcase Specifications

### 14.1 Alternating Editorial Layout
The project showcase rejects uniform 3-card grids in favor of an **editorial storytelling layout** that emphasizes real craft.
- **Project 1 (Odd):** Text explanation on Right · Project Visual & Interface Proof on Left.
- **Project 2 (Even):** Project Visual & Interface Proof on Right · Text explanation on Left.
- **Mobile Stacking (< 768px):** Visual element renders first, followed immediately by metadata and explanation.

```
Desktop Project 1 (Odd):
┌──────────────────────────────┬──────────────────────────────┐
│ RIGHT: Context & Metadata    │ LEFT: Project Visual Frame   │
│ • Category Badge (Web / Bot) │ • High-fidelity Screenshot   │
│ • Title & Problem Statement  │ • Interactive Artifact Proof │
│ • Solution & Real Stack Tags │ • Clean 1.5px Border Frame   │
│ • Live Demo / Case Link      │ • 3px Hard Shadow            │
└──────────────────────────────┴──────────────────────────────┘

Desktop Project 2 (Even):
┌──────────────────────────────┬──────────────────────────────┐
│ RIGHT: Project Visual Frame  │ LEFT: Context & Metadata     │
│ • High-fidelity Screenshot   │ • Category Badge (Win App)   │
│ • Interactive Artifact Proof │ • Title & Problem Statement  │
│ • Clean 1.5px Border Frame   │ • Solution & Real Stack Tags │
│ • 3px Hard Shadow            │ • Live Demo / Case Link      │
└──────────────────────────────┴──────────────────────────────┘
```

### 14.2 Project Metadata Requirements
Every project displayed must feature structured, verified metadata:
1. **Discipline Chip:** `وب‌سایت اختصاصی` / `بات پیشرفته تلگرام` / `نرم‌افزار ویندوز`.
2. **Client / Problem Context:** 2–3 sentences describing the authentic business problem.
3. **Delivered Solution:** Concrete deliverables (e.g. *Nuxt 3 SSR + Python FastAPI Telegram Engine*).
4. **Technology Stack Tags:** Clean monospace badges (`Vue 3`, `Python`, `PostgreSQL`, `C# WPF`).
5. **Verified Work Clause:** Never display mock templates as real client work. If a project is an internal open-source tool, label it transparently: `پروژه متن‌باز استودیو`.

---

## 15. Contact Section Scope

### 15.1 Dual-Channel Structure
The contact section provides two explicit, friction-free paths:
1. **Direct Telegram Bot Channel (سریع‌ترین راه ارتباط):**
   - Direct button launching the official studio Telegram bot.
   - For clients who prefer instant chat, audio consultation, or quick quotes.
2. **Project Request Form (درخواستتو همین الان ثبت کن):**
   - A focused form for clients with specific technical briefs.
   - Initial Scope:
     - Client Name & Contact (Telegram ID or Phone number).
     - Project Type Selection: Web / Telegram Bot / Windows App / Multi-platform.
     - Project Overview & Estimated Timeline.
     - Budget Expectations (transparent brackets).

### 15.2 Backend Contract Boundary
*Important Architectural Isolation:* In this design system phase, no live API endpoints, mock credentials, or bot tokens are introduced. The form UI is designed with strict frontend state validation (valid, invalid, loading, success), ready to plug into the secure backend handler in Phase 2.

---

## 16. Proposed Page Architecture and Structure

To fulfill Besporman's business goals while avoiding generic filler sections, the full page is structured into 7 deliberate narrative chapters:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HEADER & NAVIGATION                                      │
│    Brand Wordmark · Discipline Links · Telegram Action CTA  │
├─────────────────────────────────────────────────────────────┤
│ 2. HERO: THE WORKSHOP ENTRY                                 │
│    Headline · Character Animation · Illuminated Neon Sign   │
├─────────────────────────────────────────────────────────────┤
│ 3. MOVING REQUEST MARQUEE                                   │
│    Client Personas · Speech Bubbles · Studio Mascots        │
├─────────────────────────────────────────────────────────────┤
│ 4. DISCIPLINES MATRIX (What We Actually Build)              │
│    Web Platforms · Telegram Bots · Windows Desktop          │
├─────────────────────────────────────────────────────────────┤
│ 5. SELECTED PROJECTS SHOWCASE                               │
│    Alternating Editorial Projects · Real Tech Stacks        │
├─────────────────────────────────────────────────────────────┤
│ 6. THE CRAFTSMAN PROMISE (Why «بسپر من»)                   │
│    Zero Bureaucracy · Direct Developer Access · Clean Code  │
├─────────────────────────────────────────────────────────────┤
│ 7. CONTACT & PROJECT INITIATION                             │
│    Telegram Bot Fast-Track + Detailed Request Form          │
├─────────────────────────────────────────────────────────────┤
│ 8. SYSTEM FOOTER                                            │
│    Copyright · Local Time (Tehran) · Tech Stack Badge       │
└─────────────────────────────────────────────────────────────┘
```

**Justification for Chapter 4 (Disciplines Matrix):**  
Unlike agencies that claim to do "everything digital," Besporman focuses on three specific fields. This section defines technical capabilities (e.g. Nuxt/Vue for web, Python asynchronous event loops for bots, C#/.NET for Windows) without corporate fluff.

**Justification for Chapter 6 (The Craftsman Promise):**  
Reinforces the brand name: explaining why working directly with an Iranian engineering team eliminates agency middlemen, inflated markups, and communication latency.

---

## 17. Persian-First and RTL Technical Requirements

### 17.1 Bidirectional Layout Rules
- **Document Root:** `<html lang="fa" dir="rtl">`.
- **CSS Logical Properties:** Strictly mandate logical properties over directional ones:
  - Use `margin-inline-start` / `margin-inline-end` instead of `margin-left` / `margin-right`.
  - Use `padding-inline-start` / `padding-inline-end` instead of `padding-left` / `padding-right`.
  - Use `inset-inline-start` instead of `left` / `right`.
- **Mirroring Exceptions:** Do not naively mirror everything:
  - Code snippets, URLs, and file paths are always Left-to-Right (`dir="ltr"`).
  - Audio and video progress bars remain LTR unless localized controls are custom-drawn.
  - Monospace tech chips containing English letters (`Nuxt`, `Vue`) stay LTR.

```html
<!-- Example of Proper Bidirectional Code Block -->
<div class="code-preview" dir="ltr">
  <code>git clone https://github.com/besporman/studio.git</code>
</div>
```

---

## 18. Accessibility, Performance, and SEO Requirements

### 18.1 Accessibility (WCAG 2.2 AA Compliant)
- **Minimum Contrast Ratio:** `4.5:1` for normal body text, `3.0:1` for large display text and essential UI borders.
- **Touch Targets:** All interactive elements must measure at least `44px × 44px` on touch viewports (`min-height: 44px; min-width: 44px;`).
- **Focus Rings:** Visible, persistent focus states on keyboard `Tab` navigation.
- **Screen Reader Announcements:** Dynamic state updates (e.g., form submission progress) announced via `aria-live="polite"`.

### 18.2 Performance Budget (Lighthouse 95+ Target)
- Total initial page weight (HTML + CSS + JS) under `150KB` gzip.
- Total asset load (images + fonts) under `650KB`.
- Largest Contentful Paint (LCP) under `1.5s` on 4G connections.
- Cumulative Layout Shift (CLS) equal to `0.00`. All images and character viewports carry explicit `width` and `height` attributes to reserve layout space.

### 18.3 Search Engine Optimization & Social Sharing
- **Title Tag Pattern:** `بسپر من | استودیو طراحی وب‌سایت، بات تلگرام و نرم‌افزار ویندوز`
- **Meta Description:** Concise Persian summary (under 155 characters) explaining studio services.
- **OpenGraph & Twitter Cards:**
  - `og:locale`: `fa_IR`
  - High-resolution preview image (`1200x630`) featuring the brand mark, animated character frame, and workshop sign.

---

## 19. CSS Variable Implementation Reference

Here is the complete baseline CSS variable manifest ready to drop into Nuxt/Vue `assets/css/tokens.css`:

```css
/* ==========================================================================
   BESPORMAN DESIGN TOKENS (tokens.css)
   ========================================================================== */

:root {
  /* Colors - Primitives */
  --bsp-c-paper-50:          #FDFCF9;
  --bsp-c-paper-100:         #FAF7F0;
  --bsp-c-paper-200:         #F2EDE2;
  --bsp-c-paper-300:         #E2DAC8;
  --bsp-c-iron-950:          #0E0F12;
  --bsp-c-iron-900:          #16171B;
  --bsp-c-iron-800:          #24262D;
  --bsp-c-iron-700:          #3B3E48;
  --bsp-c-iron-500:          #717584;
  --bsp-c-amber-500:         #F59E0B;
  --bsp-c-vermilion-500:     #EA580C;
  --bsp-c-vermilion-600:     #C2410C;
  --bsp-c-emerald-600:       #059669;
  --bsp-c-azure-600:         #2563EB;

  /* Colors - Semantics (Light Canvas Default) */
  --color-canvas:            var(--bsp-c-paper-100);
  --color-card:              var(--bsp-c-paper-50);
  --color-card-subtle:       var(--bsp-c-paper-200);
  --color-text-main:         var(--bsp-c-iron-950);
  --color-text-muted:        #5A5D69;
  --color-border:            var(--bsp-c-iron-950);
  --color-border-subtle:     var(--bsp-c-paper-300);
  --color-accent:            var(--bsp-c-vermilion-500);
  --color-accent-hover:      var(--bsp-c-vermilion-600);
  --color-neon-sign:         var(--bsp-c-amber-500);

  /* Typography */
  --font-persian:            "Vazirmatn", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono:               "JetBrains Mono", monospace;

  /* Scale */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* Tactile Offsets & Borders */
  --border-base:             1.5px solid var(--color-border);
  --border-heavy:            2.5px solid var(--color-border);
  --shadow-base:             3px 3px 0px var(--color-border);
  --shadow-hover:            4px 4px 0px var(--color-border);
  --shadow-pressed:          1px 1px 0px var(--color-border);
  --radius-sm:               3px;
  --radius-md:               6px;

  /* Transitions */
  --ease-tactile:            cubic-bezier(0.16, 1, 0.3, 1);
  --trans-press:             transform 80ms var(--ease-tactile), box-shadow 80ms var(--ease-tactile);
}
```

---

## 20. Examples of Correct and Incorrect Design-System Usage

### Example 1: Section Headings
```html
<!-- ❌ INCORRECT (AI Slop: Generic centered, Latin quotes, excessive italic gradient) -->
<div class="text-center">
  <span class="text-xs uppercase tracking-widest text-purple-600">SERVICES</span>
  <h2 class="text-4xl italic bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
    What We Do "Best"
  </h2>
</div>

<!-- ✅ CORRECT (Besporman Standard: Persian-first, honest typography, physical structure) -->
<div class="section-header">
  <h2 class="section-title">حوزه‌های تخصصی استودیو</h2>
  <p class="section-subtitle">
    توسعه نرم‌افزار بدون اتلاف وقت؛ از وب‌سایت‌های مقیاس‌پذیر تا بات‌های کاربردی تلگرام و برنامه‌های ویندوز.
  </p>
</div>
```

### Example 2: Interactive Card
```html
<!-- ❌ INCORRECT (AI Slop: Blurry Gaussian shadow, rounded-3xl pill, emoji icon) -->
<div class="rounded-3xl p-8 bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 hover:scale-105">
  <div class="text-3xl">🚀</div>
  <h3 class="font-bold">Next-gen Performance</h3>
</div>

<!-- ✅ CORRECT (Besporman Standard: Physical border, hard offset shadow, SVG icon) -->
<div class="bsp-card">
  <div class="bsp-card-icon">
    <svg aria-hidden="true" class="icon-gear"><!-- Phosphor SVG --></svg>
  </div>
  <h3 class="bsp-card-title">توسعه اختصاصی وب‌سایت</h3>
  <p class="bsp-card-body">پیاده‌سازی سریع با معماری Nuxt و Vue 3 با تمرکز بر عملکرد فنی و رتبه سئو.</p>
</div>
```

---

## 21. Decision Gates and Unresolved Items for Owner Approval

To ensure no brand or architectural decisions are made without owner authorization, the following items are marked as **Provisional / Awaiting Owner Approval**:

| Item # | Decision Area | Current Recommendation | Alternatives Requiring Owner Decision |
| :--- | :--- | :--- | :--- |
| **D-01** | Primary Persian Typeface | **Vazirmatn** (Free, open-source, zero license friction) | Commercial typefaces: **Peyda (پیدا)** or **Dana (دانا)** if the owner holds an active web license. |
| **D-02** | Character Art Style | Clean line-art illustration with vintage flat colors matching palette | Retro mid-century cartoon vs Modern vector editorial vs Pixel art. |
| **D-03** | Canvas Color Mode | **Tactile Warm Paper (`#FAF7F0`)** with Dark Mode toggle | Pure Dark Mode as default (`#121214`) with Amber Neon highlights. |
| **D-04** | Telegram Bot Handle | Placeholder `@besporman_bot` | Official bot username must be provided by the owner. |
| **D-05** | Production Domain | `besporman.ir` or `besporman.com` | Final deployment URL and DNS target. |

---

## 22. Implementation Validation Checklist

Before marking the future website implementation complete, verify against this 15-point checklist:

- [ ] 1. **Directionality:** Root element has `<html lang="fa" dir="rtl">` with zero horizontal scrollbar on 320px screens.
- [ ] 2. **Character Cycle:** The 2-frame character illustration toggles every ~2.0s without position jumping or layout shift.
- [ ] 3. **Neon Sign:** The «بسپر من» sign is sharp, legible, and maintains contrast against both light and dark themes.
- [ ] 4. **Marquee Continuity:** The request marquee loops seamlessly without boundary jumps; pauses on hover and focus.
- [ ] 5. **Screen Reader Marquee:** Duplicate marquee items are marked `aria-hidden="true"`.
- [ ] 6. **Reduced Motion:** With `prefers-reduced-motion: reduce`, character animation and marquee scrolling halt immediately.
- [ ] 7. **Touch Targets:** All buttons, form inputs, and links measure at least 44px on mobile viewports.
- [ ] 8. **Contrast Audit:** All text tokens pass WCAG AA contrast (≥ 4.5:1 for body copy).
- [ ] 9. **Persian Typography:** No `letter-spacing` applied to Persian words; proper Persian quotation marks (`« »`) and question marks (`؟`) used throughout.
- [ ] 10. **Numerals:** Dates, steps, and Persian text use Persian numerals; code snippets and versions use Latin numerals.
- [ ] 11. **Project Showcase:** Alternating left/right layout on desktop collapses cleanly on mobile with image above text.
- [ ] 12. **No Emojis:** Zero raw emojis used as icons; all icons are consistent Phosphor/Tabler SVG glyphs.
- [ ] 13. **Tactile Feedback:** Buttons depress with physical offset on `:active`.
- [ ] 14. **No Fake Metrics:** Zero invented client stats, fake case studies, or mock testimonials.
- [ ] 15. **Performance:** Total initial page bundle under 150KB gzip; all images have explicit width/height tags.
