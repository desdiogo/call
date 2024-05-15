import * as signalR from "@microsoft/signalr";

export const useCallHubStore = defineStore('call-hub', () => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7153/call")
    .build()

  async function startConnection() {
    await connection.start()
  }

  async function joinRoom(roomName: string) {
    await connection.send(Hub.JoinRoom, roomName)
  }

  function getStatus() {
    return connection.state
  }

  function listeners() {
  }

  onMounted(() => {
    listeners()
  })

  return {
    startConnection,
    joinRoom,
    getStatus
  }
})