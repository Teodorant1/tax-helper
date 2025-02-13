"use client";

import { api } from "~/trpc/react";
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

export default function ERCTrackerPage() {
  const { data: transactions = [] } = api.test.getAllErcTransactions.useQuery();
  const { data: events = [] } = api.test.getAllErcEvents.useQuery();
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
                {transactions.map((transaction) => (
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
                {events.map((event) => (
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
