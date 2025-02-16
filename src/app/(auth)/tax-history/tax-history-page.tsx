"use client";

import * as React from "react";
import { api } from "~/trpc/react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CompleteThemeConfig, CompleteUIConfig,  TaxHistoryEntry } from "~/server/db/schema";
interface UICustomizationProps {
  theme_config: CompleteThemeConfig;
  ui_config: CompleteUIConfig;
}
export default function TaxHistoryPage_component({ theme_config, ui_config }: UICustomizationProps) {
  const [activeTab, setActiveTab] = React.useState("income");
  const { data: taxHistory = [] } = api.test.getAllTaxHistory.useQuery();

  const incomeEntries = taxHistory.filter(
    (entry: TaxHistoryEntry) => entry.type === "income",
  );
  const employmentEntries = taxHistory.filter(
    (entry: TaxHistoryEntry) => entry.type === "employment",
  );

  // Helper function for currency calculations
  const formatCurrency = (value: string) => {
    const numericValue = parseFloat(value.replace(/[$,()]/g, ""));
    return numericValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Calculate totals for income
  const incomeTotals = incomeEntries.reduce(
    (acc, entry) => ({
      principalTax: `$${formatCurrency(
        (
          parseFloat(acc.principalTax.replace(/[$,]/g, "")) +
          parseFloat(entry.principalTax.replace(/[$,]/g, ""))
        ).toString(),
      )}`,
      interest: `$${formatCurrency(
        (
          parseFloat(acc.interest.replace(/[$,()]/g, "")) +
          parseFloat(entry.interest.replace(/[$,()]/g, ""))
        ).toString(),
      )}`,
      penalties: `$${formatCurrency(
        (
          parseFloat(acc.penalties.replace(/[$,]/g, "")) +
          parseFloat(entry.penalties.replace(/[$,]/g, ""))
        ).toString(),
      )}`,
      paymentsAndCredits: `($${formatCurrency(
        (
          parseFloat(acc.paymentsAndCredits.replace(/[$,()]/g, "")) +
          parseFloat(entry.paymentsAndCredits.replace(/[$,()]/g, ""))
        ).toString(),
      )})`,
      refunds: `$${formatCurrency(
        (
          parseFloat(acc.refunds.replace(/[$,]/g, "")) +
          parseFloat(entry.refunds.replace(/[$,]/g, ""))
        ).toString(),
      )}`,
      balance: `$${formatCurrency(
        (
          parseFloat(acc.balance.replace(/[$,]/g, "")) +
          parseFloat(entry.balance.replace(/[$,]/g, ""))
        ).toString(),
      )}`,
    }),
    {
      principalTax: "$0.00",
      interest: "$0.00",
      penalties: "$0.00",
      paymentsAndCredits: "$0.00",
      refunds: "$0.00",
      balance: "$0.00",
    },
  );

  return (
    <div 
      className="container mx-auto"
      style={{
        padding: ui_config.layoutDensity === 'compact' ? '1rem' : 
                ui_config.layoutDensity === 'spacious' ? '3rem' : '1.5rem',
        transition: `all ${
          ui_config.animationSpeed === 'slower' ? '0.4s' :
          ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      <h1 
        className="mb-4 text-2xl font-bold"
        style={{
          color: theme_config.lightTheme.primary,
          fontSize: `calc(${ui_config.baseFontSize} * 1.5)`,
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        Year over Year Data
      </h1>
      <p 
        className="mb-6"
        style={{
          color: theme_config.lightTheme.secondary,
          fontSize: ui_config.baseFontSize,
          transition: `all ${
            ui_config.animationSpeed === 'slower' ? '0.4s' :
            ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        A summary of your year over year data
      </p>

      <Tabs 
        defaultValue="income" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList 
          style={{
            borderRadius: ui_config.layoutBorderRadius,
            transition: `all ${
              ui_config.animationSpeed === 'slower' ? '0.4s' :
              ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          <TabsTrigger 
            value="income"
            className="hover:opacity-80"
            style={{
              borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
              transition: `all ${
                ui_config.animationSpeed === 'slower' ? '0.4s' :
                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`,
              backgroundColor: activeTab === "income" ? theme_config.lightTheme.primary : 'transparent',
              color: activeTab === "income" ? 'white' : theme_config.lightTheme.primary
            }}
          >
            Income
          </TabsTrigger>
          <TabsTrigger 
            value="employment"
            className="hover:opacity-80"
            style={{
              borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
              transition: `all ${
                ui_config.animationSpeed === 'slower' ? '0.4s' :
                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`,
              backgroundColor: activeTab === "employment" ? theme_config.lightTheme.primary : 'transparent',
              color: activeTab === "employment" ? 'white' : theme_config.lightTheme.primary
            }}
          >
            Employment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <Card 
            className="p-4"
            style={{
              borderRadius: ui_config.layoutBorderRadius,
              transition: `all ${
                ui_config.animationSpeed === 'slower' ? '0.4s' :
                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Return Filed</TableHead>
                  <TableHead>Principal Tax</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Penalties</TableHead>
                  <TableHead>Payments And Credits</TableHead>
                  <TableHead>Refunds</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.period}</TableCell>
                    <TableCell>{entry.returnFiled}</TableCell>
                    <TableCell>{entry.principalTax}</TableCell>
                    <TableCell>{entry.interest}</TableCell>
                    <TableCell>{entry.penalties}</TableCell>
                    <TableCell 
                      style={{ 
                        color: theme_config.lightTheme.accent,
                        transition: `all ${
                          ui_config.animationSpeed === 'slower' ? '0.4s' :
                          ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                        } ease`
                      }}
                    >
                      {entry.paymentsAndCredits}
                    </TableCell>
                    <TableCell>{entry.refunds}</TableCell>
                    <TableCell>{entry.balance}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-medium">
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{incomeTotals.principalTax}</TableCell>
                  <TableCell>{incomeTotals.interest}</TableCell>
                  <TableCell>{incomeTotals.penalties}</TableCell>
                  <TableCell 
                    style={{ 
                      color: theme_config.lightTheme.accent,
                      transition: `all ${
                        ui_config.animationSpeed === 'slower' ? '0.4s' :
                        ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}
                  >
                    {incomeTotals.paymentsAndCredits}
                  </TableCell>
                  <TableCell>{incomeTotals.refunds}</TableCell>
                  <TableCell>{incomeTotals.balance}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card 
            className="p-4"
            style={{
              borderRadius: ui_config.layoutBorderRadius,
              transition: `all ${
                ui_config.animationSpeed === 'slower' ? '0.4s' :
                ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Return Filed</TableHead>
                  <TableHead>Principal Tax</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Penalties</TableHead>
                  <TableHead>Payments And Credits</TableHead>
                  <TableHead>Refunds</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employmentEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.period}</TableCell>
                    <TableCell>{entry.returnFiled}</TableCell>
                    <TableCell>{entry.principalTax}</TableCell>
                    <TableCell>{entry.interest}</TableCell>
                    <TableCell>{entry.penalties}</TableCell>
                    <TableCell 
                      style={{ 
                        color: theme_config.lightTheme.accent,
                        transition: `all ${
                          ui_config.animationSpeed === 'slower' ? '0.4s' :
                          ui_config.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                        } ease`
                      }}
                    >
                      {entry.paymentsAndCredits}
                    </TableCell>
                    <TableCell>{entry.refunds}</TableCell>
                    <TableCell>{entry.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
