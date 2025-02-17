import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CompleteUIConfig, CompleteThemeConfig } from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

interface TaxSummaryCardProps extends ThemeConfigProps {
  title: string;
  year: string;
  data: {
    period: string;
    amount: string;
  }[];
}

export function TaxSummaryCard({ 
  title, 
  year, 
  data,
  uiConfig,
  theme_config 
}: TaxSummaryCardProps) {
  const cardStyle = {
    borderRadius: uiConfig.layoutBorderRadius,
    fontSize: uiConfig.baseFontSize,
    transition: `all ${uiConfig.animationSpeed === "slower" 
      ? "400ms" 
      : uiConfig.animationSpeed === "faster" 
        ? "100ms" 
        : "200ms"} ease-in-out`,
    background: `linear-gradient(to bottom right, ${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}15, ${theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary}10)`,
    border: `1px solid ${theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent}40`,
    boxShadow: '0 0 10px #00000010'
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
        <CardTitle 
          className="text-lg"
          style={{ 
            color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary,
            transition: `all ${uiConfig.animationSpeed === "slower" 
              ? "400ms" 
              : uiConfig.animationSpeed === "faster" 
                ? "100ms" 
                : "200ms"} ease-in-out`
          }}
        >{title}</CardTitle>
        <p 
          className="text-sm text-muted-foreground"
          style={{ 
            color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary,
            transition: `all ${uiConfig.animationSpeed === "slower" 
              ? "400ms" 
              : uiConfig.animationSpeed === "faster" 
                ? "100ms" 
                : "200ms"} ease-in-out`
          }}
        >For {year}</p>
      </CardHeader>
      <CardContent style={contentStyle}>
        <div className="space-y-2">
          <div 
            className="grid grid-cols-2 text-sm font-medium"
            style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary }}
          >
            <div>Period</div>
            <div>{title === "Outstanding Balance" ? "Balance" : "Amount"}</div>
          </div>
          {data.map((item) => (
            <div 
              key={item.period} 
              className="grid grid-cols-2 text-sm"
              style={{
                color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary,
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
