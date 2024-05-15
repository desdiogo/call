<script setup lang="ts">
const { share, isSupported } = useShare()

function handleShare() {
  share({
    title: 'Meet',
    url: location.href,
  })
}
</script>

<template>
  <PrimeButton
      v-tooltip.top="'Share url'"
      aria-label="Share url"
      severity="secondary"
      :disabled="!isSupported"
      @click="handleShare"
  >
    <template #icon>
      <span class="material-symbols-outlined">
        share
      </span>
    </template>
  </PrimeButton>
</template>

<style scoped>

</style>