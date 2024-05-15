export const useVideoStore = defineStore('video', () => {
  const deviceListStore = useDevicesListStore()
  const hasBlur = ref(false);

  const {stream, enabled, start, stop} = useUserMedia({
    constraints: {video: {deviceId: deviceListStore.currentCamera}},
  })

  const toggleHasBlur = useToggle(hasBlur)

  function handleToggle() {
    if(enabled.value) return stop()

    start()
  }


  return {
    stream,
    enabled,
    handleToggle,
    start,
    stop,
    hasBlur,
    toggleHasBlur
  }
})