import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendExpiryEmail = async (userId, subscriptionId) => {
    const user = await User.findById(userId);
    const subscription = await Subscription.findById(subscriptionId);

    if (!user || !subscription) return;

    await transporter.sendMail({
        to: user.email,
        subject: "⏰ Subscription Expiring Soon",
        text: `Hi ${user.name}, your subscription "${subscription.name}" will expire in 7 days. Please renew to avoid interruption.`,
    });
};
