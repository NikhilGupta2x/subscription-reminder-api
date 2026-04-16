import {Router} from "express";
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";
import limiter from "../middleware/rateLimit.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, limiter, getUser);

userRouter.post("/", (req, res) => {
    res.send({ title: 'CREATE new user' });
});

userRouter.put("/:id", (req, res) => {
    res.send({ title: 'UPDATE user' });
});

userRouter.delete("/:id", (req, res) => {
    res.send({ title: 'DELETE user' });
});

export default userRouter;
