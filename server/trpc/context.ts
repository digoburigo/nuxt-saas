import type { inferAsyncReturnType } from '@trpc/server'
import { enhance } from '@zenstackhq/runtime';
import type { H3Event } from 'h3'
import { prisma } from '~~/server/prisma';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = (event: H3Event) => {
  const dbUser = enhance(prisma, {
    user: event.context.user?.id ? { id: event.context.user?.id } : undefined,
  });

  return {
    event,
    dbUser,
    dbAdmin: prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createTRPCContext>;