import { Router, Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { AuthRequest } from '../types';
import { broadcastModel } from '../models/broadcast';
import { userModel } from '../models/user';
import mongoose from 'mongoose';

const router = Router();

router.get('/broadcast', authMiddleware(), async (req: AuthRequest, res: Response) => {
    try{
        const userId = req.user?.id;
        const role = req.user?.role;
        const user = await userModel.findOne({_id: userId}).lean();
        if(!user || user.isBroadcastDisabled) return res.status(204).send();
        const allBroadcast = await broadcastModel.find({
            role: role,
            status: 'active',
            _id: { $nin: user.broadcastId }
        }).sort({createdAt: -1}).lean();
        if (!allBroadcast.length) return res.status(204).send();
        return res.status(200).json({
            allBroadcast: allBroadcast.map (b => ({
                message: b.message,
                createdAt: b.createdAt
            })),
        });
    }catch(e){
        console.log("Get broadcast error: ", e);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

router.post('/seen-broadcast', authMiddleware(), async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const { broadcastId } = req.body;
    if(!broadcastId || !mongoose.Types.ObjectId.isValid(broadcastId)) return res.status(400).json({message: "Invalid or missing broadcastid"});
    try {
        const user = await userModel.findOne({_id: userId});
        if(!user) return res.status(404).json({message: "User not found"});
        const seenMessage = user.broadcastId.includes(broadcastId);
        if(seenMessage) return res.status(200).json({message: "Already marked as seen"});
        user.broadcastId.push(broadcastId);
        await user.save();
        return res.status(200).json({messge: "Marked as seen"});
    }catch(e){
        console.log("Error making broadcast as seen: ", e);
        return res.status(500).json({messge: "Internal Server Error"});
    }
})

router.post('/disable-broadcast', authMiddleware(), async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    try{
        await userModel.updateOne({userId}, {$set: {isBroadcastDisabled: true}});
        return res.status(200).json({message: "Broadcast Disabled"});
    }catch(e){
        console.log("error in performing disable broadcast: ", e);
        return res.status(500).json({message: "Intenal Server Error"});
    }
})

router.post('/enable-broadcast', authMiddleware(), async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    try{
        await userModel.updateOne({userId}, {$set: {isBroadcastDisabled: false}});
        return res.status(200).json({message: "Broadcast Disabled"});
    }catch(e){
        console.log("error in performing enable broadcast: ", e);
        return res.status(500).json({message: "Intenal Server Error"});
    }
})

export const userBroadcastRouter = router;
