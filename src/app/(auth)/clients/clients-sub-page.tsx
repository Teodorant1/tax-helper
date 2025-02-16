"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import {
  Search,
  Filter,
  Building2,
  Bell,
  FileText,
  ArrowLeft,
  Calendar,
  Download,
  Mail,
  Phone,
  Clock,
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
import { type Client, type CompleteThemeConfig, type CompleteUIConfig } from "~/server/db/schema";

interface ClientsSubPageProps {
  theme_config: CompleteThemeConfig;
  ui_config: CompleteUIConfig;
}

export function ClientsSubPage({ theme_config, ui_config }: ClientsSubPageProps) {
  const { data: clients = [], isLoading } = api.test.getAllClients.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Active" | "Pending" | "Inactive"
  >("all");

  const activeCount = clients.filter((client: Client) => client.status === "Active").length;
  const pendingCount = clients.filter((client: Client) => client.status === "Pending").length;
  const inactiveCount = clients.filter((client: Client) => client.status === "Inactive").length;

  const filteredClients = clients.filter((client: Client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.taxId.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Compute animation duration based on speed setting
  const getTransitionDuration = () => {
    switch (ui_config.animationSpeed) {
      case 'slower': return '0.4s';
      case 'faster': return '0.15s';
      default: return '0.25s';
    }
  };

  // Compute padding based on density
  const getPadding = () => {
    switch (ui_config.layoutDensity) {
      case 'compact': return '1rem';
      case 'spacious': return '2rem';
      default: return '1.5rem';
    }
  };

  return (
    <div 
      className="md:container md:mx-auto"
      style={{
        padding: getPadding(),
        transition: `all ${getTransitionDuration()} ease`
      }}
    >
      <div style={{ marginBottom: getPadding() }}>
        <Link
          href="/"
          className="inline-flex items-center hover:text-primary"
          style={{
            fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
            color: theme_config.lightTheme.secondary,
            transition: `all ${getTransitionDuration()} ease`
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      <div style={{ marginBottom: `calc(${getPadding()} * 1.5)` }}>
        <h1 
          className="font-bold"
          style={{ 
            fontSize: `calc(${ui_config.baseFontSize} * 2)`,
            color: theme_config.lightTheme.primary
          }}
        >
          Client Management
          <span style={{ 
            marginLeft: '1rem',
            color: theme_config.lightTheme.primary
          }}>
            {activeCount} Active
          </span>
          <span style={{ 
            marginLeft: '0.5rem',
            color: theme_config.lightTheme.secondary
          }}>
            {pendingCount} Pending
          </span>
          <span style={{ 
            marginLeft: '0.5rem',
            color: theme_config.lightTheme.accent
          }}>
            {inactiveCount} Inactive
          </span>
        </h1>
        <p 
          style={{ 
            marginTop: '0.5rem',
            fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
            color: theme_config.lightTheme.secondary
          }}
        >
          Comprehensive view of all clients and their current status
        </p>
      </div>
      <Card style={{ borderRadius: ui_config.layoutBorderRadius }}>
        <CardHeader>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="space-x-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                style={{
                  borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                  transition: `all ${getTransitionDuration()} ease`
                }}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "Active" ? "default" : "outline"}
                onClick={() => setStatusFilter("Active")}
                style={{
                  color: theme_config.lightTheme.primary,
                  borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                  transition: `all ${getTransitionDuration()} ease`
                }}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "Pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("Pending")}
                style={{
                  color: theme_config.lightTheme.secondary,
                  borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                  transition: `all ${getTransitionDuration()} ease`
                }}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "Inactive" ? "default" : "outline"}
                onClick={() => setStatusFilter("Inactive")}
                style={{
                  color: theme_config.lightTheme.accent,
                  borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                  transition: `all ${getTransitionDuration()} ease`
                }}
              >
                Inactive
              </Button>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Button 
                variant="outline" 
                className="gap-2 transition-colors duration-200"
                style={{
                  borderRadius: ui_config.layoutBorderRadius,
                  borderColor: theme_config.lightTheme.primary + "30",
                  "--hover-color": theme_config.lightTheme.primary + "10",
                  ":hover": {
                    backgroundColor: "var(--hover-color)"
                  }
                } as React.CSSProperties}
              >
                <Calendar className="h-4 w-4" />
                Filing Calendar
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 transition-colors duration-200"
                style={{
                  borderRadius: ui_config.layoutBorderRadius,
                  borderColor: theme_config.lightTheme.primary + "30",
                  "--hover-color": theme_config.lightTheme.primary + "10",
                  ":hover": {
                    backgroundColor: "var(--hover-color)"
                  }
                } as React.CSSProperties}
              >
                <Calendar className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search 
              className="absolute left-3 top-3 h-4 w-4" 
              style={{ color: theme_config.lightTheme.secondary }}
            />
            <Input
              placeholder="Search by Name, Tax ID, or Email"
              className="pl-9 pr-24"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                fontSize: ui_config.baseFontSize,
                borderColor: theme_config.lightTheme.primary + "20",
                transition: `all ${getTransitionDuration()} ease`
              }}
            />
            <Button
              variant="outline"
              size="sm"
              className="relative right-2 top-2 gap-2"
              style={{
                borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                borderColor: theme_config.lightTheme.primary + "30",
                transition: `all ${getTransitionDuration()} ease`
              }}
            >
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
          <div className="divide-y">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-start justify-between overflow-x-clip whitespace-normal break-words rounded-lg px-4 py-6 transition-colors md:flex-row md:border md:border-border"
                style={{
                  borderRadius: ui_config.layoutBorderRadius,
                  borderColor: theme_config.lightTheme.primary + "20",
                  "--hover-color": theme_config.lightTheme.primary + "10",
                  ":hover": {
                    backgroundColor: "var(--hover-color)"
                  }
                } as React.CSSProperties}
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  <div 
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: theme_config.lightTheme.primary + "15",
                      color: theme_config.lightTheme.primary
                    }}
                  >
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-col items-center gap-2 md:flex-row">
                      <div 
                        className="font-medium"
                        style={{ 
                          fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
                          color: theme_config.lightTheme.primary 
                        }}
                      >
                        {client.name}
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: client.status === "Active"
                            ? theme_config.lightTheme.primary + "15"
                            : client.status === "Pending"
                              ? theme_config.lightTheme.secondary + "15"
                              : theme_config.lightTheme.accent + "15",
                          color: client.status === "Active"
                            ? theme_config.lightTheme.primary
                            : client.status === "Pending"
                              ? theme_config.lightTheme.secondary
                              : theme_config.lightTheme.accent
                        }}
                      >
                        {client.status}
                      </span>
                    </div>
                    <div 
                      style={{ 
                        fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
                        color: theme_config.lightTheme.secondary 
                      }}
                    >
                      {client.taxId}
                    </div>
                    <div 
                      className="flex flex-wrap gap-4"
                      style={{ 
                        fontSize: `calc(${ui_config.baseFontSize} * 0.875)`,
                        color: theme_config.lightTheme.secondary 
                      }}
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
                    <div 
                      className="mt-2 flex flex-wrap gap-6"
                      style={{ 
                        fontSize: `calc(${ui_config.baseFontSize} * 0.75)`,
                        color: theme_config.lightTheme.secondary 
                      }}
                    >
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last Filing: {client.lastFiling}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Next Filing: {client.nextFiling}
                      </span>
                      {client.pendingTasks > 0 && (
                        <span style={{ color: theme_config.lightTheme.secondary }}>
                          {client.pendingTasks} Pending Tasks
                        </span>
                      )}
                      {client.alertCount > 0 && (
                        <span style={{ color: theme_config.lightTheme.accent }}>
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
                    className="h-8 w-8 transition-colors duration-200"
                    style={{
                      borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                      "--hover-color": theme_config.lightTheme.primary + "10",
                      ":hover": {
                        backgroundColor: "var(--hover-color)"
                      }
                    } as React.CSSProperties}
                    asChild
                  >
                    <Link href={`/data?clientId=${client.id}`}>
                      <Search className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 transition-colors duration-200"
                    style={{
                      borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                      "--hover-color": theme_config.lightTheme.primary + "10",
                      ":hover": {
                        backgroundColor: "var(--hover-color)"
                      }
                    } as React.CSSProperties}
                    asChild
                  >
                    <Link href={`/alerts?clientId=${client.id}`}>
                      <Bell className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 transition-colors duration-200"
                    style={{
                      borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                      "--hover-color": theme_config.lightTheme.primary + "10",
                      ":hover": {
                        backgroundColor: "var(--hover-color)"
                      }
                    } as React.CSSProperties}
                    asChild
                  >
                    <Link href={`/documents?clientId=${client.id}`}>
                      <FileText className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 transition-colors duration-200"
                    style={{
                      borderRadius: `calc(${ui_config.layoutBorderRadius} * 0.75)`,
                      "--hover-color": theme_config.lightTheme.primary + "10",
                      ":hover": {
                        backgroundColor: "var(--hover-color)"
                      }
                    } as React.CSSProperties}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
