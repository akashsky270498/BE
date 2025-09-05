import mongoose from "mongoose";
import { comparePassword, generateAccessTokenSync, generateResetPasswordToken, canViewProfileOf, toggleFollow } from "../userDBCall/user.dbcall";
import userSchema from "./user.schema";
import bcrypt from "bcrypt";
import { DEFAULT_VALUES } from "../../../utils/constants";

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(DEFAULT_VALUES.TEN);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.generateAccessTokenSync = generateAccessTokenSync;
userSchema.methods.generateResetPasswordToken = generateResetPasswordToken;
userSchema.methods.canViewProfileOf = canViewProfileOf;
userSchema.methods.toggleFOllow = toggleFollow;

//static method
userSchema.statics.searchUsers = async function (query: string) {
    return this.find({
        $or: [
            { username: new RegExp(query, "i") },
            { name: new RegExp(query, "i") },
        ],
        isPrivate: false
    }).select("name username avater");
};

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export const UserModel = mongoose.model("User", userSchema);