"use client";

import * as React from "react";
import { useUISettings, useUISettingsSync } from "~/store/ui-settings";
import styles from "~/styles/ui-settings.module.css";
import { cn } from "~/lib/utils";

interface UISettingsProviderProps {
  children: React.ReactNode;
}

export function UISettingsProvider({ children }: UISettingsProviderProps) {
  const { settings } = useUISettings();
  const { isLoading } = useUISettingsSync();

  // Get layout density class
  const layoutClass = React.useMemo(() => {
    switch (settings.layoutDensity) {
      case "compact":
        return styles.compact;
      case "spacious":
        return styles.spacious;
      default:
        return styles.comfortable;
    }
  }, [settings.layoutDensity]);

  // Get animation speed class
  const animationClass = React.useMemo(() => {
    switch (settings.animationSpeed) {
      case "slower":
        return styles.slower;
      case "faster":
        return styles.faster;
      default:
        return styles.default;
    }
  }, [settings.animationSpeed]);

  // Show nothing while initial settings are loading
  if (isLoading) {
    return null;
  }

  return (
    <div
      className={cn(styles.uiSettings, layoutClass, animationClass)}
      style={
        {
          "--ui-border-radius": settings.layoutBorderRadius,
          "--ui-base-font-size": settings.baseFontSize,
          "--ui-sidebar-width": `${settings.sidebarWidth}px`,
          "--ui-animation-speed":
            settings.animationSpeed === "slower"
              ? "400ms"
              : settings.animationSpeed === "faster"
                ? "100ms"
                : "200ms",
          "--ui-layout-spacing":
            settings.layoutDensity === "compact"
              ? "0.5rem"
              : settings.layoutDensity === "spacious"
                ? "1.5rem"
                : "1rem",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
