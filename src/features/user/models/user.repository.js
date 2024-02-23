import { UserModel } from "./user.schema.js";

export const signupRepo = async (userData) => {
  try {
    return await new UserModel(userData).save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already registered");
    } else console.log(error);
  }
};
