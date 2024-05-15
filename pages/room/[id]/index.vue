<script setup lang="ts">
const route = useRoute()
const microphoneAccess = usePermission('microphone')
const cameraAccess = usePermission('camera')

const id = route.params.id as string
</script>

<template>
  <PrimeCard class="container" v-if="cameraAccess !== 'granted' || microphoneAccess ==='denied'">
    <template #content>
      <RoomPermissions />
    </template>
  </PrimeCard>
  <PrimeCard class="container" v-else>
    <template #title>
      <h1 class="title">Room is {{ id }}</h1>
    </template>
    <template #subtitle>
      <p class="subtitle">
        0 users in the room.
      </p>
    </template>
    <template #content>
      <div class="content">
        <SelfView/>
        <AudioIndicator />
      </div>
    </template>
    <template #footer>
      <div class="footer-room">
        <JoinButton />
        <MicrophoneButton />
        <CameraButton />
        <SettingsButton />
        <CopyButton />
        <ShareButton />
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

.title {
  font-size: 20px;
  margin: 0;
}

.subtitle {
  margin: 0;
}

.content {
  position: relative;
  width: 640px;
  height: 480px;
  overflow: hidden;
}

.footer-room {
  display: flex;
  justify-content: space-between;
}
</style>