import Subscription from "../models/subscription.model.js";
import { scheduleExpiryReminder ,cancelExpiryReminder} from "../services/reminder.service.js";


export const createSubscription = async (req, res, next) => {
    try {
        const { frequency, startDate } = req.body;


        let endDate = new Date(startDate);

        switch (frequency) {
            case "daily":
                endDate.setDate(endDate.getDate() + 1);
                break;
            case "weekly":
                endDate.setDate(endDate.getDate() + 7);
                break;
            case "monthly":
                endDate.setMonth(endDate.getMonth() + 1);
                break;
            case "yearly":
                endDate.setFullYear(endDate.getFullYear() + 1);
                break;
            default:
                const error = new Error("Invalid subscription frequency");
                error.status = 400;
                throw error;
        }


        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
            endDate
        });


        await scheduleExpiryReminder(subscription);

        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};
export const getUserSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({
            user: req.user._id
        });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};


export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.status = 404;
            throw error;
        }

        // Optional: ownership check
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }


        subscription.status = "cancelled";
        await subscription.save();

        await cancelExpiryReminder(subscription._id);

        res.status(200).json({
            success: true,
            message: "Subscription cancelled successfully",
        });
    } catch (error) {
        next(error);
    }
};

