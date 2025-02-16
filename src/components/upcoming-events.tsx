import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CompleteUIConfig, CompleteThemeConfig } from "~/server/db/schema";

interface UpcomingEventsProps {
  uiConfig: CompleteUIConfig;
  themeConfig: CompleteThemeConfig;
}

export function UpcomingEvents({ uiConfig, themeConfig }: UpcomingEventsProps) {
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
        <CardTitle className="text-lg">Upcoming events</CardTitle>
        <p className="text-sm text-muted-foreground">
          List of important upcoming events
        </p>
      </CardHeader>
      <CardContent style={contentStyle}>
        <div 
          className="py-4 text-center text-sm text-muted-foreground"
          style={{
            transition: `all ${uiConfig.animationSpeed === "slower" 
              ? "400ms" 
              : uiConfig.animationSpeed === "faster" 
                ? "100ms" 
                : "200ms"} ease-in-out`
          }}
        >
          No upcoming events
        </div>
      </CardContent>
    </Card>
  );
}
