export const useAudioStore = defineStore('audio', () => {
  const deviceListStore = useDevicesListStore()

  const audioVolume = ref(0);

  const {stream, enabled, start, stop} = useUserMedia({
    constraints: {audio: {deviceId: deviceListStore.currentMicrophone}},
  })

  function handleToggle() {
    if (enabled.value) return stop()

    start()
  }

  function audioLevel() {
    const audioContext = new AudioContext();
    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream.value!);
    const analyserNode = audioContext.createAnalyser();
    mediaStreamAudioSourceNode.connect(analyserNode);

    const pcmData = new Float32Array(analyserNode.fftSize);
    const onFrame = () => {
      analyserNode.getFloatTimeDomainData(pcmData);
      let sumSquares = 0.0;
      for (const amplitude of pcmData) {
        sumSquares += amplitude * amplitude;
      }

      audioVolume.value = Math.sqrt(sumSquares / pcmData.length);

      if (enabled.value) {
        requestAnimationFrame(onFrame);
      }
    };
    requestAnimationFrame(onFrame);
  }

  return {
    stream,
    enabled,
    audioVolume,
    handleToggle,
    audioLevel
  }
})