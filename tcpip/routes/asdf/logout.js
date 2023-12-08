var express = require("express");
var router = express.Router();

/* GET login page. */
router.get("/", (req, res) => {
  if (req.session.user) {
    console.log("로그아웃");

    req.session.destroy(function (err) {
      if (err) throw err;
      console.log("세션 삭제하고 로그아웃됨");
      res.redirect("/main");
    });
  } else {
    console.log("로그인 상태 아님");
    res.redirect("/main");
  }
});

module.exports = router;
