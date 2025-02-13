"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DesktopAlerts } from "~/components/desktop-alerts";
import { MobileAlerts } from "~/components/mobile-alerts";
import { type Alert, type Client } from "~/server/db/schema";

interface AlertsContentProps {
  initialAlerts: (Alert & { client: Client })[];
  clientName: string | null;
}

export function AlertsContent({
  initialAlerts,
  clientName,
}: AlertsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = initialAlerts.filter(
    (alert) =>
      alert.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.alert.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.taxPeriod.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="md:container md:mx-auto md:py-6">
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
        <h1 className="text-3xl font-bold">
          Tax Alerts
          {clientName && (
            <span className="ml-2 text-muted-foreground">for {clientName}</span>
          )}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {clientName
            ? `View and manage tax-related alerts for ${clientName}`
            : "View and manage all tax-related alerts and notifications"}
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
