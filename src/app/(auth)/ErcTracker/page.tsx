"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ErcTransaction, type ErcEvent } from "~/server/db/schema";

const mockTransactions: ErcTransaction[] = [
  {
    id: crypto.randomUUID(),
    clientId: "1",
    irsTracking: "Q2 2020 06/30/20",
    filed: true,
    clientEnteredErcClaim: "$350,002.70",
    approvedErcAmount: "$350,002.70",
    interestAccrued: "$40,361.21",
    adjustments: "$2,150.00",
    totalRefundProcessed: "$368,213.91",
    totalErcPending: "$350,002.70",
  },
];

const mockEvents: ErcEvent[] = [
  {
    id: crypto.randomUUID(),
    transactionId: mockTransactions[0]!.id,
    irsTracking: "Q2 2020 06/30/20",
    form941xReceivedDate: "May 30, 2023",
    form941xForwardDate: "May 30, 2023",
    refundApprovedDate: "Sep 23, 2024",
    refundPaidDate: "Sep 23, 2024",
    examinationIndicator: "-",
  },
];

export default function ERCTrackerPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">ERC Tracker</h1>
      <p className="mb-6 text-muted-foreground">
        A summary of your ERC activity
      </p>

      <div className="space-y-8">
        {/* Transactions Section */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Transactions</h2>
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">IRS Tracking</TableHead>
                  <TableHead>Filed</TableHead>
                  <TableHead>Client Entered ERC Claim</TableHead>
                  <TableHead>Amount of Approved ERC</TableHead>
                  <TableHead>Interest Accrued on ERC</TableHead>
                  <TableHead>Adjustments</TableHead>
                  <TableHead>Total Refund Processed</TableHead>
                  <TableHead>Total ERC Pending</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.irsTracking.split(" ")[0]}
                      <br />
                      <span className="text-sm text-muted-foreground">
                        {transaction.irsTracking.split(" ").slice(1).join(" ")}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.filed ? "✓" : "✗"}</TableCell>
                    <TableCell>{transaction.clientEnteredErcClaim}</TableCell>
                    <TableCell>{transaction.approvedErcAmount}</TableCell>
                    <TableCell>{transaction.interestAccrued}</TableCell>
                    <TableCell>{transaction.adjustments}</TableCell>
                    <TableCell>{transaction.totalRefundProcessed}</TableCell>
                    <TableCell>{transaction.totalErcPending}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Events Section */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Events</h2>
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">IRS Tracking</TableHead>
                  <TableHead>Date Form 941-X Received</TableHead>
                  <TableHead>Date Form 941-X Forward for Processing</TableHead>
                  <TableHead>Date Refund Approved</TableHead>
                  <TableHead>Date Refund Paid</TableHead>
                  <TableHead>Examination Indicator</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">
                      {event.irsTracking.split(" ")[0]}
                      <br />
                      <span className="text-sm text-muted-foreground">
                        {event.irsTracking.split(" ").slice(1).join(" ")}
                      </span>
                    </TableCell>
                    <TableCell>{event.form941xReceivedDate}</TableCell>
                    <TableCell>{event.form941xForwardDate}</TableCell>
                    <TableCell>{event.refundApprovedDate}</TableCell>
                    <TableCell>{event.refundPaidDate}</TableCell>
                    <TableCell>{event.examinationIndicator}</TableCell>
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
