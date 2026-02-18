"use client";

import { useEffect, useRef } from "react";

/**
 * CursorDot — 6px warm brown dot that replaces the default cursor near CTAs.
 *
 * Behavior:
 * - Hidden until first mousemove (starts at opacity 0, transitions to 1)
 * - Follows mouse with a slight lag (lerp 0.15 per frame at 60fps)
 * - Hidden when mouse leaves the window
 * - Does not render on coarse pointer devices (handled by CSS media query)
 *
 * The lag is intentional — it reinforces "slowly at first" without being
 * slow enough to feel broken. At lerp 0.15, it catches up in ~20 frames (~330ms).
 *
 * Note: The dot uses transform3d for GPU compositing (no layout reflow on move).
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Skip on non-precise pointer devices (handled by CSS, but double-check here)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let rafId: number;
    let hasAppeared = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasAppeared) {
        hasAppeared = true;
        dot.classList.add("is-visible");
      }
    };

    const onLeave = () => {
      dot.classList.remove("is-visible");
      hasAppeared = false;
    };

    const onEnter = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasAppeared = true;
      dot.classList.add("is-visible");
    };

    const tick = () => {
      // Lerp: 15% of remaining distance per frame — smooth lag
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
