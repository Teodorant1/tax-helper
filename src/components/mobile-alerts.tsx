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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Alert, type Client } from "~/server/db/schema";
interface MobileAlertsProps {
  alerts: (Alert & { client: Client })[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function MobileAlerts({
  alerts,
  searchQuery,
  onSearchChange,
}: MobileAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <Button variant="outline" className="flex-1 gap-2">
              <Calendar className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="md:space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="space-y-3 overflow-x-clip whitespace-normal break-words rounded-lg border p-4"
            >
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="flex flex-col items-center gap-3 md:flex-row">
                  <div
                    className={`flex h-8 w-8 flex-col items-center justify-center rounded-full md:flex-row ${
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
                  <div>
                    <div className="font-medium">{alert.client.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {alert.clientType} • {alert.client.taxId}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="whitespace-pre-line text-sm">{alert.alert}</div>

              <div className="flex flex-col gap-2 text-sm md:flex-row">
                <div>
                  <div className="text-muted-foreground">Tax Period</div>
                  <div>{alert.taxPeriod}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Amount</div>
                  <div
                    className={
                      alert.amount.startsWith("-") ? "text-red-500" : undefined
                    }
                  >
                    {alert.amount}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Alert Date</div>
                  <div>{alert.alertDate}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Transaction Date</div>
                  <div>{alert.transactionDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
