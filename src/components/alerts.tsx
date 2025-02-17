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
import { type Alert, type CompleteUIConfig, type CompleteThemeConfig } from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

export function Alerts({ uiConfig, theme_config }: ThemeConfigProps) {
  const { data: alerts = [] } = api.test.getAllAlerts.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const warningCount = alerts.filter(
    (alert) => alert.type === "warning",
  ).length;
  const infoCount = alerts.filter((alert) => alert.type === "info").length;

  const cardStyle = {
    borderRadius: uiConfig.layoutBorderRadius,
    fontSize: uiConfig.baseFontSize,
    transition: `all ${uiConfig.animationSpeed === "slower" 
      ? "400ms" 
      : uiConfig.animationSpeed === "faster" 
        ? "100ms" 
        : "200ms"} ease-in-out`,
    background: `linear-gradient(to bottom right, ${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}15, ${theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary}10)`,
    border: `1px solid ${theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent}40`,
    boxShadow: '0 0 10px #00000010'
  };

  return (
    <Card style={cardStyle}>
      <CardHeader className="flex flex-col items-center justify-between space-y-2 pb-4 md:flex-row md:space-y-0">
        <div>
          <CardTitle 
            className="text-2xl font-bold"
            style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary }}
          >
            Alerts{" "}
            <span style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent }}>{warningCount}</span>{" "}
            <span style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}>{infoCount}</span>
          </CardTitle>
          <CardDescription style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}>
            View and manage your tax alerts
          </CardDescription>
        </div>
        <Button 
          variant="link" 
          className="text-primary" 
          asChild
          style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary }}
        >
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
            style={{
              borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
              transition: `all ${uiConfig.animationSpeed === "slower" 
                ? "400ms" 
                : uiConfig.animationSpeed === "faster" 
                  ? "100ms" 
                  : "200ms"} ease-in-out`
            }}
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
                      : "200ms"} ease-in-out`,
                  background: `${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}05`,
                  borderColor: `${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}20`
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    style={{
                      borderRadius: uiConfig.layoutBorderRadius,
                      backgroundColor: alert.type === "warning"
                        ? `${theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent}10`
                        : `${theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary}10`,
                      color: alert.type === "warning"
                        ? (theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent)
                        : (theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2.5rem",
                      height: "2.5rem"
                    }}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <Info className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div 
                      className="font-medium"
                      style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary }}
                    >{alert.client.name}</div>
                    <div 
                      className="text-sm"
                      style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}
                    >
                      {alert.alert}
                    </div>
                    <div 
                      className="mt-2 grid grid-cols-2 gap-2 text-xs md:flex md:gap-4"
                      style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}
                    >
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
