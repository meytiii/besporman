# Design-to-Code Handoff Workflow

A systematic process for translating designs into production code. Covers measurement, token mapping, state documentation, edge cases, and the definition of done.

---

## Phase 1: Measurement → Token Mapping

Before writing any code, map every design value to a design token.

### Color Mapping
```
Design value         →  Token reference
──────────────────────────────────────────
#2563EB (button bg)  →  component.button.primary-bg
#111827 (text)       →  semantic.text.primary
#E5E7EB (border)     →  semantic.border.default
#F9FAFB (background) →  semantic.surface.sunken
```

**If a value doesn't match any token:**
1. Check if it's close enough (within 1-2 shades) → use nearest token
2. If it's intentionally different → discuss with design, potentially add new token
3. Never hardcode hex values in components

### Typography Mapping
```
Design spec           →  Token reference
──────────────────────────────────────────
Inter 24px Semibold   →  textStyle.heading-4
Inter 16px Regular    →  textStyle.body-base
Inter 14px Medium     →  textStyle.label
Inter 12px Regular    →  textStyle.caption
```

### Spacing Mapping
```
Design measurement  →  Token reference
──────────────────────────────────────────
24px padding        →  spacing.card.padding (semantic)
16px gap            →  spacing.stack.lg (semantic)
8px inline gap      →  spacing.inline.sm (semantic)
12px button gap     →  spacing.inline.md (semantic)
```

**Rule of thumb:** If a spacing value is on the 4px grid, it has a token. Map to the semantic level first; fall back to the scale level.

### Shadow & Border Mapping
```
0 1px 2px rgba(0,0,0,.05) →  elevation.sm
border: 1px solid #E5E7EB →  style.default
border-radius: 8px        →  radius.card
```

---

## Phase 2: State Documentation

Every interactive element must have all states documented before coding. Missing states cause the most rework.

### The 8 States Checklist

| # | State | Description | Visual Treatment |
|---|-------|-------------|-----------------|
| 1 | **Default** | Resting state | Base tokens |
| 2 | **Hover** | Mouse over | Background shift, cursor change |
| 3 | **Focus** | Keyboard focus | Focus ring (shadow.focus-ring) |
| 4 | **Active/Pressed** | Mouse down | Deeper background shift |
| 5 | **Disabled** | Non-interactive | 50% opacity, no pointer events |
| 6 | **Loading** | Async operation | Spinner, skeleton, progress |
| 7 | **Error** | Validation failed | Red border, error message |
| 8 | **Selected/Active** | Current selection | Accent background, checkmark |

**Not every element needs all 8** — but you must consciously decide which apply.

### State Matrix Example: Input Field

| State | Border | Background | Text | Icon | Additional |
|-------|--------|------------|------|------|-----------|
| Default | gray-200 | white | gray-900 | — | — |
| Hover | gray-300 | white | gray-900 | — | — |
| Focus | blue-500 | white | gray-900 | — | Focus ring |
| Active | blue-500 | white | gray-900 | — | Caret visible |
| Disabled | gray-200 | gray-100 | gray-400 | gray-300 | cursor: not-allowed |
| Loading | gray-200 | white | gray-400 | spinner | — |
| Error | red-500 | white | gray-900 | red error | Error text below |
| Filled | gray-200 | white | gray-900 | — | Value displayed |

---

## Phase 3: Edge Case Checklist

Before marking implementation complete, test these edge cases:

### Content Edge Cases
- [ ] **Long text** — Names/titles that are 50+ characters. Truncate with ellipsis? Wrap?
- [ ] **Empty content** — No items, no data. Show empty state illustration + CTA
- [ ] **Single item** — Does layout still make sense with just one item?
- [ ] **Many items** — 100+ items. Does it paginate? Virtual scroll?
- [ ] **Special characters** — Unicode, emoji, RTL text, HTML entities
- [ ] **Missing optional fields** — Avatar without image, card without description
- [ ] **Number extremes** — $0.00, $999,999.99, negative numbers, NaN

### Layout Edge Cases
- [ ] **Min-width content** — Viewport at 320px, no horizontal scroll
- [ ] **Max-width content** — 4K display, content doesn't stretch infinitely
- [ ] **Zoom 200%** — All content visible, no overlap
- [ ] **Dynamic font size** — iOS Dynamic Type / browser font scaling
- [ ] **Long words** — "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch" — use `word-break: break-word`
- [ ] **No-JS fallback** — If applicable, does basic functionality work without JavaScript?

### Interaction Edge Cases
- [ ] **Double click** — Prevent double submission
- [ ] **Rapid clicking** — Debounce where needed
- [ ] **Back button** — Browser back behavior in SPAs
- [ ] **Refresh** — Form state preserved? Data refetched?
- [ ] **Offline** — Error message? Cached content?
- [ ] **Concurrent edits** — Two users editing same data

---

## Phase 4: Responsive Specifications

Document responsive behavior at each breakpoint. Use a table for each major component.

### Responsive Spec Template

| Breakpoint | Layout | Visibility | Behavior |
|------------|--------|-----------|----------|
| Mobile (< 640px) | Single column, stacked | Hide secondary nav, show hamburger | Touch gestures, bottom sheet for actions |
| Tablet (640–1023px) | 2 columns, sidebar collapsed | Show icon-only sidebar | Hover not reliable, larger touch targets |
| Desktop (≥ 1024px) | 3 columns, full sidebar | Show all navigation | Hover interactions, keyboard shortcuts |

### Common Responsive Patterns

| Pattern | Description | When to Use |
|---------|-------------|------------|
| **Stack** | Horizontal → vertical | Form fields, card grids |
| **Collapse** | Sidebar → hamburger/bottom nav | Navigation |
| **Priority+** | Show top items, "More" menu for rest | Tab bars, toolbars |
| **Off-canvas** | Slide panel from edge | Detail panels, filters |
| **Truncate** | Full text → truncated + "Show more" | Long descriptions, tables |
| **Transform** | Table → card list | Data tables on mobile |

---

## Phase 5: Animation Specifications

Document every animation with precise specs for engineering implementation.

### Animation Spec Template

| Property | Trigger | From | To | Duration | Easing | Delay |
|----------|---------|------|----|----------|--------|-------|
| opacity | mount | 0 | 1 | 150ms | ease-out | 0ms |
| transform | mount | scale(0.95) | scale(1) | 150ms | ease-out | 0ms |
| max-height | expand | 0 | auto | 200ms | ease-in-out | 0ms |
| background | hover | transparent | gray-50 | 100ms | ease | 0ms |

### Animation Rules
1. **Duration**: Use 100-300ms for UI transitions. Never > 500ms.
2. **Easing**: `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for state changes
3. **Reduced motion**: Always respect `prefers-reduced-motion`. Replace motion with opacity-only or instant transition.
4. **Purpose**: Every animation must serve a purpose — guide attention, show connection, provide feedback

### Common Animation Patterns

| Animation | Duration | Easing | Use Case |
|-----------|----------|--------|----------|
| Fade in | 150ms | ease-out | Modals, tooltips, content load |
| Fade out | 100ms | ease-in | Dismiss, remove |
| Slide in | 250ms | ease-out | Drawers, mobile menus |
| Scale in | 150ms | ease-out | Dropdowns, popovers |
| Collapse | 200ms | ease-in-out | Accordion, disclosure |
| Skeleton pulse | 1.5s | ease-in-out | Loading placeholders |
| Spinner | 600ms | linear | Button loading, async operations |

---

## Definition of Done

A component is "done" when ALL of the following are true:

### Functional
- [ ] All variants implemented as designed
- [ ] All 8 states handled (or explicitly N/A'd)
- [ ] Edge cases from checklist addressed
- [ ] Error handling implemented
- [ ] Loading states implemented

### Visual
- [ ] Pixel-accurate to design (within 1-2px tolerance)
- [ ] All values mapped to design tokens (zero hardcoded values)
- [ ] Dark mode supported (if applicable)
- [ ] Responsive at all breakpoints (320px → 1536px)
- [ ] Animations spec'd and implemented with reduced-motion fallback

### Accessible
- [ ] Keyboard navigable (Tab, Enter, Space, Escape, Arrows)
- [ ] Screen reader tested (VoiceOver or NVDA)
- [ ] Color contrast passes WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Focus indicators visible
- [ ] ARIA attributes correct per `accessibility/aria-patterns.md`
- [ ] Touch targets ≥ 24×24px

### Code Quality
- [ ] TypeScript — no `any` types, proper interfaces
- [ ] Props documented with JSDoc or Storybook
- [ ] Compound component patterns where appropriate
- [ ] `forwardRef` for DOM access
- [ ] No inline styles — all Tailwind classes via `cva`/`cn`

### Tested
- [ ] Unit tests for logic (variants, states, calculations)
- [ ] Visual regression tests (screenshot comparison)
- [ ] A11y automated tests (axe-core)
- [ ] Manual screen reader test
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
