import {Schema} from "mongoose";
import { MSG_LENGTH } from "../../../utils/constants";

export default function addMessageMethods(schema: Schema) {
    schema.methods.softDelete = async function() {
        this.isDeleted = true;
        await this.save();
        return this;
    };

    schema.methods.restore = async function() {
        this.restore = false;
        await this.save();
        return this;
    };

    schema.methods.generatePreview = function() {
        return this.content.length > MSG_LENGTH.MAX_PREVIEW ? this.content.substring(MSG_LENGTH.MIN, MSG_LENGTH.MAX_PREVIEW) + "..." : this.content;
    };
}