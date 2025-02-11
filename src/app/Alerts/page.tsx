import { mockAlerts } from "~/types/alerts";
import { AlertsContent } from "~/components/alerts-content";

export default async function AlertsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { clientId } = searchParams;
  const filteredAlerts = mockAlerts.filter(
    (alert) => !clientId || alert.id === clientId,
  );

  const clientName = clientId
    ? (mockAlerts.find((alert) => alert.id === clientId)?.clientName ?? null)
    : null;

  return (
    <AlertsContent initialAlerts={filteredAlerts} clientName={clientName} />
  );
}
