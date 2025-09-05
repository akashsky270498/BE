import { Document, Types } from "mongoose";

export interface IChat extends Document {
    users: [Types.ObjectId, Types.ObjectId];
    latestMessage: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}