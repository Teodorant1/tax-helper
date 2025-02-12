import { create } from "zustand";
import type { ClientThemeConfig } from "~/types/theme";

const defaultTheme: ClientThemeConfig = {
  light: {
    primary: "#7c3aed",
    secondary: "#6b7280",
    accent: "#f59e0b",
  },
  dark: {
    primary: "#8b5cf6",
    secondary: "#9ca3af",
    accent: "#fbbf24",
  },
};

function isValidTheme(obj: unknown): obj is ClientThemeConfig {
  try {
    if (!obj || typeof obj !== "object") return false;
    const config = obj as Record<string, unknown>;

    // Check light theme
    if (!config.light || typeof config.light !== "object") return false;
    const light = config.light as Record<string, unknown>;
    if (typeof light.primary !== "string") return false;
    if (typeof light.secondary !== "string") return false;
    if (typeof light.accent !== "string") return false;

    // Check dark theme
    if (!config.dark || typeof config.dark !== "object") return false;
    const dark = config.dark as Record<string, unknown>;
    if (typeof dark.primary !== "string") return false;
    if (typeof dark.secondary !== "string") return false;
    if (typeof dark.accent !== "string") return false;

    // Validate hex color codes
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexPattern.test(light.primary)) return false;
    if (!hexPattern.test(light.secondary)) return false;
    if (!hexPattern.test(light.accent)) return false;
    if (!hexPattern.test(dark.primary)) return false;
    if (!hexPattern.test(dark.secondary)) return false;
    if (!hexPattern.test(dark.accent)) return false;

    return true;
  } catch (error) {
    console.error("Error validating theme config:", error);
    return false;
  }
}

function getSavedTheme(): ClientThemeConfig {
  if (typeof window === "undefined") return defaultTheme;

  try {
    const saved = localStorage.getItem("theme-config");
    if (!saved) return defaultTheme;

    const parsed = JSON.parse(saved) as unknown;
    if (!isValidTheme(parsed)) {
      console.warn("Invalid theme found in localStorage, using defaults");
      localStorage.setItem("theme-config", JSON.stringify(defaultTheme));
      return defaultTheme;
    }

    return parsed;
  } catch (error) {
    console.error("Error loading theme:", error);
    return defaultTheme;
  }
}

function applyTheme(theme: ClientThemeConfig, isDark = false) {
  if (typeof window === "undefined") return;

  requestAnimationFrame(() => {
    const root = document.documentElement;
    const colors = isDark ? theme.dark : theme.light;

    root.style.setProperty("--theme-primary", colors.primary);
    root.style.setProperty("--theme-secondary", colors.secondary);
    root.style.setProperty("--theme-accent", colors.accent);
  });
}

type ThemeStore = {
  theme: ClientThemeConfig;
  isDark: boolean;
  setTheme: (theme: ClientThemeConfig) => void;
  toggleDarkMode: () => void;
  resetTheme: () => void;
};

export const useTheme = create<ThemeStore>()((set, get) => ({
  theme: getSavedTheme(),
  isDark:
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false,
  setTheme: (newTheme) => {
    if (!isValidTheme(newTheme)) {
      console.error("Invalid theme provided");
      return;
    }
    set({ theme: newTheme });
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-config", JSON.stringify(newTheme));
      applyTheme(newTheme, get().isDark);
    }
  },
  toggleDarkMode: () => {
    set((state) => {
      const newIsDark = !state.isDark;
      applyTheme(state.theme, newIsDark);
      return { isDark: newIsDark };
    });
  },
  resetTheme: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("theme-config");
    }
    const state = get();
    set({ theme: defaultTheme });
    applyTheme(defaultTheme, state.isDark);
  },
}));

// Initialize theme on import
if (typeof window !== "undefined") {
  const store = useTheme.getState();
  applyTheme(store.theme, store.isDark);
}
