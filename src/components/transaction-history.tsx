import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type Transaction } from "~/server/db/schema";

export function TransactionHistory() {
  const { data: transactions = [] } = api.test.getAllTransactions.useQuery();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Transaction History</CardTitle>
        <p className="text-sm text-muted-foreground">
          A quick peek into the most recent activity on your tax account
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="income" className="w-full">
          <TabsList>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
          </TabsList>
          <TabsContent value="income">
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium">
                <div>Transaction</div>
                <div>Form</div>
                <div>Tax Period</div>
                <div>Amount</div>
              </div>
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-4 border-t py-2 text-sm"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{transaction.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.date}
                    </div>
                  </div>
                  <div>{transaction.form}</div>
                  <div>{transaction.taxPeriod}</div>
                  <div>{transaction.amount}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="employment">
            <div className="py-4 text-center text-sm text-muted-foreground">
              No employment transactions found
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
