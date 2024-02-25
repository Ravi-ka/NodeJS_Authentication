import mongoose from "mongoose";
import crypto from "crypto";

export const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
  },
});

export const UserModel = mongoose.model("User", userSchema);
