import 'webrtc-adapter'

const peerConnection =  new RTCPeerConnection({
  iceServers: [
    {
      urls: 'stun:stun.cloudflare.com:3478'
    }
  ],
  bundlePolicy: 'max-bundle'
});

const localStream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
});

const transceivers = localStream.getTracks().map(track =>
  peerConnection.addTransceiver(track, {
    direction: 'sendonly'
  })
);

await peerConnection.setLocalDescription(await peerConnection.createOffer());