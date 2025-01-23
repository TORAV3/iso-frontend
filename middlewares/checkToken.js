const axios = require("axios");

const checkToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  req.token = token;

  next();
};

const checkInternal = (req, res, next) => {
  axios
    .get("http://localhost:3000/iso/api/login/data", {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      if (response.data.data.type === "internal") {
        res.locals.userData = response.data.data;
        res.locals.token = req.token;
        res.locals.url = req.originalUrl;
        next();
      } else {
        return response.redirect("/unathorized");
      }
    })
    .catch((err) => {
      if (err.status === 404 || err.status === 401) {
        return res.redirect("/login");
      } else {
        return res.redirect("/error");
      }
    });
};

module.exports = { checkToken, checkInternal };
