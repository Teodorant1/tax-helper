"use client";

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

export default function TaxHistoryPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Year over Year Data</h1>
      <p className="mb-6 text-muted-foreground">
        A summary of your year over year data
      </p>

      <Tabs defaultValue="income" className="w-full">
        <TabsList>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <Card className="p-4">
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
                <TableRow>
                  <TableCell>2022</TableCell>
                  <TableCell>Original</TableCell>
                  <TableCell>$2,746.25</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell className="text-green-600">($2,746.25)</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2021</TableCell>
                  <TableCell>Original</TableCell>
                  <TableCell>$145,855.36</TableCell>
                  <TableCell>($17,977.99)</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell className="text-green-600">
                    ($290,503.43)
                  </TableCell>
                  <TableCell>$162,626.06</TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2020</TableCell>
                  <TableCell>Original</TableCell>
                  <TableCell>$713,169.00</TableCell>
                  <TableCell>($40,361.21)</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell className="text-green-600">
                    ($1,041,021.70)
                  </TableCell>
                  <TableCell>$368,213.91</TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell>$861,770.61</TableCell>
                  <TableCell>($58,339.20)</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell className="text-green-600">
                    ($1,334,271.38)
                  </TableCell>
                  <TableCell>$530,839.97</TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card className="p-4">
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
                <TableRow>
                  <TableCell>2024</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>$0.00</TableCell>
                </TableRow>
                {/* Add more years as needed */}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
