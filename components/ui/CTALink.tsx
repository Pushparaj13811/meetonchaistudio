"use client";

import React from "react";

interface CTALinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

/**
 * Text-only call to action.
 *
 * Rules:
 * - Arrow is a Unicode character (→), not an icon. It has weight and scales with font.
 * - Arrow does not move on hover.
 * - Text darkens 30% toward --color-text on hover.
 * - No border, no fill, no background.
 * - Accent color only.
 */
export function CTALink({ href, children, external = false }: CTALinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

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
