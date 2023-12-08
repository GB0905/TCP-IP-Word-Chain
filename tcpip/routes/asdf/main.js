// const login = require("../routes/login.js");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("main_loggedin", { id: req.session.user.u_id });
  } else {
    res.render("main", { title: "title" });
  }
});
// router.get("/", function (req, res, next) {
// });

module.exports = router;
