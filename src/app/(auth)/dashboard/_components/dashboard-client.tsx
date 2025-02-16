"use client";

import { api } from "~/trpc/react";
import { TaxStatusBanner } from "~/components/tax-status-banner";
import { TaxSummaryCard } from "~/components/tax-summary-card";
import { TransactionHistory } from "~/components/transaction-history";
import { UpcomingEvents } from "~/components/upcoming-events";
import type { CompleteThemeConfig, CompleteUIConfig } from "~/server/db/schema";

interface DashboardClientProps {
  uiConfig:    CompleteUIConfig;
  themeConfig: CompleteThemeConfig;
}

export function DashboardClient({ uiConfig, themeConfig }: DashboardClientProps) {
  const { data: taxHistory = [] } = api.test.getAllTaxHistory.useQuery();

  const taxableIncomeData = taxHistory
    .filter((entry) => entry.type === "income")
    .map((entry) => ({
      period: entry.period,
      amount: entry.principalTax,
    }))
    .slice(0, 2);

  const taxesPaidData = taxHistory
    .filter((entry) => entry.type === "income")
    .map((entry) => ({
      period: entry.period,
      amount: entry.paymentsAndCredits,
    }))
    .slice(0, 2);

  const outstandingBalanceData = taxHistory
    .filter((entry) => entry.type === "income")
    .map((entry) => ({
      period: entry.period,
      amount: entry.balance,
    }))
    .slice(0, 2);

  return (
    <div 
      className="container mx-auto space-y-6"
      style={{
        padding: uiConfig.layoutDensity === "compact" 
          ? "1rem" 
          : uiConfig.layoutDensity === "spacious" 
            ? "2rem" 
            : "1.5rem",
        fontSize: uiConfig.baseFontSize,
        transition: `all ${uiConfig.animationSpeed === "slower" 
          ? "400ms" 
          : uiConfig.animationSpeed === "faster" 
            ? "100ms" 
            : "200ms"} ease-in-out`
      }}
    >
      <TaxStatusBanner uiConfig={uiConfig} themeConfig={themeConfig} />

      <div 
        className="grid md:grid-cols-3"
        style={{
          gap: uiConfig.layoutDensity === "compact" 
            ? "1rem" 
            : uiConfig.layoutDensity === "spacious" 
              ? "2rem" 
              : "1.5rem",
          transition: `all ${uiConfig.animationSpeed === "slower" 
            ? "400ms" 
            : uiConfig.animationSpeed === "faster" 
              ? "100ms" 
              : "200ms"} ease-in-out`
        }}
      >
        <TaxSummaryCard
          title="Taxable Income"
          year="2024"
          data={taxableIncomeData}
          uiConfig={uiConfig}
          themeConfig={themeConfig}
        />
        <TaxSummaryCard 
          title="Taxes Paid" 
          year="2024" 
          data={taxesPaidData}
          uiConfig={uiConfig}
          themeConfig={themeConfig}
        />
        <TaxSummaryCard
          title="Outstanding Balance"
          year="2024"
          data={outstandingBalanceData}
          uiConfig={uiConfig}
          themeConfig={themeConfig}
        />
      </div>

      <div 
        className="grid md:grid-cols-3"
        style={{
          gap: uiConfig.layoutDensity === "compact" 
            ? "1rem" 
            : uiConfig.layoutDensity === "spacious" 
              ? "2rem" 
              : "1.5rem",
          transition: `all ${uiConfig.animationSpeed === "slower" 
            ? "400ms" 
            : uiConfig.animationSpeed === "faster" 
              ? "100ms" 
              : "200ms"} ease-in-out`
        }}
      >
        <div className="md:col-span-2">
          <TransactionHistory uiConfig={uiConfig} themeConfig={themeConfig} />
        </div>
        <div>
          <UpcomingEvents uiConfig={uiConfig} themeConfig={themeConfig} />
        </div>
      </div>
    </div>
  );
}
