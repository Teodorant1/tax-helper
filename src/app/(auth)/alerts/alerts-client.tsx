"use client";

import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { AlertsContent } from "~/components/alerts-content";
import { type Alert, type Client, type CompleteThemeConfig, type CompleteUIConfig } from "~/server/db/schema";

interface AlertsClientProps {
  theme_config: CompleteThemeConfig;
  ui_config: CompleteUIConfig;
}

export function AlertsClient({ theme_config, ui_config }: AlertsClientProps) {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  const { data: alerts = [] } =
    api.test.getAllAlerts.useQuery<(Alert & { client: Client })[]>();

  const filteredAlerts = alerts.filter(
    (alert: Alert & { client: Client }) =>
      !clientId || alert.clientId === clientId,
  );

  const clientName = clientId
    ? filteredAlerts.find((alert: Alert & { client: Client }) => alert.client)
        ?.client.name
    : null;

  return (
    <AlertsContent
      initialAlerts={filteredAlerts}
      clientName={clientName ?? null}
      theme_config={theme_config}
      ui_config={ui_config}
    />
  );
}
