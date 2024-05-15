import {redis} from "~/lib/redis";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return redis.del(query.key as string);
})