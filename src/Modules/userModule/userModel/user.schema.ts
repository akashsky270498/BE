import { Schema } from "mongoose";
import { DEFAULT_VALUES } from "../../../utils/constants";

const userSchema = new Schema({

    fullName: {
        type: String,
        required: [true, "Full Name is required."],
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        lowercase: true,
        unique: true
    },

    username: {
        type: String,
        required: [true, "Username is required."],
        trim: true,
        unique: true,
        lowercase: true,
        minlength: [DEFAULT_VALUES.THREE, "Username must be atleast 3 characters long."]
    },

    password: {
        type: String,
        required: [true, "Password is required."],
        trim: true,
        minlength: [DEFAULT_VALUES.EIGHT, "Password must be atleast 8 characters long."],
        select: false
    },

    avatar: {
        type: String,
        trim: true
    },

    bio: {
        type: String,
        default: "Hi, welcome to my profile."
    },

    website: {
        type: String,
        trim: true
    },

    isPrivate: {
        type: Boolean,
        default: false,
        index: true
    },

    blockedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    blockedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    refreshToken: {
        type: String,
        select: false
    },

    resetToken: {
        type: String,
        select: false
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    saved: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    followings: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true, versionKey: false });

export default userSchema;