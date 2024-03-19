<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">
      {{ $t('login.enter') }}
    </h1>
  </div>
  <AuthLoginForm />

  <div class="flex justify-end">
    <Button asChild variant="link">
      <NuxtLink to="/forgot-password"> Esqueceu a senha? </NuxtLink>
    </Button>
  </div>

  <p class="px-8 text-sm text-center text-muted-foreground">
    Não possui uma conta?
    <Button asChild variant="link">
      <NuxtLink to="/signup"> Cadastre-se aqui </NuxtLink>
    </Button>
  </p>
</template>
