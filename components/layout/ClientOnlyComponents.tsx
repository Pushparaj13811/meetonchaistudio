"use client";

import dynamic from "next/dynamic";

// Lazy load non-critical UI components (client-side only)
const CursorDot = dynamic(() => import("@/components/ui/CursorDot").then(mod => ({ default: mod.CursorDot })), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress").then(mod => ({ default: mod.ScrollProgress })), {
  ssr: false,
});

const BackToTop = dynamic(() => import("@/components/ui/BackToTop").then(mod => ({ default: mod.BackToTop })), {
  ssr: false,
});

const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent").then(mod => ({ default: mod.CookieConsent })), {
  ssr: false,
});

export function ClientOnlyComponents() {
  return (
    <>
      <ScrollProgress />
      <CursorDot />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
