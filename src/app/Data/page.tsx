import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DataClient } from "~/app/Data/client";

interface Transaction {
  id: string;
  type: string;
  date: string;
  form: string;
  taxPeriod: string;
  amount: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "Appointed representative",
    date: "June 10, 2024",
    form: "1120",
    taxPeriod: "2024",
    amount: "-",
  },
  {
    id: "2",
    type: "Tax return filed",
    date: "April 22, 2024",
    form: "1120S",
    taxPeriod: "2023",
    amount: "-",
  },
  {
    id: "3",
    type: "Extension of time to file tax return ext. Date 09-15-2024",
    date: "April 8, 2024",
    form: "1120S",
    taxPeriod: "2023",
    amount: "-",
  },
  {
    id: "4",
    type: "Appointed representative",
    date: "June 5, 2023",
    form: "1120S",
    taxPeriod: "2023",
    amount: "-",
  },
];

export default async function DataPage({
  searchParams,
}: {
  searchParams: { clientId?: string };
}) {
  const { clientId } = searchParams;
  const clientName = clientId
    ? mockTransactions.find((t) => t.id === clientId)?.form
    : null;

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link
          href="/Clients"
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
            {clientName && (
              <span className="ml-2 text-muted-foreground">
                for {clientName}
              </span>
            )}
          </CardTitle>
          <CardDescription>
            {clientName
              ? `Recent activity for ${clientName}`
              : "A quick peek into the most recent activity on your tax accounts"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataClient
            clientId={clientId}
            transactions={
              clientId
                ? mockTransactions.filter((t) => t.id === clientId)
                : mockTransactions
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
