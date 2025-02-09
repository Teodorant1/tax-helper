"use client";

import { useState } from "react";
import {
  Search,
  AlertTriangle,
  Info,
  ArrowLeft,
  Calendar,
  Download,
} from "lucide-react";
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
  description?: string;
  status?: string;
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
    description: "Tax return has been filed and is currently under review.",
    status: "Pending Review",
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
    description: "New representative has been appointed for tax matters.",
    status: "Active",
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
    description: "Extension request has been approved.",
    status: "Approved",
  },
  {
    id: "4",
    type: "warning",
    title: "Skyline Industries, LLC",
    code: "Code 180 - Adjustment Notice",
    period: "2020 Q1",
    form: "F1120",
    date: "02-06-2025",
    amount: "$1,250.00",
    description:
      "Adjustment made to reported income based on documentation review.",
    status: "Requires Action",
  },
  {
    id: "5",
    type: "info",
    title: "Meridian Solutions, Inc.",
    code: "Code 290 - Additional Documentation Required",
    period: "2020 Q2",
    form: "F1120",
    date: "02-07-2025",
    amount: "$0.00",
    description: "Additional documentation needed for expense verification.",
    status: "Pending",
  },
];

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "warning" | "info">(
    "all",
  );

  const warningCount = mockAlerts.filter(
    (alert) => alert.type === "warning",
  ).length;
  const infoCount = mockAlerts.filter((alert) => alert.type === "info").length;

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || alert.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Tax Alerts
          <span className="ml-4 text-yellow-500">{warningCount} Warnings</span>
          <span className="ml-2 text-blue-500">{infoCount} Updates</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive view of all tax-related alerts and notifications
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "warning" ? "default" : "outline"}
                onClick={() => setFilterType("warning")}
                className="text-yellow-500"
              >
                Warnings
              </Button>
              <Button
                variant={filterType === "info" ? "default" : "outline"}
                onClick={() => setFilterType("info")}
                className="text-blue-500"
              >
                Updates
              </Button>
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
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts by title, code, or description..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
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
                  <div className="space-y-1">
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.code}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {alert.description}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {alert.period}
                      </span>
                      <span>{alert.form}</span>
                      <span>{alert.date}</span>
                      <span>{alert.amount}</span>
                      <span
                        className={`font-medium ${
                          alert.status === "Requires Action"
                            ? "text-yellow-500"
                            : alert.status === "Approved"
                              ? "text-green-500"
                              : "text-blue-500"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
