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
        const hex = value as string;
        if (hex.startsWith("#")) {
          // Convert hex to RGB
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);

          // Convert RGB to HSL
          const rNorm = r / 255;
          const gNorm = g / 255;
          const bNorm = b / 255;

          const max = Math.max(rNorm, gNorm, bNorm);
          const min = Math.min(rNorm, gNorm, bNorm);
          const delta = max - min;

          let h = 0;
          let s = 0;
          const l = (max + min) / 2;

          if (delta !== 0) {
            s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);

            if (max === rNorm) {
              h = ((gNorm - bNorm) / delta) % 6;
            } else if (max === gNorm) {
              h = (bNorm - rNorm) / delta + 2;
            } else {
              h = (rNorm - gNorm) / delta + 4;
            }

            h = Math.round(h * 60);
            if (h < 0) h += 360;
          }

          s = Math.round(s * 100);
          const lPercent = Math.round(l * 100);

          // Set HSL values
          root.style.setProperty(`--${key}`, `${h} ${s}% ${lPercent}%`);
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
