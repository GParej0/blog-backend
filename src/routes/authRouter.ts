import { Router } from "express";
import authCont from "../controllers/authControllers.js"

const authRouter = Router();

authRouter.post("/signup", authCont.newUser)
authRouter.post("/login", authCont.login)

export default authRouter