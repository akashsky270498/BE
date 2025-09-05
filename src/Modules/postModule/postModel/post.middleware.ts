import { Schema, UpdateQuery } from "mongoose";
import { IPost } from "../postInterface/post.interface";
import { DEFAULT_VALUES } from "../../../utils/constants";

export default function addPostMiddleware(schema: Schema) {
    schema.pre<IPost>("save", function (next) {
        this.likeCount = this.likedBy?.length || DEFAULT_VALUES.ZERO;
        this.commentCount = this.comments?.length || DEFAULT_VALUES.ZERO;
        next();
    });

    const updateHooks = ["updateOne", "findOneAndUpdate"] as const;

    updateHooks.forEach((hook) => {
        schema.pre(hook, function (next) {
            const update = this.getUpdate() as UpdateQuery<IPost>;

            if (!update) return next();

            const set = update.$set || {};

            if ("likedBy" in set && Array.isArray(set.likedBy)) {
                set.likeCount = set.likedBy.length;
            }

            if ("comments" in set && Array.isArray(set.comments)) {
                set.commentCount = set.comments.length;
            }

            if (Object.keys(set).length > DEFAULT_VALUES.ZERO) {
                update.$set = set;
            }

            next();
        });
    });
}
