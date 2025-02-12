"use client";

import { ThemeConfig } from "~/components/theme-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function ThemeConfigPage() {
  return (
    <div className="container mx-auto max-w-4xl py-6">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <div className="overflow-visible rounded-lg border bg-card shadow-sm">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Theme Configuration</h2>
          <ThemeConfig />
        </div>
      </div>
    </div>
  );
}
