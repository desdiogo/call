import {createPinia} from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    const callHubStore = useCallHubStore()

    try {
      await callHubStore.startConnection()
    } catch (e) {
      console.log(e)
    }
  })
})