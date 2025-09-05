import { Schema } from "mongoose";
import IMessage from "../messageInterface/message.interface";

export default function addMessageMiddleware(schema: Schema) {
    schema.pre("save", function (this: IMessage, next) {
        if (this.isModified("content") && this.content) {
            this.content = this.content.trim();
        }
        next();
    });
}