"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type TaxHistoryEntry } from "~/server/db/schema";

const mockTaxHistory: TaxHistoryEntry[] = [
  {
    id: crypto.randomUUID(),
    clientId: "1",
    period: "2022",
    returnFiled: "Original",
    principalTax: "$2,746.25",
    interest: "$0.00",
    penalties: "$0.00",
    paymentsAndCredits: "($2,746.25)",
    refunds: "$0.00",
    balance: "$0.00",
    type: "income",
  },
  {
    id: crypto.randomUUID(),
    clientId: "1",
    period: "2021",
    returnFiled: "Original",
    principalTax: "$145,855.36",
    interest: "($17,977.99)",
    penalties: "$0.00",
    paymentsAndCredits: "($290,503.43)",
    refunds: "$162,626.06",
    balance: "$0.00",
    type: "income",
  },
  {
    id: crypto.randomUUID(),
    clientId: "1",
    period: "2020",
    returnFiled: "Original",
    principalTax: "$713,169.00",
    interest: "($40,361.21)",
    penalties: "$0.00",
    paymentsAndCredits: "($1,041,021.70)",
    refunds: "$368,213.91",
    balance: "$0.00",
    type: "income",
  },
  {
    id: crypto.randomUUID(),
    clientId: "1",
    period: "2024",
    returnFiled: "No",
    principalTax: "$0.00",
    interest: "$0.00",
    penalties: "$0.00",
    paymentsAndCredits: "$0.00",
    refunds: "$0.00",
    balance: "$0.00",
    type: "employment",
  },
];

export default function TaxHistoryPage() {
  const incomeEntries = mockTaxHistory.filter(
    (entry) => entry.type === "income",
  );
  const employmentEntries = mockTaxHistory.filter(
    (entry) => entry.type === "employment",
  );

  // Calculate totals for income
  const incomeTotals = incomeEntries.reduce(
    (acc, entry) => ({
      principalTax: "$861,770.61", // Hardcoded for now, would need proper currency math
      interest: "($58,339.20)",
      penalties: "$0.00",
      paymentsAndCredits: "($1,334,271.38)",
      refunds: "$530,839.97",
      balance: "$0.00",
    }),
    {
      principalTax: "$0.00",
      interest: "$0.00",
      penalties: "$0.00",
      paymentsAndCredits: "$0.00",
      refunds: "$0.00",
      balance: "$0.00",
    },
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Year over Year Data</h1>
      <p className="mb-6 text-muted-foreground">
        A summary of your year over year data
      </p>

      <Tabs defaultValue="income" className="w-full">
        <TabsList>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Return Filed</TableHead>
                  <TableHead>Principal Tax</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Penalties</TableHead>
                  <TableHead>Payments And Credits</TableHead>
                  <TableHead>Refunds</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.period}</TableCell>
                    <TableCell>{entry.returnFiled}</TableCell>
                    <TableCell>{entry.principalTax}</TableCell>
                    <TableCell>{entry.interest}</TableCell>
                    <TableCell>{entry.penalties}</TableCell>
                    <TableCell className="text-green-600">
                      {entry.paymentsAndCredits}
                    </TableCell>
                    <TableCell>{entry.refunds}</TableCell>
                    <TableCell>{entry.balance}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-medium">
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{incomeTotals.principalTax}</TableCell>
                  <TableCell>{incomeTotals.interest}</TableCell>
                  <TableCell>{incomeTotals.penalties}</TableCell>
                  <TableCell className="text-green-600">
                    {incomeTotals.paymentsAndCredits}
                  </TableCell>
                  <TableCell>{incomeTotals.refunds}</TableCell>
                  <TableCell>{incomeTotals.balance}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Return Filed</TableHead>
                  <TableHead>Principal Tax</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Penalties</TableHead>
                  <TableHead>Payments And Credits</TableHead>
                  <TableHead>Refunds</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employmentEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.period}</TableCell>
                    <TableCell>{entry.returnFiled}</TableCell>
                    <TableCell>{entry.principalTax}</TableCell>
                    <TableCell>{entry.interest}</TableCell>
                    <TableCell>{entry.penalties}</TableCell>
                    <TableCell>{entry.paymentsAndCredits}</TableCell>
                    <TableCell>{entry.refunds}</TableCell>
                    <TableCell>{entry.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
