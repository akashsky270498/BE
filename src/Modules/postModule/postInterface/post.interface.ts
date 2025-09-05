import { Document, Types } from "mongoose";

export interface IComment {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    comment: string;
    createdAt: Date;
    updatedAt?: Date;
    likes?: Types.ObjectId[]; // Optional field if user likes the comment;
    isDeleted?: boolean;
}

export interface IPost extends Document {
    _id: Types.ObjectId;
    caption?: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    postedBy: Types.ObjectId;
    likedBy: Types.ObjectId[];
    comments: IComment[];
    savedBy: Types.ObjectId[];
    likeCount: number;
    commentCount: number;
    saveCount: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    isLiked?: boolean;
    isSaved?: boolean;
    _userId?: Types.ObjectId;
    taggedUsers?: Types.ObjectId[];
}