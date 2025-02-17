import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { themeColors, themeConfigs } from "~/server/db/schema";

const themeConfigSchema = z.object({
  light: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
  }),
  dark: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
  }),
});

const defaultTheme = {
  id: "default",
  userId: "default",
  is_light_theme: false ,
  lightThemeId: "default-light",
  darkThemeId: "default-dark",
  lightTheme: {
    id: "default-light",
    primary: "#7c3aed",
    secondary: "#6b7280",
    accent: "#f59e0b",
  },
  darkTheme: {
    id: "default-dark",
    primary: "#8b5cf6",
    secondary: "#9ca3af",
    accent: "#fbbf24",
  }
};

export const themeRouter = createTRPCRouter({
  getSettings: publicProcedure.query(async ({ctx}) => {

    if (!ctx.session?.userId) {
      return defaultTheme;
    }

    const user_theme = await db.query.themeConfigs.findFirst({
      where: eq(themeConfigs.userId, ctx.session.userId),
      with: { lightTheme: true, darkTheme: true }
    });

    if (user_theme) {
      console.log("user_theme", user_theme);
      return user_theme;
    }

    // Create new theme with proper relations for new users
    const new_user_default_theme = {
      id: ctx.session.userId,
      userId: ctx.session.userId,
      lightThemeId: `${ctx.session.userId}-light`,
      darkThemeId: `${ctx.session.userId}-dark`,
      lightTheme: {
        id: `${ctx.session.userId}-light`,
        primary: defaultTheme.lightTheme.primary,
        secondary: defaultTheme.lightTheme.secondary,
        accent: defaultTheme.lightTheme.accent
      },
      darkTheme: {
        id: `${ctx.session.userId}-dark`,
        primary: defaultTheme.darkTheme.primary,
        secondary: defaultTheme.darkTheme.secondary,
        accent: defaultTheme.darkTheme.accent
      },
      is_light_theme: false ,
    };
    return new_user_default_theme;
  }),
  toggle_is_light_theme: protectedProcedure
  .mutation(async ({ input, ctx }) => {

  // Fetch the current value using the query API
  const currentConfig = await db.query.themeConfigs.findFirst({
    where:eq(themeConfigs.userId, ctx.session.userId ?? "")
  })

  if (!currentConfig) {
    throw new Error("Theme config not found");
  }

  // Toggle the current value
  const newThemeValue = !currentConfig.is_light_theme;

  // Update the row with the toggled value
  await db
    .update(themeConfigs)
    .set({ is_light_theme: newThemeValue })
    .where(eq( themeConfigs.id , currentConfig.id));

      return { currentConfig};
    }),

  updateSettings: protectedProcedure
    .input(z.object({
      light: z.object({
        primary: z.string(),
        secondary: z.string(),
        accent: z.string(),
      }),
      dark: z.object({
        primary: z.string(),
        secondary: z.string(),
        accent: z.string(),
      }),
    }))
    .mutation(async ({ input, ctx }) => {
      const user_theme_config = await db.query.themeConfigs.findFirst({
        where: eq(themeConfigs.userId, ctx.session.userId ?? ""),
        with: { lightTheme: true, darkTheme: true }
      });

      const updated_colors1 = await ctx.db.update(themeColors).set({
        primary: input.light.primary,
        secondary: input.light.secondary,
        accent: input.light.accent,
      }).where(eq(themeColors.id, user_theme_config?.lightThemeId ?? "")).returning();

      const updated_colors2 = await ctx.db.update(themeColors).set({
        primary: input.dark.primary,
        secondary: input.dark.secondary,
        accent: input.dark.accent,
      }).where(eq(themeColors.id, user_theme_config?.darkThemeId ?? "")).returning();

      return { updated_colors1, updated_colors2 };
    }),
});
