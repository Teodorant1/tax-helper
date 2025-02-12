"use client";

import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { DateRangePicker } from "~/components/ui/date-range-picker";
import { SortOrder } from "~/components/ui/sort-order";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { type Transaction } from "~/server/db/schema";

interface DataClientProps {
  clientId?: string;
  transactions: Transaction[];
}

export function DataClient({ clientId, transactions }: DataClientProps) {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  return (
    <Tabs defaultValue="income" className="w-full">
      <TabsList>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="employment">Employment</TabsTrigger>
      </TabsList>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col gap-2 md:flex-row">
          <Button variant="outline" size="sm">
            View All
          </Button>
          <Button variant="outline" size="sm">
            Credit
          </Button>
          <Button variant="outline" size="sm">
            Debit
          </Button>
          <Button variant="outline" size="sm">
            Info
          </Button>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <DateRangePicker onChange={setDateRange} />
          <SortOrder value={sortOrder} onChange={setSortOrder} />
        </div>
      </div>
      <TabsContent value="income" className="mt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Transaction</th>
                <th className="px-6 py-3">Form</th>
                <th className="px-6 py-3">Tax Period</th>
                <th className="px-6 py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-6 py-4">
                    <div>{transaction.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">{transaction.form}</td>
                  <td className="px-6 py-4">{transaction.taxPeriod}</td>
                  <td className="px-6 py-4">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
      <TabsContent value="employment">
        <div className="flex h-[400px] items-center justify-center text-muted-foreground">
          No employment transactions found
        </div>
      </TabsContent>
    </Tabs>
  );
}
