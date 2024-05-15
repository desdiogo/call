<script setup lang="ts">
const devicesListStore = useDevicesListStore()

const microphoneAccess = usePermission('microphone')
const cameraAccess = usePermission('camera')
</script>

<template>
  <p v-if="microphoneAccess === 'denied' && cameraAccess === 'denied'">
    Microphone and camera permissions were denied.
  </p>
  <p v-else-if="microphoneAccess === 'denied'">
    Microphone permissions were denied.
  </p>
  <p v-else-if="cameraAccess === 'denied'">
    Camera permissions were denied.
  </p>
  <div class="permission" v-else-if="cameraAccess === 'prompt' || microphoneAccess === 'prompt'">
    <p>
      In order to use Call, you will need to grant permission to your camera and microphone. You will be prompted for
      access.
    </p>
    <PrimeButton label="Allow access" @click="devicesListStore.ensurePermissions" />
  </div>
</template>

<style scoped>
.permission {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 600px;
}
</style>