import {Router} from "express";
import authorize from "../middleware/auth.middleware.js";
import {
    createSubscription,
    getUserSubscriptions,
    cancelSubscription
} from "../controllers/subscription.controller.js";


const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getUserSubscriptions);
subscriptionRouter.get('/:id',(req,res)=>{
    res.send({title: 'GET subscription details'})
})
subscriptionRouter.post('/',authorize,createSubscription)
subscriptionRouter.post('/:id',(req,res)=>{
    res.send({title: 'UPDATE subscription'})
})
subscriptionRouter.delete('/:id',(req,res)=>{
    res.send({title: 'DELETE subscription'})
})
subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions)
subscriptionRouter.put('/:id/cancel',(req,res)=>{
    res.send({title: 'CANCEL subscription'})
})
subscriptionRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({title: 'get upcoming renewals'})
})
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);




export default subscriptionRouter;