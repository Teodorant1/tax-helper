"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
}

interface UIConfig {
  borderRadius: string;
  fontSize: string;
  animationSpeed: number;
  density: "compact" | "comfortable" | "spacious";
  sidebarWidth: number;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Load theme config
    const themeConfig = localStorage.getItem("theme-config");
    if (themeConfig) {
      const theme = JSON.parse(themeConfig) as ThemeConfig;
      const root = document.documentElement;
      const currentTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";

      Object.entries(theme[currentTheme]).forEach(([key, value]) => {
        const hsl = value as string;
        if (hsl.startsWith("#")) {
          // Convert hex to HSL
          const r = parseInt(hsl.slice(1, 3), 16);
          const g = parseInt(hsl.slice(3, 5), 16);
          const b = parseInt(hsl.slice(5, 7), 16);

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          let h = 0;
          let s = 0;
          const l = ((max + min) / 2) * 100;

          if (max !== min) {
            const d = max - min;
            s = l > 50 ? (d / (2 - max - min)) * 100 : (d / (max + min)) * 100;
            switch (max) {
              case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
                break;
              case g:
                h = ((b - r) / d + 2) * 60;
                break;
              case b:
                h = ((r - g) / d + 4) * 60;
                break;
            }
          }

          root.style.setProperty(
            `--${key}`,
            `${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%`,
          );
        }
      });
    }

    // Load UI config
    const uiConfig = localStorage.getItem("ui-config");
    if (uiConfig) {
      const config = JSON.parse(uiConfig) as UIConfig;
      const root = document.documentElement;
      root.style.setProperty("--radius", config.borderRadius);
      root.style.setProperty("--font-size-base", config.fontSize);
      root.style.setProperty(
        "--animation-duration",
        `${0.2 * config.animationSpeed}s`,
      );
      root.style.setProperty(
        "--content-spacing",
        config.density === "compact"
          ? "0.5rem"
          : config.density === "comfortable"
            ? "1rem"
            : "1.5rem",
      );
      root.style.setProperty("--sidebar-width", `${config.sidebarWidth}px`);
    }

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
