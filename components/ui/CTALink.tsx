"use client";

import React from "react";

interface CTALinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "text" | "button";
}

/**
 * Call to action link component with two variants:
 * - text: Minimalist text with arrow (default)
 * - button: Premium chai-colored button with glow effect
 */
export function CTALink({ href, children, external = false, variant = "text" }: CTALinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (variant === "button") {
    return (
      <a
        href={href}
        {...externalProps}
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "var(--color-accent)",
          color: "#fff",
          padding: "16px 32px",
          borderRadius: "9999px",
          fontSize: "var(--text-body-l)",
          fontWeight: 600,
          textDecoration: "none",
          transition: "all var(--motion-base) var(--ease-out)",
          boxShadow: "0 0 20px rgba(230, 126, 34, 0.3)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.backgroundColor = "var(--color-accent-hover)";
          el.style.boxShadow = "0 0 30px rgba(230, 126, 34, 0.5)";
          el.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.backgroundColor = "var(--color-accent)";
          el.style.boxShadow = "0 0 20px rgba(230, 126, 34, 0.3)";
          el.style.transform = "translateY(0)";
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      {...externalProps}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "var(--text-body-l)",
        lineHeight: "var(--leading-body)",
        fontWeight: 500,
        color: "var(--color-accent)",
        textDecoration: "none",
        transition: "color var(--motion-base) var(--ease-out)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color =
          "color-mix(in srgb, var(--color-accent) 70%, var(--color-text) 30%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
      }}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
