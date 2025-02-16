"use client";

import { api } from "~/trpc/react";
import { ActiveClients } from "~/components/active-clients";
import { Alerts } from "~/components/alerts";
import { InviteLink } from "~/components/invite-link";
import { Resources } from "~/components/resources";
import { TaxStatusBanner } from "~/components/tax-status-banner";
import { TaxSummaryCard } from "~/components/tax-summary-card";
import { TransactionHistory } from "~/components/transaction-history";
import { UpcomingEvents } from "~/components/upcoming-events";
import type { CompleteUIConfig } from "~/server/db/schema";
import type { ClientThemeConfig } from "~/types/theme";

interface HomePageClientProps {
  uiConfig: CompleteUIConfig;
  themeConfig: ClientThemeConfig;
}

export function HomePageClient({ uiConfig, themeConfig }: HomePageClientProps) {
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

  const cardStyle = {
    borderRadius: uiConfig.layoutBorderRadius,
    transition: `all ${
      uiConfig.animationSpeed === 'slower' ? '0.4s' :
      uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
    } ease`,
    background: `linear-gradient(to bottom right, #f0f0f015, #e0e0e010)`,
    border: '1px solid #e0e0e040',
    boxShadow: '0 0 10px #00000010',
  };

  return (
    <div 
      className={`space-y-${uiConfig.layoutDensity === 'compact' ? '4' : 
                 uiConfig.layoutDensity === 'spacious' ? '8' : '6'}`}
      style={{
        transition: `all ${
          uiConfig.animationSpeed === 'slower' ? '0.4s' :
          uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      <TaxStatusBanner uiConfig={uiConfig} themeConfig={themeConfig} />

      {/* Client Management Section */}
      <div 
        className={`grid grid-cols-1 gap-${
          uiConfig.layoutDensity === 'compact' ? '4' : 
          uiConfig.layoutDensity === 'spacious' ? '8' : '6'
        } lg:grid-cols-2`}
      >
        <div style={cardStyle}>
          <ActiveClients uiConfig={uiConfig} themeConfig={themeConfig} />
        </div>
        <div style={cardStyle}>
          <Alerts uiConfig={uiConfig} themeConfig={themeConfig} />
        </div>
      </div>

      {/* Tax Information Section */}
      <div 
        className={`grid gap-${
          uiConfig.layoutDensity === 'compact' ? '4' : 
          uiConfig.layoutDensity === 'spacious' ? '8' : '6'
        } md:grid-cols-3`}
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

      {/* Transaction and Events Section */}
      <div 
        className={`grid gap-${
          uiConfig.layoutDensity === 'compact' ? '4' : 
          uiConfig.layoutDensity === 'spacious' ? '8' : '6'
        } md:grid-cols-3`}
      >
        <div className="md:col-span-2" style={cardStyle}>
          <TransactionHistory uiConfig={uiConfig} themeConfig={themeConfig} />
        </div>
        <div style={cardStyle}>
          <UpcomingEvents uiConfig={uiConfig} themeConfig={themeConfig} />
        </div>
      </div>

      {/* Resources Section */}
      <div 
        className={`grid grid-cols-1 gap-${
          uiConfig.layoutDensity === 'compact' ? '4' : 
          uiConfig.layoutDensity === 'spacious' ? '8' : '6'
        } lg:grid-cols-2`}
      >
        <div style={cardStyle}>
          <InviteLink uiConfig={uiConfig} themeConfig={themeConfig} />
        </div>
        <div style={cardStyle}>
          <Resources uiConfig={uiConfig} themeConfig={themeConfig} />
        </div>
      </div>
    </div>
  );
}
