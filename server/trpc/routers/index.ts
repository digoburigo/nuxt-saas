import { authRouter } from "./auth";
import { mergeTRPCRouters, publicProcedure, router } from "../trpc";
import { createRouter } from "~~/server/trpc/routers/generated/routers";

export const generatedRouter = createRouter(router, publicProcedure);

export const customRouter = router({
  auth: authRouter,
});

export const appRouter = mergeTRPCRouters(customRouter, generatedRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

