<script lang="ts" setup>
  import * as z from 'zod';

  const error = ref<string | null>(null);
  const isLoading = ref(false);

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

  const { handleSubmit, errors, values, setErrors } = useForm({
    validationSchema,
  });

  const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true;
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    try {
      await $fetch('/api/auth/login', {
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
  <form method="post" action="/api/auth/login" @submit="onSubmit" class="flex flex-col gap-4">
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
    <Button :disabled="isLoading || errors.email || errors.password" type="submit">
      <Icon v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" aria-hidden="true" name="uil:fidget-spinner" />
      {{ $t('login.form.confirm') }}
    </Button>
    <Alert v-if="error" variant="destructive">
      <AlertDescription>
        {{ error }}
      </AlertDescription>
    </Alert>
  </form>
</template>
