# Next.js 15 App Router Patterns

Architecture patterns for building production applications with Next.js 15, React 19 Server Components, and the App Router.

---

## Route Organization

```
app/
├── layout.tsx              ← Root layout (HTML shell, fonts, providers)
├── page.tsx                ← Home page
├── loading.tsx             ← Global loading UI (Suspense boundary)
├── error.tsx               ← Global error boundary
├── not-found.tsx           ← 404 page
├── globals.css             ← Tailwind + token CSS variables
│
├── (auth)/                 ← Route group — shared auth layout, no URL segment
│   ├── layout.tsx          ← Centered card layout (Auth Template)
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── forgot-password/page.tsx
│
├── (dashboard)/            ← Route group — shared dashboard layout
│   ├── layout.tsx          ← Header + Sidebar layout
│   ├── page.tsx            ← Dashboard home (Dashboard Template)
│   ├── loading.tsx         ← Dashboard skeleton
│   │
│   ├── settings/
│   │   ├── layout.tsx      ← Settings nav + content (Settings Template)
│   │   ├── page.tsx        ← Redirect to /settings/profile
│   │   ├── profile/page.tsx
│   │   ├── security/page.tsx
│   │   └── notifications/page.tsx
│   │
│   └── [resource]/         ← Dynamic resource routes (List/Detail Template)
│       ├── page.tsx        ← List view
│       └── [id]/page.tsx   ← Detail view
│
└── api/                    ← Route Handlers (API endpoints)
    └── [resource]/route.ts
```

### Route Groups `(name)`
- Group routes without affecting URL structure
- Apply shared layouts to logical sections
- Example: `(auth)` routes all get centered card layout; `(dashboard)` routes get sidebar layout

---

## Server vs Client Components

**Default: Server Components** — render on the server, zero JS shipped to client.

| Use Server Component When | Use Client Component When |
|--------------------------|--------------------------|
| Fetching data | Event handlers (onClick, onChange) |
| Accessing backend resources | useState, useEffect, useRef |
| Keeping secrets server-side | Browser APIs (localStorage, IntersectionObserver) |
| Heavy dependencies (markdown, syntax highlighting) | Interactive widgets (dropdowns, modals, forms) |

### The "use client" Boundary

```typescript
// components/ui/button.tsx — needs onClick → client component
"use client";
export function Button({ ... }) { ... }

// app/(dashboard)/page.tsx — server component (default)
// Can import and use Button even though page is server component
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const stats = await getStats(); // Direct DB/API call — server only
  return (
    <main>
      <StatsGrid data={stats} />   {/* Server component */}
      <Button onClick={...}>Add</Button> {/* Client island */}
    </main>
  );
}
```

**Rule:** Push `"use client"` as far down the tree as possible. Keep pages and layouts as server components; wrap only the interactive parts.

---

## Root Layout

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | App Name",
    default: "App Name",
  },
  description: "Application description",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-surface-page text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

## Font Optimization with `next/font`

```typescript
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// Apply in layout:
<html className={`${inter.variable} ${jetbrainsMono.variable}`}>
```

---

## Image Optimization with `next/image`

```typescript
import Image from "next/image";

// Fixed size — known dimensions
<Image src="/hero.webp" alt="Hero" width={1200} height={600} priority />

// Responsive fill — parent is position: relative
<div className="relative aspect-video">
  <Image src={url} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
</div>

// Avatar
<Image
  src={user.avatar}
  alt={user.name}
  width={40}
  height={40}
  className="rounded-full"
/>
```

**Key props:**
- `priority` — above-the-fold images (LCP candidate)
- `sizes` — responsive hint for srcset (important for fill images)
- `placeholder="blur"` + `blurDataURL` — smooth loading experience

---

## Loading, Error, and Not Found

```typescript
// app/(dashboard)/loading.tsx — Suspense boundary
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="h-8 w-48 rounded bg-surface-sunken" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-24 rounded-[var(--radius-card)] bg-surface-sunken" />
        ))}
      </div>
    </div>
  );
}
```

```typescript
// app/(dashboard)/error.tsx — Error boundary
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12" role="alert">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-text-secondary">{error.message}</p>
      <button onClick={reset} className="rounded-md bg-action-primary px-4 py-2 text-white">
        Try again
      </button>
    </div>
  );
}
```

```typescript
// app/not-found.tsx — 404
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-text-secondary">Page not found</p>
      <Link href="/" className="text-action-primary hover:underline">
        Go home
      </Link>
    </div>
  );
}
```

---

## Metadata API

```typescript
// Static metadata
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your workspace",
};

// Dynamic metadata (for detail pages)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: item.name,
      images: [item.image],
    },
  };
}
```

---

## Data Fetching Patterns

### Server Component (preferred)

```typescript
// Direct async/await in server components
export default async function ProjectsPage() {
  const projects = await db.project.findMany();

  return (
    <ul>
      {projects.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### Server Actions (mutations)

```typescript
// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  await db.project.create({ data: { name } });
  revalidatePath("/projects");
}
```

```typescript
// Used in a client component form
"use client";
import { createProject } from "@/app/actions";

export function CreateForm() {
  return (
    <form action={createProject}>
      <input name="name" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

---

## Performance Checklist

- [ ] Images use `next/image` with `sizes` prop
- [ ] LCP image has `priority` prop
- [ ] Fonts use `next/font` (no external CSS font imports)
- [ ] `"use client"` only on interactive components (not pages/layouts)
- [ ] Heavy client libraries are dynamically imported: `const Chart = dynamic(() => import(...))`
- [ ] Metadata is set on every page
- [ ] `loading.tsx` exists for data-fetching pages
- [ ] `error.tsx` exists for error boundaries
