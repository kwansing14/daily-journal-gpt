import { createTRPCRouter } from "./trpc";
import chatGPTRouter from "./routers/chatGPT";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  chatGPT: chatGPTRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
