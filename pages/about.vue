<script setup>
const { locale } = useI18n();

const { $client } = useNuxtApp();

const { data } = await $client.hello.useQuery({});

const { counter, reset, pause, resume } = useInterval(200, { controls: true });
</script>

<template>
  <NuxtLink to="/">Home</NuxtLink>
  <p>About</p>
  <form>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="pt-br">pt-br</option>
    </select>
    <p>{{ $t("welcome") }}</p>
  </form>

  <p>{{ data?.greeting }}</p>

  <p>{{ counter }}</p>
  <Button @click="reset">Reset</Button>
  <Button @click="pause">Pause</Button>
  <Button @click="resume">Resume</Button>

  <NuxtImg src="/monkey.jpg" width="300px" height="300px" />
</template>
