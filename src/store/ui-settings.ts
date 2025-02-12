import { create } from "zustand";
import type { UIConfig } from "~/types/ui";

const defaultConfig: NonNullable<UIConfig> = {
  id: crypto.randomUUID(),
  sidebarTitle: "TaxNow PRO",
  sidebarLogoId: null,
  greetingTitle: "TaxNow PRO",
  greetingSubtitle: "Your modern tax management solution",
  greetingLogoId: null,
  layoutBorderRadius: "0.5rem",
  layoutDensity: "comfortable",
  sidebarWidth: 280,
  baseFontSize: "1rem",
  animationSpeed: "default",
};

function isValidConfig(obj: unknown): obj is NonNullable<UIConfig> {
  try {
    if (!obj || typeof obj !== "object") return false;
    const config = obj as Record<string, unknown>;

    // Validate fields
    if (typeof config.id !== "string") return false;
    if (typeof config.sidebarTitle !== "string") return false;
    if (
      config.sidebarLogoId !== null &&
      typeof config.sidebarLogoId !== "string"
    )
      return false;
    if (typeof config.greetingTitle !== "string") return false;
    if (typeof config.greetingSubtitle !== "string") return false;
    if (
      config.greetingLogoId !== null &&
      typeof config.greetingLogoId !== "string"
    )
      return false;
    if (typeof config.layoutBorderRadius !== "string") return false;
    if (
      !["comfortable", "compact", "spacious"].includes(
        config.layoutDensity as string,
      )
    )
      return false;
    if (typeof config.sidebarWidth !== "number") return false;
    if (typeof config.baseFontSize !== "string") return false;
    if (
      !["slower", "default", "faster"].includes(config.animationSpeed as string)
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

    // Merge with default config to ensure all fields are present
    const config = parsed;
    const mergedConfig = {
      ...defaultConfig,
      ...config,
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
          "--ui-border-radius": newSettings.layoutBorderRadius,
          "--ui-base-font-size": newSettings.baseFontSize,
          "--ui-sidebar-width": `${newSettings.sidebarWidth}px`,
          "--ui-animation-speed":
            newSettings.animationSpeed === "slower"
              ? "400ms"
              : newSettings.animationSpeed === "faster"
                ? "100ms"
                : "200ms",
          "--ui-layout-spacing":
            newSettings.layoutDensity === "compact"
              ? "0.5rem"
              : newSettings.layoutDensity === "spacious"
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
