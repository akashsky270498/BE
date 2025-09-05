import { Schema } from "mongoose";
import IMessage  from "../messageInterface/message.interface"
import { MSG_LENGTH } from "../../../utils/constants";
export default function addMessageVirtuals(schema: Schema) {
    schema.virtual("shortPreview").get(function (this: IMessage) {
        return this.content?.slice(MSG_LENGTH.MIN, MSG_LENGTH.MAX_PREVIEW) + (this.content?.length > MSG_LENGTH.MAX_PREVIEW ? "..." : "")
    });
}