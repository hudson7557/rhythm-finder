var express = require("express");
var router = express.Router();

router.route("/")
    .get(function(req, res) {
        res.render("all-music");
    });

router.route("/add")
    .get(function(req, res) {
        res.render("add-music");
    });

router.route("/artists")
    .get(function(req, res) {
        res.render("artists");
    });

router.route("/songs")
    .get(function(req, res) {
        res.render("songs");
    });

router.route("/albums")
    .get(function(req, res) {
        res.render("albums");
    });

module.exports = router;
