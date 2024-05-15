<script setup lang="ts">
const devicesListStore = useDevicesListStore();
const videoStore = useVideoStore();

const visible = ref(false)

const cameras = computed(() => {
  return JSON.parse(JSON.stringify(devicesListStore.cameras))
})

const microphones = computed(() => {
  return JSON.parse(JSON.stringify(devicesListStore.microphones))
})
</script>

<template>
  <PrimeButton
      v-tooltip.top="'Settings'"
      aria-label="Settings"
      @click="visible = true"
      severity="secondary"
  >
    <template #icon>
      <span class="material-symbols-outlined">
        settings
      </span>
    </template>
  </PrimeButton>

  <PrimeDialog v-model:visible="visible" modal header="Settings" :style="{ width: '25rem' }" dismissableMask>
    <div class="settings-container">
      <PrimeFloatLabel style="width: 100%">
        <PrimeDropdown
            style="width: 100%"
            v-model="devicesListStore.currentCamera"
            :options="cameras"
            input-id="camera"
            optionLabel="label"
            option-value="deviceId"
            checkmark
        />
        <label for="camera">Select a Camera</label>
      </PrimeFloatLabel>
      <PrimeFloatLabel style="width: 100%">
        <PrimeDropdown
            style="width: 100%"
            v-model="devicesListStore.currentMicrophone"
            :options="microphones"
            input-id="microphone"
            optionLabel="label"
            option-value="deviceId"
            checkmark
        />
        <label for="microphone">Select a microphone</label>
      </PrimeFloatLabel>
      <div class="blur">
        <label for="blur">Blur Background</label>
        <PrimeInputSwitch id="blur" v-model="videoStore.hasBlur" />
      </div>
    </div>
  </PrimeDialog>
</template>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 24px;
}

.blur {
  display: flex;
  gap: 4px;
}
</style>