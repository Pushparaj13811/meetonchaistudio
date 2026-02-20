"use client";

/**
 * Skip to Content Link
 *
 * Accessible navigation aid that allows keyboard users to skip directly
 * to the main content, bypassing navigation and other repeated elements.
 *
 * WCAG 2.1 Level A requirement
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        left: "-9999px",
        zIndex: 9999,
        padding: "16px 24px",
        background: "var(--color-accent)",
        color: "#fff",
        fontWeight: 600,
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "1rem",
        boxShadow: "0 4px 24px rgba(230, 126, 34, 0.6)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = "20px";
        e.currentTarget.style.top = "20px";
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = "-9999px";
        e.currentTarget.style.top = "auto";
      }}
    >
      Skip to main content
    </a>
  );
}
