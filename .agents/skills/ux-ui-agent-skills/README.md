# UX/UI Agent Skills

> Turn any capable coding or design agent into a **Senior Design Architect** with 15+ years of design-system, accessibility, and production UI engineering expertise.

A structured, token-driven UX/UI skill package with a canonical root `SKILL.md` entrypoint and reusable design system references.

---

## What It Does

| Capability | Description |
|-----------|-------------|
| **Design Token Generation** | Produces DTCG-format JSON tokens (colors, typography, spacing, shadows, borders, breakpoints) with a 3-tier architecture: Primitive > Semantic > Component |
| **Component Design** | Designs components from Atoms to Templates using anatomy, variants, states, token mapping, and accessibility specs |
| **Code Generation** | Generates production-ready code for **React + Tailwind v4**, **Next.js 15**, and **SwiftUI 6** |
| **Accessibility Auditing** | Evaluates against WCAG 2.2 AA/AAA with prioritized findings |
| **Design Review** | Scores designs across 6 dimensions with Nielsen heuristics and a structured findings table |
| **Design-to-Code Handoff** | Provides token mapping, 8-state documentation, edge case checklists, and animation specs |
| **Prototyping & Research** | Guides through a 5-level fidelity ladder, journey mapping, and usability testing scripts |

---

## Entry Points

- **Primary (cross-agent):** `SKILL.md`
- **Backward compatibility (Claude auto-load):** `CLAUDE.md`

Both files point to the same instruction set and repository references. `SKILL.md` is the canonical source moving forward.

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/plugin87/ux-ui-agent-skills.git
```

### 2. Copy into your project

```bash
cp -r ux-ui-agent-skills/ your-project/
```

### 3. Load the skill in your agent runtime

- For skill-based runtimes: load `SKILL.md` from the repository root.
- For Claude Code and Claude-powered IDEs: `CLAUDE.md` remains available for automatic loading.

### 4. Use with prompts like

```text
"Design a notification component with all states and accessibility"
"Review this login page against WCAG 2.2 and Nielsen's heuristics"
"Generate React + Tailwind code for a data table with sorting and pagination"
"Create a color token palette for a fintech brand using blue as the primary"
"Audit this form for accessibility issues and provide prioritized findings"
```

---

## Project Structure

```text
.
|-- SKILL.md                  # Canonical cross-agent instruction profile
|-- CLAUDE.md                 # Claude compatibility profile (mirrors SKILL.md)
|
|-- tokens/                   # Design tokens (DTCG format)
|   |-- colors.json           # 3-tier color system + dark mode
|   |-- typography.json       # Modular type scale + text styles
|   |-- spacing.json          # 4px base unit + semantic spacing aliases
|   |-- shadows.json          # Elevation + focus ring + colored shadows
|   |-- borders.json          # Radius and border width scales
|   `-- breakpoints.json      # Breakpoints + containers + grid + z-index
|
|-- components/               # Atomic Design component specifications
|   |-- atoms.md
|   |-- molecules.md
|   |-- organisms.md
|   `-- templates.md
|
|-- accessibility/            # WCAG and ARIA references
|   |-- wcag-checklist.md
|   `-- aria-patterns.md
|
|-- workflows/                # Design process and QA workflows
|   |-- design-review.md
|   |-- design-to-code.md
|   `-- prototyping.md
|
`-- frameworks/               # Framework-specific implementation patterns
    |-- react-tailwind.md
    |-- nextjs.md
    `-- swiftui.md
```

---

## Token Architecture

The token system follows a 3-tier hierarchy using the [DTCG format](https://design-tokens.github.io/community-group/format/):

- **Primitive:** raw values, never referenced directly by components
- **Semantic:** purpose aliases (`action.primary`, `text.secondary`, `surface.card`)
- **Component:** component-scoped aliases (`button.primary-bg`, `input.border-focus`)

Dark mode is handled by semantic token swaps while primitive tokens remain stable.

---

## Supported Frameworks

| Framework | Version | Key Patterns |
|-----------|---------|-------------|
| **React + Tailwind** | React 19, Tailwind v4 | `forwardRef`, `cva`, `cn()`, CSS custom properties |
| **Next.js** | 15 (App Router) | Server/Client Components, `next/font`, `next/image`, Server Actions |
| **SwiftUI** | 6 (iOS 18+) | `ButtonStyle`, `ViewModifier`, `@ScaledMetric`, Dynamic Type |

---

## Accessibility Baseline

All outputs target **WCAG 2.2 Level AA** at minimum:

- Contrast: 4.5:1 for text, 3:1 for UI components
- Keyboard navigation with visible focus indicators
- Screen reader support with correct semantics
- Minimum target size: 24x24px
- Coverage for WCAG 2.2 criteria including Focus Not Obscured and Accessible Authentication

---

## Customization

- **Brand colors:** edit `tokens/colors.json` primitives and semantic mappings
- **Typography:** swap families in `tokens/typography.json` and framework guidance
- **Components:** extend `components/` using current spec patterns
- **Frameworks:** add new framework guides (for example `vue.md`, `flutter.md`)
- **Workflows:** adapt rubric/checklist details in `workflows/` to your team process

---

## Requirements

- Any agent runtime that supports loading root instruction files and markdown references
- Sufficient context window for long-form design-system instructions

No build tools or runtime dependencies are required.

---

## License

MIT
