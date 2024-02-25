import crypto from "crypto";
import { UserModel } from "../src/features/user/models/user.schema.js";

// This method creates a random crypto to for the reset-password flow
export const createPasswordResetToken = async (email) => {
  try {
    const resetToken = crypto.randomBytes(20).toString("hex");
    await UserModel.updateOne(
      { email: email },
      { $set: { token: resetToken } }
    );
    return resetToken;
  } catch (error) {
    console.log("Error while creating the token : " + error);
  }
};
