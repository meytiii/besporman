# React + Tailwind v4 + TypeScript Patterns

Production-ready component patterns using React 19, Tailwind CSS v4, TypeScript 5, and `cva` (class-variance-authority) for variant management.

---

## Foundation Setup

### Token → Tailwind Config Mapping

Tailwind v4 uses CSS-first configuration. Map design tokens to CSS custom properties:

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors — map from tokens/colors.json semantic tier */
  --color-action-primary: #2563eb;
  --color-action-primary-hover: #1d4ed8;
  --color-action-primary-active: #1e40af;
  --color-action-destructive: #dc2626;

  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-tertiary: #9ca3af;
  --color-text-on-action: #ffffff;

  --color-surface-page: #ffffff;
  --color-surface-card: #ffffff;
  --color-surface-sunken: #f9fafb;

  --color-border-default: #e5e7eb;
  --color-border-strong: #d1d5db;
  --color-border-focus: #3b82f6;
  --color-border-error: #ef4444;

  --color-feedback-success-bg: #f0fdf4;
  --color-feedback-error-bg: #fef2f2;
  --color-feedback-warning-bg: #fffbeb;
  --color-feedback-info-bg: #eff6ff;

  /* Typography */
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* Spacing — extends default scale */
  --spacing-4_5: 18px;

  /* Shadows */
  --shadow-focus-ring: 0 0 0 2px #ffffff, 0 0 0 4px #3b82f6;

  /* Border Radius */
  --radius-button: 6px;
  --radius-card: 8px;
  --radius-modal: 12px;
  --radius-badge: 9999px;
}

/* Dark mode overrides */
@variant dark (&:is(.dark *)) {
  --color-text-primary: #f9fafb;
  --color-text-secondary: #9ca3af;
  --color-surface-page: #030712;
  --color-surface-card: #111827;
  --color-border-default: #1f2937;
}
```

### Utility: `cn` function

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Component Patterns

### Button

```typescript
// components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap",
    "rounded-[var(--radius-button)]",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus-ring)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-action-primary text-text-on-action hover:bg-action-primary-hover active:bg-action-primary-active",
        secondary:
          "bg-surface-card text-text-primary border border-border-default hover:bg-surface-sunken active:bg-border-default",
        ghost:
          "text-text-primary hover:bg-surface-sunken active:bg-border-default",
        destructive:
          "bg-action-destructive text-text-on-action hover:bg-red-700 active:bg-red-800",
        link: "text-action-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm [&_svg]:size-4",
        md: "h-10 px-4 text-base [&_svg]:size-5",
        lg: "h-12 px-6 text-lg [&_svg]:size-6",
        icon: "h-10 w-10 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="sr-only">Loading</span>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
```

### Input

```typescript
// components/ui/input.tsx
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[var(--radius-button)]",
          "border bg-surface-card px-3 py-2",
          "text-base text-text-primary placeholder:text-text-tertiary",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus-ring)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-border-error focus-visible:border-border-error"
            : "border-border-default hover:border-border-strong focus-visible:border-border-focus",
          className
        )}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
```

### Card

```typescript
// components/ui/card.tsx
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-card)] bg-surface-card",
        "border border-border-default",
        "p-6",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 pb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl font-semibold text-text-primary", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-text-primary", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-end gap-2 pt-4", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
```

### Modal (Dialog)

```typescript
// components/ui/dialog.tsx
"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeClasses = {
  sm: "max-w-[400px]",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
  xl: "max-w-[960px]",
};

export function Dialog({ open, onClose, title, description, children, footer, size = "md" }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className={cn(
        "w-full rounded-[var(--radius-modal)] bg-surface-card p-0",
        "shadow-xl backdrop:bg-black/50",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95",
        sizeClasses[size]
      )}
      aria-labelledby="dialog-title"
      aria-describedby={description ? "dialog-desc" : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-default p-6 pb-4">
        <div>
          <h2 id="dialog-title" className="text-lg font-semibold text-text-primary">
            {title}
          </h2>
          {description && (
            <p id="dialog-desc" className="mt-1 text-sm text-text-secondary">
              {description}
            </p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="rounded-md p-1 text-text-secondary hover:bg-surface-sunken focus-visible:shadow-[var(--shadow-focus-ring)]"
          aria-label="Close dialog"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="overflow-y-auto p-6">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="flex items-center justify-end gap-2 border-t border-border-default p-6 pt-4">
          {footer}
        </div>
      )}
    </dialog>
  );
}
```

---

## Patterns

### Compound Components

Use React Context for compound component APIs:

```typescript
// Pattern: compound component
<Select value={val} onValueChange={setVal}>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>
```

### Dark Mode

Toggle via class on `<html>`:

```typescript
// hooks/use-theme.ts
"use client";
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || (!stored && system) ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return { theme, toggle };
}
```

### Animation with `prefers-reduced-motion`

```css
/* Tailwind v4 — respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Use `motion-safe:` and `motion-reduce:` prefixes in Tailwind classes:

```html
<div class="motion-safe:animate-fade-in motion-reduce:opacity-100">
  Content
</div>
```

---

## File Organization

```
src/
├── components/
│   ├── ui/              ← Atoms and molecules (Button, Input, Card, Dialog...)
│   ├── features/        ← Feature-specific compositions
│   └── layouts/         ← Header, Sidebar, page shells
├── hooks/               ← Custom React hooks
├── lib/
│   └── utils.ts         ← cn() and shared utilities
├── app/
│   ├── globals.css      ← Token → CSS variable mapping
│   ├── layout.tsx       ← Root layout with fonts
│   └── (routes)/        ← App Router routes
└── types/               ← Shared TypeScript types
```
