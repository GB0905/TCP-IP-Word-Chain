var express = require("express");
var router = express.Router();
const getConnection = require("../db/db");

("use strict");
/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("join", { title: "si" });
// });
router.post("/", (req, res, next) => {
  const { id } = req.body;
  const { pw } = req.body;
  const { name } = req.body;

  getConnection((conn) => {
    const sql = `INSERT INTO user(u_id, u_pw, u_name) VALUES ('${id}', '${pw}','${name}')`;
    conn.query(sql, (err, result, fields) => {
      if (err) throw err;
      return res.json({
        success: true,
      });
      conn.release();
    });
  });
});
module.exports = router;
