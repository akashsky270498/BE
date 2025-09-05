import { Schema } from "mongoose";
import { MONGO_INDEX_DIRECTIONS } from "../../../utils/constants";

export default function addChatIndexes(schema: Schema): void {
    schema.index({ users: MONGO_INDEX_DIRECTIONS.ASC });
    schema.index({ latestMessage: MONGO_INDEX_DIRECTIONS.ASC });
    schema.index({ users: MONGO_INDEX_DIRECTIONS.ASC }, { unique: true });
}