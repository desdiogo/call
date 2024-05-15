import {z} from "zod";
import {env} from "~/utils/env";
import {HttpStatusCode} from "~/enums/http-status-code";
import {apiCall} from "~/lib/api-call";

interface Response {
  requiresImmediateRenegotiation: boolean,
  tracks: {
    mid: string,
    trackName: string
  }[]
  sessionDescription: {
    type: "offer" | "answer"
    sdp: string;
  },
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const path = `/apps/${env.CLOUDFLARE_APP_ID}/sessions/${body.sessionId}/tracks/new`
  delete body.sessionId

  const response = await apiCall.post<Response>(path, body)

  setResponseStatus(event, HttpStatusCode.CREATED)
  return response.data
})