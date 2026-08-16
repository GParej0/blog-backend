import {prisma} from "./prisma.js"

async function getPublishedPosts() {
    return await prisma.post.findMany({
        where:{published: true}, 
        orderBy:{createdAt: "desc"}, 
        include: { user: { select: { user: true } } }
    })
}

async function createPost(name:string, body:string, published:boolean, userId:number) {
    return await prisma.post.create({
        data:{
            name:name,
            body:body,
            published: published,
            userId: userId
        }
    })
}

async function getUserPosts(userId:number){
    return await prisma.post.findMany({
        where:{ userId: userId },
        orderBy:{createdAt: "desc"}, 
        include: { user: { select: { user: true } } }
    })
}

async function getPostById(id:number){
    return await prisma.post.findUnique({
        where:{id},
        include: { 
            user: { select: { user: true } },
            comments: { orderBy: { createdAt: "desc" } } 
        }
    })
}

async function updatePost(id:number, userId:number, updatedName:string, updatedBody:string, updatedPublished:boolean){
    return await prisma.post.updateMany({
        where:{
            id:id,
            userId:userId
        },
        data:{
            name: updatedName,
            body: updatedBody,
            published: updatedPublished
        }
    })
}

async function deletePost(id:number, userId: number) {
    return await prisma.post.deleteMany({
        where:{id, userId}
    })
}

export default{
    getPublishedPosts,
    getUserPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}