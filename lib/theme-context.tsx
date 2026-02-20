"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize from data-theme attribute set by blocking script
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "dark";
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || "dark";
  };

  const getInitialResolvedTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "dark";
    const currentTheme = document.documentElement.getAttribute("data-theme");
    return (currentTheme as "light" | "dark") || "dark";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(getInitialResolvedTheme);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      let effectiveTheme: "light" | "dark";

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        effectiveTheme = systemTheme;
      } else {
        effectiveTheme = theme;
      }

      setResolvedTheme(effectiveTheme);
      root.setAttribute("data-theme", effectiveTheme);
      localStorage.setItem("theme", theme);
    };

    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        updateTheme();
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
