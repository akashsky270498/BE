import { Schema } from "mongoose";
import { MSG_LENGTH } from "../../../utils/constants";

const messageSchema = new Schema({

    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
        index: true,
    },

    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: MSG_LENGTH.MAX,
    },

    isDeleted: {
        type: Boolean,
        default: false,
        index: true,
    },
}, {
    timestamps: true,
    virtualKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default messageSchema;
