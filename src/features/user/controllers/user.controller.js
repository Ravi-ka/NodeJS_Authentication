import bcrypt from "bcrypt";

import { signupRepo } from "../models/user.repository.js";

export const getLoginController = async (req, res) => {
  try {
    return res.render("login");
  } catch (error) {
    console.log(error);
  }
};

export const getSignupController = async (req, res) => {
  try {
    return res.render("signup");
  } catch (error) {
    console.log(error);
  }
};

export const postSignupController = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      email: req.body.email,
      password: password,
    };
    await signupRepo(newUser);
    return res.redirect("login");
  } catch (error) {
    console.log(error);
  }
};
