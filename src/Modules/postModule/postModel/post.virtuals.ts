import { Schema } from "mongoose";
import {IPost } from "../postInterface/post.interface"
import { DEFAULT_VALUES } from "../../../utils/constants";
export default function addPostVirtuals(schema: Schema) {
    schema.virtual("isLiked").get(function (this: IPost) {
        return this._userId ? this.likedBy?.includes(this._userId) : false;
    });

    schema.virtual("isSaved").get(function (this: IPost) {
        return this._userId ? this.savedBy?.includes(this._userId) : false;
    });

    schema.virtual("likeCountVirtual").get (function (this: IPost) {
        return this.likedBy?.length || DEFAULT_VALUES.ZERO;
    });

    schema.virtual("saveCountVirtual").get(function (this: IPost) {
        return this.savedBy?.length || DEFAULT_VALUES.ZERO;
    });

    schema.virtual("commentCountVirtual").get(function (this: IPost) {
        return this.comments?.length || DEFAULT_VALUES.ZERO;
    });
}