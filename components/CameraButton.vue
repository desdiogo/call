<script setup lang="ts">
const videoStore = useVideoStore()
const devicesListStore = useDevicesListStore()

const tooltip = computed(() => {
  return videoStore.enabled ? 'Turn camera off' : 'Turn camera on'
})

const severity = computed(() => {
  return videoStore.enabled ? 'secondary' : 'danger'
})
</script>

<template>
  <PrimeButton
      v-tooltip.top="tooltip"
      :severity="severity"
      aria-label="Camera"
      :disabled="devicesListStore.cameras.length === 0"
      @click="videoStore.handleToggle">
    <template #icon>
       <span class="material-symbols-outlined" v-if="videoStore.enabled">
        videocam
      </span>
      <span class="material-symbols-outlined" v-else>
        videocam_off
      </span>
    </template>
  </PrimeButton>
</template>

<style scoped>

</style>