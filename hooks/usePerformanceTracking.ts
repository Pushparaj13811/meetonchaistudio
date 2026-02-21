import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

/**
 * Track page load performance
 */
export function usePerformanceTracking() {
  useEffect(() => {
    // Track page load time
    if (typeof window !== "undefined" && "performance" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming;
            const loadTime = navEntry.loadEventEnd - navEntry.fetchStart;

            analytics.pageLoad(Math.round(loadTime), window.location.pathname);
          }
        }
      });

      observer.observe({ entryTypes: ["navigation"] });

      return () => observer.disconnect();
    }
  }, []);
}
