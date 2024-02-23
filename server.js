import express from "express";
import path from "path";
import dotenv from "dotenv";
import ejs from "ejs";

const server = express();
const configPath = path.resolve("uat.env");
dotenv.config({ path: configPath });

server.use(express.static("public"));

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.get("/login", (req, res) => {
  res.render("login");
});
server.get("/signup", (req, res) => {
  res.render("signup");
});

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(
      "Error occurred while starting the server on " + process.env.PORT
    );
  } else {
    console.log("server is running on " + process.env.PORT);
  }
});
