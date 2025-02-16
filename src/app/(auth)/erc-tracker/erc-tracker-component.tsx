"use client";

import { api } from "~/trpc/react";
import { Card } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { ErcTransaction, ErcEvent, CompleteThemeConfig, CompleteUIConfig } from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

export default function ERCTrackerPage_component({ theme_config, uiConfig }: ThemeConfigProps) {
  const { data: transactions = [] } = api.test.getAllErcTransactions.useQuery();
  const { data: events = [] } = api.test.getAllErcEvents.useQuery();

  // Compute font size scale based on base font size
  const getFontSize = (scale: number) => {
    const baseSizeNum = parseFloat(uiConfig.baseFontSize);
    return `${baseSizeNum * scale}rem`;
  };

  // Compute padding based on layout density
  const getPadding = () => {
    switch (uiConfig.layoutDensity) {
      case "compact": return "p-2";
      case "spacious": return "p-6";
      default: return "p-4"; // comfortable
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 
        className="mb-4 font-bold" 
        style={{ 
          fontSize: getFontSize(0.09375),
          color: theme_config.lightTheme.primary
        }}
      >
        ERC Tracker
      </h1>
      <p 
        className="mb-6"
        style={{ 
          fontSize: getFontSize(0.0625),
          color: theme_config.lightTheme.accent
        }}
      >
        A summary of your ERC activity
      </p>

      <div className="space-y-8">
        {/* Transactions Section */}
        <section>
          <h2 
            className="mb-4 font-semibold" 
            style={{ 
              fontSize: getFontSize(0.078125),
              color: theme_config.lightTheme.secondary
            }}
          >
            Transactions
          </h2>
          <Card 
            className={getPadding()}
            style={{ 
              borderRadius: uiConfig.layoutBorderRadius,
              borderColor: theme_config.lightTheme.primary + "30",
              background: `linear-gradient(to bottom right, ${theme_config.lightTheme.primary}05, ${theme_config.lightTheme.secondary}05)`,
              boxShadow: `0 4px 6px -1px ${theme_config.lightTheme.primary}10`
            }}
          >
            <Table>
              <TableHeader>
                <TableRow
                  style={{
                    backgroundColor: theme_config.lightTheme.secondary + "20",
                    borderBottom: `1px solid ${theme_config.lightTheme.primary}20`
                  }}
                >
                  <TableHead className="w-[150px]" style={{ fontSize: getFontSize(0.0546875) }}>IRS Tracking</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Filed</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Client Entered ERC Claim</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Amount of Approved ERC</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Interest Accrued on ERC</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Adjustments</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Total Refund Processed</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Total ERC Pending</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id}
                    className="transition-colors duration-200"
                    style={{ 
                      "--hover-color": theme_config.lightTheme.primary + "15",
                      borderBottom: `1px solid ${theme_config.lightTheme.primary}10`,
                      ":hover": {
                        backgroundColor: "var(--hover-color)"
                      }
                    } as React.CSSProperties}
                  >
                    <TableCell 
                      className="font-medium"
                      style={{ fontSize: getFontSize(0.0546875) }}
                    >
                      {transaction.irsTracking.split(" ")[0]}
                      <br />
                      <span 
                        className="text-muted-foreground"
                        style={{ fontSize: getFontSize(0.046875) }}
                      >
                        {transaction.irsTracking.split(" ").slice(1).join(" ")}
                      </span>
                    </TableCell>
                    <TableCell style={{ fontSize: getFontSize(0.0546875) }}>
                      <span
                        style={{
                          color: transaction.filed 
                            ? theme_config.lightTheme.primary 
                            : theme_config.lightTheme.accent
                        }}
                      >
                        {transaction.filed ? "✓" : "✗"}
                      </span>
                    </TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.secondary
                    }}>{transaction.clientEnteredErcClaim}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.primary
                    }}>{transaction.approvedErcAmount}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.accent
                    }}>{transaction.interestAccrued}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875)
                    }}>{transaction.adjustments}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.primary
                    }}>{transaction.totalRefundProcessed}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.secondary
                    }}>{transaction.totalErcPending}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Events Section */}
        <section>
          <h2 
            className="mb-4 font-semibold"
            style={{ 
              fontSize: getFontSize(0.078125),
              color: theme_config.lightTheme.secondary
            }}
          >
            Events
          </h2>
          <Card 
            className={getPadding()}
            style={{ 
              borderRadius: uiConfig.layoutBorderRadius,
              borderColor: theme_config.lightTheme.primary + "30",
              background: `linear-gradient(to bottom right, ${theme_config.lightTheme.primary}05, ${theme_config.lightTheme.secondary}05)`,
              boxShadow: `0 4px 6px -1px ${theme_config.lightTheme.primary}10`
            }}
          >
            <Table>
              <TableHeader>
                <TableRow
                  style={{
                    backgroundColor: theme_config.lightTheme.secondary + "20",
                    borderBottom: `1px solid ${theme_config.lightTheme.primary}20`
                  }}
                >
                  <TableHead className="w-[150px]" style={{ fontSize: getFontSize(0.0546875) }}>IRS Tracking</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Date Form 941-X Received</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Date Form 941-X Forward for Processing</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Date Refund Approved</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Date Refund Paid</TableHead>
                  <TableHead style={{ fontSize: getFontSize(0.0546875) }}>Examination Indicator</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow 
                    key={event.id}
                    className="transition-colors duration-200"
                    style={{ 
                      "--hover-color": theme_config.lightTheme.primary + "10",
                      ":hover": {
                        backgroundColor: "var(--hover-color)"
                      }
                    } as React.CSSProperties}
                  >
                    <TableCell 
                      className="font-medium"
                      style={{ fontSize: getFontSize(0.0546875) }}
                    >
                      {event.irsTracking.split(" ")[0]}
                      <br />
                      <span 
                        className="text-muted-foreground"
                        style={{ fontSize: getFontSize(0.046875) }}
                      >
                        {event.irsTracking.split(" ").slice(1).join(" ")}
                      </span>
                    </TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.secondary
                    }}>{event.form941xReceivedDate}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.primary
                    }}>{event.form941xForwardDate}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.accent
                    }}>{event.refundApprovedDate}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.primary
                    }}>{event.refundPaidDate}</TableCell>
                    <TableCell style={{ 
                      fontSize: getFontSize(0.0546875),
                      color: theme_config.lightTheme.secondary
                    }}>{event.examinationIndicator}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>
    </div>
  );
}
