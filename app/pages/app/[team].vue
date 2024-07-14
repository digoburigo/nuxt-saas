<script setup lang="ts">
// definePageMeta({
//   middleware: ["protected"],
// });

const route = useRoute("app-team___pt-BR");
</script>

<template>
  <div>
    <p>{{ route.params.team }}</p>
  </div>
</template>
