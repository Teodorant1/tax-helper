import DocumentsPage_component from "~/components/documents-page";
import { api } from "~/trpc/server";


export  default async function DocumentsPage() {
  // Fetch configs
  const uiConfig = await api.uiSettings.getSettings();
  const themeConfig = await api.theme.getSettings();

  return (
    <div className="container mx-auto py-6">
    <DocumentsPage_component  theme_config={themeConfig} uiConfig={uiConfig}/>
    </div>
  );
}
