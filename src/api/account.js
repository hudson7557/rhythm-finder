var express = require("express");
var router = express.Router();

router.route("/")
    .get(function(req, res) {
        res.render("user-music");
    });

router.route("/music")
    .get(function(req, res) {
        res.render("user-music");
    });

router.route("/profile")
    .get(function(req, res) {
        res.render("profile");
    });

module.exports = router;
