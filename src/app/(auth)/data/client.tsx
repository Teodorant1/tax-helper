"use client";

import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { DateRangePicker } from "~/components/ui/date-range-picker";
import { SortOrder } from "~/components/ui/sort-order";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import type { CompleteThemeConfig, CompleteUIConfig, Transaction } from "~/server/db/schema";

interface DataClientProps {
  clientId?: string;
  transactions: Transaction[];
    theme_config: CompleteThemeConfig;
    uiConfig: CompleteUIConfig;
}

export function DataClient({ clientId, transactions , theme_config , uiConfig }: DataClientProps) {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  return (
    <Tabs 
      defaultValue="income" 
      className="w-full"
      style={{
        '--tab-radius': uiConfig.layoutBorderRadius,
        '--tab-transition': `${
          uiConfig.animationSpeed === 'slower' ? '0.4s' :
          uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        }`,
      } as React.CSSProperties}
    >
      <TabsList
        style={{
          borderRadius: uiConfig.layoutBorderRadius,
          padding: uiConfig.layoutDensity === 'compact' ? '0.25rem' : 
                  uiConfig.layoutDensity === 'spacious' ? '0.75rem' : '0.5rem',
          background: `${theme_config.lightTheme.secondary}15`,
          transition: `all ${
            uiConfig.animationSpeed === 'slower' ? '0.4s' :
            uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <TabsTrigger 
          value="income"
          style={{
            fontSize: uiConfig.baseFontSize,
            borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
            transition: `all ${
              uiConfig.animationSpeed === 'slower' ? '0.4s' :
              uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >Income</TabsTrigger>
        <TabsTrigger 
          value="employment"
          style={{
            fontSize: uiConfig.baseFontSize,
            borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
            transition: `all ${
              uiConfig.animationSpeed === 'slower' ? '0.4s' :
              uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >Employment</TabsTrigger>
      </TabsList>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col gap-2 md:flex-row">
          {["View All", "Credit", "Debit", "Info"].map((label) => (
            <Button 
              key={label}
              variant="outline" 
              size="sm"
              style={{
                fontSize: `calc(${uiConfig.baseFontSize} * 0.875)`,
                borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                padding: uiConfig.layoutDensity === 'compact' ? '0.5rem 0.75rem' : 
                        uiConfig.layoutDensity === 'spacious' ? '0.75rem 1.25rem' : '0.625rem 1rem',
                borderColor: `${theme_config.lightTheme.secondary}30`,
                transition: `all ${
                  uiConfig.animationSpeed === 'slower' ? '0.4s' :
                  uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <DateRangePicker onChange={setDateRange} />
          <SortOrder value={sortOrder} onChange={setSortOrder} />
        </div>
      </div>
      <TabsContent value="income" className="mt-4">
        <div 
          className="relative overflow-x-auto"
          style={{
            borderRadius: uiConfig.layoutBorderRadius,
            background: `${theme_config.lightTheme.secondary}05`,
            transition: `all ${
              uiConfig.animationSpeed === 'slower' ? '0.4s' :
              uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          <table className="w-full text-left">
            <thead
              style={{
                background: `${theme_config.lightTheme.secondary}10`,
                transition: `all ${
                  uiConfig.animationSpeed === 'slower' ? '0.4s' :
                  uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                } ease`
              }}
            >
              <tr>
                {["Transaction", "Form", "Tax Period", "Amount"].map((header) => (
                  <th 
                    key={header}
                    style={{
                      padding: uiConfig.layoutDensity === 'compact' ? '0.75rem 1rem' : 
                              uiConfig.layoutDensity === 'spacious' ? '1.25rem 1.5rem' : '1rem 1.25rem',
                      fontSize: `calc(${uiConfig.baseFontSize} * 0.75)`,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: theme_config.darkTheme.secondary,
                      transition: `all ${
                        uiConfig.animationSpeed === 'slower' ? '0.4s' :
                        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  style={{
                    borderBottom: `1px solid ${theme_config.lightTheme.secondary}15`,
                    transition: `all ${
                      uiConfig.animationSpeed === 'slower' ? '0.4s' :
                      uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                    } ease`
                  }}
                >
                  <td 
                    style={{
                      padding: uiConfig.layoutDensity === 'compact' ? '0.75rem 1rem' : 
                              uiConfig.layoutDensity === 'spacious' ? '1.25rem 1.5rem' : '1rem 1.25rem',
                      fontSize: uiConfig.baseFontSize,
                      transition: `all ${
                        uiConfig.animationSpeed === 'slower' ? '0.4s' :
                        uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                      } ease`
                    }}
                  >
                    <div>{transaction.type}</div>
                    <div 
                      style={{
                        fontSize: `calc(${uiConfig.baseFontSize} * 0.75)`,
                        color: theme_config.darkTheme.secondary,
                        transition: `all ${
                          uiConfig.animationSpeed === 'slower' ? '0.4s' :
                          uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                        } ease`
                      }}
                    >
                      {transaction.date}
                    </div>
                  </td>
                  <td 
                    style={{
                      padding: uiConfig.layoutDensity === 'compact' ? '0.75rem 1rem' : 
                              uiConfig.layoutDensity === 'spacious' ? '1.25rem 1.5rem' : '1rem 1.25rem',
                      fontSize: uiConfig.baseFontSize
                    }}
                  >
                    {transaction.form}
                  </td>
                  <td 
                    style={{
                      padding: uiConfig.layoutDensity === 'compact' ? '0.75rem 1rem' : 
                              uiConfig.layoutDensity === 'spacious' ? '1.25rem 1.5rem' : '1rem 1.25rem',
                      fontSize: uiConfig.baseFontSize
                    }}
                  >
                    {transaction.taxPeriod}
                  </td>
                  <td 
                    style={{
                      padding: uiConfig.layoutDensity === 'compact' ? '0.75rem 1rem' : 
                              uiConfig.layoutDensity === 'spacious' ? '1.25rem 1.5rem' : '1rem 1.25rem',
                      fontSize: uiConfig.baseFontSize
                    }}
                  >
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
      <TabsContent value="employment">
        <div 
          className="flex h-[400px] items-center justify-center"
          style={{
            color: theme_config.darkTheme.secondary,
            fontSize: uiConfig.baseFontSize,
            transition: `all ${
              uiConfig.animationSpeed === 'slower' ? '0.4s' :
              uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          No employment transactions found
        </div>
      </TabsContent>
    </Tabs>
  );
}
