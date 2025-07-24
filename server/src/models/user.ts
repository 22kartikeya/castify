import mongoose, { Schema } from "mongoose";
import { Roles } from "../types";

const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: Object.values(Roles) ,required: true},
    isBroadcastDisabled: {type: Boolean, default: false},
    broadcastId: [{ type: mongoose.Types.ObjectId, ref: 'Broadcast'}]
});

export const userModel = mongoose.model('User', userSchema);