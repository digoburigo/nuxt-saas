<script setup lang="ts">
import { useFindManyTodo } from '~/lib/hooks';

import * as z from 'zod';
const route = useRoute();

const { x, y } = useMouse();

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: 'This is required' })
      .email({ message: 'Must be a valid email' }),
    password: z
      .string()
      .min(1, { message: 'This is required' })
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

const { data: todos, isLoading } = useFindManyTodo({
  where: {
    title: 'test',
  },
});
</script>

<template>
  <div>
    <h1 class="text-red-500">Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">
      Learn more about Nuxt Routing
    </a>

    <NuxtLink to="/about">About</NuxtLink>

    <p v-if="isLoading">Loading todos ...</p>
    <div v-else>
      {{ JSON.stringify(todos) }}
    </div>

    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="">
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
    <pre>values: {{ v }}</pre>

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
  </div>
</template>
