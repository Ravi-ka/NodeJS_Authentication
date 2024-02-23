import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    maxLength: [30, "Username can't exceed 30 characters"],
    minLength: [2, "Username should be more than 2 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export const UserModel = mongoose.model("User", userSchema);
