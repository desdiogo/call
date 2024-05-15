import axios from 'axios'
import {env} from "~/utils/env";

export const apiCall = axios.create({
  baseURL: env.CLOUDFLARE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${env.CLOUDFLARE_APP_SECRET}`
  }
})