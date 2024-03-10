<script setup lang="ts">
import { cn } from '@/lib/utils';
import { buttonVariants } from '~/components/ui/button';
</script>

<template>
  <div
    class="container relative grid flex-col items-center justify-center min-h-svh lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <NuxtLink
      to="/login"
      :class="
        cn(
          buttonVariants({ variant: 'ghost' }),
          'hidden absolute right-4 top-4 md:right-8 md:top-8 sm:block'
        )
      "
    >
      Login
    </NuxtLink>
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
            {{ $t('signup.account.create') }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ $t('signup.account.info') }}
          </p>
        </div>
        <AuthSignupForm />
        <p class="px-8 text-sm text-center text-muted-foreground">
          Ao criar a sua conta, você concorda com os
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            Termos de Serviço
          </a>
          e
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            Políticas de Privacidade
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
