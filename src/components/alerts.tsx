"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Search, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Alert } from "~/server/db/schema";
import type { UIConfig } from "~/types/ui";
import type { ClientThemeConfig } from "~/types/theme";

interface AlertsProps {
  uiConfig: UIConfig;
  themeConfig: ClientThemeConfig;
}

export function Alerts({ uiConfig, themeConfig }: AlertsProps) {
  const { data: alerts = [] } = api.test.getAllAlerts.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const warningCount = alerts.filter(
    (alert) => alert.type === "warning",
  ).length;
  const infoCount = alerts.filter((alert) => alert.type === "info").length;

  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-between space-y-2 pb-4 md:flex-row md:space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">
            Alerts <span className="text-yellow-500">{warningCount}</span>{" "}
            <span className="text-blue-500">{infoCount}</span>
          </CardTitle>
          <CardDescription>View and manage your tax alerts</CardDescription>
        </div>
        <Button variant="link" className="text-primary" asChild>
          <Link href="/alerts">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
        <div className="space-y-4">
          {alerts
            .filter(
              (alert) =>
                alert.client.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                alert.alert.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col rounded-lg border p-4 transition-colors hover:bg-muted/50"
                style={{
                  borderRadius: uiConfig.layoutBorderRadius,
                  padding: uiConfig.layoutDensity === "compact" 
                    ? "0.75rem" 
                    : uiConfig.layoutDensity === "spacious" 
                      ? "1.5rem" 
                      : "1rem",
                  fontSize: uiConfig.baseFontSize,
                  transition: `all ${uiConfig.animationSpeed === "slower" 
                    ? "400ms" 
                    : uiConfig.animationSpeed === "faster" 
                      ? "100ms" 
                      : "200ms"} ease-in-out`
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      alert.type === "warning"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}
                    style={{
                      borderRadius: uiConfig.layoutBorderRadius
                    }}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <Info className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{alert.client.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.alert}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground md:flex md:gap-4">
                      <span>{alert.taxPeriod}</span>
                      <span>{alert.clientType}</span>
                      <span>{alert.alertDate}</span>
                      <span>{alert.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
