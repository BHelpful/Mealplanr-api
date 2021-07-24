import mongoose from "mongoose";
const m2s = require('mongoose-to-swagger');
import { UserDocument } from "../user/user.model";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const sessionModel = mongoose.model<SessionDocument>("session", SessionSchema);

export const sessionSM = m2s(sessionModel);

export default sessionModel;