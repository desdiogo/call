<script setup lang="ts">
const router = useRouter()

const cookieName = useCookie(User.Name)

function handleCreateNewRow() {
  const id = crypto.randomUUID()
  const path = RoutePath.Room.concat('/', id)

  router.push(path)
}

useHasName()
</script>

<template>
  <PrimeCard class="container">
    <template #title>
      <AppTitle/>
    </template>
    <template #content>
      <div class="content">
        <span>Logged in as {{ cookieName }}</span>
        <NuxtLink :to="RoutePath.SetUserName">
          <PrimeButton label="Change" outlined/>
        </NuxtLink>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <PrimeButton label="Create new room" @click="handleCreateNewRow" />
        <PrimeButton label="Join new room" />
      </div>
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

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
</style>
