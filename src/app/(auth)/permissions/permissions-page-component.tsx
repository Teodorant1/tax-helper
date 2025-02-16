"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { db } from "~/server/db";
import { actual_user } from "~/server/db/schema";
import type { CompleteThemeConfig, CompleteUIConfig } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

export default  function PermissionsPage_component({ theme_config, uiConfig }: ThemeConfigProps) {

    const allUsers = api.test.getAllUsers.useQuery();
  


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
    <div className="container mx-auto py-6">
      <Card style={{ borderRadius: uiConfig.layoutBorderRadius }}>
        <CardHeader>
          <CardTitle style={{ fontSize: getFontSize(0.15) }}>User Permissions</CardTitle>
        </CardHeader>
        <CardContent className={getPadding()}>
          <Table>
            <TableHeader>
              <TableRow
                style={{
                  backgroundColor: theme_config.lightTheme.secondary + "10"
                }}
              >
                <TableHead style={{ fontSize: getFontSize(0.0875) }}>Name</TableHead>
                <TableHead style={{ fontSize: getFontSize(0.0875) }}>Account Status</TableHead>
                <TableHead style={{ fontSize: getFontSize(0.0875) }}>Access</TableHead>
              </TableRow>
            </TableHeader>
           { allUsers.data && <TableBody>
              {allUsers.data.map((user) => (
                <TableRow 
                  key={user.id}
                  className="transition-colors duration-200"
                  style={{ 
                    "--hover-color": theme_config.lightTheme.primary + "10",
                    ":hover": {
                      backgroundColor: "var(--hover-color)"
                    }
                  } as React.CSSProperties}
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span 
                        className="font-medium"
                        style={{ fontSize: getFontSize(0.0875) }}
                      >
                        {user.username}
                      </span>
                      <span 
                        className="text-muted-foreground"
                        style={{ fontSize: getFontSize(0.075) }}
                      >
                        {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className="inline-flex items-center rounded-md px-2.5 py-1"
                      style={{
                        fontSize: getFontSize(0.075),
                        backgroundColor: user.role === "user"
                          ? theme_config.lightTheme.primary + "15"
                          : theme_config.lightTheme.accent + "15",
                        color: user.role === "user"
                          ? theme_config.lightTheme.primary
                          : theme_config.lightTheme.accent,
                        border: `1px solid ${user.role === "user" 
                          ? theme_config.lightTheme.primary + "30"
                          : theme_config.lightTheme.accent + "30"}`
                      }}
                    >
                      {user.role === "user" ? "Accepted" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span 
                      style={{ 
                        fontSize: getFontSize(0.0875),
                        color: theme_config.lightTheme.secondary,
                        fontWeight: 500
                      }}
                    >
                      {user.role === "admin" ? "Admin" : "Member"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>} 
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
