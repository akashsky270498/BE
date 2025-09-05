import { Schema, Types } from "mongoose";

const chatSchema = new Schema({
  users: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],
    validate: {
      validator: (val: Types.ObjectId[]): boolean => val.length === 2,
      message: "Chat must have exactly two users."
    },
    index: true,
    required: true
  },

  latestMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
    default: null,
    index: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default chatSchema;
