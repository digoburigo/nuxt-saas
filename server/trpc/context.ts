import type { inferAsyncReturnType } from "@trpc/server";
import type { H3Event } from "h3";

import { enhance } from "@zenstackhq/runtime";
import { prisma as db } from "~~/server/prisma";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = (event: H3Event) => {
  const prisma = enhance(db, {
    user: event.context.user?.id ? { id: event.context.user?.id } : undefined,
  });

  return {
    event,
    prisma,
    db,
  };
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
