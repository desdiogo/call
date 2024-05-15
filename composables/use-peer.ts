import 'webrtc-adapter'

export async function usePeer() {
  const deviceListStore = useDevicesListStore()
  const route = useRoute()

  const id = route.params.id as string

  const{ data } = await useFetch('/api/redis/get-item', {query: {key: id}})
  let sessionId = data.value

  if(!sessionId) {
    const {error: sessionError} = await useFetch('/api/call/session-state', {query: {sessionId: sessionId}})

    if(sessionError.value) {
      await useFetch('/api/redis/remove-item', {query: {key: id}})
      sessionId = null
    }
  }

  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.cloudflare.com:3478'
      }
    ],
    bundlePolicy: 'max-bundle'
  });

  await wait(250)

  const audio: boolean | MediaTrackConstraints =
    deviceListStore.currentMicrophone ? {deviceId: deviceListStore.currentMicrophone} : false

  const video: boolean | MediaTrackConstraints =
    deviceListStore.currentCamera ? {deviceId: deviceListStore.currentCamera} : false

  const stream = await navigator.mediaDevices.getUserMedia({
    video,
    audio
  });

  const transceivers = stream.getTracks().map(track =>
    peerConnection.addTransceiver(track, {
      direction: 'sendonly'
    })
  );

  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)

  if(!sessionId) {
    const {data: dataSession} = await useAsyncData(() => $fetch('/api/call/new-session', {method: 'post', body: {
        sessionDescription: {
          type: 'offer',
          sdp: peerConnection.localDescription!.sdp
        }
      }}))

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(dataSession.value!.sessionDescription as RTCSessionDescriptionInit)
    );

    sessionId = dataSession.value!.sessionId
    await useFetch('/api/redis/set-item', {query: {key: id, value: sessionId}})
  }

  const tracks = transceivers.map(transceiver => {
    return {
      location: 'local',
      mid: transceiver.mid,
      trackName: transceiver.sender.track!.id
    };
  });

  peerConnection.addEventListener('iceconnectionstatechange', console.log)

  peerConnection.addEventListener('track', console.log)

  const {data: dataTrack} = await useAsyncData(() => $fetch('/api/call/new-track', {method: 'post', body: {
      sessionDescription: {
        type: 'offer',
        sdp: peerConnection.localDescription!.sdp,
      },
      tracks,
      sessionId: sessionId
    }}))
}