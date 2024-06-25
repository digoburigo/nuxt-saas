<script lang="ts" setup>
  import * as z from 'zod';

  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const validationSchema = toTypedSchema(
    z.object({
      firstName: z.string({ required_error: 'Nome é obrigatório' }),
      lastName: z.string().optional(),
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

  const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true;
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('firstName', values.firstName);
    if (values.lastName) {
      formData.append('lastName', values.lastName);
    }
    try {
      await $fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });
      await navigateTo('/about');
    } catch (err) {
      error.value = (err as any).data?.message ?? null;
    } finally {
      isLoading.value = false;
    }
  });
</script>

<template>
  <form method="post" action="/api/auth/signup" @submit="onSubmit" class="space-y-3">
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

    <Button :disabled="isLoading" type="submit" class="w-full">
      <Icon v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" aria-hidden="true" name="uil:fidget-spinner" />
      {{ $t('signup.account.form.confirm') }}
    </Button>
    <p>{{ error }}</p>
  </form>
</template>
