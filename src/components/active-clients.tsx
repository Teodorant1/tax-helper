"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import {
  Search,
  Filter,
  Building2,
  Bell,
  FileText,
  Mail,
  Phone,
  Clock,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Client, type CompleteUIConfig, type CompleteThemeConfig } from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}

export function ActiveClients({ uiConfig, theme_config }: ThemeConfigProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: allClients = [],
    error,
    isLoading,
  } = api.test.getAllClients.useQuery();

  const cardStyle = {
    borderRadius: uiConfig.layoutBorderRadius,
    fontSize: uiConfig.baseFontSize,
    transition: `all ${uiConfig.animationSpeed === "slower" 
      ? "400ms" 
      : uiConfig.animationSpeed === "faster" 
        ? "100ms" 
        : "200ms"} ease-in-out`,
    background: `linear-gradient(to bottom right, ${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}15, ${theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary}10)`,
    border: `1px solid ${theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent}40`,
    boxShadow: '0 0 10px #00000010'
  };

  if (isLoading) {
    return (
      <Card style={cardStyle}>
        <CardHeader>
          <CardTitle 
            className="text-2xl font-bold"
            style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary }}
          >Active Clients</CardTitle>
          <CardDescription style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}>
            Loading clients...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    console.error("Error loading clients:", error);
    return (
      <Card style={cardStyle}>
        <CardHeader>
          <CardTitle 
            className="text-2xl font-bold"
            style={{ color: theme_config.lightTheme.primary }}
          >Active Clients</CardTitle>
          <CardDescription 
            className="text-red-500"
            style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent }}
          >
            Error loading clients. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const clients = allClients.filter(
    (client: Client) => client.status === "Active",
  );

  return (
    <Card style={cardStyle}>
      <CardHeader className="flex flex-col items-center justify-between md:flex-row md:space-y-0 md:pb-4">
        <div>
          <CardTitle 
            className="text-2xl font-bold"
          style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary }}
          >Active Clients</CardTitle>
          <CardDescription style={{ color: theme_config.lightTheme.secondary }}>
            Manage your active client list
          </CardDescription>
        </div>
        <Button 
          variant="link" 
          className="text-primary" 
          asChild
          style={{ color: theme_config.lightTheme.primary }}
        >
          <Link href="/clients">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6 flex-col md:flex-row">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Name, Tax ID or Last 4 of Tax ID"
            className="pl-9 pr-24"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            style={{
              borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
              transition: `all ${uiConfig.animationSpeed === "slower" 
                ? "400ms" 
                : uiConfig.animationSpeed === "faster" 
                  ? "100ms" 
                  : "200ms"} ease-in-out`
            }}
          />
          <Button
            variant="outline"
            size="sm"
            className="relative right-2 top-2 ml-2"
            style={{
              borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
              transition: `all ${uiConfig.animationSpeed === "slower" 
                ? "400ms" 
                : uiConfig.animationSpeed === "faster" 
                  ? "100ms" 
                  : "200ms"} ease-in-out`
            }}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="divide-y">
          {clients
            .filter(
              (client: Client) =>
                client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.taxId.includes(searchQuery),
            )
            .map((client: Client) => (
              <div
                key={client.id}
                className="flex flex-col items-start justify-between overflow-x-clip whitespace-normal break-words rounded-lg px-4 py-6 transition-colors hover:bg-muted/50 md:flex-row md:border md:border-border"
                style={{
                  borderRadius: uiConfig.layoutBorderRadius,
                  padding: uiConfig.layoutDensity === "compact" 
                    ? "0.75rem" 
                    : uiConfig.layoutDensity === "spacious" 
                      ? "1.5rem" 
                      : "1rem",
                  transition: `all ${uiConfig.animationSpeed === "slower" 
                    ? "400ms" 
                    : uiConfig.animationSpeed === "faster" 
                      ? "100ms" 
                      : "200ms"} ease-in-out`
                }}
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  <div 
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-primary"
                    style={{
                      backgroundColor: `${theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary}10`,
                      color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary,
                      borderRadius: uiConfig.layoutBorderRadius
                    }}
                  >
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-col items-center gap-2 md:flex-row">
                      <div 
                        className="font-medium"
                        style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.primary : theme_config.darkTheme.primary }}
                      >{client.name}</div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          client.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : client.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                        style={{ borderRadius: `calc(${uiConfig.layoutBorderRadius} * 2)` }}
                      >
                        {client.status}
                      </span>
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}
                    >
                      {client.taxId}
                    </div>
                    <div 
                      className="flex flex-wrap gap-4 text-sm"
                      style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}
                    >
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-6 text-xs">
                      <span 
                        className="flex items-center gap-1"
                        style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}
                      >
                        <Clock className="h-3 w-3" />
                        Last Filing: {client.lastFiling}
                      </span>
                      <span 
                        className="flex items-center gap-1"
                        style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.secondary : theme_config.darkTheme.secondary }}
                      >
                        <Calendar className="h-3 w-3" />
                        Next Filing: {client.nextFiling}
                      </span>
                      {client.pendingTasks > 0 && (
                        <span style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent }}>
                          {client.pendingTasks} Pending Tasks
                        </span>
                      )}
                      {client.alertCount > 0 && (
                        <span style={{ color: theme_config.is_light_theme ? theme_config.lightTheme.accent : theme_config.darkTheme.accent }}>
                          {client.alertCount} Alerts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 md:mt-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                    style={{
                      borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                      transition: `all ${uiConfig.animationSpeed === "slower" 
                        ? "400ms" 
                        : uiConfig.animationSpeed === "faster" 
                          ? "100ms" 
                          : "200ms"} ease-in-out`
                    }}
                  >
                    <Link href={`/data?clientId=${client.id}`}>
                      <Search className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                    style={{
                      borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                      transition: `all ${uiConfig.animationSpeed === "slower" 
                        ? "400ms" 
                        : uiConfig.animationSpeed === "faster" 
                          ? "100ms" 
                          : "200ms"} ease-in-out`
                    }}
                  >
                    <Link href={`/alerts?clientId=${client.id}`}>
                      <Bell className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                    style={{
                      borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                      transition: `all ${uiConfig.animationSpeed === "slower" 
                        ? "400ms" 
                        : uiConfig.animationSpeed === "faster" 
                          ? "100ms" 
                          : "200ms"} ease-in-out`
                    }}
                  >
                    <Link href={`/documents?clientId=${client.id}`}>
                      <FileText className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    style={{
                      borderRadius: `calc(${uiConfig.layoutBorderRadius} * 0.75)`,
                      transition: `all ${uiConfig.animationSpeed === "slower" 
                        ? "400ms" 
                        : uiConfig.animationSpeed === "faster" 
                          ? "100ms" 
                          : "200ms"} ease-in-out`
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
