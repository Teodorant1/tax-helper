"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DataClient } from "./client";

export function DataPageClient() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  const { data: transactions = [] } = clientId
    ? api.test.getTransactionsByClient.useQuery({ clientId })
    : api.test.getAllTransactions.useQuery();

  const { data: client } = clientId
    ? api.test.getClient.useQuery({ clientId })
    : { data: null };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link
          href="/clients"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Transaction History
            {client?.name && (
              <span className="ml-2 text-muted-foreground">
                for {client.name}
              </span>
            )}
          </CardTitle>
          <CardDescription>
            {client?.name
              ? `Recent activity for ${client.name}`
              : "A quick peek into the most recent activity on your tax accounts"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataClient
            clientId={clientId ?? undefined}
            transactions={transactions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
