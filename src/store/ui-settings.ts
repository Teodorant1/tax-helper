import { create } from "zustand";
import type { UIConfig } from "~/types/ui";

const defaultConfig: NonNullable<UIConfig> = {
  sidebarTitle: "TaxNow PRO",
  sidebarLogo: null,
  greeting: {
    title: "TaxNow PRO",
    subtitle: "Your modern tax management solution",
    logo: null,
  },
  layout: {
    borderRadius: "0.5rem",
    layoutDensity: "comfortable",
    sidebarWidth: 280,
  },
  typography: {
    baseFontSize: "1rem",
    animationSpeed: "default",
  },
};

function isValidConfig(obj: unknown): obj is NonNullable<UIConfig> {
  try {
    if (!obj || typeof obj !== "object") return false;
    const config = obj as Record<string, unknown>;

    // Validate basic structure
    if (typeof config.sidebarTitle !== "string") return false;
    if (config.sidebarLogo !== null && typeof config.sidebarLogo !== "object")
      return false;
    if (!config.greeting || typeof config.greeting !== "object") return false;

    // Validate greeting
    const greeting = config.greeting as Record<string, unknown>;
    if (typeof greeting.title !== "string") return false;
    if (typeof greeting.subtitle !== "string") return false;
    if (greeting.logo !== null && typeof greeting.logo !== "object")
      return false;

    // Validate layout
    if (!config.layout || typeof config.layout !== "object") return false;
    const layout = config.layout as Record<string, unknown>;
    if (typeof layout.borderRadius !== "string") return false;
    if (
      !["comfortable", "compact", "spacious"].includes(
        layout.layoutDensity as string,
      )
    )
      return false;
    if (typeof layout.sidebarWidth !== "number") return false;

    // Validate typography
    if (!config.typography || typeof config.typography !== "object")
      return false;
    const typography = config.typography as Record<string, unknown>;
    if (typeof typography.baseFontSize !== "string") return false;
    if (
      !["slower", "default", "faster"].includes(
        typography.animationSpeed as string,
      )
    )
      return false;

    // If all checks pass, it's valid
    return true;
  } catch (error) {
    console.error("Error validating UI config:", error);
    return false;
  }
}

function getSavedSettings(): NonNullable<UIConfig> {
  if (typeof window === "undefined") return defaultConfig;

  try {
    const saved = localStorage.getItem("ui-settings");
    if (!saved) return defaultConfig;

    const parsed = JSON.parse(saved) as unknown;
    if (!isValidConfig(parsed)) {
      console.warn("Invalid UI settings found in localStorage, using defaults");
      localStorage.setItem("ui-settings", JSON.stringify(defaultConfig));
      return defaultConfig;
    }

    // Deep merge with default config to ensure all fields are present
    const config = parsed;
    const mergedConfig = {
      ...defaultConfig,
      ...config,
      layout: {
        ...defaultConfig.layout,
        ...config.layout,
      },
      typography: {
        ...defaultConfig.typography,
        ...config.typography,
      },
      greeting: {
        ...defaultConfig.greeting,
        ...config.greeting,
      },
    };

    // Update storage with merged config
    localStorage.setItem("ui-settings", JSON.stringify(mergedConfig));
    return mergedConfig;
  } catch (error) {
    console.error("Error loading UI settings:", error);
    return defaultConfig;
  }
}

type UIStore = {
  settings: NonNullable<UIConfig>;
  setSettings: (settings: NonNullable<UIConfig>) => void;
  resetSettings: () => void;
  updateSettings: (partial: Partial<UIConfig>) => void;
};

export const useUISettings = create<UIStore>()((set, get) => ({
  settings: getSavedSettings(),
  setSettings: (newSettings) => {
    if (!isValidConfig(newSettings)) {
      console.error("Invalid settings provided");
      return;
    }
    set({ settings: newSettings });
    if (typeof window !== "undefined") {
      localStorage.setItem("ui-settings", JSON.stringify(newSettings));
      // Trigger a reflow to ensure styles are updated
      requestAnimationFrame(() => {
        const root = document.documentElement;
        const variables = {
          "--ui-border-radius": newSettings.layout.borderRadius,
          "--ui-base-font-size": newSettings.typography.baseFontSize,
          "--ui-sidebar-width": `${newSettings.layout.sidebarWidth}px`,
          "--ui-animation-speed":
            newSettings.typography.animationSpeed === "slower"
              ? "400ms"
              : newSettings.typography.animationSpeed === "faster"
                ? "100ms"
                : "200ms",
          "--ui-layout-spacing":
            newSettings.layout.layoutDensity === "compact"
              ? "0.5rem"
              : newSettings.layout.layoutDensity === "spacious"
                ? "1.5rem"
                : "1rem",
        };
        Object.entries(variables).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });
      });
    }
  },
  resetSettings: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ui-settings");
    }
    set({ settings: defaultConfig });
  },
  updateSettings: (partial) => {
    const current = get().settings;
    const updated = {
      ...current,
      ...partial,
      layout: partial.layout
        ? {
            ...current.layout,
            ...partial.layout,
          }
        : current.layout,
      typography: partial.typography
        ? {
            ...current.typography,
            ...partial.typography,
          }
        : current.typography,
      greeting: partial.greeting
        ? {
            ...current.greeting,
            ...partial.greeting,
          }
        : current.greeting,
    };
    if (!isValidConfig(updated)) {
      console.error("Invalid partial settings update");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("ui-settings", JSON.stringify(updated));
    }
    set({ settings: updated });
  },
}));
