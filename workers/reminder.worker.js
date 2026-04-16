import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import { sendExpiryEmail } from "../services/email.service.js";

new Worker(
    "subscription-reminders",
    async (job) => {
        const { userId, subscriptionId } = job.data;

        await sendExpiryEmail(userId, subscriptionId);
    },
    {
        connection: redis,
    }
);
