import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type Transaction, type CompleteUIConfig, type CompleteThemeConfig } from "~/server/db/schema";

interface TransactionHistoryProps {
  uiConfig: CompleteUIConfig;
  themeConfig: CompleteThemeConfig;
}

export function TransactionHistory({ uiConfig, themeConfig }: TransactionHistoryProps) {
  const { data: transactions = [] } = api.test.getAllTransactions.useQuery();

  const cardStyle = {
    borderRadius: uiConfig.layoutBorderRadius,
    fontSize: uiConfig.baseFontSize,
    transition: `all ${uiConfig.animationSpeed === "slower" 
      ? "400ms" 
      : uiConfig.animationSpeed === "faster" 
        ? "100ms" 
        : "200ms"} ease-in-out`
  };

  const contentStyle = {
    padding: uiConfig.layoutDensity === "compact" 
      ? "0.75rem" 
      : uiConfig.layoutDensity === "spacious" 
        ? "1.5rem" 
        : "1rem"
  };

  return (
    <Card style={cardStyle}>
      <CardHeader style={contentStyle}>
        <CardTitle className="text-lg">Transaction History</CardTitle>
        <p className="text-sm text-muted-foreground">
          A quick peek into the most recent activity on your tax account
        </p>
      </CardHeader>
      <CardContent style={contentStyle}>
        <Tabs defaultValue="income" className="w-full">
          <TabsList style={{ borderRadius: uiConfig.layoutBorderRadius }}>
            <TabsTrigger 
              value="income"
              style={{ 
                borderRadius: uiConfig.layoutBorderRadius,
                transition: `all ${uiConfig.animationSpeed === "slower" 
                  ? "400ms" 
                  : uiConfig.animationSpeed === "faster" 
                    ? "100ms" 
                    : "200ms"} ease-in-out`
              }}
            >
              Income
            </TabsTrigger>
            <TabsTrigger 
              value="employment"
              style={{ 
                borderRadius: uiConfig.layoutBorderRadius,
                transition: `all ${uiConfig.animationSpeed === "slower" 
                  ? "400ms" 
                  : uiConfig.animationSpeed === "faster" 
                    ? "100ms" 
                    : "200ms"} ease-in-out`
              }}
            >
              Employment
            </TabsTrigger>
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
                  style={{
                    transition: `all ${uiConfig.animationSpeed === "slower" 
                      ? "400ms" 
                      : uiConfig.animationSpeed === "faster" 
                        ? "100ms" 
                        : "200ms"} ease-in-out`,
                    padding: uiConfig.layoutDensity === "compact" 
                      ? "0.5rem 0" 
                      : uiConfig.layoutDensity === "spacious" 
                        ? "1rem 0" 
                        : "0.75rem 0"
                  }}
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
