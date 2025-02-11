import { mockAlerts } from "~/types/alerts";
import { AlertsContent } from "~/components/alerts-content";

export default function AlertsPage({
  searchParams,
}: {
  searchParams: { clientId?: string };
}) {
  const filteredAlerts = mockAlerts.filter(
    (alert) => !searchParams.clientId || alert.id === searchParams.clientId,
  );

  const clientName = searchParams.clientId
    ? (mockAlerts.find((alert) => alert.id === searchParams.clientId)
        ?.clientName ?? null)
    : null;

  return (
    <AlertsContent initialAlerts={filteredAlerts} clientName={clientName} />
  );
}
