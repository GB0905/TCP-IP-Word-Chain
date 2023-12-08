var express = require("express");
var router = express.Router();
const getConnection = require("../db/db");

("use strict");

/* GET login page. */

/* POST login page. */
router.post("/", (req, res, next) => {
  const { id } = req.body;
  const { pw } = req.body;

  getConnection((conn) => {
    const sql = `SELECT * FROM user WHERE u_id = '${id}'`;
    conn.query(sql, (err, result, fields) => {
      if (result[0]?.u_pw) {
        if (result[0].u_pw === pw) {
          req.session.user = result[0];
          return res.json({
            success: true,
          });
          conn.release();
        }
      } else {
        console.log("아이디 x");
      }
      return res.json({
        success: false,
        message: "아이디 또는 비밀번호가 일치하지 않습니다.",
      });
    });
  });
});

module.exports = router;
