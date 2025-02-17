"use client";

import { useSearchParams, notFound } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Copy, Trash2 } from "lucide-react";
import type { CompleteThemeConfig , CompleteUIConfig} from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}
export default function DocumentsPage_component({ theme_config, uiConfig }: ThemeConfigProps) {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  // Compute padding based on layout density
  const getPadding = () => {
    switch (uiConfig.layoutDensity) {
      case "compact": return "px-2 py-2";
      case "spacious": return "px-6 py-6";
      default: return "px-4 py-4"; // comfortable
    }
  };

  const { data: documents = [], isSuccess } = clientId
    ? api.test.getDocumentsByClient.useQuery({ clientId })
    : api.test.getAllDocuments.useQuery();

  // Trigger the custom not-found page if we have a clientId but no documents were found
  if (isSuccess && clientId && documents.length === 0) {
    notFound();
  }

  // Compute font size scale based on base font size
  const getFontSize = (scale: number) => {
    const baseSizeNum = parseFloat(uiConfig.baseFontSize);
    return `${baseSizeNum * scale}rem`;
  };

  return (
    <div className="container mx-auto py-6">
      <Card style={{ borderRadius: uiConfig.layoutBorderRadius }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle style={{ fontSize: getFontSize(1.5) }}>Transcripts</CardTitle>
            <p style={{ fontSize: getFontSize(0.875) }} className="text-muted-foreground">
              A list of all the transcripts requested by you.
            </p>
          </div>
          <Button 
            className="gap-2 hover:opacity-90"
            style={{
              backgroundColor: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary,
              color: "#fff"
            }}
          >
            <span className="hidden sm:inline">Request New Transcript</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left" style={{ fontSize: getFontSize(0.875) }}>
              <thead 
                className="text-muted-foreground"
                style={{ 
                  backgroundColor: (theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary) + "10"
                }}
              >
                <tr>
                  <th className={`whitespace-nowrap ${getPadding()} font-medium`}>
                    Name
                  </th>
                  <th className={`whitespace-nowrap ${getPadding()} font-medium`}>
                    Status
                  </th>
                  <th className={`whitespace-nowrap ${getPadding()} font-medium`}>
                    Type
                  </th>
                  <th className={`whitespace-nowrap ${getPadding()} font-medium`}>
                    Tax Period
                  </th>
                  <th className={`whitespace-nowrap ${getPadding()} font-medium`}>
                    Requested On
                  </th>
                  <th className={`whitespace-nowrap ${getPadding()} font-medium`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {documents.map((doc) => (
                  <tr 
                    key={doc.id} 
                    className="transition-colors duration-200"
                    style={{ 
                      backgroundColor: "transparent",
                      "--hover-color": (theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary) + "10",
                      ":hover": {
                        backgroundColor: "var(--hover-color)"
                      }
                    } as React.CSSProperties}
                  >
                    <td className={`whitespace-nowrap ${getPadding()}`}>{doc.name}</td>
                    <td className={`whitespace-nowrap ${getPadding()}`}>
                      <span
                        className="inline-flex rounded-full px-2 py-1"
                        style={{
                          fontSize: getFontSize(0.75),
                          backgroundColor: doc.status === "Ready" 
                            ? (theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary) + "20"
                            : (theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent) + "20",
                          color: doc.status === "Ready"
                            ? (theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary)
                            : (theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent)
                        }}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className={`whitespace-nowrap ${getPadding()}`}>{doc.type}</td>
                    <td className={`whitespace-nowrap ${getPadding()}`}>
                      {doc.taxPeriod}
                    </td>
                    <td className={`whitespace-nowrap ${getPadding()}`}>
                      {doc.requestedOn}
                    </td>
                    <td className={`whitespace-nowrap ${getPadding()}`}>
                      <div className="flex items-center gap-2">
                        {doc.status === "Ready" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 transition-colors duration-200"
                            title="Copy/View"
                            style={{
                              "--hover-color": (theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary) + "10",
                              ":hover": {
                                backgroundColor: "var(--hover-color)"
                              }
                            } as React.CSSProperties}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 transition-colors duration-200"
                          title="Delete"
                          style={{
                            "--hover-color": (theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent) + "10",
                            ":hover": {
                              backgroundColor: "var(--hover-color)"
                            }
                          } as React.CSSProperties}
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
          <div className="mt-4 flex items-center justify-between px-4" style={{ fontSize: getFontSize(0.875) }}>
            <div className="text-muted-foreground">Showing 1 to 10 of 40 results</div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled
                style={{
                  borderColor: (theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary) + "40",
                  color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary
                }}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="transition-colors duration-200"
                style={{
                  borderColor: (theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary) + "40",
                  color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary,
                  "--hover-color": (theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary) + "10",
                  ":hover": {
                    backgroundColor: "var(--hover-color)"
                  }
                } as React.CSSProperties}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
