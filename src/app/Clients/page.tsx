"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Building2,
  Bell,
  FileText,
  ArrowLeft,
  Calendar,
  Download,
  Mail,
  Phone,
  Clock,
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
  email: string;
  phone: string;
  status: "Active" | "Pending" | "Inactive";
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
    email: "contact@bigskytrading.com",
    phone: "(555) 123-4567",
    status: "Active",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 2,
    alerts: 1,
  },
  {
    id: "2",
    name: "Carolina Food Services, Inc.",
    taxId: "20-5778510",
    email: "admin@carolinafood.com",
    phone: "(555) 234-5678",
    status: "Active",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 0,
    alerts: 0,
  },
  {
    id: "3",
    name: "Cutting Edge Plumbing & Mechanical, Inc.",
    taxId: "94-2392371",
    email: "info@cuttingedgeplumbing.com",
    phone: "(555) 345-6789",
    status: "Pending",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 3,
    alerts: 2,
  },
  {
    id: "4",
    name: "Dalent LLC",
    taxId: "94-2392371",
    email: "contact@dalent.com",
    phone: "(555) 456-7890",
    status: "Active",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 1,
    alerts: 0,
  },
  {
    id: "5",
    name: "EZERC LLC",
    taxId: "94-2392371",
    email: "support@ezerc.com",
    phone: "(555) 567-8901",
    status: "Inactive",
    lastFiling: "2024 Q3",
    nextFiling: "N/A",
    pendingTasks: 0,
    alerts: 1,
  },
  {
    id: "6",
    name: "Frontier Solutions Group",
    taxId: "45-7890123",
    email: "info@frontiersolutions.com",
    phone: "(555) 678-9012",
    status: "Active",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 4,
    alerts: 2,
  },
  {
    id: "7",
    name: "Global Innovations Corp",
    taxId: "56-8901234",
    email: "contact@globalinnovations.com",
    phone: "(555) 789-0123",
    status: "Active",
    lastFiling: "2024 Q4",
    nextFiling: "2025 Q1",
    pendingTasks: 1,
    alerts: 0,
  },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Active" | "Pending" | "Inactive"
  >("all");

  const activeCount = mockClients.filter(
    (client) => client.status === "Active",
  ).length;
  const pendingCount = mockClients.filter(
    (client) => client.status === "Pending",
  ).length;
  const inactiveCount = mockClients.filter(
    (client) => client.status === "Inactive",
  ).length;

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.taxId.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
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
          Client Management
          <span className="ml-4 text-green-500">{activeCount} Active</span>
          <span className="ml-2 text-yellow-500">{pendingCount} Pending</span>
          <span className="ml-2 text-red-500">{inactiveCount} Inactive</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive view of all clients and their current status
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "Active" ? "default" : "outline"}
                onClick={() => setStatusFilter("Active")}
                className="text-green-500"
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "Pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("Pending")}
                className="text-yellow-500"
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "Inactive" ? "default" : "outline"}
                onClick={() => setStatusFilter("Inactive")}
                className="text-red-500"
              >
                Inactive
              </Button>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Filing Calendar
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
              placeholder="Search by Name, Tax ID, or Email"
              className="pl-9 pr-24"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="outline"
              size="sm"
              className="relative right-2 top-2 gap-2"
            >
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
          <div className="divide-y">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-start justify-between overflow-x-clip whitespace-normal break-words rounded-lg px-4 py-6 transition-colors hover:bg-muted/50 md:flex-row md:border md:border-border"
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-col items-center gap-2 md:flex-row">
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
    </div>
  );
}
