import { Schema } from "mongoose";
import { IChat } from "../chatInterface/chat.interface";

export default function addChatMiddleware(schema: Schema<IChat>) {
    schema.pre("save", function (this: IChat, next) {
        const chat = this as IChat;
        if (!chat.users || chat.users?.length < 2) {
            return next(new Error("A chat must have atleast two users."));
        }
        next();
    })
}