import mongoose, { Schema } from "mongoose";
import { Roles } from "../types";

const broadcastSchema = new Schema({
    title: {type: String, required: true},
    message: {type: String, required: true},
    role: {type: String, enum: Object.values(Roles), required: true},
    type: {type: String, enum: ['popup', 'banner'], default: 'banner'},
    status: {type: String, enum: ['active', 'expired'], default: 'active'}
}, {timestamps: true});

export const broadcastModel = mongoose.model('Broadcast', broadcastSchema);