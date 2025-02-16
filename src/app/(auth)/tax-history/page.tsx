
import { api } from "~/trpc/server";
import TaxHistoryPage_component from "./tax-history-page";

export default async function TaxHistoryPage() {
 
  const uiConfig = await api.uiSettings.getSettings();
  const themeConfig = await api.theme.getSettings();
  return (
    <div className="container mx-auto p-6">
     <TaxHistoryPage_component theme_config={themeConfig} ui_config={uiConfig}/>
    </div>
  );
}
