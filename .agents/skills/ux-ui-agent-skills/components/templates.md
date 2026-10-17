# Templates

Page-level layout patterns that define content zones, grid structure, and handle empty/loading/error states. Templates are framework-agnostic blueprints — implement using your framework's layout system.

---

## 1. Dashboard Template

The primary data overview and monitoring layout.

**Page Grid:**
```
┌────────────────────────────────────────────────────────┐
│ [Header]                                                │  ← organisms/Header
├──────────┬─────────────────────────────────────────────┤
│          │ Page Title             [Date Picker] [+ New]│  ← Title bar
│          ├─────────────────────────────────────────────┤
│          │ ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│ [Sidebar]│ │KPI │ │KPI │ │KPI │ │KPI │               │  ← Stats row (4-col)
│          │ └────┘ └────┘ └────┘ └────┘               │
│          ├───────────────────────┬─────────────────────┤
│          │                       │                     │
│          │   Primary Chart       │  Secondary Panel    │  ← Content area (8+4)
│          │                       │                     │
│          ├───────────────────────┴─────────────────────┤
│          │ ┌─────────────────────────────────────────┐ │
│          │ │ Data Table / Activity Feed              │ │  ← Full-width table
│          │ └─────────────────────────────────────────┘ │
└──────────┴─────────────────────────────────────────────┘
```

**Content Zones:**
| Zone | Grid Span | Content |
|------|-----------|---------|
| Stats Row | 4 × 3-col cards | KPI cards: metric, trend, sparkline |
| Primary Chart | 8 columns | Main visualization (line/bar/area) |
| Secondary Panel | 4 columns | Breakdown, top items, or notifications |
| Data Table | 12 columns | Recent activity or main data view |

**Responsive Behavior:**
- **Desktop (≥ lg):** Sidebar + 12-col content grid
- **Tablet (md–lg):** Collapsed sidebar + 8-col grid; secondary panel moves below primary
- **Mobile (< md):** No sidebar + single column; KPIs become 2×2 grid, charts stack

**States:**
| State | Behavior |
|-------|----------|
| Loading | Skeleton screens matching each zone's dimensions |
| Empty | Illustration + "No data yet" + CTA to add first item |
| Error | Error alert at top + retry button; partial data shows where possible |
| Populated | Full content as designed |

---

## 2. Auth Template

Authentication pages: login, register, forgot password, reset password.

**Page Grid:**
```
┌──────────────────────────────────────────┐
│                                          │
│           ┌──────────────┐               │
│           │    [Logo]     │               │
│           │               │               │
│           │  Welcome back │               │
│           │               │               │
│           │ ┌──────────┐ │               │
│           │ │ Email    │ │               │
│           │ └──────────┘ │               │
│           │ ┌──────────┐ │               │
│           │ │ Password │ │               │
│           │ └──────────┘ │               │
│           │              │               │
│           │ [Sign In ══] │               │
│           │              │               │
│           │ Or continue: │               │
│           │ [G] [GH] [A] │               │  ← Social auth
│           │              │               │
│           │ Don't have…  │               │  ← Secondary link
│           └──────────────┘               │
│                                          │
│           © Company 2026                 │
└──────────────────────────────────────────┘

Alternative: Split layout
┌───────────────────┬──────────────────────┐
│                   │                      │
│   Brand / Hero    │    Auth Form Card    │
│   Illustration    │    (same as above)   │
│                   │                      │
└───────────────────┴──────────────────────┘
```

**Content Zones:**
| Zone | Content |
|------|---------|
| Brand | Logo, optional tagline |
| Title | Page-specific: "Sign in", "Create account", "Reset password" |
| Form | Email, password, remember me, forgot link |
| Social | OAuth buttons (Google, GitHub, Apple, etc.) |
| Footer | Terms link, privacy link, copyright |

**Variants:**
| Page | Fields | Primary Action |
|------|--------|---------------|
| Login | Email + Password + Remember | "Sign In" |
| Register | Name + Email + Password + Confirm | "Create Account" |
| Forgot Password | Email | "Send Reset Link" |
| Reset Password | New Password + Confirm | "Reset Password" |
| Verify Email | OTP input (6 digits) | "Verify" |

**Layout:**
- Card width: 400px (max)
- Centered vertically and horizontally
- Card padding: `spacing.card.padding` (24px)
- Field gap: `spacing.stack.lg` (16px)

**Responsive:** Card becomes full-width on mobile with `spacing.page.inline-padding`. Split layout collapses — brand panel hidden below `md`.

**States:**
| State | Behavior |
|-------|----------|
| Loading | Submit button shows spinner |
| Error | Inline error below field + alert at top for general errors |
| Rate Limited | Disable submit + countdown timer |
| Success | Redirect or success message |

**Accessibility:**
- `<main>` landmark contains the form
- WCAG 3.3.8: allow password managers, no CAPTCHA as sole method
- Social buttons: `aria-label="Sign in with Google"`

---

## 3. Settings Template

User or application settings with grouped sections.

**Page Grid:**
```
┌────────────────────────────────────────────────────────┐
│ [Header]                                                │
├──────────┬─────────────────────────────────────────────┤
│          │ Settings                                     │
│          ├─────────────────────────────────────────────┤
│          │ ┌───────────┐  ┌───────────────────────────┐│
│          │ │ Profile    │  │ Profile                   ││
│ [Sidebar]│ │ Account    │  │                           ││
│          │ │ Security   │  │ [Avatar Upload]           ││
│          │ │ Notifs     │  │ [Name ][Email]            ││
│          │ │ Billing    │  │ [Bio              ]       ││
│          │ │ Team       │  │                           ││
│          │ │ API        │  │ ──────────────────────    ││
│          │ └───────────┘  │ [Save]                    ││
│          │  Settings Nav   │                           ││
│          │                 └───────────────────────────┘│
└──────────┴─────────────────────────────────────────────┘
```

**Content Zones:**
| Zone | Grid | Content |
|------|------|---------|
| Settings Nav | 3 columns or sidebar | Vertical list of section links |
| Settings Content | 9 columns | Form sections with save per section or global save |

**Section Pattern:**
```
┌────────────────────────────────────┐
│ Section Title                      │
│ Section description                │
├────────────────────────────────────┤
│ [Form fields]                      │
│                                    │
│ ─────────────────────────          │  ← Divider
│                       [Save]       │  ← Per-section save (recommended)
└────────────────────────────────────┘
```

**Common Sections:**
| Section | Fields |
|---------|--------|
| Profile | Avatar, display name, email, bio, timezone |
| Account | Username, delete account (with confirmation) |
| Security | Password change, 2FA setup, active sessions |
| Notifications | Channel toggles (email, push, in-app) per event type |
| Billing | Plan display, payment method, invoices table |
| Team | Members table, invite form, roles |
| API | API keys table, create key, usage stats |

**Responsive:**
- **Desktop:** Side nav + content
- **Tablet:** Top tabs + content
- **Mobile:** Stack — nav list as full page, content as drill-down page with back button

**States:**
| State | Behavior |
|-------|----------|
| Loading | Skeleton for active section |
| Saving | Button loading, fields disabled |
| Unsaved | Visual indicator (dot/badge) on section nav + confirm on leave |
| Success | Inline success toast |
| Error | Field-level errors + summary |

---

## 4. List/Detail Template

A master-detail layout for browsing collections and viewing individual items.

**Page Grid:**
```
┌────────────────────────────────────────────────────────┐
│ [Header]                                                │
├──────────┬──────────────┬──────────────────────────────┤
│          │ List Panel    │ Detail Panel                  │
│          │              │                               │
│          │ [Search]     │ Item Title          [Edit]    │
│          │ [Filters]    │                               │
│ [Sidebar]│              │ ┌──────────────────────────┐ │
│          │ ▸ Item A     │ │ Content tabs / sections  │ │
│          │   Item B ←   │ │                          │ │
│          │   Item C     │ │ Rich content area        │ │
│          │   Item D     │ │                          │ │
│          │              │ └──────────────────────────┘ │
│          │ [Load more]  │                               │
└──────────┴──────────────┴──────────────────────────────┘
```

**Content Zones:**
| Zone | Grid | Content |
|------|------|---------|
| List Panel | 4 columns (fixed or resizable) | Search, filters, scrollable item list |
| Detail Panel | 8 columns | Full item view with tabs or sections |

**List Item Pattern:**
```
┌───────────────────────────┐
│ [Avatar] Title     [Time] │
│          Preview text...  │
│          [Badge] [Badge]  │
└───────────────────────────┘
```

**Variants:**
| Variant | Use Case |
|---------|----------|
| Email client | Messages list + message detail |
| CRM | Contacts list + contact profile |
| File browser | Files list + file preview |
| Documentation | Page tree + page content |

**Responsive:**
- **Desktop (≥ lg):** Side-by-side list + detail
- **Tablet (md–lg):** List panel narrows (3-col); detail expands
- **Mobile (< md):** Stack — list as page 1, detail as page 2 with back navigation

**States:**
| State | List Panel | Detail Panel |
|-------|------------|-------------|
| Loading | Skeleton list items (8) | Skeleton content |
| Empty list | Illustration + "No items" + CTA | Hidden |
| No selection | Normal list | "Select an item" placeholder |
| Selected | Highlighted item | Full item content |
| Error | Error alert + retry | Error alert + retry |

**Accessibility:**
- List: `role="listbox"` or semantic `<ul>` with `aria-current="true"` on selected
- Detail: `<article>` with heading matching selected item
- Mobile navigation: announce panel changes via live region
- Keyboard: arrow keys navigate list, Enter opens detail, Escape returns to list (mobile)
