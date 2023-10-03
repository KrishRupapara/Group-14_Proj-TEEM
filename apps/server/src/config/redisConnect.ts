import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const client = new Redis({
  password: process.env.REDIS_PASSWORD,
  port: 12247,
  host: process.env.REDIS_HOST,
});

// import { RedisClientType, createClient } from "redis";
// import dotenv from "dotenv";
// dotenv.config();

// export const redisConnect: any = async () => {
//   try {
//     const client = createClient({
//       password: process.env.REDIS_PASSWORD,
//       socket: {
//         host: process.env.REDIS_HOST,
//         port: 12247,
//       },
//     });

//     await client.connect();
//     return client;
//   } catch (err: any) {
//     console.log(err.message);
//   } finally {
//     console.log("Redis connected");
//   }
// };
