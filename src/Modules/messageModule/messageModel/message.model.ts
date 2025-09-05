import mongoose from "mongoose";
import messageSchema from "./message.schema";
import addMessageIndex from "./message.indexes";
import addMessageMiddleware from "./message.middleware";
import addMessageVirtuals from "./message.virtuals";
import addMessageMethods from "./message.methods";


addMessageIndex(messageSchema);
addMessageVirtuals(messageSchema);
addMessageMiddleware(messageSchema);
addMessageMethods(messageSchema);

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;