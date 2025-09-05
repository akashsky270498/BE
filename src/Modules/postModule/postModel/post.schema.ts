import { Schema } from "mongoose";
import { POST_MODEL_CONSTANTS } from "../../../utils/constants";
import { DEFAULT_VALUES } from "../../../utils/constants";

export const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: [POST_MODEL_CONSTANTS.MAX_COMMENT_LENGTH, "Comments must be less than 1000 chracters."],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
    },

    likes: [{
        types: Schema.Types.ObjectId,
        ref: "User",
    }],

    isDeleted: {
        type: Boolean,
        default: false,
    }
});

const postSchema = new Schema({

    caption: {
        type: String,
        required: [true, "Caption is required."],
        maxlength: [POST_MODEL_CONSTANTS.MAX_CAPTION_LENGTH, "Caption must be less then 2200 characters."],
    },

    mediaUrl: {
        type: String,
        trime: true,
    },

    mediaType: {
        type: String,
        enum: ["image", "video"],
        default: "image",
    },

    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true
        }
    ],

    savedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true
        }
    ],

    comments: [commentSchema],

    likeCount: {
        type: Number,
        default: DEFAULT_VALUES.ZERO,
        min: DEFAULT_VALUES.MIN,
        index: true,
    },

    commentCount: {
        type: Number,
        default: DEFAULT_VALUES.ZERO,
        min: DEFAULT_VALUES.MIN,
        index: true,
    },

    saveCount: {
        type: Number,
        default: DEFAULT_VALUES.ZERO,
        min: DEFAULT_VALUES.MIN,
        index: true,
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default postSchema;