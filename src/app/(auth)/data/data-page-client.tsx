"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DataClient } from "./client";
import type { CompleteThemeConfig , CompleteUIConfig} from "~/server/db/schema";

interface ThemeConfigProps {
  theme_config: CompleteThemeConfig;
  uiConfig: CompleteUIConfig;
}


export function DataPageClient({ theme_config, uiConfig }: ThemeConfigProps) {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  const { data: transactions = [] } = clientId
    ? api.test.getTransactionsByClient.useQuery({ clientId })
    : api.test.getAllTransactions.useQuery();

  const { data: client } = clientId
    ? api.test.getClient.useQuery({ clientId })
    : { data: null };

  return (
    <div 
      className="container mx-auto"
      style={{
        padding: uiConfig.layoutDensity === 'compact' ? '1rem 0' : 
                uiConfig.layoutDensity === 'spacious' ? '2rem 0' : '1.5rem 0',
        transition: `all ${
          uiConfig.animationSpeed === 'slower' ? '0.4s' :
          uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
        } ease`
      }}
    >
      <div className="mb-6">
        <Link
          href="/clients"
          className="inline-flex items-center text-sm"
          style={{
            color: theme_config.darkTheme.secondary,
            fontSize: `calc(${uiConfig.baseFontSize} * 0.875)`,
            transition: `all ${
              uiConfig.animationSpeed === 'slower' ? '0.4s' :
              uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
            } ease`
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Link>
      </div>

      <Card
        style={{
          borderRadius: uiConfig.layoutBorderRadius,
          padding: uiConfig.layoutDensity === 'compact' ? '1rem' : 
                  uiConfig.layoutDensity === 'spacious' ? '2rem' : '1.5rem',
          background: `linear-gradient(to bottom right, ${theme_config.lightTheme.primary}05, ${theme_config.lightTheme.secondary}05)`,
          border: `1px solid ${theme_config.lightTheme.primary}15`,
          transition: `all ${
            uiConfig.animationSpeed === 'slower' ? '0.4s' :
            uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
          } ease`
        }}
      >
        <CardHeader
          style={{
            padding: uiConfig.layoutDensity === 'compact' ? '1rem' : 
                    uiConfig.layoutDensity === 'spacious' ? '2rem' : '1.5rem'
          }}
        >
          <CardTitle
            style={{
              fontSize: `calc(${uiConfig.baseFontSize} * 1.5)`,
              color: theme_config.darkTheme.primary,
              transition: `all ${
                uiConfig.animationSpeed === 'slower' ? '0.4s' :
                uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            Transaction History
            {client?.name && (
              <span 
                className="ml-2"
                style={{ 
                  color: theme_config.darkTheme.secondary,
                  transition: `all ${
                    uiConfig.animationSpeed === 'slower' ? '0.4s' :
                    uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
                  } ease`
                }}
              >
                for {client.name}
              </span>
            )}
          </CardTitle>
          <CardDescription
            style={{
              fontSize: `calc(${uiConfig.baseFontSize} * 0.875)`,
              color: theme_config.darkTheme.secondary,
              transition: `all ${
                uiConfig.animationSpeed === 'slower' ? '0.4s' :
                uiConfig.animationSpeed === 'faster' ? '0.15s' : '0.25s'
              } ease`
            }}
          >
            {client?.name
              ? `Recent activity for ${client.name}`
              : "A quick peek into the most recent activity on your tax accounts"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataClient
            clientId={clientId ?? undefined}
            transactions={transactions}
            theme_config={theme_config}
            uiConfig={uiConfig}
          />
        </CardContent>
      </Card>
    </div>
  );
}
