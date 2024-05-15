<script setup lang="ts">
const audioStore = useAudioStore()
const devicesListStore = useDevicesListStore()

const tooltip = computed(() => {
  return audioStore.enabled ? 'Turn microphone off' : 'Turn microphone on'
})

const severity = computed(() => {
  return audioStore.enabled ? 'secondary' : 'danger'
})
</script>

<template>
  <PrimeButton
      v-tooltip.top="tooltip"
      :severity="severity"
      aria-label="Microphone"
      :disabled="devicesListStore.microphones.length === 0"
      @click="audioStore.handleToggle">
    <template #icon>
       <span class="material-symbols-outlined" v-if="audioStore.enabled">
        mic
      </span>
      <span class="material-symbols-outlined" v-else>
        mic_off
      </span>
    </template>
  </PrimeButton>
</template>

<style scoped>

</style>