<script setup lang="ts">
const audioStore = useAudioStore()

const minSize = 0.6
const scaleModifier = 0.8

const scale = computed(() => {
  return  Math.max(minSize, audioStore.audioVolume * 3 + scaleModifier)
})

watchEffect(() => {
  if (audioStore.enabled) {
    audioStore.audioLevel()
  }
})
</script>

<template>
  <div class="container-audio">
    <span v-tooltip.top="'Turn microphone off'" class="material-symbols-outlined" v-if="!audioStore.enabled">
      mic_off
    </span>
    <div class="indicator" v-else>
      <div/>
      <div/>
    </div>
  </div>
</template>

<style scoped>
.container-audio {
  position: absolute;
  display: inline-block;
  top: 24px;
  left: 12px;

  span {
    cursor: default;
  }
}

.indicator {
  position: relative;

  --scale-x: v-bind('scale');
  --scale-y: v-bind('scale');

  div:first-child {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: var(--yellow-600);
    scale: var(--scale-x) var(--scale-y)
  }

  div:last-child {
    position: absolute;
    height: 8px;
    width: 8px;
    background-color: var(--yellow-300);
    top: 50%;
    left: 50%;
    scale: var(--scale-x) var(--scale-y);
    translate: -50% -50%;
    border-radius: 50%;
  }
}
</style>