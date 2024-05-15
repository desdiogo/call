import {redis} from "~/lib/redis";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return redis.get(query.key as string);
})