import {prisma} from "./prisma.js"


async function findUserByEmail(email:string) {
    return await prisma.user.findUnique({where:{email}})
}

async function createUser(email:string, hashedPassword:string, user:string) {

    return await prisma.user.create({
        data:{
            email: email,
            password: hashedPassword,
            user: user,

        }
    })
}



export default {findUserByEmail, createUser}