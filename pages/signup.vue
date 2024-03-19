<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">
      {{ $t('signup.account.create') }}
    </h1>
    <p class="text-sm text-muted-foreground">
      {{ $t('signup.account.info') }}
    </p>
  </div>
  <AuthSignupForm />
  <p class="px-8 text-sm text-center text-muted-foreground">
    Ao criar a sua conta, você concorda com os
    <NuxtLink
      to="/terms"
      class="underline underline-offset-4 hover:text-primary"
    >
      Termos de Serviço
    </NuxtLink>
    e
    <NuxtLink
      to="/privacy"
      class="underline underline-offset-4 hover:text-primary"
    >
      Políticas de Privacidade
    </NuxtLink>
  </p>
  <Button asChild variant="link">
    <NuxtLink to="/login">Já possui conta?</NuxtLink>
  </Button>
</template>
