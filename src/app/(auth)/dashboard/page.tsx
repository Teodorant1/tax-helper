import { api } from "~/trpc/server";
import { DashboardClient } from "./_components/dashboard-client";

export default async function DashboardPage() {
  // Fetch configs
  const uiConfig = await api.uiSettings.getSettings();
  const themeConfig = await api.theme.getSettings();
  return (
    <DashboardClient 
      uiConfig={uiConfig} 
      themeConfig={themeConfig} 
    />
  );
}
