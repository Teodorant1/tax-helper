"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { api } from "~/trpc/react";

export function TaxStatusBanner() {
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

  if (hasFiledCurrentYear) {
    return (
      <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
        <div className="flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          <p>Your {currentYear} tax return was filed successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-yellow-800">
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
