<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import type { User } from '~/types';
const route = useRoute();

const { x, y } = useMouse();

const { data: users, pending } = await useFetch<User[]>(
  'https://jsonplaceholder.typicode.com/users',
  {
    lazy: true,
  }
);

const { data } = await useFetch('/api/hello');

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

const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit((values) => {
  console.log(JSON.stringify(values, null, 2));
});
</script>

<template>
  <div>
    <NuxtLink to="/about">About</NuxtLink>

    <h1 class="text-red-500">Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">
      Learn more about Nuxt Routing
    </a>

    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="bg-red-500"> Submit </Button>
    </form>
    <pre>values: {{ values }}</pre>

    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Open Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <div>pos: {{ x }}, {{ y }}</div>
    <p>{{ data?.a }}</p>

    <ClientOnly fallback-tag="span" fallback="Loading Map...">
      <Map />
    </ClientOnly>

    <ClientOnly fallback-tag="span" fallback="Loading Map...">
      <MapGL />
    </ClientOnly>

    <ClientOnly>
      <Other />
    </ClientOnly>

    <div v-if="pending">Loading Users ...</div>
    <div v-else>
      <div v-for="user in users" :key="user?.id">Name: {{ user?.name }}</div>
    </div>
  </div>
</template>

<style scoped>
div {
  font-family: 'Madimi One', sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
