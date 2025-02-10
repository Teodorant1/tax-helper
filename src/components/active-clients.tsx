"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Building2,
  Bell,
  FileText,
  Mail,
  Phone,
  Clock,
  Calendar,
  MoreHorizontal,
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

interface Client {
  id: string;
  name: string;
  taxId: string;
  status: "Active" | "Pending" | "Inactive";
  email: string;
  phone: string;
  lastFiling: string;
  nextFiling: string;
  pendingTasks: number;
  alerts: number;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Big Sky Trading, LLC",
    taxId: "77-0616924",
    status: "Active",
    email: "contact@bigskytrading.com",
    phone: "(555) 123-4567",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 2,
    alerts: 1,
  },
  {
    id: "2",
    name: "Carolina Food Services, Inc.",
    taxId: "20-5778510",
    status: "Pending",
    email: "info@carolinafoodservices.com",
    phone: "(555) 234-5678",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 0,
    alerts: 0,
  },
  {
    id: "3",
    name: "Cutting Edge Plumbing & Mechanical, Inc.",
    taxId: "94-2392371",
    status: "Active",
    email: "support@cuttingedgeplumbing.com",
    phone: "(555) 345-6789",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 1,
    alerts: 0,
  },
];

export function ActiveClients() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-between space-y-2 pb-4 md:flex-row md:space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">Active Clients</CardTitle>
          <CardDescription>Manage your active client list</CardDescription>
        </div>
        <Button variant="link" className="text-primary" asChild>
          <Link href="/Clients">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Name, Tax ID or Last 4 of Tax ID"
            className="pl-9 pr-24"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <Button
            variant="outline"
            size="sm"
            className="absolute right-2 top-2 gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="divide-y">
          {mockClients
            .filter(
              (client) =>
                client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.taxId.includes(searchQuery),
            )
            .map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-start justify-between whitespace-normal break-words rounded-lg px-4 py-6 transition-colors hover:bg-muted/50 md:flex-row md:border md:border-border"
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{client.name}</div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          client.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : client.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {client.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {client.taxId}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last Filing: {client.lastFiling}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Next Filing: {client.nextFiling}
                      </span>
                      {client.pendingTasks > 0 && (
                        <span className="text-yellow-500">
                          {client.pendingTasks} Pending Tasks
                        </span>
                      )}
                      {client.alerts > 0 && (
                        <span className="text-red-500">
                          {client.alerts} Alerts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 md:mt-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
