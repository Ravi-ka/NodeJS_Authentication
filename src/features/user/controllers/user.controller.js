import bcrypt from "bcrypt";

import { signupRepo } from "../models/user.repository.js";
import { sendWelcomeEmail } from "../../../../utils/emails/welcomeMail.js";

export const getLoginController = async (req, res) => {
  try {
    const errorMessage = req.flash("error")[0];
    return res.render("login", { errorMessage });
  } catch (error) {
    console.log(error);
  }
};

export const getSignupController = async (req, res) => {
  try {
    return res.render("signup", { errors: null });
  } catch (error) {
    console.log(error);
  }
};

export const postSignupController = async (req, res) => {
  try {
    let errors = [];
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      email: req.body.email,
      password: password,
    };
    const result = await signupRepo(newUser);
    if (result.code === 11000) {
      errors.push("Email already registered");
    }
    if (errors.length >= 1) {
      return res.render("signup", { errors: errors });
    }

    await sendWelcomeEmail(newUser);
    return res.redirect("login");
  } catch (error) {
    console.log(error);
  }
};

export const postLoginController = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

export const getLogout = async (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error logging out");
      }
      res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging out");
  }
};

export const getSecuredPath = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.render("homepage");
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getResetPasswordView = async (req, res) => {
  try {
    res.render("resetPasswordView", { error: null });
  } catch (error) {
    console.log(error);
  }
};
