import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/trpc/routers'
import SuperJSON from "superjson";

export default defineNuxtPlugin(() => {
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client = createTRPCNuxtClient<AppRouter>({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),

    ],
  } as any)

  return {
    provide: {
      client,
    },
  }
})