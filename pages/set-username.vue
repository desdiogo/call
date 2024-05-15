<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const name = ref('')
const cookieName = useCookie(User.Name)

function handleSetName() {
  if (!name.value) return


  const { redirect } = route.query
  const path = redirect ? String(redirect) : RoutePath.Home

  cookieName.value = name.value
  router.push(path)
}
</script>

<template>
  <PrimeCard class="container">
    <template #title>
      <AppTitle />
    </template>
    <template #content>
      <PrimeFloatLabel>
        <PrimeInputText id="name" v-model="name"/>
        <label for="name">
          Enter your display name
        </label>
      </PrimeFloatLabel>
    </template>
    <template #footer>
      <PrimeButton label="Submit" style="width: 100%" @click="handleSetName" />
    </template>
  </PrimeCard>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>