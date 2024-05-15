<script setup lang="ts">
const route = useRoute()
const router = useRouter()

function handleJoinMeet() {
  const id = route.params.id as string;

  const path = `/room/${id}/meet`
  router.push(path)
}
</script>

<template>
  <PrimeButton label="Join" severity="warning" @click="handleJoinMeet"/>
</template>

<style scoped>

</style>