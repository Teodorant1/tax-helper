"use client";

import { api } from "~/trpc/react";
import { TaxStatusBanner } from "~/components/tax-status-banner";
import { TaxSummaryCard } from "~/components/tax-summary-card";
import { TransactionHistory } from "~/components/transaction-history";
import { UpcomingEvents } from "~/components/upcoming-events";

export default function DashboardPage() {
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
    <div className="container mx-auto space-y-6 p-6">
      <TaxStatusBanner />

      <div className="grid gap-6 md:grid-cols-3">
        <TaxSummaryCard
          title="Taxable Income"
          year="2024"
          data={taxableIncomeData}
        />
        <TaxSummaryCard title="Taxes Paid" year="2024" data={taxesPaidData} />
        <TaxSummaryCard
          title="Outstanding Balance"
          year="2024"
          data={outstandingBalanceData}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <TransactionHistory />
        </div>
        <div>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
