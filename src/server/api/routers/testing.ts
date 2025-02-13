import { z } from "zod";
import { eq, sql } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  actual_user,
  clients,
  alerts,
  transactions,
  taxHistoryEntries,
  ercTransactions,
  ercEvents,
  documents,
  uiConfigs,
  themeConfigs,
  themeColors,
  logos,
} from "~/server/db/schema";
import { updateUserRole } from "~/RandomFunctions/functions1";

export const testRouter = createTRPCRouter({
  // User queries
  getUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.actual_user.findFirst({
        where: eq(actual_user.userId, input.userId),
      });
    }),

  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.actual_user.findMany();
  }),

  // Client queries
  getClient: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.clients.findFirst({
        where: eq(clients.id, input.clientId),
        with: {
          alerts: true,
          transactions: {
            with: {
              client: true,
            },
          },
          taxHistory: true,
          ercTransactions: true,
          documents: true,
        },
      });
    }),

  getAllClients: protectedProcedure.query(async ({ ctx }) => {
    try {
      console.log("getAllClients_auth", ctx.session, ctx.user);
      if (process.env.VERCEL) {
        console.info("[Clients] Fetching all clients", {
          userId: ctx.user?.id ?? "unknown",
          sessionId: ctx.session?.sessionId ?? "unknown",
          timestamp: new Date().toISOString(),
        });
      }

      const clients = await ctx.db.query.clients.findMany({
        with: {
          alerts: true,
          transactions: {
            with: {
              client: true,
            },
          },
        },
      });

      if (process.env.VERCEL) {
        console.info("[Clients] Successfully fetched clients", {
          count: clients.length,
          timestamp: new Date().toISOString(),
          nestedCounts: {
            alerts: clients.reduce((sum, client) => sum + client.alerts.length, 0),
            transactions: clients.reduce((sum, client) => sum + client.transactions.length, 0),
          }
        });
      }

      return clients;
    } catch (error) {
      console.error("[Clients] Failed to fetch clients:", {
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        } : error,
        userId: ctx.user?.id ?? "unknown",
        sessionId: ctx.session?.sessionId ?? "unknown",
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }),

  // Alert queries
  getAlert: protectedProcedure
    .input(z.object({ alertId: z.string() }))
    .query(async ({ ctx, input }) => {
      const the_alerts = await ctx.db.query.alerts.findFirst({
        where: eq(alerts.id, input.alertId),
        with: {
          client: true,
        },
      });

      console.log("the_alerts1", the_alerts);

      return the_alerts;
    }),

  getAllAlerts: protectedProcedure.query(async ({ ctx }) => {
    try {
      console.log("all_alerts_auth", ctx.session, ctx.user);
      if (process.env.VERCEL) {
        console.info("[Alerts] Fetching all alerts", {
          userId: ctx.user?.id ?? "unknown",
          sessionId: ctx.session?.sessionId ?? "unknown",
          timestamp: new Date().toISOString(),
        });
      }

      const all_alerts = await ctx.db.query.alerts.findMany({
        with: {
          client: true,
        },
      });

      if (process.env.VERCEL) {
        console.info("[Alerts] Successfully fetched alerts", {
          count: all_alerts.length,
          timestamp: new Date().toISOString(),
          withClientCount: all_alerts.filter(alert => alert.client !== null).length
        });
      }

      return all_alerts;
    } catch (error) {
      console.error("[Alerts] Failed to fetch alerts:", {
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        } : error,
        userId: ctx.user?.id ?? "unknown",
        sessionId: ctx.session?.sessionId ?? "unknown",
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }),

  getAlertsByClient: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.alerts.findMany({
        where: eq(alerts.clientId, input.clientId),
      });
    }),

  // Transaction queries
  getTransaction: protectedProcedure
    .input(z.object({ transactionId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.transactions.findFirst({
        where: eq(transactions.id, input.transactionId),
        with: {
          client: true,
        },
      });
    }),

  getAllTransactions: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.transactions.findMany({
      with: {
        client: true,
      },
    });
  }),

  getTransactionsByClient: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.transactions.findMany({
        where: eq(transactions.clientId, input.clientId),
        with: {
          client: true,
        },
      });
    }),

  // Tax History queries
  getTaxHistory: protectedProcedure
    .input(z.object({ entryId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.taxHistoryEntries.findFirst({
        where: eq(taxHistoryEntries.id, input.entryId),
        with: {
          client: true,
        },
      });
    }),

  getAllTaxHistory: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.taxHistoryEntries.findMany({
      with: {
        client: true,
      },
    });
  }),

  getTaxHistoryByClient: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.taxHistoryEntries.findMany({
        where: eq(taxHistoryEntries.clientId, input.clientId),
      });
    }),

  // ERC Transaction queries
  getErcTransaction: protectedProcedure
    .input(z.object({ transactionId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.ercTransactions.findFirst({
        where: eq(ercTransactions.id, input.transactionId),
        with: {
          events: true,
          client: true,
        },
      });
    }),

  getAllErcTransactions: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.ercTransactions.findMany({
      with: {
        events: true,
        client: true,
      },
    });
  }),

  getErcTransactionsByClient: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.ercTransactions.findMany({
        where: eq(ercTransactions.clientId, input.clientId),
        with: {
          events: true,
        },
      });
    }),

  // ERC Event queries
  getErcEvent: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.ercEvents.findFirst({
        where: eq(ercEvents.id, input.eventId),
        with: {
          transaction: true,
        },
      });
    }),

  getAllErcEvents: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.ercEvents.findMany({
      with: {
        transaction: true,
      },
    });
  }),

  // Document queries
  getDocument: protectedProcedure
    .input(z.object({ documentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.documents.findFirst({
        where: eq(documents.id, input.documentId),
        with: {
          client: true,
        },
      });
    }),

  getAllDocuments: protectedProcedure.query(async ({ ctx }) => {
    try {
      if (process.env.VERCEL) {
        console.info("[Documents] Fetching all documents", {
          userId: ctx.user?.id ?? "unknown",
          sessionId: ctx.session?.sessionId ?? "unknown",
          timestamp: new Date().toISOString(),
        });
      }

      const documents = await ctx.db.query.documents.findMany({
        with: {
          client: true,
        },
      });

      if (process.env.VERCEL) {
        console.info("[Documents] Successfully fetched documents", {
          count: documents.length,
          timestamp: new Date().toISOString(),
        });
      }

      return documents;
    } catch (error) {
      console.error("[Documents] Failed to fetch documents:", {
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        } : error,
        userId: ctx.user?.id ?? "unknown",
        sessionId: ctx.session?.sessionId ?? "unknown",
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }),

  getDocumentsByClient: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.documents.findMany({
        where: eq(documents.clientId, input.clientId),
      });
    }),

  // UI Config queries
  getUiConfig: protectedProcedure
    .input(z.object({ configId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.uiConfigs.findFirst({
        where: eq(uiConfigs.id, input.configId),
        with: {
          sidebarLogo: true,
          greetingLogo: true,
        },
      });
    }),

  getAllUiConfigs: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.uiConfigs.findMany({
      with: {
        sidebarLogo: true,
        greetingLogo: true,
      },
    });
  }),

  // Theme Config queries
  getThemeConfig: protectedProcedure
    .input(z.object({ configId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.themeConfigs.findFirst({
        where: eq(themeConfigs.id, input.configId),
        with: {
          lightTheme: true,
          darkTheme: true,
        },
      });
    }),

  getAllThemeConfigs: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.themeConfigs.findMany({
      with: {
        lightTheme: true,
        darkTheme: true,
      },
    });
  }),

  // Theme Colors queries
  getThemeColors: protectedProcedure
    .input(z.object({ colorsId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.themeColors.findFirst({
        where: eq(themeColors.id, input.colorsId),
      });
    }),

  getAllThemeColors: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.themeColors.findMany();
  }),

  // Logo queries
  getLogo: protectedProcedure
    .input(z.object({ logoId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.logos.findFirst({
        where: eq(logos.id, input.logoId),
      });
    }),

  getAllLogos: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.logos.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
