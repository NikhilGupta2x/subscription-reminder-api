import {reminderQueue} from "../queues/reminder.queue.js";

export const scheduleExpiryReminder = async (subscription) => {

    const remindAt = new Date(subscription.endDate);
    remindAt.setDate(remindAt.getDate() - 7);

    const delay = remindAt.getTime() - Date.now();


    if (delay <= 0) return;


    await reminderQueue.add(
        "subscription-expiry-reminder",
        {
            userId: subscription.user,
            subscriptionId: subscription._id,
        },
        {
            delay,
            jobId: subscription._id.toString(), // 👈 KEY LINE
        }
    );

};
export const cancelExpiryReminder = async (subscriptionId) => {
    const job = await reminderQueue.getJob(subscriptionId.toString());
    if (job) {
        await job.remove();
    }
};
