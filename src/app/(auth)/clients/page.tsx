import { api } from "~/trpc/server";
import { ClientsSubPage } from "./clients-sub-page";

export default async function ClientsPage() {
  // Fetch theme and UI config using tRPC
  const uiConfig = await api.uiSettings.getSettings();
  const themeConfig = await api.theme.getSettings();

  return (
    <ClientsSubPage
      theme_config={themeConfig}
      ui_config={uiConfig}
    />
  );
}
