"use client";

import { useEffect, type RefObject } from "react";

/**
 * Pause on Scroll — signature interaction.
 *
 * When the watched element enters the viewport, scrolling is gently resisted
 * for ~400ms. Not a scroll lock. The user retains full control — this is
 * a momentary friction, not a gate.
 *
 * Used at:
 *   - Turn 2: "Most software problems are thinking problems disguised as code."
 *   - Turn 5: "The responsibility still counts."
 *
 * Respects prefers-reduced-motion. If the user has opted out of motion,
 * this hook does nothing.
 */
export function usePauseOnScroll(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect the user's motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTriggered) return;
        hasTriggered = true;

        const holdY = window.scrollY;
        const holdStart = performance.now();
        const HOLD_DURATION = 400; // ms

        let frameId: number;

        const hold = () => {
          const elapsed = performance.now() - holdStart;

          if (elapsed < HOLD_DURATION) {
            // Nudge scroll back to held position each frame
            window.scrollTo({ top: holdY, behavior: "instant" as ScrollBehavior });
            frameId = requestAnimationFrame(hold);
          }
          // After HOLD_DURATION, stop — scroll resumes naturally
        };

        frameId = requestAnimationFrame(hold);

        return () => cancelAnimationFrame(frameId);
      },
      {
        // Trigger when 40% of the element is visible
        threshold: 0.4,
        // Bias slightly toward center of viewport
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);
}
