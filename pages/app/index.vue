<script setup lang="ts">
  import { useFindManyToken } from '~/lib/hooks';
  const { data: tokens } = useFindManyToken();

  // se tiver apenas 1 time, redireciona para o time
  // se tiver mais de 1 time, mostra a lista de times
</script>

<template>
  <div>
    <p>Escolher time</p>
    <p>{{ JSON.stringify(tokens) }}</p>
  </div>
</template>
