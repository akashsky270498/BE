import { Schema } from "mongoose";
import { MONGO_INDEX_DIRECTIONS } from "../../../utils/constants";

export default function addMessageIndex(schema: Schema) {
    schema.index({ sender: MONGO_INDEX_DIRECTIONS.ASC, createdAt: MONGO_INDEX_DIRECTIONS.DESC });
    schema.index({ chatId: MONGO_INDEX_DIRECTIONS.ASC, createdAt: MONGO_INDEX_DIRECTIONS.DESC });
    schema.index({ sender: MONGO_INDEX_DIRECTIONS.ASC, createdAt: MONGO_INDEX_DIRECTIONS.DESC }, { background: true });
    schema.index({ chatId: MONGO_INDEX_DIRECTIONS.ASC, createdAt: MONGO_INDEX_DIRECTIONS.DESC }, { background: true });

}