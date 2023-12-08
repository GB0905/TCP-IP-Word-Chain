var express = require("express");
var router = express.Router();
const getConnection = require("../db/db");

("use strict");

/* GET login page. */

/* POST login page. */
router.post("/", (req, res, next) => {
  const { id } = req.body;
  // const { pw } = req.body;

  getConnection((conn) => {
    const sql = `SELECT u_id FROM user WHERE u_id = '${id}'`;
    conn.query(sql, (err, result, fields) => {
      if (result[0]?.u_id) {
        if (result[0].u_id === id) {
          return res.json({
            success: false,
            message: "이미 사용중인 아이디입니다.",
          });
        }
      } else {
        return res.json({
          success: true,
          message: "사용 가능한 아이디입니다..",
        });
        conn.release();
      }
    });
  });
});

module.exports = router;
