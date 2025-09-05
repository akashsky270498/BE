import { Schema } from "mongoose";
import { MONGO_INDEX_DIRECTIONS } from "../../../utils/constants";

export default function addPostIndexes(schema: Schema) {
    schema.index({ postedBy: MONGO_INDEX_DIRECTIONS.ASC, createdAt: MONGO_INDEX_DIRECTIONS.DESC });
    schema.index({ likeCount: MONGO_INDEX_DIRECTIONS.DESC });
    schema.index({ commentCount: MONGO_INDEX_DIRECTIONS.DESC });
    schema.index({ isDeleted: MONGO_INDEX_DIRECTIONS.ASC });
    schema.index({ isDeleted: MONGO_INDEX_DIRECTIONS.DESC, likeCount: MONGO_INDEX_DIRECTIONS.DESC });
    schema.index({ savedBy: MONGO_INDEX_DIRECTIONS.ASC });
}