import React from "react";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/**
 * Enforces the layout grid.
 *
 * Max width: 1120px
 * Outer margin: fluid — clamps from 24px (mobile) to 160px (desktop)
 * Never centered blocks. All content left-aligned inside this container.
 */
export function ContentContainer({
  children,
  className = "",
  style,
  as: Tag = "div",
}: ContentContainerProps) {
  return (
    <Tag
      className={className}
      style={{
        maxWidth: "var(--content-max-width)",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(var(--content-margin-mobile), 11.1vw, var(--content-margin-desktop))",
        paddingRight: "clamp(var(--content-margin-mobile), 11.1vw, var(--content-margin-desktop))",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
