import express from "express";
import path from "path";
import dotenv from "dotenv";
import ejs from "ejs";
import { connectToMongoDB } from "./config/dbConnection.js";
import session from "express-session";
import MongoStore from "connect-mongo";

import {
  getLoginController,
  getSignupController,
  postSignupController,
} from "./src/features/user/controllers/user.controller.js";

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

server.set("view engine", "ejs");
server.set(
  "views",
  path.join(path.resolve(), "src", "features", "user", "views")
);

server.get("/login", getLoginController);
server.get("/signup", getSignupController);
server.post("/signup", postSignupController);

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
