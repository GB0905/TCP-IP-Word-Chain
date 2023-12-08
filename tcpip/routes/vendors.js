/* ./routes/vendors.js */

var express = require("express");
var router = express.Router();
var path = require("path");

router.use("/bootstrap", express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));
router.use("/socket.io", express.static(path.join(__dirname, "../node_modules/socket.io/client-dist")));

module.exports = router;
