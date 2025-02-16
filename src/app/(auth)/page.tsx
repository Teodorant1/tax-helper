import { Greeting } from "~/components/greeting";
import { HomePageClient } from "./_components/home-page-client";
import { api } from "~/trpc/server";
import type { CompleteUIConfig } from "~/server/db/schema";
import type { ClientThemeConfig } from "~/types/theme";

export default async function HomePage() {
  // Fetch configs at page level
  const uiConfig = await api.uiSettings.getSettings();
  const themeConfig = await api.theme.getSettings();

  // Transform theme config to match ClientThemeConfig interface
  const clientThemeConfig: ClientThemeConfig = {
    light: {
      primary: themeConfig.lightTheme.primary,
      secondary: themeConfig.lightTheme.secondary,
      accent: themeConfig.lightTheme.accent,
    },
    dark: {
      primary: themeConfig.darkTheme.primary,
      secondary: themeConfig.darkTheme.secondary,
      accent: themeConfig.darkTheme.accent,
    },
  };

  return (
    <div 
      className={`space-y-${uiConfig.layoutDensity === 'compact' ? '4' : 
                 uiConfig.layoutDensity === 'spacious' ? '8' : '6'}`}
      style={{
        transition: `all ${
          uiConfig.animationSpeed === 'slower' ? '0.4s' :
          uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      <Greeting uiConfig={uiConfig as CompleteUIConfig} themeConfig={clientThemeConfig} />
      <HomePageClient uiConfig={uiConfig as CompleteUIConfig} themeConfig={clientThemeConfig} />
    </div>
  );
}
