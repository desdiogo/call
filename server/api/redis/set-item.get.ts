import {redis} from "~/lib/redis";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return redis.set(query.key as string, query.value as string);
})