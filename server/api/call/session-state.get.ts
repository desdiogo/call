import {z} from "zod";
import {env} from "~/utils/env";
import {HttpStatusCode} from "~/enums/http-status-code";
import {apiCall} from "~/lib/api-call";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const path = `/apps/${env.CLOUDFLARE_APP_ID}/sessions/${query.sessionId}`

  try {
    const response = await apiCall.post(path)

    return setResponseStatus(event, HttpStatusCode.NO_CONTENT)
  } catch  {
    setResponseStatus(event, HttpStatusCode.INTERNAL_SERVER_ERROR)
    return {
      error: 'Unknown error'
    }
  }
})