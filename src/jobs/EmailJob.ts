import {Job, Queue,Worker } from "bullmq"
import { defaultQueueJobOptions, redisConnnection } from "../config/queue.js";
import { sendMail } from "../config/mail.js";




export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName,{
    connection: redisConnnection,
    defaultJobOptions:defaultQueueJobOptions 
})

// Worker 
interface EmailJobDataType  {
    to:string;
    subject:string;
    body:string; 
}


export const queueWorker = new Worker(emailQueueName,async (job:Job)=>{
const data:EmailJobDataType = job.data 
sendMail(data.to,data.subject,data.body) 
console.log("Processing email job with data:", data);
},{
    connection: redisConnnection
})