"use client";

import { useState } from "react";
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

interface Alert {
  id: string;
  type: "warning" | "info";
  title: string;
  code: string;
  period: string;
  form: string;
  date: string;
  amount: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Rodan Enterprises, Inc.",
    code: "Code 150 - Return Filed",
    period: "2019 Q4",
    form: "F1120",
    date: "02-05-2025",
    amount: "$0.00",
  },
  {
    id: "2",
    type: "info",
    title: "Rodan Enterprises, Inc.",
    code: "Code 960 - Appointed Representative",
    period: "2019 Q4",
    form: "F1120",
    date: "02-05-2025",
    amount: "$0.00",
  },
  {
    id: "3",
    type: "info",
    title: "Rodan Enterprises, Inc.",
    code: "Code 460 - Extension of time for filing",
    period: "2019 Q4",
    form: "F1120",
    date: "02-05-2025",
    amount: "$0.00",
  },
];

export function Alerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const warningCount = mockAlerts.filter(
    (alert) => alert.type === "warning",
  ).length;
  const infoCount = mockAlerts.filter((alert) => alert.type === "info").length;

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
          <Link href="/Alerts">View All</Link>
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
          {mockAlerts
            .filter(
              (alert) =>
                alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.code.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      alert.type === "warning"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <Info className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.code}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground md:flex md:gap-4">
                      <span>{alert.period}</span>
                      <span>{alert.form}</span>
                      <span>{alert.date}</span>
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
