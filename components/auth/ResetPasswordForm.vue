<script lang="ts" setup>
  import * as z from 'zod';

  const route = useRoute();

  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const validationSchema = toTypedSchema(
    z.object({
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
    try {
      await $fetch('/api/auth/reset-password', {
        method: 'POST',
        body: { token: route.query.token, password: values.password },
      })
      await navigateTo('/auth/login');
    } catch (err) {
      error.value = (err as any).data?.message ?? null;
    } finally {
      isLoading.value = false;
    }
  });
</script>

<template>
  <form method="post" action="/api/auth/reset-password" @submit="onSubmit" class="space-y-3">
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Nova senha</FormLabel>
        <FormControl>
          <Input type="password" required v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="confirm">
      <FormItem>
        <FormLabel>Confirmar nova senha</FormLabel>
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
