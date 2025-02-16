"use client";

import {
  Search,
  AlertTriangle,
  Info,
  Calendar,
  Download,
  MoreVertical,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { type Alert, type Client, type CompleteThemeConfig, type CompleteUIConfig } from "~/server/db/schema";

interface DesktopAlertsProps {
  alerts: (Alert & { client: Client })[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme_config: CompleteThemeConfig;
  ui_config: CompleteUIConfig;
}

export function DesktopAlerts({
  alerts,
  searchQuery,
  onSearchChange,
  theme_config,
  ui_config,
}: DesktopAlertsProps) {
  return (
    <Card
      style={{
        borderRadius: ui_config.layoutBorderRadius,
        borderColor: theme_config.lightTheme.primary + "20",
        transition: `all ${
          ui_config.animationSpeed === 'slower' ? '0.4s' :
          ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      <CardHeader
        style={{
          padding: ui_config.layoutDensity === 'compact' ? '1rem' : 
                  ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <div 
          className="flex items-center justify-between"
          style={{
            gap: ui_config.layoutDensity === 'compact' ? '1rem' : 
                 ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem'
          }}
        >
          <div className="relative w-96">
            <Search 
              className="absolute left-3 top-3 h-4 w-4" 
              style={{ color: theme_config.lightTheme.secondary }}
            />
            <Input
              placeholder="Search alerts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                fontSize: ui_config.baseFontSize,
                borderColor: theme_config.lightTheme.primary + "20",
                transition: `all ${
                  ui_config.animationSpeed === 'slower' ? '0.4s' :
                  ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2 transition-colors duration-200"
              style={{
                borderRadius: ui_config.layoutBorderRadius,
                fontSize: ui_config.baseFontSize,
                borderColor: theme_config.lightTheme.primary + "30",
                color: theme_config.lightTheme.primary,
                padding: ui_config.layoutDensity === 'compact' ? '0.5rem 1rem' : 
                        ui_config.layoutDensity === 'spacious' ? '1rem 2rem' : '0.75rem 1.5rem',
                "--hover-color": theme_config.lightTheme.primary + "10",
                ":hover": {
                  backgroundColor: "var(--hover-color)"
                }
              } as React.CSSProperties}
            >
              <Calendar className="h-4 w-4" />
              Filter by Date
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 transition-colors duration-200"
              style={{
                borderRadius: ui_config.layoutBorderRadius,
                fontSize: ui_config.baseFontSize,
                borderColor: theme_config.lightTheme.primary + "30",
                color: theme_config.lightTheme.primary,
                padding: ui_config.layoutDensity === 'compact' ? '0.5rem 1rem' : 
                        ui_config.layoutDensity === 'spacious' ? '1rem 2rem' : '0.75rem 1.5rem',
                "--hover-color": theme_config.lightTheme.primary + "10",
                ":hover": {
                  backgroundColor: "var(--hover-color)"
                }
              } as React.CSSProperties}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent
        style={{
          padding: ui_config.layoutDensity === 'compact' ? '1rem' : 
                  ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <div 
          className="rounded-md border"
          style={{
            borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
            borderColor: theme_config.lightTheme.primary + "20",
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          <div 
            className="grid grid-cols-[auto_2fr_3fr_1fr_1fr_1fr_1fr_auto] gap-4 border-b font-medium"
            style={{
              padding: ui_config.layoutDensity === 'compact' ? '0.75rem' : 
                      ui_config.layoutDensity === 'spacious' ? '1.5rem' : '1rem',
              fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
              backgroundColor: theme_config.lightTheme.secondary + "10",
              borderColor: theme_config.lightTheme.primary + "20",
              transition: `all ${
                ui_config.animationSpeed === 'slower' ? '0.4s' :
                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            <div>Severity</div>
            <div>Client Name</div>
            <div>Alert</div>
            <div>Tax Period</div>
            <div>Alert Date</div>
            <div>Transaction Date</div>
            <div>Amount</div>
            <div></div>
          </div>
          <div className="divide-y">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="grid grid-cols-[auto_2fr_3fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 transition-colors duration-200"
                style={{
                  padding: ui_config.layoutDensity === 'compact' ? '0.75rem' : 
                          ui_config.layoutDensity === 'spacious' ? '1.5rem' : '1rem',
                  fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
                  borderColor: theme_config.lightTheme.primary + "10",
                  "--hover-color": theme_config.lightTheme.primary + "05",
                  ":hover": {
                    backgroundColor: "var(--hover-color)"
                  }
                } as React.CSSProperties}
              >
                <div>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: alert.type === "warning"
                        ? theme_config.lightTheme.accent + "15"
                        : theme_config.lightTheme.primary + "15",
                      color: alert.type === "warning"
                        ? theme_config.lightTheme.accent
                        : theme_config.lightTheme.primary
                    }}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Info className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div>
                  <div 
                    className="font-medium"
                    style={{ color: theme_config.lightTheme.primary }}
                  >
                    {alert.client.name}
                  </div>
                  <div 
                    style={{ 
                      fontSize: `calc(${ui_config.baseFontSize} * 0.75)`,
                      color: theme_config.lightTheme.secondary 
                    }}
                  >
                    {alert.clientType} • {alert.client.taxId}
                  </div>
                </div>
                <div className="whitespace-pre-line">{alert.alert}</div>
                <div>{alert.taxPeriod}</div>
                <div>{alert.alertDate}</div>
                <div>{alert.transactionDate}</div>
                <div
                  style={{
                    color: alert.amount.startsWith("-") 
                      ? theme_config.lightTheme.accent
                      : theme_config.lightTheme.primary
                  }}
                >
                  {alert.amount}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 transition-colors duration-200"
                  style={{
                    borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                    "--hover-color": theme_config.lightTheme.primary + "10",
                    ":hover": {
                      backgroundColor: "var(--hover-color)"
                    }
                  } as React.CSSProperties}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
