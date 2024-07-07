export const useApi = () => {
  return useNuxtApp().$client;
};