const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "pug");

app.get("/login", (req, res) => {
  res.render("contents/login");
});
app.get("/register", (req, res) => {
  res.render("contents/register");
});
app.get("/dashboard", (req, res) => {
  res.render("contents/dashboard");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
