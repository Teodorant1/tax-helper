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

  return (
    <div 
      className="md:container md:mx-auto"
      style={{
        padding: ui_config.layoutDensity === 'compact' ? '1rem' : 
                ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
        transition: `all ${
          ui_config.animationSpeed === 'slower' ? '0.4s' :
          ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      <div 
        style={{
          marginBottom: ui_config.layoutDensity === 'compact' ? '1rem' : 
                       ui_config.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-primary"
          style={{
            fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div 
        style={{
          marginBottom: ui_config.layoutDensity === 'compact' ? '2rem' : 
                       ui_config.layoutDensity === 'spacious' ? '4rem' : '3rem',
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <h1 
          className="font-bold"
          style={{
            fontSize: `calc(${ui_config.baseFontSize} * 2)`,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          Tax Alerts
          {clientName && (
          <span 
            className="ml-2 text-muted-foreground"
            style={{
              fontSize: `calc(${ui_config.baseFontSize} * 2)`,
              transition: `all ${
                ui_config.animationSpeed === 'slower' ? '0.4s' :
                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >for {clientName}</span>
          )}
        </h1>
        <p 
          className="mt-2 text-muted-foreground"
          style={{
            fontSize: ui_config.baseFontSize,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
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
