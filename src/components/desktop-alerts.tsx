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
import { type Alert } from "~/server/db/schema";
// import type { Alert } from "~/types/alerts";

interface DesktopAlertsProps {
  alerts: Alert[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DesktopAlerts({
  alerts,
  searchQuery,
  onSearchChange,
}: DesktopAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Filter by Date
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-[auto_2fr_3fr_1fr_1fr_1fr_1fr_auto] gap-4 border-b bg-muted p-4 text-sm font-medium">
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
                className="grid grid-cols-[auto_2fr_3fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 p-4 text-sm"
              >
                <div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      alert.type === "warning"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Info className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{alert.clientName}</div>
                  <div className="text-xs text-muted-foreground">
                    {alert.clientType} • {alert.taxId}
                  </div>
                </div>
                <div className="whitespace-pre-line">{alert.alert}</div>
                <div>{alert.taxPeriod}</div>
                <div>{alert.alertDate}</div>
                <div>{alert.transactionDate}</div>
                <div
                  className={
                    alert.amount.startsWith("-") ? "text-red-500" : undefined
                  }
                >
                  {alert.amount}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
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
