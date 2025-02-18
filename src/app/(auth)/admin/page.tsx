"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";

// Mock data
const mockClients = [
  {
    id: "1",
    name: "Acme Corp",
    taxId: "123-45-6789",
    email: "contact@acme.com",
    phone: "555-0123",
    status: "Active",
    lastFiling: "2024-01-15",
    nextFiling: "2024-04-15",
    pendingTasks: 3,
    alertCount: 2,
  },
  {
    id: "2",
    name: "TechStart Inc",
    taxId: "987-65-4321",
    email: "admin@techstart.com",
    phone: "555-4567",
    status: "Pending",
    lastFiling: "2024-02-01",
    nextFiling: "2024-05-01",
    pendingTasks: 1,
    alertCount: 0,
  },
  {
    id: "3",
    name: "Global Services LLC",
    taxId: "456-78-9012",
    email: "info@globalservices.com",
    phone: "555-8901",
    status: "Active",
    lastFiling: "2024-01-30",
    nextFiling: "2024-04-30",
    pendingTasks: 0,
    alertCount: 1,
  },
];

const mockAlerts = [
  {
    id: "1",
    type: "warning",
    clientType: "Business",
    clientId: "1",
    taxId: "123-45-6789",
    alert: "Upcoming filing deadline",
    taxPeriod: "Q1 2024",
    alertDate: "2024-03-01",
    transactionDate: "2024-02-15",
    amount: "$5,000",
  },
  {
    id: "2",
    type: "info",
    clientType: "Business",
    clientId: "3",
    taxId: "456-78-9012",
    alert: "New tax regulation update",
    taxPeriod: "Q1 2024",
    alertDate: "2024-02-20",
    transactionDate: "2024-02-20",
    amount: "N/A",
  },
];

const mockDocuments = [
  {
    id: "1",
    clientId: "1",
    name: "Q4 2023 Tax Return",
    status: "Ready",
    type: "Tax Return",
    taxPeriod: "Q4 2023",
    requestedOn: "2024-01-15",
  },
  {
    id: "2",
    clientId: "2",
    name: "Annual Report 2023",
    status: "Ready",
    type: "Report",
    taxPeriod: "2023",
    requestedOn: "2024-02-01",
  },
];

const mockStats = {
  totalClients: 3,
  activeClients: 2,
  pendingClients: 1,
  totalAlerts: 3,
  documentsProcessed: 15,
  upcomingDeadlines: 2,
};

type Client = (typeof mockClients)[0];

// Helper functions for CSV
const convertToCSV = (data: Client[]): string => {
  if (!data.length) return "";

  const firstItem = data[0];
  if (!firstItem) return "";

  const headers = Object.keys(firstItem).join(",");
  const rows = data.map((obj) =>
    Object.values(obj)
      .map((value) =>
        typeof value === "string" && value.includes(",") ? `"${value}"` : value,
      )
      .join(","),
  );
  return [headers, ...rows].join("\n");
};

type CSVRecord = Record<string, string | number>;

const parseCSV = (csv: string): CSVRecord[] => {
  const [headers, ...rows] = csv.trim().split("\n");
  if (!headers) return [];

  const keys = headers.split(",");
  return rows.map((row) => {
    const values = row
      .split(",")
      .map((value) =>
        value.startsWith('"') && value.endsWith('"')
          ? value.slice(1, -1)
          : value,
      );

    const record: CSVRecord = {};
    keys.forEach((key, i) => {
      const value = values[i];
      // Try to convert to number if possible
      record[key] = isNaN(Number(value)) ? (value ?? "") : Number(value);
    });
    return record;
  });
};

export default function AdminPanel() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const csvData = convertToCSV(mockClients);
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tax_clients.csv";
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Client data has been exported to CSV",
      });
    } catch (error: unknown) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data",
        variant: "destructive",
      });
    }
  };

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const importedData = parseCSV(csvText);
        console.log("Imported data:", importedData);

        toast({
          title: "Import Successful",
          description: `${importedData.length} records imported`,
        });
      } catch (error: unknown) {
        toast({
          title: "Import Failed",
          description: "There was an error parsing the CSV file",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const filteredClients = mockClients.filter((client) =>
    Object.values(client).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <input
            type="file"
            accept=".csv"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImport}
          />
          <Button onClick={handleExport}>Export Data</Button>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Import Data
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h3 className="mb-2 font-semibold">Clients</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{mockStats.totalClients}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold">{mockStats.activeClients}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="mb-2 font-semibold">Alerts</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{mockStats.totalAlerts}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deadlines</p>
              <p className="text-2xl font-bold">
                {mockStats.upcomingDeadlines}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="mb-2 font-semibold">Documents</h3>
          <div>
            <p className="text-sm text-muted-foreground">Processed</p>
            <p className="text-2xl font-bold">{mockStats.documentsProcessed}</p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="clients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Tax ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Filing</TableHead>
                  <TableHead>Pending Tasks</TableHead>
                  <TableHead>Alerts</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.taxId}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          client.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {client.status}
                      </span>
                    </TableCell>
                    <TableCell>{client.nextFiling}</TableCell>
                    <TableCell>{client.pendingTasks}</TableCell>
                    <TableCell>{client.alertCount}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead>Tax Period</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          alert.type === "warning"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {alert.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      {mockClients.find((c) => c.id === alert.clientId)?.name}
                    </TableCell>
                    <TableCell>{alert.alert}</TableCell>
                    <TableCell>{alert.taxPeriod}</TableCell>
                    <TableCell>{alert.alertDate}</TableCell>
                    <TableCell>{alert.amount}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tax Period</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>
                      {mockClients.find((c) => c.id === doc.clientId)?.name}
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          doc.status === "Ready"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </TableCell>
                    <TableCell>{doc.taxPeriod}</TableCell>
                    <TableCell>{doc.requestedOn}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">System Settings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Data Management</h4>
                <div className="flex gap-4">
                  <Button variant="outline">Backup Database</Button>
                  <Button variant="outline">Clear Cache</Button>
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-medium">User Preferences</h4>
                <div className="flex gap-4">
                  <Button variant="outline">Notification Settings</Button>
                  <Button variant="outline">Display Settings</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
