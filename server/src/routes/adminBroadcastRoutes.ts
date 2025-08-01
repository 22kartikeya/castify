import {Router, Request, Response} from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { broadcastSchema } from '../validations/broadcastValidation';
import { AuthRequest, broadcastType, Roles } from '../types';
import { broadcastModel } from '../models/broadcast';
import { userModel } from '../models/user';
import mongoose from 'mongoose';
import { z } from 'zod';

const router = Router();

const editBroadcastSchema = z.object({
    broadcastId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid ObjectId",
    }),
    title: z.string().min(1).max(30).optional(),
    message: z.string().min(1).max(250).optional(),
    role: z.enum([Roles.ADMIN, Roles.USER, Roles.EMPLOYEE]).optional(),
    status: z.enum(['active', 'expired']).optional()
});

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

router.get('/all-broadcast', authMiddleware(['admin']), async(req: AuthRequest, res:Response) => {
    const userId = req.user?.id;
    const user = await userModel.findById(userId);
    if(!user) return res.status(404).json({message: "User not found"});
    try{
        const broadcasts = await broadcastModel.find().sort({createdAt: -1}).lean();
        if(!broadcasts.length) return res.status(204).send();
        return res.status(200).json({
            broadcasts: broadcasts.map((b) => ({
                id: b._id,
                title: b.title,
                type: b.type,
                status: b.status,
                role: b.role,
                message: b.message,
                updatedAt: new Date(b.updatedAt).toLocaleDateString('en-GB')
            }))
        })
    }catch(e){
        console.log("Error in fetching broadcast: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

router.get('/broadcast/:broadcastId', authMiddleware(['admin']), async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const user = await userModel.findById(userId);
    if(!user) return res.status(404).json({message: "User not found"});
    try {
        const { broadcastId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(broadcastId)) return res.status(400).json({message: "Invalid id format"});
        const broadcast = await broadcastModel.findById(broadcastId);
        if(!broadcast) return res.status(404).json({message: "No broadcast found"});
        return res.status(200).json({ broadcast });
    } catch(e){
        console.log("Error in fetching broadcast: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

router.put('/broadcast', authMiddleware(['admin']), async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const user = await userModel.findById(userId);
    if(!user) return res.status(404).json({message: "User not found"});
    const parsedData = editBroadcastSchema.safeParse(req.body);
    if(!parsedData.success) return res.status(400).json({error: parsedData.error.issues.map((issue) => issue.message)});
    try {
        const {broadcastId, title, message, role, status} = parsedData.data;
        const existBroadcast = await broadcastModel.findById(broadcastId);
        if(!existBroadcast) return res.status(404).json({message: "This broadcast does not exist"});
        if(title) existBroadcast.title = title;
        if(message) existBroadcast.message = message;
        if(role) existBroadcast.role = role;
        if(status) existBroadcast.status = status;
        existBroadcast.updatedAt = new Date();
        await existBroadcast.save();
        return res.status(200).json({message: "Broadcast Updated"});
    } catch(e){
        console.log("Error updating broadcast: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

router.delete('/broadcast/:broadcastId', authMiddleware(['admin']), async (req: AuthRequest, res: Response) => {
    try{
        const { broadcastId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(broadcastId)) return res.status(404).json({message: "Invalid broadcast id"});
        const deleteBroadcast = await broadcastModel.findByIdAndDelete(broadcastId);
        if(!deleteBroadcast) return res.status(404).json({message: "No broadcast found"}); // Changed to 404
        return res.status(200).json({message: "Broadcast deleted successfully"});
    }catch(e){
        console.log("Error in deleting broadcast: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
});


export const adminBroadcastRouter = router;