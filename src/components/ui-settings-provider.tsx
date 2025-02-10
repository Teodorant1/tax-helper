"use client";

import * as React from "react";
import { useUISettings } from "~/store/ui-settings";
import styles from "~/styles/ui-settings.module.css";
import { cn } from "~/lib/utils";

interface UISettingsProviderProps {
  children: React.ReactNode;
}

export function UISettingsProvider({ children }: UISettingsProviderProps) {
  const { settings } = useUISettings();
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Set CSS variables and mark as initialized
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const setVariables = () => {
      requestAnimationFrame(() => {
        const root = document.documentElement;
        const variables = {
          "--ui-border-radius": settings.layout.borderRadius,
          "--ui-base-font-size": settings.typography.baseFontSize,
          "--ui-sidebar-width": `${settings.layout.sidebarWidth}px`,
          "--ui-animation-speed":
            settings.typography.animationSpeed === "slower"
              ? "400ms"
              : settings.typography.animationSpeed === "faster"
                ? "100ms"
                : "200ms",
          "--ui-layout-spacing":
            settings.layout.layoutDensity === "compact"
              ? "0.5rem"
              : settings.layout.layoutDensity === "spacious"
                ? "1.5rem"
                : "1rem",
        };

        Object.entries(variables).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });

        setIsInitialized(true);
      });
    };

    // Set initial variables
    setVariables();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          setVariables();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [settings]);

  // Get layout density class
  const layoutClass = React.useMemo(() => {
    switch (settings.layout.layoutDensity) {
      case "compact":
        return styles.compact;
      case "spacious":
        return styles.spacious;
      default:
        return styles.comfortable;
    }
  }, [settings.layout.layoutDensity]);

  // Get animation speed class
  const animationClass = React.useMemo(() => {
    switch (settings.typography.animationSpeed) {
      case "slower":
        return styles.slower;
      case "faster":
        return styles.faster;
      default:
        return styles.default;
    }
  }, [settings.typography.animationSpeed]);

  if (!isInitialized) {
    return null;
  }

  return (
    <div
      className={cn(styles.uiSettings, layoutClass, animationClass)}
      style={
        {
          "--ui-border-radius": settings.layout.borderRadius,
          "--ui-base-font-size": settings.typography.baseFontSize,
          "--ui-sidebar-width": `${settings.layout.sidebarWidth}px`,
          "--ui-animation-speed":
            settings.typography.animationSpeed === "slower"
              ? "400ms"
              : settings.typography.animationSpeed === "faster"
                ? "100ms"
                : "200ms",
          "--ui-layout-spacing":
            settings.layout.layoutDensity === "compact"
              ? "0.5rem"
              : settings.layout.layoutDensity === "spacious"
                ? "1.5rem"
                : "1rem",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
