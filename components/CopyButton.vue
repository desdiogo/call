<script setup lang="ts">
const { copy, copied, isSupported } = useClipboard()

const tooltip = computed(() => {
  return copied.value ? 'Copied' : 'Copy url'
})

function handleClipboardUrl() {
  copy(location.href)
}
</script>

<template>
  <PrimeButton
      v-tooltip.top="tooltip"
      @click="handleClipboardUrl"
      severity="secondary"
      :disabled="!isSupported"
      aria-label="Copy url"
  >
    <template #icon>
      <span class="material-symbols-outlined" v-if="copied">
        done_all
      </span>
      <span class="material-symbols-outlined" v-else>
        content_copy
      </span>
    </template>
  </PrimeButton>
</template>

<style scoped>

</style>