import { secrets } from "../../config";
import { userModel } from "../../models/user";
import { customPayload, Roles } from "../../types";
import jwt from "jsonwebtoken";

export async function authenticateWebSocket(token?: string): Promise<{success: boolean, userId?: string, role?: Roles}>{
    if(!token){
        return { success: false }
    }
    try{
        for(const role of Object.keys(secrets) as Array<keyof typeof secrets>){
            try{
                const decoded = jwt.verify(token, secrets[role]) as customPayload;
                const user = await userModel.findById(decoded.id);
                if(user && !user.isBroadcastDisabled){
                    return {
                        success: true,
                        userId: decoded.id as string,
                        role: decoded.role
                    }
                }
            }catch{
                continue;
            }
        }
        return { success: false };
    }catch(e){
        console.error(`Token Verification Failed: ${e}`);
        return { success: false };
    }
}