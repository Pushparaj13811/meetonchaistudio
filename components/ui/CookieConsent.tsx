"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cookie Consent Banner
 *
 * GDPR-compliant cookie consent with preferences
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after 1 second
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: false,
    }));
    setShow(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
    }));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
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
            maxWidth: "480px",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            padding: "var(--space-4)",
            zIndex: 9998,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.125rem",
              fontWeight: 700,
              marginBottom: "var(--space-2)",
              color: "var(--color-text)",
            }}
          >
            🍪 We value your privacy
          </h3>

          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-3)",
            }}
          >
            We use cookies to enhance your browsing experience and analyze our
            traffic. By clicking "Accept All", you consent to our use of cookies.
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
                minWidth: "140px",
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
              onClick={acceptNecessary}
              className="cookie-secondary-button"
              style={{
                flex: "1",
                minWidth: "140px",
                color: "var(--color-text)",
                borderRadius: "8px",
                padding: "12px 20px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all var(--motion-base) var(--ease-out)",
              }}
            >
              Necessary Only
            </button>
          </div>

          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-muted)",
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
