import db from "../db/postQuery.js"
import { Request, Response, NextFunction } from "express"

async function newPost(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, body, published } = req.body;
        const userId = (req as any).user.id
        const post = await db.createPost(name, body, published, userId)
        res.status(201).json({
            message: "Post published",
            post
        })
    } catch (error) {
        next(error)
    }
}

async function getPublishedPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const posts = await db.getPublishedPosts();
        res.status(200).json({
            message: "Showing all posts",
            posts
        })
    } catch (error) {
        next(error)
    }
}

async function getPostById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const post = await db.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        res.status(200).json({
            message: "Showing post",
            post
        })
    } catch (error) {
        next(error)
    }
}

async function getUserPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user.id;
        const allUserPosts = await db.getUserPosts(userId);
        res.status(200).json({
            message: "Showing all posts",
            allUserPosts
        })
    } catch (error) {
        next(error)
    }
}

async function updatePost(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const userId = (req as any).user.id;
        const { name, body, published } = req.body;

        const postUpdated = await db.updatePost(id, userId, name, body, published)
        if (postUpdated.count === 0) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }
        res.status(200).json({
            message: "Post updated",
            postUpdated
        })
    } catch (error) {
        next(error)
    }
}

async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const userId = (req as any).user.id;
        const result = await db.deletePost(id, userId);
        if (result.count === 0) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }
        res.status(200).json({
            message: "Post deleted"
        })

    } catch (error) {
        next(error)
    }
}

export default {
    deletePost,
    updatePost,
    getUserPosts,
    getPostById,
    getPublishedPosts,
    newPost
}