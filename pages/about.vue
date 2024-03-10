<script setup lang="ts">
definePageMeta({
  middleware: ['protected'],
});

const user = useAuthenticatedUser();

async function logout() {
  await $fetch('/api/logout', {
    method: 'POST',
  });
  await navigateTo('/login');
}
</script>

<template>
  <p>about</p>
  <h1>Hi, {{ user.email }}!</h1>
  <p>Your user ID is {{ user.id }}.</p>
  <form @submit.prevent="logout">
    <button>Sign out</button>
  </form>
</template>

<style></style>
