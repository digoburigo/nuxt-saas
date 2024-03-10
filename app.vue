<script setup lang="ts">
import { provideHooksContext } from './lib/hooks';

// Provide tanstack-query context
// Use an absolute endpoint so server-side fetch works too
provideHooksContext({
  endpoint: 'http://localhost:3000/api/model',
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  font-family: 'Montserrat', sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
</style>
