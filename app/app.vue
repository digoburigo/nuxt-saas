<script setup lang="ts">
import { ConfigProvider } from "radix-vue";
// import { configure } from 'vee-validate';

// configure({
//   validateOnBlur: true,
//   validateOnChange: false,
//   validateOnInput: false,
//   validateOnModelUpdate: false
// });
const useIdFunction = () => useId();
</script>

<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />
    <ConfigProvider :use-id="useIdFunction">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <Toaster />
    </ConfigProvider>
  </div>
</template>

<style>
* {
  font-family: 'Montserrat', sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
