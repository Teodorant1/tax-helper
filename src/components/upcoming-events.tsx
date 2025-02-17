import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CompleteUIConfig, CompleteThemeConfig } from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

export function UpcomingEvents({ uiConfig, theme_config }: ThemeConfigProps) {
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
        >Upcoming events</CardTitle>
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
        >
          List of important upcoming events
        </p>
      </CardHeader>
      <CardContent style={contentStyle}>
        <div 
          className="py-4 text-center text-sm"
          style={{
            color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary,
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
