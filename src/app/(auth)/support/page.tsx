import { FAQ } from "@/components/faq";
import { api } from "~/trpc/server";

export default async function SupportPage() {

    const uiConfig = await api.uiSettings.getSettings();
    const themeConfig = await api.theme.getSettings();

  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">Support Center</h1>
      <div className="space-y-8">
        <section>
          <FAQ theme_config={themeConfig} ui_config={uiConfig}/>
        </section>
      </div>
    </div>
  );
}
