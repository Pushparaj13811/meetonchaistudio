/**
 * Framer Motion presets for Meet on Chai.
 *
 * Rules:
 * - Animation serves reading. If it draws attention to itself, it's wrong.
 * - Easing: cubic-bezier(0.16, 1, 0.3, 1) — sharp entry, long settle
 * - y offset: 12px max. Never scale. Never blur.
 * - Stagger: 60–120ms between children. Never more.
 * - All scroll-triggered variants fire once only (viewport: { once: true })
 */

import type { Variants, Transition } from "framer-motion";

// ─── Shared easing ────────────────────────────────────────────────────────────

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.7, 0, 0.84, 0] as const;

// ─── Page load: Turn 1 only ───────────────────────────────────────────────────

/**
 * Used exclusively on Turn 1 (the opening line).
 * No y-offset — pure opacity. The text is already in position.
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const fadeInTransition: Transition = {
  duration: 0.7,
  ease: EASE_OUT,
  delay: 0.2,
};

// ─── Scroll-triggered ─────────────────────────────────────────────────────────

/**
 * Standard scroll-entry animation.
 * Subtle lift (12px) + fade. Fires once when element enters viewport.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpTransition: Transition = {
  duration: 0.48,
  ease: EASE_OUT,
};

/**
 * Viewport config for all scroll-triggered animations.
 * margin: "-80px" means trigger fires slightly before the element is fully visible.
 */
export const viewportOnce = { once: true, margin: "-80px" } as const;

// ─── Staggered lists ──────────────────────────────────────────────────────────

/**
 * Parent container that staggers its children.
 * Use with staggerItem on each child.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

/**
 * Individual stagger child.
 * Inherits visibility state from staggerContainer parent.
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export const staggerItemTransition: Transition = {
  duration: 0.4,
  ease: EASE_OUT,
};

// ─── Delayed variants (for Turn 3 split layout) ───────────────────────────────

/**
 * Generates a fadeUp variant with a fixed delay.
 * Used to sequence blocks that appear in the same viewport window.
 */
export function fadeUpDelayed(delayMs: number): Transition {
  return {
    duration: 0.48,
    ease: EASE_OUT,
    delay: delayMs / 1000,
  };
}
