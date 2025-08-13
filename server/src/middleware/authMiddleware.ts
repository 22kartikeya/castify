import { NextFunction, Response } from "express";
import { secrets } from "../config";
import jwt from "jsonwebtoken";
import { AuthRequest, customPayload } from "../types";

export const authMiddleware = (allowedRoles: string[] = []) => (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if(!token) return res.status(401).json({message: "Unauthorized"});
    let decodedToken: customPayload | undefined;
    for(const role of Object.keys(secrets) as Array<keyof typeof secrets>){
        try{
            const decoded = jwt.verify(token, secrets[role]) as customPayload;
            decodedToken = {...decoded}
            break;
        }catch{
            continue;
        }
    }
    if(decodedToken){
        if(allowedRoles.length && !allowedRoles.includes(decodedToken.role)){
            return res.status(403).json({message: "Access Denied"});
        }
        req.user = decodedToken;
    }else{
        return res.status(401).json({message: "Invalid Token"});
    }
    next();
}