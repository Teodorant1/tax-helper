"use client";

import { useState } from "react";
import { Search, Filter, Building2, Bell, FileText } from "lucide-react";
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
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Big Sky Trading, LLC",
    taxId: "77-0616924",
  },
  {
    id: "2",
    name: "Carolina Food Services, Inc.",
    taxId: "20-5778510",
  },
  {
    id: "3",
    name: "Cutting Edge Plumbing & Mechanical, Inc.",
    taxId: "94-2392371",
  },
  {
    id: "4",
    name: "Dalent LLC",
    taxId: "94-2392371",
  },
  {
    id: "5",
    name: "EZERC LLC",
    taxId: "94-2392371",
  },
];

export function ActiveClients() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
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
        <div className="space-y-4">
          {mockClients
            .filter(
              (client) =>
                client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.taxId.includes(searchQuery),
            )
            .map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {client.taxId}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
