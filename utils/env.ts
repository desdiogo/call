import { z } from 'zod'

const envSchema = z.object({
  CLOUDFLARE_URL: z.string().url(),
  CLOUDFLARE_APP_ID: z.string(),
  CLOUDFLARE_APP_SECRET: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_TOKEN: z.string(),
  REDIS_USER: z.string(),
  REDIS_URL: z.string(),
})

export const env = envSchema.parse(process.env)