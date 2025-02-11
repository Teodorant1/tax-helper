import { TaxStatusBanner } from "~/components/tax-status-banner";
import { TaxSummaryCard } from "~/components/tax-summary-card";
import { TransactionHistory } from "~/components/transaction-history";
import { UpcomingEvents } from "~/components/upcoming-events";

const taxableIncomeData = [
  { period: "2023", amount: "-" },
  { period: "2022", amount: "-" },
];

const taxesPaidData = [
  { period: "2023", amount: "-" },
  { period: "2022", amount: "-" },
];

const outstandingBalanceData = [
  { period: "2023", amount: "-" },
  { period: "2022", amount: "-" },
];

export default function DashboardPage() {
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
