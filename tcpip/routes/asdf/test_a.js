var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("/test_a", { title: "test" });
});

// router.get('/index', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

module.exports = router;
