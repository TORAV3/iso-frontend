const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { checkToken, checkInternal } = require("./middlewares/checkToken");
require("dotenv").config();

const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "pug");

app.get("/login", (req, res) => {
  res.render("contents/login");
});

app.get("/register", (req, res) => {
  res.render("contents/register");
});

app.get("/manajemen-user", checkToken, checkInternal, (req, res) => {
  res.render("contents/muser/index");
});

app.get("/manajemen-user/detail/:id", checkToken, checkInternal, (req, res) => {
  const id = req.params.id;
  res.render("contents/muser/form", { id });
});

app.get("/user-access", checkToken, checkInternal, (req, res) => {
  res.render("contents/usaccess/index");
});

app.get("/user-access/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/usaccess/formTambah");
});

app.get("/user-access/edit/:id", checkToken, checkInternal, (req, res) => {
  const id = req.params.id;
  res.render("contents/usaccess/form", { id });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
