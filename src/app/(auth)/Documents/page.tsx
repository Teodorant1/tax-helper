"use client";

import { useState } from "react";
import { useSearchParams, notFound } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Copy, Trash2 } from "lucide-react";

import { type Document } from "~/server/db/schema";

export default function DocumentsPage() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  const { data: documents = [], isSuccess } = clientId
    ? api.test.getDocumentsByClient.useQuery({ clientId })
    : api.test.getAllDocuments.useQuery();

  // Trigger the custom not-found page if we have a clientId but no documents were found
  if (isSuccess && clientId && documents.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">Transcripts</CardTitle>
            <p className="text-sm text-muted-foreground">
              A list of all the transcripts requested by you.
            </p>
          </div>
          <Button className="gap-2">
            <span className="hidden sm:inline">Request New Transcript</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">
                    Type
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">
                    Tax Period
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">
                    Requested On
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-4">{doc.name}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          doc.status === "Ready"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">{doc.type}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                      {doc.taxPeriod}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      {doc.requestedOn}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center gap-2">
                        {doc.status === "Ready" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Copy/View"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between px-4 text-sm text-muted-foreground">
            <div>Showing 1 to 10 of 40 results</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
