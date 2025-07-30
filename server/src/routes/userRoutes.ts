import express, { Request, Response } from "express";
import { loginSchema, signupSchema } from "../validations/userValidation";
import { userModel } from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secrets } from "../config";
import { UserInterface } from "../types";

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: false, // secure: process.env.NODE_ENV === "production", // true for HTTPS in prod
    sameSite: "lax" as const, // sameSite: "strict", prevent CSRF in prod
    maxAge: 7 * 60 * 60 * 1000 // 7 hours
}

router.post('/signup', async (req: Request, res: Response) => {
    const parsedData = signupSchema.safeParse(req.body);
    if(!parsedData.success) return res.status(400).json({error: parsedData.error.issues.map((issue) => issue.message) });
    try{
        const {email, password, role} = parsedData.data;
        const existingUser = await userModel.findOne({email});
        if(existingUser) return res.status(403).json({message: "email already exist"});
        const hashPass = await bcrypt.hash(password, 12);
        const newUser = await userModel.create({
            email, password: hashPass, role
        });
        const token = jwt.sign({
            id: newUser._id, role
        }, secrets[role], {expiresIn: '7h'});
        res.cookie("token", token, cookieOptions);
        return res.status(201).json({message: "Signup Successfull", token })
    }catch(e){
        console.error("Signup Error: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const parsedData = loginSchema.safeParse(req.body);
    if(!parsedData.success) return res.status(400).json({ error: parsedData.error.issues.map((issue) => issue.message) });
    try{
        const {email, password} = parsedData.data;
        const findUser: UserInterface | null = await userModel.findOne({email});
        if(!findUser) return res.status(404).json({message: "User not found"});
        const passMatch: boolean = await bcrypt.compare(password, findUser.password);
        if(!passMatch) return res.status(403).json({message: "Incorrect Password"});
        const token = jwt.sign({
            id: findUser._id, role: findUser.role
        }, secrets[findUser.role], {expiresIn: '7h'});
        res.cookie("token", token, cookieOptions);
        return res.status(200).json({message: "Login Successfully", role: findUser.role});
    }catch(e){
        console.error("Login Error: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie("token");
    return res.status(200).json({message: "Logout Successfully"})
})

export const userRouter = router;