import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface Transaction {
  id: string;
  date: string;
  description: string;
  form: string;
  taxPeriod: string;
  amount: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    date: "June 10, 2024",
    description: "Appointed representative",
    form: "1120",
    taxPeriod: "2024",
    amount: "-",
  },
  {
    id: "2",
    date: "April 22, 2024",
    description: "Tax return filed",
    form: "1120S",
    taxPeriod: "2023",
    amount: "-",
  },
  {
    id: "3",
    date: "April 8, 2024",
    description: "Extension of time to file tax return ext. Date 09-15-2024",
    form: "1120S",
    taxPeriod: "2023",
    amount: "-",
  },
  {
    id: "4",
    date: "June 5, 2023",
    description: "Appointed representative",
    form: "1120S",
    taxPeriod: "2023",
    amount: "-",
  },
  {
    id: "5",
    date: "April 10, 2023",
    description: "Appointed representative",
    form: "1120S",
    taxPeriod: "2020",
    amount: "-",
  },
];

export function TransactionHistory() {
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
                    <div className="font-medium">{transaction.description}</div>
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
