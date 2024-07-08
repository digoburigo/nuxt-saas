<script setup lang="ts">
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Entrar
        </CardTitle>
        <CardDescription>
          Entre com seu email abaixo para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <AuthLoginForm />
          <div class="flex justify-end">
            <Button as-child variant="link">
              <NuxtLink to="/auth/forgot-password">
                Esqueceu a senha?
              </NuxtLink>
            </Button>
          </div>
          <Separator />
          <Button variant="outline" class="w-full">
            Entrar com Google
          </Button>
        </div>
        <div class="mt-8 text-center text-sm">
          <p> Ainda não tem uma conta?</p>
          <Button as-child variant="link">
            <NuxtLink to="/auth/signup">
              Cadastre-se aqui
            </NuxtLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>