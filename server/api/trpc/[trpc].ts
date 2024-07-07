/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */

import { createNuxtApiHandler } from "@colonel-sandvich/trpc-vue-query";
import { createTRPCContext } from "~~/server/trpc/context";
import { appRouter } from '~~/server/trpc/routers';

export default createNuxtApiHandler({
  router: appRouter,
  createContext: createTRPCContext
});