<script setup lang="ts">
  import { useFindManyToken } from '~/lib/hooks';
  const { data: tokens } = useFindManyToken();

  const api = useApi();
  const user = useUser();
  const router = useRouter();

  // se tiver apenas 1 time, redireciona para o time
  // se tiver mais de 1 time, mostra a lista de times

  const { mutate: logoutUser } = api.auth.logout.useMutation({
    onSuccess: () => {
      router.push('/auth/login');
    },
  });

</script>

<template>
  <div>
    <p>Escolher time</p>
    <p>{{ JSON.stringify(tokens) }}</p>
    <p>{{ JSON.stringify(user) }}</p>
    <form @submit.prevent="() => logoutUser()">
      <Button type="submit">Logout</Button>
    </form>
  </div>
</template>
