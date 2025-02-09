"use client";

import { useState } from "react";
import {
  Search,
  AlertTriangle,
  Info,
  ArrowLeft,
  Calendar,
  Download,
  MoreVertical,
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
  clientName: string;
  clientType: string;
  taxId: string;
  alert: string;
  taxPeriod: string;
  alertDate: string;
  transactionDate: string;
  amount: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "info",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 960 - Appointed\nThe IRS has accepted TaxNow or another third party as an appointee for your tax matters.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "December 13, 2023",
    amount: "$0.00",
  },
  {
    id: "2",
    type: "warning",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 150 - Return Filed\nThe IRS has received your 1120 form for 2019 year. Note that processing may take 6-8 weeks.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "November 8, 2020",
    amount: "$0.00",
  },
  {
    id: "3",
    type: "info",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 460 - Extension of time\nYour extension of time to file your tax return has been processed.",
    taxPeriod: "2019 Q4",
    alertDate: "February 5, 2025",
    transactionDate: "August 2, 2020",
    amount: "$0.00",
  },
  {
    id: "4",
    type: "warning",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 150 - Return Filed\nThe IRS has received your 941 form for 2019 year. Note that processing may take 6-8 weeks.",
    taxPeriod: "2019 Q3",
    alertDate: "February 5, 2025",
    transactionDate: "December 1, 2019",
    amount: "$17,279.10",
  },
  {
    id: "5",
    type: "info",
    clientName: "Rodan Enterprises, Inc.",
    clientType: "Business",
    taxId: "94-2392371",
    alert:
      "Code 650 - Federal Tax\nA deposit was made towards your tax liability.",
    taxPeriod: "2019 Q3",
    alertDate: "February 5, 2025",
    transactionDate: "July 11, 2019",
    amount: "-$2,715.29",
  },
];

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = mockAlerts.filter(
    (alert) =>
      alert.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.alert.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.taxPeriod.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        <h1 className="text-3xl font-bold">Tax Alerts</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all tax-related alerts and notifications
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredAlerts.map((alert) => (
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
    </div>
  );
}
