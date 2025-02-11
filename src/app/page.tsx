import { Greeting } from "~/components/greeting";
import { ActiveClients } from "~/components/active-clients";
import { Alerts } from "~/components/alerts";
import { InviteLink } from "~/components/invite-link";
import { Resources } from "~/components/resources";
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

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Greeting />

      {/* Client Management Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card shadow">
          <ActiveClients />
        </div>
        <div className="rounded-lg border bg-card shadow">
          <Alerts />
        </div>
      </div>

      {/* Tax Information Section */}
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

      {/* Transaction and Events Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <TransactionHistory />
        </div>
        <div>
          <UpcomingEvents />
        </div>
      </div>

      {/* Resources Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card shadow">
          <InviteLink />
        </div>
        <div className="rounded-lg border bg-card shadow">
          <Resources />
        </div>
      </div>
    </div>
  );
}
