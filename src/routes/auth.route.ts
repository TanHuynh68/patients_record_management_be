import { Router } from "express";
import { login } from "../modules/auth/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", login);


export default authRouter;