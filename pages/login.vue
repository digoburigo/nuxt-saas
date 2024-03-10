<script setup lang="ts"></script>

<template>
  <div
    class="container relative grid flex-col items-center justify-center min-h-svh lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div
      class="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex"
    >
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <IconFileSmile class="mr-2" />
        UpDok
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            Economize tempo gerenciando seus documentos com facilidade e
            segurança
          </p>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            {{ $t('login.enter') }}
          </h1>
        </div>
        <AuthLoginForm />

        <p class="px-8 text-sm text-center text-muted-foreground">
          Não possui uma conta?
          <Button asChild variant="link">
            <NuxtLink to="/signup"> Cadastre-se aqui </NuxtLink>
          </Button>
        </p>
      </div>
    </div>
  </div>
</template>
