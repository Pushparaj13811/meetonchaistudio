"use client";

import { analytics } from "@/lib/analytics";

/**
 * Footer
 *
 * Footer with branding, contact info, and links
 */
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: "var(--space-5)",
        paddingBottom: "var(--space-5)",
      }}
      className="footer-section"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 var(--space-3)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="footer-content"
        >
          {/* Branding & Contact */}
          <div style={{ textAlign: "center" }} className="footer-brand">
            <div style={{ marginBottom: "var(--space-2)" }}>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "var(--color-text)",
                }}
              >
                MeetOn<span style={{ color: "var(--color-accent)" }}>Chai</span>
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#a8adb5",
                  marginLeft: "var(--space-2)",
                }}
              >
                © 2026 Studio.
              </span>
            </div>

            {/* Contact Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", alignItems: "center" }}>
              <a
                href="mailto:hello@meetonchai.com"
                onClick={() => analytics.externalLinkClick("Email", "hello@meetonchai.com", "footer")}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  transition: "color var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                hello@meetonchai.com
              </a>
              <div style={{ display: "flex", gap: "var(--space-2)", fontSize: "0.875rem", color: "var(--color-text-secondary)", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                  href="tel:+9779804301484"
                  onClick={() => analytics.externalLinkClick("Phone", "+977 9804301484", "footer")}
                  style={{
                    color: "var(--color-text-secondary)",
                    transition: "color var(--motion-base) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#9ca3af";
                  }}
                >
                  +977 9804301484
                </a>
                <span>·</span>
                <a
                  href="tel:+917635022185"
                  onClick={() => analytics.externalLinkClick("Phone", "+91 7635022185", "footer")}
                  style={{
                    color: "var(--color-text-secondary)",
                    transition: "color var(--motion-base) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#9ca3af";
                  }}
                >
                  +91 7635022185
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "var(--space-3)",
            }}
            className="footer-links"
          >
            <a
              href="/about"
              onClick={() => analytics.navigationClick("About", "footer")}
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              About
            </a>
            <a
              href="/privacy"
              onClick={() => analytics.navigationClick("Privacy Policy", "footer")}
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={() => analytics.navigationClick("Terms of Service", "footer")}
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              Terms of Service
            </a>
            <a
              href="#"
              onClick={() => analytics.socialMediaClick("LinkedIn", "footer")}
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              LinkedIn
            </a>
            <a
              href="#"
              onClick={() => analytics.socialMediaClick("Dribbble", "footer")}
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              Dribbble
            </a>
            <a
              href="#"
              onClick={() => analytics.socialMediaClick("GitHub", "footer")}
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row !important;
          }
          .footer-brand {
            text-align: left !important;
          }
          .footer-links {
            gap: var(--space-4) !important;
          }
        }
      `}</style>
    </footer>
  );
}
