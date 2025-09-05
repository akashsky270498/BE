import mongoose from "mongoose";
import postSchema from "./post.schema";
import addPostVirtuals from "./post.virtuals";
import addPostMiddleware from "./post.middleware";
import addPostIndexes from "./post.indexes";

addPostVirtuals(postSchema);
addPostMiddleware(postSchema);
addPostIndexes(postSchema);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;