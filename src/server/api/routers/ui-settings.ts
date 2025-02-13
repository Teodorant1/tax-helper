import { z } from "zod";
import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { uiConfigs } from "~/server/db/schema";
import { defaultUIConfig } from "~/lib/defaults";

// Zod schema for UI config validation
const uiConfigSchema = z.object({
  sidebarTitle: z.string(),
  sidebarLogoId: z.string().nullable(),
  greetingTitle: z.string(),
  greetingSubtitle: z.string(),
  greetingLogoId: z.string().nullable(),
  layoutBorderRadius: z.string(),
  layoutDensity: z.enum(["comfortable", "compact", "spacious"]),
  sidebarWidth: z.number(),
  baseFontSize: z.string(),
  animationSpeed: z.enum(["slower", "default", "faster"]),
});

export const uiSettingsRouter = createTRPCRouter({
  // Get settings (public - returns defaults if not logged in)
  getSettings: publicProcedure.query(async ({ ctx }) => {
    // If no session/user, return default settings
    if (!ctx.session?.userId) {
      return defaultUIConfig;
    }

    // Get user's settings from DB or return defaults
    const settings = await ctx.db.query.uiConfigs.findFirst({
      where: eq(uiConfigs.userId, ctx.session.userId),
    });

    return settings ?? defaultUIConfig;
  }),

  // Update settings (protected - requires auth)
  updateSettings: protectedProcedure
    .input(uiConfigSchema)
    .mutation(async ({ ctx, input }) => {
      // First try to find existing settings
      const existing = await ctx.db.query.uiConfigs.findFirst({
        where: eq(uiConfigs.userId, ctx.session.userId ?? ""),
      });

      if (existing) {
        // Update existing settings
        return await ctx.db
          .update(uiConfigs)
          .set({
            ...input,
            userId: ctx.session.userId ?? "",
          })
          .where(eq(uiConfigs.userId, ctx.session.userId ?? ""));
      } else {
        // Create new settings
        return await ctx.db.insert(uiConfigs).values({
          ...input,
          userId: ctx.session.userId ?? "",
          id: crypto.randomUUID(),
        });
      }
    }),

  // Reset settings (protected - requires auth)
  resetSettings: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db
      .delete(uiConfigs)
      .where(eq(uiConfigs.userId, ctx.session.userId ?? ""));
  }),
});
