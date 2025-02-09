import { SidebarNav } from "~/components/sidebar-nav";
import { ActiveClients } from "~/components/active-clients";
import { Alerts } from "~/components/alerts";
import { Greeting } from "~/components/greeting";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 space-y-8 p-8">
        <Greeting />
        <div className="grid gap-8 md:grid-cols-2">
          <ActiveClients />
          <Alerts />
        </div>
      </main>
    </div>
  );
}
