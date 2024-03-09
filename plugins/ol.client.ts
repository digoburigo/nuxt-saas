import { defineNuxtPlugin } from '#app';
import OpenLayers, { type Vue3OpenlayersGlobalOptions } from 'vue3-openlayers';

const options: Vue3OpenlayersGlobalOptions = {
  debug: true,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(OpenLayers, options);
});
