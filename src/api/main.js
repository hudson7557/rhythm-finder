var express = require("express");
var router = express.Router();

router.route("/")
    .get(function(req, res) {
        res.render("splash");
    });

router.route("/signup")
    .get(function(req, res) {
        res.render("signup");
    });

router.route("/login")
    .get(function(req, res) {
        res.render("login");
    });

module.exports = router;
