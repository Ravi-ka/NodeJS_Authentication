import express from "express";
import path from "path";
import dotenv from "dotenv";
import ejs from "ejs";
import { connectToMongoDB } from "./config/dbConnection.js";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import "./config/passport.js";
import passport from "passport";
import {
  getLoginController,
  getLogout,
  getSecuredPath,
  getSignupController,
  postLoginController,
  postSignupController,
} from "./src/features/user/controllers/user.controller.js";
//import { passportLocalStrategy } from "./config/passport.js";

const server = express();
const configPath = path.resolve("uat.env");
dotenv.config({ path: configPath });

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

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

server.set("view engine", "ejs");
server.set(
  "views",
  path.join(path.resolve(), "src", "features", "user", "views")
);

server.get("/login", getLoginController);
server.get("/signup", getSignupController);
server.post("/signup", postSignupController);
server.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/securedpath",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
//server.post("/login", postLoginController);
server.get("/logout", getLogout);
server.get("/securedpath", getSecuredPath);

server.get("/lib/noty.js", (req, res) => {
  res.type("application/javascript");
});

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
