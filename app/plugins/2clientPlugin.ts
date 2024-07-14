import { createTrpcVueClient, customFetchWrapper } from "@colonel-sandvich/trpc-vue-query";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import SuperJSON from "superjson";
import { useQueryClient } from "@tanstack/vue-query";
import type { AppRouter } from "~~/server/trpc/routers";

export default defineNuxtPlugin(() => {
  const headers = useRequestHeaders();
  const { csrf } = useCsrf();

  const trpc = createTRPCProxyClient<AppRouter>({
    transformer: SuperJSON,
    links: [
      loggerLink({
        enabled: opts =>
          (import.meta.env.NODE_ENV === "development"
          && typeof window !== "undefined")
          || (opts.direction === "down" && opts.result instanceof Error),
      }),
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
