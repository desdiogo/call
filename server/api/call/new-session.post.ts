import {z} from "zod";
import {env} from "~/utils/env";
import {HttpStatusCode} from "~/enums/http-status-code";
import {apiCall} from "~/lib/api-call";

interface Response {
  sessionDescription: {
    type: "offer" | "answer"
    sdp: string;
  },
  sessionId: string;
}

export default defineEventHandler(async (event) => {
  const typeSchema = z.enum(["offer", "answer"])
  const sdpSchema = z.string()


  const bodySchema = z.object({
    sessionDescription: z.object({
      type: typeSchema,
      sdp: sdpSchema
    })
  })

  const requestBody = await readBody(event)

  const body = bodySchema.parse(requestBody)

  const path = `/apps/${env.CLOUDFLARE_APP_ID}/sessions/new`

  const response = await apiCall.post<Response>(path, body)

  setResponseStatus(event, HttpStatusCode.CREATED)
  return response.data
})