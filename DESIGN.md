# Meet on Chai — Design & Implementation Document

**Version:** 1.0
**Stack:** Next.js 16 (App Router) · TypeScript 5 · Tailwind CSS 4 · Framer Motion
**Status:** Pre-build specification

---

## Table of Contents

1. [Brand POV — The Governing Constraint](#1-brand-pov)
2. [Homepage Narrative — Seven Turns](#2-homepage-narrative)
3. [Typography-First Layout System](#3-typography-system)
4. [Color & Spacing Tokens](#4-tokens)
5. [Motion System](#5-motion-system)
6. [Signature Interaction — Pause on Scroll](#6-pause-on-scroll)
7. [Implementation Guide — Next.js + Framer Motion](#7-implementation)
8. [File Structure](#8-file-structure)
9. [Dependency Install](#9-dependencies)

---

## 1. Brand POV — The Governing Constraint

> "Good software is built the same way good conversations happen.
> Slowly at first. Clearly. With responsibility for what's said."

This is not a tagline. It is the decision filter applied to every element on this site.

### Implications, stated precisely

| Principle | Design consequence |
|-----------|-------------------|
| Slowly at first | No immediate CTAs. No aggressive hero layouts. |
| Clearly | Single font. Strict type scale. No decoration. |
| With responsibility | Nothing is added unless it earns its place. |

**Anti-patterns this POV explicitly rejects:**

- Gradient hero sections
- Animated counters, client logos, trust badges
- Sticky banners, popups, chat widgets
- Uppercase headings with letter-spacing
- Hover effects that perform rather than respond

If a design decision cannot be justified against the POV, it is removed.

---

## 2. Homepage Narrative — Seven Turns

The page is structured as a conversation, not a sales document. Each section is a turn in that conversation. The sequence is intentional. Reordering it breaks the logic.

---

### Turn 1 — Silence Before Speech

**Copy:**
> Let's slow this down.

**Placement:** Full viewport. Top-left meta label. Center-left display headline. Nothing else.

**Why it appears here:**
This is the opening line of the conversation, not a headline. Its job is to set pace, not explain. The reader arrives from some context — a referral, a search, a recommendation. This line meets them immediately with an absence of urgency. The visual emptiness is deliberate: you cannot feel the calm if the frame is busy.

**Layout:**
- `meetonchai.com` — top-left, 12px, opacity 60%
- `Let's slow this down.` — 92px, weight 700, left-aligned, vertically centered with generous offset
- No navigation emphasis at this point
- No scroll indicator

**Animation:**
Text fades in over 700ms. Nothing else moves. Delay: 200ms after page load. This mirrors the natural beat before someone begins to speak.

---

### Turn 2 — The Position

**Copy:**
> Most software problems are thinking problems disguised as code.

**Placement:** Immediately below Turn 1 on scroll. Text appears alone, full width.

**Why it appears here:**
This is the reason the studio exists. It's a position, not a pitch. It follows the pace-setting opener because the reader has already slowed down. Now they receive the core belief. If this line were the first thing they read, it would scan as clever. After Turn 1, it reads as accurate. The sequence matters.

**Layout:**
- 64px, weight 700, left-aligned
- Max width: 700px (forces a natural break point at "disguised as code")
- 144px vertical space above (three rhythm units)

**Animation:**
`fadeUp` — opacity 0→1, y 12→0 on scroll entry. Once only. No loop.

**Pause on Scroll trigger:**
This is the first of two scroll-resistance points. See Section 6.

---

### Turn 3 — What "Meet on Chai" Means

**Copy (left):**
> Meet on Chai is a small product studio.
> We build web and mobile software by talking things through properly —
> before writing a single line of code.

**Copy (right — meta list):**
> Fewer features
> Clear decisions
> Long-term ownership

**CTA (bottom-left):**
> Start a conversation →

**Placement:** Split layout. Body copy left, meta qualifiers right.

**Why it appears here:**
After stating the position, the studio introduces itself — briefly. This is the first time "Meet on Chai" appears as a named entity. The reader now knows what to call the thing they're reading about. The split layout is used here and nowhere else: it signals that the meta list is secondary information, present for those who want it, not demanded of those who don't. The CTA appears only after the studio has been introduced — not before.

**Layout:**
- Left column: 7 of 12 grid columns. Body L, 18px.
- Right column: 4 of 12 columns, offset. Meta text, 12px, opacity 60%.
- CTA: Body L / Medium. Text only. Accent color (#7A6A4F). No border, no fill.
- 96px gap above, 96px gap below.

**Animation:**
Left block `fadeUp` first. Right block `fadeUp` with 120ms delay. CTA `fadeUp` with 240ms delay. Stagger is deliberate: left-to-right, not simultaneous.

---

### Turn 4 — The Work

**Copy:**
> The kind of work we take on

**List:**
> MVPs that need to survive real users
> Internal tools that replace chaos
> AI features that are explainable and maintainable
> Products that need one owner, not ten vendors

**Placement:** Full-width section. Heading at 40px, list at 18px. No icons.

**Why it appears here:**
The reader understands the POV and the studio. Now they need to know if their project qualifies. This section answers that without framing it as services or pricing. The list reads like a checklist of types of work the studio finds worth doing. The absence of icons, cards, and visual separators keeps the list flat — everything is equal weight. No item is more important than another.

**Layout:**
- Heading: 40px, weight 600
- List: 18px, weight 400. Line-height 1.6. Each item on its own line.
- No bullets, no numbers, no icons. Lines separated by 24px.
- Max content width: 640px

**Animation:**
Heading `fadeUp` first. List items stagger with 80ms delays.

---

### Turn 5 — Experience (Without Portfolio)

**Copy:**
> Some of our work was built inside other teams
> and can't be shown publicly.

*(Pause.)*

> The responsibility still counts.

**Placement:** Near-full width. The final sentence is typographically isolated — larger, separate.

**Why it appears here:**
Most studios use this slot for case studies or client logos. This studio does neither. Instead, it names the constraint honestly — work exists that cannot be shown — and then makes a claim about professional standards that doesn't require proof. "The responsibility still counts" is the most load-bearing line on the site. It must hit alone. Its isolation in the layout is not stylistic; it is structural. If it appears alongside anything else, it is diminished.

**Layout:**
- First two lines: 18px, weight 400, max-width 520px
- Gap between two lines and final statement: 96px
- "The responsibility still counts." — 40px, weight 600. Stands alone.

**Animation:**
First block `fadeUp`. Then a 600ms pause (not a scroll lock — see Section 6). Then the final statement `fadeUp`. The pause is the second Pause on Scroll trigger point.

---

### Turn 6 — How It Works

**Copy:**
> How we work

**List:**
> We talk until the problem is boring
> We define scope until it's uncomfortable
> We build fast, review slowly
> We ship, document, and stay accountable

**Placement:** Below Turn 5. Structured, compact. No icons.

**Why it appears here:**
After establishing accountability, the reader wants to understand process. This turn is short by design: four lines that describe behavior, not methodology. The language is direct ("uncomfortable", "boring") because the intended reader — a careful technical founder — recognizes that candor is more trustworthy than polish. This section reassures without performing.

**Layout:**
- Heading: 40px, weight 600
- List: 18px, weight 400
- Max width: 580px
- 96px gap above

**Animation:**
`fadeUp` in sequence, 60ms stagger between items.

---

### Turn 7 — Close

**Copy:**
> If this feels like your pace, let's talk.

**CTA:**
> Book a 15-minute chai →

**Placement:** Final section. Near-empty. Large top margin.

**Why it appears here:**
This is the close of the conversation. The phrasing "if this feels like your pace" qualifies the invitation: it is not extended to everyone, only to those for whom the preceding six turns were a match. There is no pressure. The CTA ("Book a 15-minute chai") is specific — 15 minutes is a small commitment — and named in the studio's own language. It reads as an offer, not a demand.

**Layout:**
- Copy: 40px, weight 600, max-width 560px
- CTA below with 48px gap
- 144px top margin from Turn 6
- Footer below: 72px, meta text. Single line. `hello@meetonchai.com` or equivalent.

**Animation:**
`fadeUp` on the line. CTA `fadeUp` with 160ms delay.

---

## 3. Typography System

### Font

**Primary:** Inter (Google Fonts)
**Variants in use:** 400, 500, 600, 700
**Fallback stack:** `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

No italics. No condensed variants. No letter-spacing modifications.

**Why Inter:**
Inter is designed for screens. Its optical sizing at large weights holds well at 92px without distortion. It reads neutrally at body sizes. It does not signal "design agency" or "startup". It reads like an engineer chose it, which is accurate.

### Type Scale

| Token | Size | Line-height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `display-xl` | 92px | 1.05 | 700 | Turn 1 only |
| `display-l` | 64px | 1.1 | 700 | Turn 2 |
| `heading` | 40px | 1.2 | 600 | Section headers, Turn 5 final line |
| `body-l` | 18px | 1.6 | 400 | Primary body copy |
| `body-s` | 15px | 1.6 | 400 | Secondary or supporting copy |
| `meta` | 12px | 1.4 | 500 | Labels, site ID, right-column qualifiers |

### Layout Grid

- **Max content width:** 1120px
- **Outer margin (desktop):** 160px each side within 1440px frame
- **Outer margin (tablet):** 96px
- **Outer margin (mobile):** 24px
- **Columns:** 12
- **Column gap:** 24px
- **Baseline unit:** 8px
- **Vertical rhythm unit:** 48px (all vertical spacing is multiples of 48)

**Content width rules:**
- Body text (`body-l`): never exceeds 60ch (~640px)
- Display text: no max-width constraint, but never wraps awkwardly
- Headlines are sized so natural line breaks land at meaningful points

**Text alignment:** Left only. No centered text blocks, including on mobile.

---

## 4. Tokens

### Color

```css
:root {
  --color-bg: #fafafa;
  --color-text: #121212;
  --color-muted: rgba(18, 18, 18, 0.6);
  --color-accent: #7a6a4f; /* warm brown, chai-adjacent */
}
```

**Accent usage rules:**
- CTA text and arrow only
- Active navigation underline
- Never for headings
- Never as a background
- Never decoratively

### Spacing

```css
:root {
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 48px;
  --space-5: 96px;
  --space-6: 144px;
}
```

No intermediate values. No `margin: 20px`. If spacing looks "almost right", it is wrong.

### Motion

```css
:root {
  --motion-fast: 120ms;
  --motion-base: 240ms;
  --motion-slow: 480ms;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
}
```

---

## 5. Motion System

### Governing rule

Animation serves reading. If an animation draws attention to itself, it is wrong.

### Framer Motion presets

**Fade In (Turn 1 — on page load)**

```tsx
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1],
    delay: 0.2,
  },
};
```

**Fade + Lift (Scroll-triggered sections)**

```tsx
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: {
    duration: 0.48,
    ease: [0.16, 1, 0.3, 1],
  },
};
```

**Staggered list items**

```tsx
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};
```

### CTA hover (micro-interaction)

```css
.cta-link {
  color: var(--color-accent);
  transition: color var(--motion-base) var(--ease-out);
  cursor: none; /* replaced with custom dot cursor */
}

.cta-link:hover {
  color: color-mix(in srgb, var(--color-accent) 70%, var(--color-text) 30%);
}
```

- Arrow does not move
- Text darkens 30% toward `--color-text`
- Custom cursor: 6px dot, `var(--color-accent)`, no border

**What does not animate:**
- Background color
- Layout shift
- Scale transforms on text
- Anything on page load except Turn 1 copy

---

## 6. Signature Interaction — Pause on Scroll

### What it is

At two scroll positions — Turn 2 and Turn 5's final line — scrolling exhibits a brief, gentle resistance. The page does not stop. It slows for approximately 400ms, during which the target text fades in. Then scroll continues normally.

This is not scroll hijacking. The user retains control at all times.

### Why it exists

The POV of this studio is "slowly at first." The pause interaction makes the site behave in accordance with its own stated belief. It is not decorative. It is the site demonstrating its argument. These two pauses are used at the two most significant copy points:

- "Most software problems are thinking problems disguised as code." — because this is the core position and it should be read, not scrolled past
- "The responsibility still counts." — because this line is isolated for a reason; the interaction reinforces that isolation

### Technical implementation

**Approach:** `IntersectionObserver` watching sentinel elements. On intersection, temporarily add `scroll-snap-type` resistance behavior to a wrapper, remove after 400ms.

**Why not `scroll-behavior: smooth`:** That affects all scroll, not a specific trigger. We need targeted behavior.

**Why not `overscroll-behavior`:** Does not create the correct feel.

**The mechanism:**

```tsx
// hooks/usePauseOnScroll.ts

import { useEffect, useRef } from "react";

export function usePauseOnScroll(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Apply momentary scroll resistance
        document.documentElement.style.setProperty(
          "scroll-behavior",
          "smooth"
        );

        const scrollY = window.scrollY;

        // Hold scroll position for 400ms via rAF loop
        let held = true;
        const holdStart = performance.now();

        const hold = () => {
          if (!held) return;
          const elapsed = performance.now() - holdStart;

          if (elapsed < 400) {
            window.scrollTo({ top: scrollY, behavior: "instant" });
            requestAnimationFrame(hold);
          } else {
            held = false;
            document.documentElement.style.removeProperty("scroll-behavior");
          }
        };

        requestAnimationFrame(hold);

        // Observe only once
        observer.unobserve(el);
      },
      {
        threshold: 0.4, // Trigger when 40% of element is visible
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
```

**Usage:**

```tsx
const pauseRef = useRef<HTMLElement>(null);
usePauseOnScroll(pauseRef);

return <section ref={pauseRef}>Most software problems...</section>;
```

**Consideration for reduced-motion:**

```tsx
// In the hook, before applying the effect:
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
if (prefersReducedMotion) return;
```

---

## 7. Implementation Guide — Next.js + Framer Motion

### Font setup (app/layout.tsx)

Replace Geist with Inter:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
```

### Global CSS (app/globals.css)

```css
@import "tailwindcss";

:root {
  --color-bg: #fafafa;
  --color-text: #121212;
  --color-muted: rgba(18, 18, 18, 0.6);
  --color-accent: #7a6a4f;

  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 48px;
  --space-5: 96px;
  --space-6: 144px;

  --motion-fast: 120ms;
  --motion-base: 240ms;
  --motion-slow: 480ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

@theme inline {
  --font-sans: var(--font-inter);
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}
```

### Page structure (app/page.tsx)

```tsx
"use client";

import TurnOne from "@/components/turns/TurnOne";
import TurnTwo from "@/components/turns/TurnTwo";
import TurnThree from "@/components/turns/TurnThree";
import TurnFour from "@/components/turns/TurnFour";
import TurnFive from "@/components/turns/TurnFive";
import TurnSix from "@/components/turns/TurnSix";
import TurnSeven from "@/components/turns/TurnSeven";

export default function Home() {
  return (
    <main>
      <TurnOne />
      <TurnTwo />
      <TurnThree />
      <TurnFour />
      <TurnFive />
      <TurnSix />
      <TurnSeven />
    </main>
  );
}
```

### Layout wrapper component

```tsx
// components/layout/ContentContainer.tsx

export function ContentContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        maxWidth: "1120px",
        margin: "0 auto",
        paddingLeft: "clamp(24px, 11.1vw, 160px)",
        paddingRight: "clamp(24px, 11.1vw, 160px)",
      }}
    >
      {children}
    </div>
  );
}
```

### Example: TurnOne component

```tsx
// components/turns/TurnOne.tsx

"use client";

import { motion } from "framer-motion";
import { ContentContainer } from "@/components/layout/ContentContainer";

export default function TurnOne() {
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <ContentContainer>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            display: "block",
            fontSize: "12px",
            lineHeight: 1.4,
            fontWeight: 500,
            color: "var(--color-muted)",
            marginBottom: "48px",
          }}
        >
          meetonchai.com
        </motion.span>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontSize: "clamp(52px, 6.4vw, 92px)",
            lineHeight: 1.05,
            fontWeight: 700,
            color: "var(--color-text)",
            margin: 0,
            maxWidth: "14ch",
          }}
        >
          Let&apos;s slow this down.
        </motion.h1>
      </ContentContainer>
    </section>
  );
}
```

### Example: TurnTwo component (with Pause on Scroll)

```tsx
// components/turns/TurnTwo.tsx

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { usePauseOnScroll } from "@/hooks/usePauseOnScroll";

export default function TurnTwo() {
  const ref = useRef<HTMLElement>(null!);
  usePauseOnScroll(ref);

  return (
    <section
      ref={ref}
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
      }}
    >
      <ContentContainer>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 4.4vw, 64px)",
            lineHeight: 1.1,
            fontWeight: 700,
            color: "var(--color-text)",
            maxWidth: "700px",
            margin: 0,
          }}
        >
          Most software problems are thinking problems disguised as code.
        </motion.h2>
      </ContentContainer>
    </section>
  );
}
```

### CTA component

```tsx
// components/ui/CTALink.tsx

"use client";

export function CTALink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "18px",
        lineHeight: 1.6,
        fontWeight: 500,
        color: "var(--color-accent)",
        textDecoration: "none",
        cursor: "none", // handled by custom cursor
        transition: `color var(--motion-base) var(--ease-out)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color =
          "color-mix(in srgb, var(--color-accent) 70%, var(--color-text) 30%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
      }}
    >
      {children}
      <span aria-hidden="true" style={{ display: "inline-block" }}>
        →
      </span>
    </a>
  );
}
```

---

## 8. File Structure

```
meetonchaistudio/
├── app/
│   ├── layout.tsx          # Inter font, metadata
│   ├── page.tsx            # Composes seven turn components
│   └── globals.css         # Design tokens, base styles
├── components/
│   ├── layout/
│   │   └── ContentContainer.tsx
│   ├── turns/
│   │   ├── TurnOne.tsx     # "Let's slow this down."
│   │   ├── TurnTwo.tsx     # POV statement + pause
│   │   ├── TurnThree.tsx   # Studio introduction + split layout
│   │   ├── TurnFour.tsx    # Work types
│   │   ├── TurnFive.tsx    # Experience + "The responsibility still counts."
│   │   ├── TurnSix.tsx     # How we work
│   │   └── TurnSeven.tsx   # Close + CTA
│   └── ui/
│       └── CTALink.tsx
├── hooks/
│   └── usePauseOnScroll.ts
└── DESIGN.md               # This document
```

---

## 9. Dependencies

**Add to the project:**

```bash
bun add framer-motion
```

No other dependencies are needed. Tailwind CSS 4 handles all utility styling. Framer Motion handles all animation. No UI library, no component framework, no icon library.

**Why no icon library:**
Icons are not used on this site. The arrow in the CTA is a Unicode character (`→`), which is intentional. It has weight, it scales with the font, it is not an SVG that needs loading.

**Why no additional packages:**
Every dependency is a decision. This site does not need date formatting, routing libraries, state management, or form handling. Keep the bundle thin.

---

## Implementation Sequence

Build in this order:

1. Install Framer Motion. Replace font with Inter. Update `globals.css` with all tokens.
2. Build `ContentContainer`. Verify layout grid on desktop, tablet, mobile.
3. Build `TurnOne`. Verify fade-in timing. Verify the page feels slow and intentional.
4. Build `TurnTwo` through `TurnSeven` in sequence. Each turn informs the next.
5. Implement `usePauseOnScroll`. Test on Turn 2 first. Adjust `threshold` if needed.
6. Apply `CTALink` component to Turn 3 and Turn 7.
7. Verify reduced-motion behavior. Verify on actual mobile devices.
8. Review the full page as a first-time reader would. Ask: does it feel calm?

---

*This document is the source of truth for all design decisions on meetonchai.com. If a decision is not in this document, it needs to be made here before it is made in code.*
