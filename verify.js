const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports.isLoggedIn = async function (req, res, next) {
  if (!req.session.passport) {
    res.redirect("/login");
  } else {
    next();
  }
};
