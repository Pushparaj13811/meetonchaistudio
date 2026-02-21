"use client";

import Script from "next/script";
import { useEffect } from "react";

type ConsentStatus = "granted" | "denied";

interface ConsentSettings {
  analytics_storage: ConsentStatus;
  ad_storage: ConsentStatus;
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
  wait_for_update?: number;
}

interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: "consent" | "js" | "config",
      action: string | Date,
      params?: ConsentSettings | Record<string, unknown>
    ) => void;
  }
}

export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    // Check if user has previously given consent and update
    if (typeof window !== "undefined" && window.gtag) {
      const consentStr = localStorage.getItem("cookie-consent");
      if (consentStr) {
        try {
          const consent = JSON.parse(consentStr) as CookieConsentPreferences;
          console.log("[GA Consent] Updating from localStorage:", consent);
          // Update consent based on user's previous choice
          window.gtag("consent", "update", {
            analytics_storage: consent.analytics ? "granted" : "denied",
            ad_storage: consent.marketing ? "granted" : "denied",
            ad_user_data: consent.marketing ? "granted" : "denied",
            ad_personalization: consent.marketing ? "granted" : "denied",
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error("[GA Consent] Failed to parse consent:", error.message);
          }
        }
      } else {
        console.log("[GA Consent] No previous consent found");
      }
    }
  }, []);

  // Don't load GA scripts if no GA ID is set or it's the placeholder
  if (!GA_ID || GA_ID === "G-XXXXXXXXXX") {
    return null;
  }

  return (
    <>
      {/* Google Consent Mode v2 - Must load FIRST */}
      <Script
        id="google-consent-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });

            console.log('[GA Consent] Default consent set to denied');
          `,
        }}
      />

      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });

            console.log('[GA] Initialized with ID: ${GA_ID}');
          `,
        }}
      />
    </>
  );
}
