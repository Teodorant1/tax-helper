import { api } from "~/trpc/server";
import { DataPageClient } from "./data-page-client";

export default async function DataPage() {
  // Fetch configs
  const uiConfig = await api.uiSettings.getSettings();
  const themeConfig = await api.theme.getSettings();


  return <DataPageClient />;
}
