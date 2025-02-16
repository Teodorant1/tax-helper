import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CompleteUIConfig, CompleteThemeConfig } from "~/server/db/schema";

interface TaxSummaryCardProps {
  title: string;
  year: string;
  data: {
    period: string;
    amount: string;
  }[];
  uiConfig: CompleteUIConfig;
  themeConfig: CompleteThemeConfig;
}

export function TaxSummaryCard({ 
  title, 
  year, 
  data,
  uiConfig,
  themeConfig 
}: TaxSummaryCardProps) {
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
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">For {year}</p>
      </CardHeader>
      <CardContent style={contentStyle}>
        <div className="space-y-2">
          <div className="grid grid-cols-2 text-sm font-medium">
            <div>Period</div>
            <div>{title === "Outstanding Balance" ? "Balance" : "Amount"}</div>
          </div>
          {data.map((item) => (
            <div 
              key={item.period} 
              className="grid grid-cols-2 text-sm"
              style={{
                transition: `all ${uiConfig.animationSpeed === "slower" 
                  ? "400ms" 
                  : uiConfig.animationSpeed === "faster" 
                    ? "100ms" 
                    : "200ms"} ease-in-out`
              }}
            >
              <div>{item.period}</div>
              <div>{item.amount || "-"}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
