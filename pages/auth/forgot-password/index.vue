<script setup lang="ts"></script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Esqueceu sua senha? </CardTitle>
        <CardDescription>
          Entre com seu email abaixo para recuperar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForgotPasswordForm />
        <div class="mt-8 text-center text-sm">
          <p class="flex justify-center items-center gap-1">
            Relembrou a senha?
            <Icon name="twemoji:slightly-smiling-face" />
          </p>
          <Button as-child variant="link">
            <NuxtLink to="/auth/login"> Entre aqui </NuxtLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
