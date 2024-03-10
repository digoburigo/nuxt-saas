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
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
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
  formData.append('firstName', values.firstName);
  formData.append('lastName', values.lastName);
  try {
    await $fetch('/api/signup', {
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
    action="/api/signup"
    @submit="onSubmit"
    class="flex flex-col gap-4"
  >
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
          <Input type="text" required v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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
    <Button :disabled="isLoading" type="submit">
      <LucideSpinner v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
      {{ $t('signup.account.form.confirm') }}
    </Button>
    <p>{{ error }}</p>
  </form>
</template>
