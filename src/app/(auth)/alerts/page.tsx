import { api } from "~/trpc/server";
import { AlertsClient } from "./alerts-client";

export default async function AlertsPage() {
  // Fetch configs
  const uiConfig = await api.uiSettings.getSettings();
  const themeConfig = await api.theme.getSettings();

  return (
    <div 
      className="space-y-8"
      style={{
        padding: uiConfig.layoutDensity === 'compact' ? '1rem' : 
                uiConfig.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
        transition: `all ${
          uiConfig.animationSpeed === 'slower' ? '0.4s' :
          uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      <AlertsClient theme_config={themeConfig} ui_config={uiConfig} />
    </div>
  );
}
