var express = require("express");
var router = express.Router();
var SongServices = require("../services/song");

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
        res.render("all-music");
    });

router.route("/songs")
    .get(function(req, res, next) {
        SongServices.getAllSongs()
            .then((result) => {
                console.log("get all songs: ");
                console.log(result);
                res.render("all-music", { "items": result, "header": "All Songs" });
            })
            .catch(function(err) {
                next(err);
            });
})

router.route("/albums")
    .get(function(req, res) {
        res.render("albums");
    });

router.route("/genres")
    .get(function(req, res) {
        res.render("genres");
    });

module.exports = router;
