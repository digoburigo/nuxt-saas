<script setup lang="ts">
  import * as z from 'zod';

  const router = useRouter();
  
  const api = useApi();

  const validationSchema = toTypedSchema(
    z.object({
      firstName: z.string({ required_error: 'Nome é obrigatório' }),
      lastName: z.string(),
      email: z
        .string({ required_error: 'Email é obrigatório' })
        .email({ message: 'Email inválido' }),
      password: z
        .string({ required_error: 'Senha é obrigatória' })
        .min(8, { message: 'A senha precisa de pelo menos 8 caracteres' }),
      confirm: z
        .string(({ required_error: 'Senha é obrigatória' })),
    }).refine(data => data.password === data.confirm, {
      message: 'As senhas precisam ser as mesmas',
      path: ['confirm'],
    })
  );

  const { handleSubmit } = useForm({
    validationSchema,
  });


  const { mutate: registerUser, isPending, isError, error } = api.auth.register.useMutation({
    onSuccess: () => {
      router.push('/app');
    },
  });

  const onSubmit = handleSubmit(async (values) => {
      console.log(`values:`, values);
      await registerUser({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
      });
  });
</script>

<template>
  <form class="space-y-3" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="firstName">
        <FormItem>
          <FormLabel>
            {{ $t('signup.account.form.firstName') }}
          </FormLabel>
          <FormControl>
            <Input type="text" required v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel> {{ $t('signup.account.form.lastName') }} </FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ $t('signup.account.form.email') }}</FormLabel>
        <FormControl>
          <Input type="email" required v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>{{ $t('signup.account.form.password') }}</FormLabel>
        <FormControl>
          <Input type="password" required v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="confirm">
      <FormItem>
        <FormLabel>Confirmar senha</FormLabel>
        <FormControl>
          <Input type="password" required v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button :disabled="isPending" type="submit" class="w-full">
      <Icon v-if="isPending" class="w-4 h-4 mr-2 animate-spin" aria-hidden="true" name="uil:fidget-spinner" />
      {{ $t('signup.account.form.confirm') }}
    </Button>
    <p v-if="isError">{{ error }}</p>
  </form>
</template>
