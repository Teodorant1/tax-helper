"use client";

import { ThemeConfig } from "~/components/theme-config";
import { UICustomization } from "~/components/ui-customization";
import { SidebarNav } from "~/components/sidebar-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function ThemeConfigPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto max-w-4xl p-6">
          <h1 className="mb-6 text-3xl font-bold">Settings</h1>

          <div className="grid gap-6 pb-16">
            <div className="space-y-6">
              <section className="overflow-visible rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold">
                  Theme Configuration
                </h2>
                <div className="max-h-[400px] overflow-y-auto px-2">
                  <ThemeConfig />
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="overflow-visible rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">UI Customization</h2>
                <UICustomization />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
