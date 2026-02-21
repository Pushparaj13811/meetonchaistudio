"use client";

import Script from "next/script";
import { useEffect } from "react";

export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  // Don't load if no GA ID is set or it's the placeholder
  if (!GA_ID || GA_ID === "G-XXXXXXXXXX") {
    return null;
  }

  useEffect(() => {
    // Check if user has previously given consent
    const consentStr = localStorage.getItem("cookie-consent");
    if (consentStr) {
      try {
        const consent = JSON.parse(consentStr);
        // Update consent based on user's previous choice
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("consent", "update", {
            analytics_storage: consent.analytics ? "granted" : "denied",
            ad_storage: consent.marketing ? "granted" : "denied",
          });
        }
      } catch (e) {
        console.error("Failed to parse consent:", e);
      }
    }
  }, []);

  return (
    <>
      {/* Google Consent Mode v2 - Set default to denied */}
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Default consent to denied (GDPR compliant)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
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
          `,
        }}
      />
    </>
  );
}
