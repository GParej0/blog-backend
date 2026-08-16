import { prisma } from "./prisma.js"

async function createComment(name: string, body: string, postId: number, userId?: number) {
    return prisma.comment.create({
        data: {
            name: name,
            body: body,
            postId: postId,
            userId: userId
        }
    })
}

async function getCommentsByPostId(postId: number) {
    return prisma.comment.findMany({
        where: { postId },
        orderBy: { createdAt: "asc" },
        include: {
            post: true
        }
    })
}

async function getCommentWithPost(id: number) {
    return await prisma.comment.findUnique({
        where: { id },
        include: {
            post: true,
        },
    });
}

async function deleteComment(id: number) {
    return prisma.comment.deleteMany({
        where: { id }
    })
}

export default {
    createComment,
    getCommentsByPostId,
    getCommentWithPost,
    deleteComment
}