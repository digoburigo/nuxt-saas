import { createTrpcVueClient, customFetchWrapper } from "@colonel-sandvich/trpc-vue-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import type { AppRouter } from "~~/server/trpc/routers";
import { useQueryClient } from "@tanstack/vue-query";

export default defineNuxtPlugin(() => {
  const headers = useRequestHeaders();
  const { csrf } = useCsrf();

  const trpc = createTRPCProxyClient<AppRouter>({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: "/api/trpc",
        headers() {
          // Add CSRF token to request headers
          return { ...headers, "csrf-token": csrf };
        },
        fetch: customFetchWrapper(), // Crucial for SSR
      }),
    ],
  });

  const client = createTrpcVueClient(trpc, useQueryClient());

  return {
    provide: {
      client,
    },
  };
});