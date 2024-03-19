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
  })
);

const { handleSubmit, errors, values } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append('email', values.email);
  try {
    await $fetch('/api/forgot-password', {
      method: 'POST',
      body: formData,
    });
    await navigateTo('/forgot-password/success');
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
    action="/api/forgot-password"
    @submit="onSubmit"
    class="flex flex-col gap-4"
  >
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel> Email cadastrado</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
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
      Confirmar
    </Button>
    <p>{{ error }}</p>
  </form>
</template>
