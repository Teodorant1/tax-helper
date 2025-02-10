"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DesktopAlerts } from "~/components/desktop-alerts";
import { MobileAlerts } from "~/components/mobile-alerts";
import { mockAlerts } from "~/types/alerts";

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = mockAlerts.filter(
    (alert) =>
      alert.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.alert.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.taxPeriod.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tax Alerts</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all tax-related alerts and notifications
        </p>
      </div>

      {/* Desktop view (hidden on small screens) */}
      <div className="hidden md:block">
        <DesktopAlerts
          alerts={filteredAlerts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Mobile view (hidden on medium and larger screens) */}
      <div className="md:hidden">
        <MobileAlerts
          alerts={filteredAlerts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>
    </div>
  );
}
