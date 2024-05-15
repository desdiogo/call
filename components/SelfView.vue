<script setup lang="ts">
const videoStore = useVideoStore()

const video = ref<HTMLVideoElement>()

const videoBackgroundColor = computed(() => {
  return videoStore.enabled ? '#18181b' : 'var(--blue-900)'
})

function handleVideo() {
  if (video.value && videoStore.stream) {
    video.value.srcObject = videoStore.stream
  }
}

async function handleBlurVideo() {
  if (video.value && videoStore.stream) {
    const blurredTrack = await blurVideoTrack(videoStore.stream.getVideoTracks()[0]);
    const newStream = new MediaStream();
    newStream.addTrack(blurredTrack);

    video.value.srcObject = newStream;
  }
}

watchEffect(async() => {
  if(videoStore.hasBlur) {
    await handleBlurVideo()
    return
  }

  handleVideo()
})

onMounted(() => {
  videoStore.start()
})

onBeforeUnmount(() => {
  videoStore.stop()
})
</script>

<template>
  <video class="video" ref="video" muted autoplay playsinline loop/>
</template>

<style scoped>
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 640px;
  height: 480px;
  background-color: v-bind('videoBackgroundColor');
  object-fit: cover;
}
</style>