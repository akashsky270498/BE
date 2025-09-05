import mongoose, { Model } from "mongoose";
import chatSchema from "./chat.schema";
import addChatVirtuals from "./chat.virtuals";
import addChatMiddleware from "./chat.middleware";
import addChatIndexes from "./chat.indexes";
import { IChat } from "../chatInterface/chat.interface";

addChatVirtuals(chatSchema);
addChatMiddleware(chatSchema);
addChatIndexes(chatSchema);

const ChatModel: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default ChatModel;