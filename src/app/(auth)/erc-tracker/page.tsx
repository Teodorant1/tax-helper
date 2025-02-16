import { api } from "~/trpc/server";
import ERCTrackerPage_component from "./erc-tracker-component";


export default async function ERCTrackerPage() {

    const uiConfig = await api.uiSettings.getSettings();
    const themeConfig = await api.theme.getSettings();


  return (
    <div>
    <ERCTrackerPage_component theme_config={themeConfig} uiConfig={uiConfig}/>
    </div>
  );
}
