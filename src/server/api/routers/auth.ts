import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { actual_user } from "~/server/db/schema";
import {
  updateUserRole,
  generateMockDataForUser,
} from "~/RandomFunctions/functions1";
import { eq } from "drizzle-orm";

export const authRouter = createTRPCRouter({
  get_user: protectedProcedure.query(async ({ input, ctx }) => {
    const user = await ctx.db.query.actual_user.findFirst({
      where: eq(actual_user.userId, ctx.session.userId ?? " "),
    });

    console.log("get_user", user);

    return {
      user,
    };
  }),

  create_user_entity: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newuser_result = await ctx.db
        .insert(actual_user)
        .values({
          role: input.role,
          email: input.email,
          username: input.username,
          userId: ctx.session.userId ?? " ",
        })
        .returning();

      await generateMockDataForUser({
        userId: ctx.session.userId ?? " ",
        userID: ctx.session.userId ?? " ",
        clientCount: 5,
        alertsPerClient: 3,
        transactionsPerClient: 5,
        documentsPerClient: 3,
        taxHistoryPerClient: 4,
        ercTransactionsPerClient: 2,
      });

      console.log("newuser_result", newuser_result);
      return { newuser_result };
    }),
  toggle_user_role: protectedProcedure
    .input(z.object({ role: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const updated_user_with_new_role = await ctx.db
        .update(actual_user)
        .set({
          role: input.role,
        })
        .where(eq(actual_user.userId, ctx.session.userId ?? ""));

      return { updated_user_with_new_role };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
