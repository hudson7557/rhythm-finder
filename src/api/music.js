var express = require("express");
var router = express.Router();
var SongServices = require("../services/song");

router.route("/")
    .get((req, res, next) => {
        SongServices.getAllSongs()
            .then((result) => {
                console.log("get all songs: ");
                console.log(result);
                res.render("all-music", { "items": result, "header": "All Songs" });
            })
            .catch((err) => {
                next(err);
            });
})

router.route("/add")
    .get((req, res) => {
        res.render("add-music");
    });

router.route("/artists")
    .get((req, res) => {
        res.render("all-music");
    });

router.route("/albums")
    .get((req, res) => {
        res.render("all-music");
    });

router.route("/genres")
    .get((req, res) => {
        res.render("all-music");
    });

module.exports = router;
