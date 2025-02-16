"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DesktopAlerts } from "~/components/desktop-alerts";
import { MobileAlerts } from "~/components/mobile-alerts";
import { type Alert, type Client, type CompleteThemeConfig, type CompleteUIConfig } from "~/server/db/schema";

interface AlertsContentProps {
  initialAlerts: (Alert & { client: Client })[];
  clientName: string | null;
  theme_config: CompleteThemeConfig;
  ui_config: CompleteUIConfig;
}

export function AlertsContent({
  initialAlerts,
  clientName,
  theme_config,
  ui_config,
}: AlertsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = initialAlerts.filter(
    (alert) =>
      alert.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.alert.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.taxPeriod.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Compute animation duration based on speed setting
  const getTransitionDuration = () => {
    switch (ui_config.animationSpeed) {
      case 'slower': return '0.4s';
      case 'faster': return '0.15s';
      default: return '0.25s';
    }
  };

  // Compute padding based on density
  const getPadding = () => {
    switch (ui_config.layoutDensity) {
      case 'compact': return '1rem';
      case 'spacious': return '2rem';
      default: return '1.5rem';
    }
  };

  return (
    <div 
      className="md:container md:mx-auto"
      style={{
        padding: getPadding(),
        transition: `all ${getTransitionDuration()} ease`
      }}
    >
      <div 
        style={{
          marginBottom: getPadding(),
          transition: `all ${getTransitionDuration()} ease`
        }}
      >
        <Link
          href="/"
          className="inline-flex items-center hover:text-primary"
          style={{
            fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
            color: theme_config.lightTheme.secondary,
            transition: `all ${getTransitionDuration()} ease`
          }}
        >
          <ArrowLeft 
            className="mr-2 h-4 w-4" 
            style={{ color: 'currentColor' }}
          />
          Back to Dashboard
        </Link>
      </div>

      <div 
        style={{
          marginBottom: ui_config.layoutDensity === 'compact' ? '2rem' : 
                       ui_config.layoutDensity === 'spacious' ? '4rem' : '3rem',
          transition: `all ${getTransitionDuration()} ease`
        }}
      >
        <h1 
          className="font-bold"
          style={{
            fontSize: `calc(${ui_config.baseFontSize} * 2)`,
            color: theme_config.lightTheme.primary,
            transition: `all ${getTransitionDuration()} ease`
          }}
        >
          Tax Alerts
          {clientName && (
            <span 
              style={{
                marginLeft: '0.5rem',
                fontSize: `calc(${ui_config.baseFontSize} * 2)`,
                color: theme_config.lightTheme.secondary,
                transition: `all ${getTransitionDuration()} ease`
              }}
            >
              for {clientName}
            </span>
          )}
        </h1>
        <p 
          style={{
            marginTop: '0.5rem',
            fontSize: ui_config.baseFontSize,
            color: theme_config.lightTheme.secondary,
            transition: `all ${getTransitionDuration()} ease`
          }}
        >
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
          theme_config={theme_config}
          ui_config={ui_config}
        />
      </div>

      {/* Mobile view (hidden on medium and larger screens) */}
      <div className="md:hidden">
        <MobileAlerts
          alerts={filteredAlerts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme_config={theme_config}
          ui_config={ui_config}
        />
      </div>
    </div>
  );
}
