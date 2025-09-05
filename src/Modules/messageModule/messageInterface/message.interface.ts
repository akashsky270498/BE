import { Document, Types } from "mongoose";

export default interface IMessage extends Document {
    users: Types.ObjectId;
    lastMessage?: Types.ObjectId;
    content: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date

    shortPreview?: string //virtual field

    softDelete(): Promise<IMessage>;
    restore(): Promise<IMessage>;
    generatePreview(): string;
}