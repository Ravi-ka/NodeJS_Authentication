import mongoose from "mongoose";

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
});

export const UserModel = mongoose.model("User", userSchema);
