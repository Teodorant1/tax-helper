import { create } from "zustand";
import { type UIConfig } from "~/types/ui";
import { defaultUIConfig } from "~/lib/defaults";
import { useEffect } from "react";
import { api } from "~/trpc/react";

type UIStore = {
  settings: Omit<UIConfig, "id" | "userId">;
  isLoading: boolean;
  error: Error | null;
  updateSettings: (settings: Omit<UIConfig, "id" | "userId">) => Promise<void>;
  resetSettings: () => Promise<void>;
};

export const useUISettings = create<UIStore>()((set) => ({
  settings: defaultUIConfig,
  isLoading: true,
  error: null,

  updateSettings: async (newSettings) => {
    try {
      set({ isLoading: true, error: null });

      // Update CSS variables
      if (typeof window !== "undefined") {
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

      set({ settings: newSettings, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      console.error("Failed to update UI settings:", error);
    }
  },

  resetSettings: async () => {
    try {
      set({ isLoading: true, error: null });
      set({ settings: defaultUIConfig, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      console.error("Failed to reset UI settings:", error);
    }
  },
}));

// Hook to initialize and sync settings with server
export function useUISettingsSync() {
  const { updateSettings } = useUISettings();
  const { data: settings } = api.uiSettings.getSettings.useQuery();
  const updateMutation = api.uiSettings.updateSettings.useMutation();
  const resetMutation = api.uiSettings.resetSettings.useMutation();

  // Initialize settings from server
  useEffect(() => {
    if (settings) {
      // Extract everything except id and userId
      const settingsWithoutIds: Omit<UIConfig, "id" | "userId"> = {
        sidebarTitle: settings.sidebarTitle,
        sidebarLogoId: settings.sidebarLogoId,
        greetingTitle: settings.greetingTitle,
        greetingSubtitle: settings.greetingSubtitle,
        greetingLogoId: settings.greetingLogoId,
        layoutBorderRadius: settings.layoutBorderRadius,
        layoutDensity: settings.layoutDensity,
        sidebarWidth: settings.sidebarWidth,
        baseFontSize: settings.baseFontSize,
        animationSpeed: settings.animationSpeed,
      };
      void updateSettings(settingsWithoutIds);
    }
  }, [settings, updateSettings]);

  // Sync local changes to server
  useEffect(() => {
    const store = useUISettings.getState();
    const unsubscribe = useUISettings.subscribe((state) => {
      if (state.settings !== store.settings) {
        void updateMutation.mutateAsync(state.settings);
      }
    });
    return unsubscribe;
  }, [updateMutation]);

  return {
    isLoading: useUISettings((state) => state.isLoading),
    error: useUISettings((state) => state.error),
    updateMutation,
    resetMutation,
  };
}
