import { mockAlerts } from "~/types/alerts";
import { AlertsContent } from "~/components/alerts-content";

export default async function AlertsPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { clientId } = resolvedParams;
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
