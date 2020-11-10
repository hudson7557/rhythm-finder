var express = require("express");
var router = express.Router();

router.route("/")
    .get((req, res) => {
        res.render("splash");
    });

router.route("/signup")
    .get((req, res) => {
        res.render("signup");
    });

router.route("/login")
    .get((req, res) => {
        res.render("login");
    });

module.exports = router;
