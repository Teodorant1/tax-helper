import { UICustomization } from "~/components/ui-customization";
import { ThemeConfig } from "~/components/theme-config";
import { api } from "~/trpc/server";

export default async function UISettingsPage() {
  // Fetch configs
  const uiConfig = await api.uiSettings.getSettings();
  const themeConfig = await api.theme.getSettings();

  return (
    <div className="space-y-8">
      <h1 className="mb-8 text-3xl font-bold">UI Settings</h1>
      <UICustomization theme_config={themeConfig} ui_config={uiConfig} />
      <div>
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>
        <h2 className="mb-4 text-xl font-semibold">Theme Configuration</h2>
        <ThemeConfig theme_config={themeConfig} uiConfig={uiConfig} />
      </div>
    </div>
  );
}
