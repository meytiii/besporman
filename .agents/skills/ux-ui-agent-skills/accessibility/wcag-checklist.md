# WCAG 2.2 Accessibility Checklist

Comprehensive checklist organized by the four POUR principles. Each criterion includes its WCAG level (A, AA, AAA), priority tier, and testing guidance.

**Priority Tiers:**
- **P0 — Must Fix**: Legal requirements, blocks users entirely
- **P1 — Should Fix**: Significant usability impact
- **P2 — Nice to Have**: Enhances experience, not blocking

---

## 1. Perceivable

Information and UI components must be presentable in ways users can perceive.

### 1.1 Text Alternatives

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 1.1.1 | **Non-text Content** — All images, icons, and controls have text alternatives | A | P0 | Check every `<img>` has meaningful `alt`; decorative images use `alt=""` or `role="presentation"`. SVG icons have `<title>` or `aria-label`. |

### 1.2 Time-based Media

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 1.2.1 | **Audio/Video (Prerecorded)** — Provide captions or transcript | A | P0 | Verify captions exist for all video content |
| 1.2.2 | **Captions (Prerecorded)** — Synchronized captions for all audio in video | A | P0 | Play video with captions; verify accuracy and timing |
| 1.2.3 | **Audio Description** — Provide audio description for video | A | P1 | Check if important visual information is described |
| 1.2.5 | **Audio Description (Prerecorded)** — Audio description for all prerecorded video | AA | P1 | Full audio description track available |

### 1.3 Adaptable

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 1.3.1 | **Info and Relationships** — Structure conveyed visually is also in markup | A | P0 | Check headings use `<h1>`–`<h6>`, lists use `<ul>/<ol>`, tables use `<th>`. Forms have `<label>` associations. |
| 1.3.2 | **Meaningful Sequence** — Reading order matches visual order | A | P0 | Linearize page (disable CSS) and verify content makes sense |
| 1.3.3 | **Sensory Characteristics** — Instructions don't rely solely on shape, size, position, or sound | A | P1 | Search for "click the round button" or "see the sidebar" — provide alternatives |
| 1.3.4 | **Orientation** — Content not restricted to single display orientation | AA | P1 | Rotate device; verify content adapts |
| 1.3.5 | **Identify Input Purpose** — Input fields identify their purpose | AA | P1 | Check `autocomplete` attributes on personal data fields |

### 1.4 Distinguishable

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 1.4.1 | **Use of Color** — Color is not the only means of conveying information | A | P0 | View in grayscale; verify information is still clear. Error states need icons, not just red. |
| 1.4.2 | **Audio Control** — Mechanism to pause/stop audio that plays > 3 sec | A | P0 | Check autoplay audio has controls |
| 1.4.3 | **Contrast (Minimum)** — Text: 4.5:1, Large text (18px bold/24px): 3:1 | AA | P0 | Use contrast checker on all text/background pairs |
| 1.4.4 | **Resize Text** — Text resizable up to 200% without loss of content | AA | P0 | Zoom browser to 200%; verify no overflow or truncation |
| 1.4.5 | **Images of Text** — Use real text, not images of text | AA | P1 | Check logos are the only images of text |
| 1.4.10 | **Reflow** — Content reflows at 320px width (no horizontal scroll) | AA | P0 | Set viewport to 320px; verify single-column reflow |
| 1.4.11 | **Non-text Contrast** — UI components and graphical objects: 3:1 contrast | AA | P0 | Check borders, icons, focus indicators, chart elements against backgrounds |
| 1.4.12 | **Text Spacing** — Content adapts when user overrides text spacing | AA | P1 | Apply bookmarklet: line-height 1.5×, paragraph spacing 2×, letter spacing 0.12em, word spacing 0.16em |
| 1.4.13 | **Content on Hover or Focus** — Hover/focus content is dismissible, hoverable, persistent | AA | P1 | Tab to tooltips; verify Escape dismisses, content is hoverable |

---

## 2. Operable

UI components and navigation must be operable.

### 2.1 Keyboard Accessible

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 2.1.1 | **Keyboard** — All functionality available via keyboard | A | P0 | Tab through entire page; verify every interactive element is reachable and operable |
| 2.1.2 | **No Keyboard Trap** — Keyboard focus can always be moved away | A | P0 | Tab into every component (especially modals, widgets); verify you can Tab or Escape out |
| 2.1.4 | **Character Key Shortcuts** — Single character shortcuts can be remapped/disabled | A | P1 | Identify single-key shortcuts; verify they have a mechanism to remap or disable |

### 2.2 Enough Time

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 2.2.1 | **Timing Adjustable** — Time limits can be extended, turned off, or are > 20 hrs | A | P0 | Find session timeouts, auto-advancing carousels; verify user controls |
| 2.2.2 | **Pause, Stop, Hide** — Moving, blinking, auto-updating content can be paused | A | P0 | Check carousels, animations, live feeds have pause controls |

### 2.3 Seizures and Physical Reactions

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 2.3.1 | **Three Flashes or Below** — No content flashes more than 3 times/second | A | P0 | Review all animations and video for flash frequency |

### 2.4 Navigable

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 2.4.1 | **Bypass Blocks** — Skip navigation link or landmark regions | A | P0 | Verify "Skip to content" link exists; test landmark regions (`<main>`, `<nav>`, `<aside>`) |
| 2.4.2 | **Page Titled** — Pages have descriptive titles | A | P0 | Check `<title>` is unique and descriptive per page |
| 2.4.3 | **Focus Order** — Focus order is logical and intuitive | A | P0 | Tab through page; verify order matches visual layout |
| 2.4.4 | **Link Purpose (In Context)** — Link text describes destination | A | P0 | Check for "click here", "read more" without context — add `aria-label` or surrounding context |
| 2.4.5 | **Multiple Ways** — Multiple ways to locate pages (search, sitemap, nav) | AA | P1 | Verify at least two navigation mechanisms exist |
| 2.4.6 | **Headings and Labels** — Headings and labels are descriptive | AA | P1 | Review heading hierarchy; verify labels match their fields |
| 2.4.7 | **Focus Visible** — Keyboard focus indicator is always visible | AA | P0 | Tab through page; verify visible focus ring on every focusable element |
| 2.4.11 | **Focus Not Obscured (Minimum)** *(WCAG 2.2 NEW)* — Focused item is not entirely hidden by sticky headers, footers, or other content | AA | P0 | Tab through page with sticky elements; verify focused element is at least partially visible |
| 2.4.12 | **Focus Not Obscured (Enhanced)** *(WCAG 2.2 NEW)* — Focused item is fully visible | AAA | P2 | Tab through page; no part of focused element is covered |
| 2.4.13 | **Focus Appearance** *(WCAG 2.2 NEW)* — Focus indicator has sufficient area and contrast | AAA | P2 | Focus ring area ≥ 2px perimeter, 3:1 contrast change |

### 2.5 Input Modalities

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 2.5.1 | **Pointer Gestures** — Multi-point gestures have single-pointer alternatives | A | P1 | Check pinch-to-zoom, multi-finger swipes have button alternatives |
| 2.5.2 | **Pointer Cancellation** — Actions fire on up-event, can be aborted | A | P1 | Test that mousedown alone doesn't trigger actions; verify dragging away cancels |
| 2.5.3 | **Label in Name** — Visible label is contained in accessible name | A | P0 | Compare visible text labels with `aria-label`/`aria-labelledby`; visible text must be contained |
| 2.5.4 | **Motion Actuation** — Device motion actions have UI alternatives | A | P1 | Shake-to-undo etc. must have button alternative |
| 2.5.7 | **Dragging Movements** *(WCAG 2.2 NEW)* — Dragging has non-dragging alternative | AA | P1 | All drag-and-drop has button/input alternative (up/down arrows, select) |
| 2.5.8 | **Target Size (Minimum)** *(WCAG 2.2 NEW)* — Touch targets are at least 24×24px | AA | P0 | Measure all interactive targets; minimum 24×24px or adequate spacing |

---

## 3. Understandable

Information and UI operation must be understandable.

### 3.1 Readable

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 3.1.1 | **Language of Page** — `lang` attribute on `<html>` | A | P0 | Check `<html lang="en">` (or appropriate language code) |
| 3.1.2 | **Language of Parts** — Content in other languages marked with `lang` | AA | P1 | Find foreign language text; verify `lang` attribute |

### 3.2 Predictable

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 3.2.1 | **On Focus** — Focus alone doesn't trigger unexpected context changes | A | P0 | Tab to all elements; verify no auto-submit, navigation, or popup on focus |
| 3.2.2 | **On Input** — Changing a setting doesn't auto-trigger context change without warning | A | P0 | Change selects, toggles; verify no unexpected navigation or submission |
| 3.2.3 | **Consistent Navigation** — Navigation is consistent across pages | AA | P1 | Compare navigation across 3+ pages; verify consistent order and structure |
| 3.2.4 | **Consistent Identification** — Same function = same label across pages | AA | P1 | Check "Search", "Submit", "Close" buttons use same labels everywhere |
| 3.2.6 | **Consistent Help** *(WCAG 2.2 NEW)* — Help mechanisms appear in same relative position | A | P1 | Verify help/support links, chat widgets are consistently placed |

### 3.3 Input Assistance

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 3.3.1 | **Error Identification** — Errors are identified and described in text | A | P0 | Submit invalid form; verify errors are announced (not just red borders) |
| 3.3.2 | **Labels or Instructions** — Form fields have labels or instructions | A | P0 | Every input has a visible label; complex fields have instructions |
| 3.3.3 | **Error Suggestion** — Provide correction suggestions for known errors | AA | P1 | Submit wrong format; verify helpful suggestion shown |
| 3.3.4 | **Error Prevention (Legal, Financial, Data)** — Submissions are reversible, verifiable, or confirmable | AA | P1 | Check checkout, delete actions have confirmation or undo |
| 3.3.7 | **Redundant Entry** *(WCAG 2.2 NEW)* — Don't ask for same information twice unless necessary | A | P1 | Multi-step forms auto-populate previously entered data |
| 3.3.8 | **Accessible Authentication (Minimum)** *(WCAG 2.2 NEW)* — Authentication doesn't require cognitive function test | AA | P0 | Login allows password managers, copy-paste; no CAPTCHA without alternative |
| 3.3.9 | **Accessible Authentication (Enhanced)** *(WCAG 2.2 NEW)* — No object/image recognition required for auth | AAA | P2 | No "select all traffic lights" as sole auth method |

---

## 4. Robust

Content must be robust enough for diverse user agents and assistive technologies.

### 4.1 Compatible

| # | Criterion | Level | Priority | How to Test |
|---|-----------|-------|----------|-------------|
| 4.1.2 | **Name, Role, Value** — All UI components have accessible names and roles | A | P0 | Run axe/WAVE; check custom components expose correct roles, names, and states |
| 4.1.3 | **Status Messages** — Status messages use ARIA live regions | AA | P0 | Trigger toast, error, success; verify screen reader announces without focus change |

---

## Automated Testing Tools

| Tool | What It Catches | How to Use |
|------|----------------|------------|
| **axe DevTools** | ~57% of WCAG issues | Browser extension → scan page |
| **WAVE** | Structure, labels, contrast | Browser extension → visual overlay |
| **Lighthouse** | Score + specific violations | Chrome DevTools → Accessibility audit |
| **Pa11y** | CI/CD integration | `pa11y https://url` in pipeline |
| **Contrast Checker** | Color contrast ratios | Input FG/BG colors → get ratio |
| **Screen Reader** | Real user experience | VoiceOver (Mac), NVDA (Win), Orca (Linux) |

## Manual Testing Protocol

1. **Keyboard-only navigation** — Unplug mouse, Tab through entire flow
2. **Screen reader walkthrough** — Complete primary user journey with VoiceOver/NVDA
3. **Zoom to 200%** — Verify no content is lost or overlapping
4. **320px viewport** — Verify content reflows without horizontal scroll
5. **Color blindness simulation** — Use Sim Daltonism or built-in browser tools
6. **Motion sensitivity** — Enable `prefers-reduced-motion` and verify animations respect it
7. **Text spacing override** — Apply WCAG text spacing bookmarklet
8. **High contrast mode** — Test in Windows High Contrast Mode
