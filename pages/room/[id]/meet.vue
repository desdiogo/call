<script setup lang="ts">
const callHubStore = useCallHubStore()
const route = useRoute()

// onMounted(async () => {
//   const roomName = route.params.id as string
//
//   await callHubStore.joinRoom(roomName)
// })

onMounted(() => {
  usePeer()
})

useHasName()
</script>

<template>
<div>room</div>
</template>

<style scoped>

</style>