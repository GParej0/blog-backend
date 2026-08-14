import { Router } from "express";
import authCont from "../controllers/authControllers.js"

const authRouter = Router();

authRouter.post("/signup", authCont.newUser)

export default authRouter