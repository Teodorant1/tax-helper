import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface TaxSummaryCardProps {
  title: string;
  year: string;
  data: {
    period: string;
    amount: string;
  }[];
}

export function TaxSummaryCard({ title, year, data }: TaxSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">For {year}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-2 text-sm font-medium">
            <div>Period</div>
            <div>{title === "Outstanding Balance" ? "Balance" : "Amount"}</div>
          </div>
          {data.map((item) => (
            <div key={item.period} className="grid grid-cols-2 text-sm">
              <div>{item.period}</div>
              <div>{item.amount || "-"}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
