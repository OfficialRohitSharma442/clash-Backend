import {ConnectionOptions,DefaultJobOptions} from "bullmq";


export const redisConnnection: ConnectionOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt( process.env.REDIS_PORT) : 6379,
}

export const defaultQueueJobOptions:DefaultJobOptions = {
    removeOnComplete: {
        count:20,
        age: 60 * 60 // 1 hour 
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 5000,
    },
    removeOnFail:false
}