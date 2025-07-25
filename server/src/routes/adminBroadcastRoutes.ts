import {Router, Request, Response} from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { broadcastSchema } from '../validations/broadcastValidation';
import { broadcastType } from '../types';
import { broadcastModel } from '../models/broadcast';

const router = Router();

router.post('/broadcast', authMiddleware(['admin']), async (req: Request, res: Response) => {
    const parsedData = broadcastSchema.safeParse(req.body);
    if(!parsedData.success) return res.status(400).json({error: parsedData.error.issues.map((issue) => issue.message)});
    try{
        const broadcastData: broadcastType = parsedData.data;
        const newBroadcast = await broadcastModel.create(broadcastData);
        return res.status(201).json({message : "Message sent successfully", newBroadcast});
    }catch(e){
        console.log("Send Broadcast Error: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

export const adminBroadcastRouter = router;