<template>
  <div class="w-screen h-screen flex flex-col justify-center">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">
          Cadastro
        </CardTitle>
        <CardDescription>
          Entre com suas informações para criar uma conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <AuthSignupForm />
          <Separator />
          <Button
            as-child
            variant="outline"
            class="w-full"
          >
            <a href="/login/google">Cadastrar com Google</a>
          </Button>
        </div>
        <div class="mt-8 text-center text-sm">
          <p>Já tem uma conta?</p>
          <Button
            as-child
            variant="link"
          >
            <NuxtLink to="/auth/login">
              Entre aqui
            </NuxtLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
