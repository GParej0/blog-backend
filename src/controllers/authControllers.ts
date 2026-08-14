import db from "../db/authquery.js"
import bcrypt from "bcryptjs";
import {Request, Response, NextFunction} from "express"

async function newUser(req: Request, res: Response, next: NextFunction) {
    try{
        const{email, password, user} = req.body;
        if(await db.findUserByEmail(email)){
            res.status(409).json({
                error: "Email already in use"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createUser(email, hashedPassword, user);
        res.status(201).json({
            message: "Usuario creado correctamente",
        });
    } catch (error){
        next(error)
    }
}

export default {newUser}