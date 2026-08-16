import db from "../db/commentQuery.js";
import { Request, Response, NextFunction } from "express"

async function newComment(req: Request, res: Response, next: NextFunction) {
    try {
        const postId = Number(req.params.postId);
        const userId = (req as any).user?.id;
        const { name, body } = req.body;

        const comment = await db.createComment(name, body, postId, userId);
        res.status(201).json({
            message: "Comment posted",
            comment
        })

    } catch (error) {
        next(error)
    }
}

async function getCommentsByPostId(req: Request, res: Response, next: NextFunction) {
    try {
        const postId = Number(req.params.postId);

        const allComments = await db.getCommentsByPostId(postId);
        res.status(200).json({
            message: "Showing all comments",
            allComments
        })
    } catch (error) {
        next(error)
    }
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const userId = (req as any).user.id;

        const comment = await db.getCommentWithPost(id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        const isCommentAuthor = comment.userId === userId;
        const isPostOwner = comment.post.userId === userId;

        if (!isCommentAuthor && !isPostOwner) {
            return res.status(403).json({ error: "You cannot delete this comment" });
        }
        await db.deleteComment(id);
        return res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        next(error)
    }
}

export default {
    newComment,
    getCommentsByPostId,
    deleteComment
}