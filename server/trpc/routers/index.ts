import { createCallerFactory, mergeTRPCRouters, protectedProcedure, router } from "../trpc";
import { authRouter } from "./auth";
import { createRouter } from "~~/server/trpc/routers/generated/routers";

export const generatedRouter = createRouter(router, protectedProcedure);

export const customRouter = router({
  auth: authRouter,
});

export const appRouter = mergeTRPCRouters(customRouter, generatedRouter);

export const createCaller = createCallerFactory(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
