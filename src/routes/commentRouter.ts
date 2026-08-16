import comCont from "../controllers/commentControllers.js";
import { Router } from "express";
import verifyToken from "../middlewares/middlewares.js";
const comRouter = Router();

comRouter.get("/posts/:postId/comments", comCont.getCommentsByPostId);
comRouter.post("/posts/:postId/comments", comCont.newComment);
comRouter.delete("/comments/:id", verifyToken, comCont.deleteComment)

export default comRouter