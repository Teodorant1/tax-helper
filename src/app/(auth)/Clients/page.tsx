"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
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
import { type Client } from "~/server/db/schema";

export default function ClientsPage() {
  const { data: clients = [], isLoading } = api.test.getAllClients.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Active" | "Pending" | "Inactive"
  >("all");

  const activeCount = clients.filter(
    (client: Client) => client.status === "Active",
  ).length;
  const pendingCount = clients.filter(
    (client: Client) => client.status === "Pending",
  ).length;
  const inactiveCount = clients.filter(
    (client: Client) => client.status === "Inactive",
  ).length;

  const filteredClients = clients.filter((client: Client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.taxId.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="md:container md:mx-auto md:py-6">
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
                <Calendar className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4" />
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
                      {client.alertCount > 0 && (
                        <span className="text-red-500">
                          {client.alertCount} Alerts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 md:mt-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link href={`/Data?clientId=${client.id}`}>
                      <Search className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link href={`/Alerts?clientId=${client.id}`}>
                      <Bell className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link href={`/Documents?clientId=${client.id}`}>
                      <FileText className="h-4 w-4" />
                    </Link>
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
