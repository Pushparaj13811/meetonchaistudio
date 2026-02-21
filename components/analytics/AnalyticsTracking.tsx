"use client";

import { useScrollTracking } from "@/hooks/useScrollTracking";
import { usePerformanceTracking } from "@/hooks/usePerformanceTracking";

/**
 * Global analytics tracking component
 * Includes scroll depth and performance monitoring
 */
export function AnalyticsTracking() {
  useScrollTracking();
  usePerformanceTracking();

  return null;
}
