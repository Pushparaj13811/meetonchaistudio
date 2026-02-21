/**
 * Google Analytics Type Definitions
 * Centralized type definitions for GA4 and Consent Mode
 */

export type ConsentStatus = "granted" | "denied";

export interface ConsentSettings {
  analytics_storage: ConsentStatus;
  ad_storage: ConsentStatus;
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
  functionality_storage?: ConsentStatus;
  wait_for_update?: number;
}

export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: "event" | "config" | "consent" | "set",
      targetOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {};
