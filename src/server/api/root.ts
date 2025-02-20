import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { testRouter } from "./routers/testing";
import { authRouter } from "./routers/auth";
import { uiSettingsRouter } from "./routers/ui-settings";
import { themeRouter } from "./routers/theme";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  test: testRouter,
  auth: authRouter,
  uiSettings: uiSettingsRouter,
  theme: themeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
