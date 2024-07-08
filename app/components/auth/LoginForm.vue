<script lang="ts" setup>
  import * as z from 'zod';

  const router = useRouter();

  const api = useApi();

  const validationSchema = toTypedSchema(
    z.object({
      email: z
        .string({
          required_error: 'Email é obrigatório.',
        })
        .email({ message: 'Email inválido' }),
      password: z
        .string({
          required_error: 'Senha é obrigatória.',
        })
        .min(8, { message: 'A senha precisa de pelo menos 8 caracteres' }),
    })
  );

  const { handleSubmit, errors } = useForm({
    validationSchema,
  });

  const { mutate: loginUser, isPending, error  } = api.auth.login.useMutation({
    onSuccess: () => {
      router.push('/app');
    },
  });

  const onSubmit = handleSubmit(({ email, password }) => {
      loginUser({
        email,
        password,
      });
  });
</script>

<template>
  <!-- <form method="post" action="/api/auth/login" @submit="onSubmit" class="flex flex-col gap-4"> -->
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel> {{ $t('login.form.email') }}</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel> {{ $t('login.form.password') }}</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" required />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button :disabled="isPending || errors.email || errors.password" type="submit">
      <Icon v-if="isPending" class="w-4 h-4 mr-2 animate-spin" aria-hidden="true" name="uil:fidget-spinner" />
      {{ $t('login.form.confirm') }}
    </Button>
    <Alert v-if="error" variant="destructive">
      <AlertDescription>
        {{ error }}
      </AlertDescription>
    </Alert>
  </form>
</template>
