import express from "express";
import path from "path";
import dotenv from "dotenv";
import ejs from "ejs";
import { connectToMongoDB } from "./config/dbConnection.js";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import "./config/passport.js";
import "./config/googlePassport.js";
import passport from "passport";
import {
  getForgotPasswordView,
  getLoginController,
  getLogout,
  getResetPasswordView,
  getSecuredPath,
  getSignupController,
  postForgotPasswordView,
  postLoginController,
  postResetPasswordView,
  postSignupController,
} from "./src/features/user/controllers/user.controller.js";
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware.js";
//import { passportLocalStrategy } from "./config/passport.js";

const server = express();
// Dotenv setup
const configPath = path.resolve("uat.env");
dotenv.config({ path: configPath });

server.use(express.urlencoded({ extended: true }));
//Statically exposing the public folder
server.use(express.static("public"));

// Cookies setup
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

server.use(flash());
server.use(passport.initialize());
server.use(passport.session());

// ejs setup
server.set("view engine", "ejs");
server.set(
  "views",
  path.join(path.resolve(), "src", "features", "user", "views")
);

// Google Auth
server.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
server.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/homepage",
  })
);

// Routes
server.get("/", (req, res) => {
  res.send("default path");
});
server.get("/login", getLoginController);
server.get("/signup", getSignupController);
server.post("/signup", postSignupController);
server.post("/login", authenticationMiddleware);
server.get("/logout", getLogout);
server.get("/homepage", getSecuredPath);
server.get("/reset-password", getResetPasswordView);
server.post("/reset-password", postResetPasswordView);
server.get("/forgot-password", getForgotPasswordView);
server.post("/forgot-password", postForgotPasswordView);

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(
      "Error occurred while starting the server on " + process.env.PORT
    );
  } else {
    console.log("server is running on " + process.env.PORT);
    connectToMongoDB();
  }
});
