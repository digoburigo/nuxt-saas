<script setup lang="ts">
definePageMeta({
  middleware: ['protected'],
  layout: 'dashboard',
});

const user = useAuthenticatedUser();
</script>

<template>
  <p>About</p>
  <h1>Hi, {{ user.email }}!</h1>
  <p>Your user ID is {{ user.id }}.</p>
</template>
