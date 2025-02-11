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
                <TableRow>
                  <TableCell className="font-medium">
                    Q2 2020
                    <br />
                    <span className="text-sm text-muted-foreground">
                      06/30/20
                    </span>
                  </TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>$350,002.70</TableCell>
                  <TableCell>$350,002.70</TableCell>
                  <TableCell>$40,361.21</TableCell>
                  <TableCell>$2,150.00</TableCell>
                  <TableCell>$368,213.91</TableCell>
                  <TableCell>$350,002.70</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
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
                <TableRow>
                  <TableCell className="font-medium">
                    Q2 2020
                    <br />
                    <span className="text-sm text-muted-foreground">
                      06/30/20
                    </span>
                  </TableCell>
                  <TableCell>May 30, 2023</TableCell>
                  <TableCell>May 30, 2023</TableCell>
                  <TableCell>Sep 23, 2024</TableCell>
                  <TableCell>Sep 23, 2024</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>
    </div>
  );
}
