import { Greeting } from "~/components/greeting";
import { ActiveClients } from "~/components/active-clients";
import { Alerts } from "~/components/alerts";
import { InviteLink } from "~/components/invite-link";
import { Resources } from "~/components/resources";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Greeting />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card shadow">
          <ActiveClients />
        </div>
        <div className="rounded-lg border bg-card shadow">
          <Alerts />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card shadow">
          <InviteLink />
        </div>
        <div className="rounded-lg border bg-card shadow">
          <Resources />
        </div>
      </div>
    </div>
  );
}
