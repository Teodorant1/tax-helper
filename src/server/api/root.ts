import { postRouter } from "~/server/api/routers/post";
import { uiConfigRouter } from "./routers/ui-config";
import { client_and_alert_Router } from "./routers/Clients-n-Alerts";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  uiConfig: uiConfigRouter,
  client_and_alert: client_and_alert_Router,
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
