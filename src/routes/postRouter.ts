import postCont from "../controllers/postControllers.js";
import { Router } from "express";
import verifyToken from "../middlewares/middlewares.js";

const postRouter = Router();

postRouter.get("/", postCont.getPublishedPosts);
postRouter.get("/user", verifyToken, postCont.getUserPosts);
postRouter.get("/:id", postCont.getPostById);


postRouter.post("/", verifyToken, postCont.newPost);
postRouter.put("/:id", verifyToken, postCont.updatePost);
postRouter.delete("/:id", verifyToken, postCont.deletePost)

export default postRouter