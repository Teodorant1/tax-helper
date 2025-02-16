"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { api } from "~/trpc/react";
import type { CompleteUIConfig, CompleteThemeConfig } from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

export function TaxStatusBanner({ theme_config, uiConfig }: ThemeConfigProps) {
  const { data: taxHistory = [] } = api.test.getAllTaxHistory.useQuery();

  const currentYear = new Date().getFullYear();
  const currentYearReturn = taxHistory.find(
    (entry) =>
      entry.period === currentYear.toString() && entry.type === "income",
  );

  const hasFiledCurrentYear = currentYearReturn?.returnFiled === "Original";
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const bannerStyle = {
    borderRadius: uiConfig.layoutBorderRadius,
    padding: uiConfig.layoutDensity === "compact" 
      ? "0.75rem" 
      : uiConfig.layoutDensity === "spacious" 
        ? "1.5rem" 
        : "1rem",
    fontSize: uiConfig.baseFontSize,
    transition: `all ${uiConfig.animationSpeed === "slower" 
      ? "400ms" 
      : uiConfig.animationSpeed === "faster" 
        ? "100ms" 
        : "200ms"} ease-in-out`
  };

  if (hasFiledCurrentYear) {
    return (
      <div 
        style={{
          ...bannerStyle,
          backgroundColor: `${theme_config.lightTheme.primary}10`,
          color: theme_config.lightTheme.primary,
        }}
        className="mb-6 rounded-lg p-4"
      >
        <div className="flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          <p>Your {currentYear} tax return was filed successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
        style={{
          ...bannerStyle,
          backgroundColor: `${theme_config.lightTheme.accent}10`,
          color: theme_config.lightTheme.accent,
        }}
        className="mb-6 rounded-lg p-4"
    >
      <div className="flex items-center">
        <AlertTriangle className="mr-2 h-5 w-5" />
        <p>
          As of {currentDate}, it looks like your {currentYear} tax return has
          not been filed yet.
        </p>
      </div>
    </div>
  );
}
