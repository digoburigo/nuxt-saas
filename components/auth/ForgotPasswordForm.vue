<script lang="ts" setup>
  import { forgotPasswordSchema } from '~/validators';

  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const { handleSubmit, errors, values } = useForm({
    validationSchema: toTypedSchema(
      forgotPasswordSchema
    ),
  });

  const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true;
    try {
      await $fetch("/api/auth/forgot-password", {
        method: "POST",
        body: {
          email: values.email,
        },
      });
      return navigateTo('/auth/forgot-password/success', { redirectCode: 301 })
    } catch (err) {
      error.value = (err as any).data?.message ?? null;
    } finally {
      isLoading.value = false;
    }
  });
</script>

<template>
  <form method="POST" action="/api/auth/forgot-password" @submit="onSubmit" class="flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel> Email </FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button :disabled="isLoading" type="submit">
      <Icon v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" aria-hidden="true" name="uil:fidget-spinner" />
      Confirmar
    </Button>
    <p>{{ error }}</p>
  </form>
</template>
