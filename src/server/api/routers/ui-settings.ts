import { z } from "zod";
import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { uiConfigs } from "~/server/db/schema";
import { defaultUIConfig as baseDefaultUIConfig } from "~/lib/defaults";

const defaultUIConfig = {
  ...baseDefaultUIConfig,
  id: "default",
  userId: "default",
  sidebarLogo: null,
  greetingLogo: null
};

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

    const defaultUIConfig1 = {
      ...defaultUIConfig,
      sidebarLogo: {
        id: "default-sidebar-logo",
        type: "url" as const,
        value: "https://cdn.prod.website-files.com/65c4ff5034dd0560cb1d9428/65f074c84878cc4fdc075c4b_Logo%403x.png"
      },
      greetingLogo: {
        id: "default-greeting-logo",
        type: "url" as const,
        value: "https://cdn.prod.website-files.com/65c4ff5034dd0560cb1d9428/65f074c84878cc4fdc075c4b_Logo%403x.png"
      }
    };

    if (!ctx.session?.userId) {
      return defaultUIConfig1;
    }

    // Get user's settings from DB or return defaults
    const settings = await ctx.db.query.uiConfigs.findFirst({
      where: eq(uiConfigs.userId, ctx.session.userId),
      with: {sidebarLogo:true , greetingLogo:true}
    });


console.log("settings" , settings)

    return settings ?? {
      ...defaultUIConfig1,
      id: crypto.randomUUID(),
      userId: ctx.session.userId
    };
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
