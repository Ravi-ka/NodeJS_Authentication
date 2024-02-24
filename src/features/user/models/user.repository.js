import { UserModel } from "./user.schema.js";

export const signupRepo = async (userData) => {
  try {
    return await new UserModel(userData).save();
  } catch (error) {
    if (error.code === 11000) {
      return error;
    } else console.log(error);
  }
};
