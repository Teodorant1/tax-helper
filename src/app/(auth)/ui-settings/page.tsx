import { UICustomization } from "~/components/ui-customization";

export default function UISettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">UI Settings</h1>
      <UICustomization />
    </div>
  );
}
