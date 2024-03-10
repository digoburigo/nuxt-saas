<script lang="ts" setup>
import * as z from 'zod';

const error = ref<string | null>(null);
const isLoading = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Must be a valid email' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Too short' }),
  })
);

const { handleSubmit, errors, values } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append('email', values.email);
  formData.append('password', values.password);
  try {
    await $fetch('/api/login', {
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
  <form
    method="post"
    action="/api/login"
    @submit="onSubmit"
    class="flex flex-col gap-4"
  >
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
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button :disabled="isLoading" type="submit">
      <Icon
        v-if="isLoading"
        class="w-4 h-4 mr-2 animate-spin"
        aria-hidden="true"
        name="uil:fidget-spinner"
      />
      {{ $t('login.form.confirm') }}
    </Button>
    <p>{{ error }}</p>
  </form>
</template>
