var express = require("express");
var router = express.Router();

router.route("/")
    .get(function(req, res) {
        res.render("splash");
    });

router.route("/signup")
    .get(function(req, res) {
        res.render("splash");
    });

module.exports = router;
