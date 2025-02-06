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

app.get("/manajemen-kelas", checkToken, (req, res) => {
  res.render("contents/mkelas/index");
});

app.get("/manajemen-kelas/edit/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/mkelas/form", { id });
});

app.get("/manajemen-kelas/form", checkToken, (req, res) => {
  res.render("contents/mkelas/form");
});

app.get("/kelas", checkToken, (req, res) => {
  const userStatus = res.locals.userData.status;
  res.render("contents/class/index", { userStatus });
});

app.get("/kelas/join/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/class/join", { id });
});

app.get("/kelas/detail/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/class/detail", { id });
});

app.get("/kelas/ujian/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/class/ujian", { id });
});

app.get("/member/register", checkToken, (req, res) => {
  const userData = res.locals.userData;
  const userVar = {
    id: userData.id,
    fullname: userData.fullname,
    email: userData.email,
    phone: userData.phone,
  };
  res.render("contents/member/register", { userVar });
});

app.get(
  "/manajemen-wawancara/pertanyaan",
  checkToken,
  checkInternal,
  (req, res) => {
    res.render("contents/mwawancara/index");
  }
);

app.get(
  "/manajemen-wawancara/pertanyaan/tambah",
  checkToken,
  checkInternal,
  (req, res) => {
    res.render("contents/mwawancara/form");
  }
);

app.get("/manajemen-soal", checkToken, checkInternal, (req, res) => {
  res.render("contents/msoal/index");
});

app.get("/manajemen-soal/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/msoal/form");
});

app.get("/manajemen-soal/edit/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/msoal/form", { id });
});

app.get("/test", checkToken, (req, res) => {
  res.render("test");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
