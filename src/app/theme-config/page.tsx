import { ThemeConfig } from "~/components/theme-config";

export default function ThemeConfigPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Theme Configuration</h1>
      <ThemeConfig />
    </div>
  );
}
