"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/lib/analytics";
import type { CookieConsentPreferences } from "@/types/analytics";
import "@/types/analytics";

/**
 * Cookie Consent Banner
 *
 * GDPR-compliant cookie consent with granular preferences
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functionality: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after 1 second
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const updateGoogleConsent = (prefs: CookieConsentPreferences) => {
    // Update Google Consent Mode v2
    // Wait for gtag to be available (max 3 seconds)
    let attempts = 0;
    const maxAttempts = 30;

    const updateConsent = () => {
      if (typeof window !== "undefined") {
        if (window.gtag) {
          console.log("[Cookie Consent] Updating consent:", prefs);
          window.gtag("consent", "update", {
            analytics_storage: prefs.analytics ? "granted" : "denied",
            ad_storage: prefs.marketing ? "granted" : "denied",
            ad_user_data: prefs.marketing ? "granted" : "denied",
            ad_personalization: prefs.marketing ? "granted" : "denied",
            functionality_storage: prefs.functionality ? "granted" : "denied",
          });

          // Track consent update
          analytics.consentUpdate(prefs.analytics, prefs.marketing, prefs.functionality);
        } else if (attempts < maxAttempts) {
          // Retry after a short delay if gtag isn't loaded yet
          attempts++;
          console.log(
            `[Cookie Consent] gtag not ready, retrying (${attempts}/${maxAttempts})...`
          );
          setTimeout(updateConsent, 100);
        } else {
          console.error("[Cookie Consent] gtag failed to load after 3 seconds");
        }
      }
    };
    updateConsent();
  };

  const acceptAll = () => {
    const consent: CookieConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: false,
      functionality: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    updateGoogleConsent(consent);
    setShow(false);
    setShowCustomize(false);
  };

  const rejectAll = () => {
    const consent: CookieConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functionality: false,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    updateGoogleConsent(consent);
    setShow(false);
    setShowCustomize(false);
  };

  const savePreferences = () => {
    const consent = { ...preferences, necessary: true };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    updateGoogleConsent(consent);
    setShow(false);
    setShowCustomize(false);
  };

  const togglePreference = (key: keyof CookieConsentPreferences) => {
    if (key === "necessary") return; // Can't toggle necessary
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="cookie-consent-popup"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          right: "20px",
          maxWidth: showCustomize ? "600px" : "480px",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          padding: "var(--space-4)",
          zIndex: 9998,
          background: "rgba(0, 0, 0, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        {!showCustomize ? (
          // Simple banner
          <>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.125rem",
                fontWeight: 700,
                marginBottom: "var(--space-2)",
                color: "#fff",
              }}
            >
              🍪 We value your privacy
            </h3>

            <p
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "var(--space-3)",
              }}
            >
              We use cookies to enhance your browsing experience, analyze site
              traffic, and remember your preferences. Necessary cookies are always required for the site to work.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-2)",
              }}
            >
              <button
                onClick={acceptAll}
                style={{
                  flex: "1",
                  minWidth: "120px",
                  background: "var(--color-accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-accent-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-accent)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Accept All
              </button>

              <button
                onClick={() => setShowCustomize(true)}
                style={{
                  flex: "1",
                  minWidth: "120px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Customize
              </button>

              <button
                onClick={rejectAll}
                style={{
                  flex: "1",
                  minWidth: "120px",
                  background: "transparent",
                  color: "rgba(255, 255, 255, 0.6)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                }}
              >
                Necessary Only
              </button>
            </div>

            <p
              style={{
                fontSize: "0.8125rem",
                color: "rgba(255, 255, 255, 0.5)",
                marginTop: "var(--space-2)",
                textAlign: "center",
              }}
            >
              Read our{" "}
              <a
                href="/privacy"
                style={{
                  color: "var(--color-accent)",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </a>
            </p>
          </>
        ) : (
          // Customization panel
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "var(--space-3)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Customize Your Preferences
              </h3>
              <button
                onClick={() => setShowCustomize(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "var(--space-3)" }}>
              {/* Necessary */}
              <CookieOption
                title="Necessary"
                description="Required for basic site functionality. Always enabled."
                checked={preferences.necessary}
                disabled={true}
                onChange={() => {}}
              />

              {/* Analytics */}
              <CookieOption
                title="Analytics & Performance"
                description="Help us improve by allowing anonymous usage analytics and performance monitoring."
                checked={preferences.analytics}
                onChange={() => togglePreference("analytics")}
              />

              {/* Functionality */}
              <CookieOption
                title="Functionality"
                description="Remember your theme, language, and booking preferences for a better experience."
                checked={preferences.functionality}
                onChange={() => togglePreference("functionality")}
              />

              {/* Marketing */}
              <CookieOption
                title="Marketing"
                description="Currently not used. We don't track you for marketing purposes."
                checked={preferences.marketing}
                onChange={() => togglePreference("marketing")}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "var(--space-2)",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={rejectAll}
                style={{
                  background: "transparent",
                  color: "rgba(255, 255, 255, 0.6)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Necessary Only
              </button>
              <button
                onClick={savePreferences}
                style={{
                  background: "var(--color-accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-accent-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-accent)";
                }}
              >
                Save Preferences
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function CookieOption({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <div
      style={{
        padding: "var(--space-3)",
        marginBottom: "var(--space-2)",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1, marginRight: "var(--space-2)" }}>
          <div
            style={{
              fontWeight: 600,
              color: "#fff",
              marginBottom: "4px",
              fontSize: "0.9375rem",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "0.8125rem",
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        </div>
        <label
          style={{
            position: "relative",
            display: "inline-block",
            width: "48px",
            height: "24px",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            style={{
              opacity: 0,
              width: 0,
              height: 0,
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: checked ? "var(--color-accent)" : "rgba(255, 255, 255, 0.2)",
              borderRadius: "24px",
              transition: "all 0.2s",
            }}
          >
            <span
              style={{
                position: "absolute",
                height: "18px",
                width: "18px",
                left: checked ? "27px" : "3px",
                bottom: "3px",
                background: "#fff",
                borderRadius: "50%",
                transition: "all 0.2s",
              }}
            />
          </span>
        </label>
      </div>
    </div>
  );
}
