"use client";

import { useTheme } from "@/lib/theme-context";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="theme-toggle-btn"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        position: "relative",
        cursor: "pointer",
        transition: "all var(--motion-base) var(--ease-out)",
        color: "var(--color-text-secondary)",
      }}
    >
      {/* Light Mode Icon (Chai Cup - Warm) */}
      <svg
        className="theme-icon-light"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Chai glass */}
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        {/* Steam lines */}
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>

      {/* Dark Mode Icon (Chai Cup - Cool) */}
      <svg
        className="theme-icon-dark"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Chai glass - empty/cool */}
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        {/* Crescent moon inside cup */}
        <path d="M9 12a3 3 0 0 0 3 3 3 3 0 0 0-3-3z" fill="currentColor" />
      </svg>
    </button>
  );
}
