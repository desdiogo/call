export const useDevicesListStore = defineStore('devicesList', () => {
  const currentMicrophone = ref<string>()
  const currentCamera = ref<string>()
  const currentSpeaker = ref<string>()

  const {
    videoInputs: cameras,
    audioInputs: microphones,
    audioOutputs: speakers,
    ensurePermissions,
    permissionGranted
  } = useDevicesList({
    onUpdated() {
      if (!cameras.value.find(i => i.deviceId === currentCamera.value))
        currentCamera.value = cameras.value[0]?.deviceId

      if (!microphones.value.find(i => i.deviceId === currentMicrophone.value))
        currentMicrophone.value = microphones.value[0]?.deviceId

      if (!speakers.value.find(i => i.deviceId === currentSpeaker.value))
        currentSpeaker.value = speakers.value[0]?.deviceId
    },
  })

  return {
    cameras,
    microphones,
    speakers,
    currentMicrophone,
    currentCamera,
    currentSpeaker,
    ensurePermissions,
    permissionGranted
  }
})