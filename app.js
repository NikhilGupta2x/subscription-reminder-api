import express from 'express';
import cookieParser from 'cookie-parser';

import {PORT} from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import limiter from './middleware/rateLimit.middleware.js';
import workflowRouter from "./routes/workflow.route.js";
// import "./workers/reminder.worker.js";


const app = express();


app.get('/', (req, res) => {
    res.send('hello world')
})
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware)







app.listen(PORT,async()=>{
    console.log(`subdub is running on port: http://localhost:${PORT}`)

    await connectToDatabase()
});

export default app;