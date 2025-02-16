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
import type { CompleteUIConfig, CompleteThemeConfig } from "~/server/db/schema";
import type { ClientThemeConfig } from "~/types/theme";

interface HomePageClientProps {
  uiConfig: CompleteUIConfig;
  themeConfig: CompleteThemeConfig;
}

// Convert CompleteThemeConfig to the format expected by child components
const convertThemeConfig = (config: CompleteThemeConfig): ClientThemeConfig => ({
  light: {
    primary: config.lightTheme.primary,
    secondary: config.lightTheme.secondary,
    accent: config.lightTheme.accent,
  },
  dark: {
    primary: config.darkTheme.primary,
    secondary: config.darkTheme.secondary,
    accent: config.darkTheme.accent,
  },
});

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

  const getCardStyle = (variant: 'primary' | 'secondary' | 'accent') => {
    const colors = {
      primary: {
        bg: `linear-gradient(to bottom right, ${themeConfig.lightTheme.primary}15, ${themeConfig.lightTheme.secondary}10)`,
        border: `1px solid ${themeConfig.lightTheme.accent}40`,
      },
      secondary: {
        bg: `linear-gradient(to bottom right, ${themeConfig.lightTheme.secondary}15, ${themeConfig.lightTheme.accent}10)`,
        border: `1px solid ${themeConfig.lightTheme.primary}40`,
      },
      accent: {
        bg: `linear-gradient(to bottom right, ${themeConfig.lightTheme.accent}15, ${themeConfig.lightTheme.primary}10)`,
        border: `1px solid ${themeConfig.lightTheme.secondary}40`,
      },
    };

    return {
      borderRadius: uiConfig.layoutBorderRadius,
      padding: uiConfig.layoutDensity === 'compact' ? '1rem' : 
              uiConfig.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
      transition: `all ${
        uiConfig.animationSpeed === 'slower' ? '0.4s' :
        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
      } ease`,
      background: colors[variant].bg,
      border: colors[variant].border,
      boxShadow: '0 0 10px #00000010',
    };
  };

  const sectionHeadingStyle = {
    fontSize: `calc(${uiConfig.baseFontSize} * 1.5)`,
    fontWeight: 600,
    marginBottom: uiConfig.layoutDensity === 'compact' ? '0.75rem' : 
                 uiConfig.layoutDensity === 'spacious' ? '1.5rem' : '1rem',
    transition: `all ${
      uiConfig.animationSpeed === 'slower' ? '0.4s' :
      uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
    } ease`,
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
      <TaxStatusBanner uiConfig={uiConfig} theme_config={themeConfig} />

      {/* Client Management Section */}
      <div>
        <h2 style={{
          ...sectionHeadingStyle,
          color: themeConfig.lightTheme.primary,
        }}>Client Management</h2>
        <div 
          className={`grid grid-cols-1 gap-${
            uiConfig.layoutDensity === 'compact' ? '4' : 
            uiConfig.layoutDensity === 'spacious' ? '8' : '6'
          } lg:grid-cols-2`}
        >
          <div style={getCardStyle('primary')}>
            <ActiveClients uiConfig={uiConfig} theme_config={themeConfig} />
          </div>
          <div style={getCardStyle('primary')}>
            <Alerts uiConfig={uiConfig} theme_config={themeConfig} />
          </div>
        </div>
      </div>

      {/* Tax Information Section */}
      <div>
        <h2 style={{
          ...sectionHeadingStyle,
          color: themeConfig.lightTheme.secondary,
        }}>Tax Information</h2>
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
            theme_config={themeConfig}
          />
          <TaxSummaryCard 
            title="Taxes Paid" 
            year="2024" 
            data={taxesPaidData}
            uiConfig={uiConfig}
            theme_config={themeConfig}
          />
          <TaxSummaryCard
            title="Outstanding Balance"
            year="2024"
            data={outstandingBalanceData}
            uiConfig={uiConfig}
            theme_config={themeConfig}
          />
        </div>
      </div>

      {/* Transaction and Events Section */}
      <div>
        <h2 style={{
          ...sectionHeadingStyle,
          color: themeConfig.lightTheme.accent,
        }}>Transactions & Events</h2>
        <div 
          className={`grid gap-${
            uiConfig.layoutDensity === 'compact' ? '4' : 
            uiConfig.layoutDensity === 'spacious' ? '8' : '6'
          } md:grid-cols-3`}
        >
          <div className="md:col-span-2" style={getCardStyle('accent')}>
            <TransactionHistory uiConfig={uiConfig} theme_config={themeConfig} />
          </div>
          <div style={getCardStyle('accent')}>
            <UpcomingEvents uiConfig={uiConfig} theme_config={themeConfig} />
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div>
        <h2 style={{
          ...sectionHeadingStyle,
          color: themeConfig.lightTheme.primary,
        }}>Resources & Links</h2>
        <div 
          className={`grid grid-cols-1 gap-${
            uiConfig.layoutDensity === 'compact' ? '4' : 
            uiConfig.layoutDensity === 'spacious' ? '8' : '6'
          } lg:grid-cols-2`}
        >
          <div style={getCardStyle('secondary')}>
            <InviteLink uiConfig={uiConfig} theme_config={themeConfig} />
          </div>
          <div style={getCardStyle('secondary')}>
            <Resources uiConfig={uiConfig} theme_config={themeConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}
