import { UserModel } from '../userModel/user.model';
import { IUser } from "../userInterface/user.interface";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from "../../../config/env.config";
import { DEFAULT_VALUES } from "../../../utils/constants";

export const checkExistingUser = async (email: string, username: string) => {
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });
  return existingUser;
};

export const createNewUser = async (userData: unknown) => {
  const createUser = await UserModel.create(userData);
  return createUser;
};

export const sanitizedUser = async (userId: string) => {
  const sanitizedUser = await UserModel.findById(userId).select('-password -refreshToken -blockedUsers -blockedBy -posts -saved -followers -followings');
  return sanitizedUser;
};

export async function comparePassword(this: IUser, enteredPassword: string): Promise<boolean> {
  if (!enteredPassword) {
    throw new Error("Entered password is required for comparison.");
  }

  if (!this.password) {
    throw new Error("User does not have a stored password hash.");
  }

  return await bcrypt.compare(enteredPassword, this.password);
}


export function generateAccessTokenSync(this: IUser): string {
    const payload = {
        id: this.id,
        username: this.username,
        fullName: this.name,
        email: this.email,
    };

    const secret = env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const jwtOptions: SignOptions = {
        expiresIn: env.JWT_EXPIRE as jwt.SignOptions['expiresIn']
    };

    return jwt.sign(payload, secret, jwtOptions);
}

export function generateRefreshTokenSync(this: IUser): string {
    const payload = {
        id: this.id,
    };

    const secret = env.REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
    }

    const jwtOptions: jwt.SignOptions = {
        expiresIn: env.REFRESH_TOKEN_EXPIRE as jwt.SignOptions['expiresIn']
    };

    return jwt.sign(payload, secret, jwtOptions);
}

export async function generateResetPasswordToken(this: IUser): Promise<string> {
    const resetToken = crypto.randomBytes(DEFAULT_VALUES.TWENTY).toString("hex");
    this.resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    return resetToken;
}

export function canViewProfileOf(this: IUser, targetUser: IUser): boolean {
    if (!targetUser.isPrivate) return true;
    return targetUser.followers.some(f => f.toString() === this._id.toString());
}

export async function toggleFollow(this: IUser, targetUser: IUser): Promise<void> {
    const isFollowing = this.followings.some(f => f.toString() === targetUser._id.toString())

    if (isFollowing) {
        this.followings = this.followings.filter(f => f.toString() !== targetUser._id.toString());
        targetUser.followers = targetUser.followers.filter(f => f.toString() !== this._id.toString());
    } else {
        this.followings.push(targetUser._id);
        targetUser.followers.push(this._id);
    }

    await this.save();
    await targetUser.save();
}