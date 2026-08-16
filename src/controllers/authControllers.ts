import db from "../db/authQuery.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
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
            message: "User successfully created",
        });
    } catch (error){
        next(error)
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    
    try {
    const{email, password} = req.body;
    const user = await db.findUserByEmail(email)
    if (!user) {
        return res.status(401).json({ message: "Incorrect email" });
    }
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
        return res.status(401).json({ message: "Incorrect password" });
     }
    
    const token =   jwt.sign({id:user.id, user:user.user}, process.env.JWT_SECRET! , { expiresIn: '1d' }); 
    res.status(200).json({
        message: "Successfull Login",
        token,
        user: { id: user.id, email: user.email, name: user.user }
    });
    
    }catch(err) {
        next(err);
    }
}

export default {newUser, login}