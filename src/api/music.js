var express = require("express");
var router  = express.Router();
var SongServices   = require("../services/song");
var ArtistServices = require("../services/artist");
var AlbumServices  = require("../services/album");
var GenreServices  = require("../services/genre");

router.route("/")
    .get((req, res, next) => {
        SongServices.getAllSongs()
            .then((result) => {
                console.log(result);
                res.render("music", { "items": result, "header": "Songs" });
            })
            .catch((err) => {
                next(err);
            });
    })

router.route("/add")
    .get((req, res) => {
        res.render("add-music");
    });
    // add POST ROUTE here

router.route("/artists")
    .get((req, res, next) => {
    ArtistServices.getAllArtists()
        .then((result) => {
            console.log(result);
            res.render("music", {
                "items": result,
                "header": "Artists"
            });
        })
        .catch((err) => {
            next(err);
        });
    })

router.route("/albums")
    .get((req, res, next) => {
        AlbumServices.getAllAlbums()
            .then((result) => {
                console.log(result);
                res.render("music", {
                    "items": result,
                    "header": "Albums"
                });
            })
            .catch((err) => {
                next(err);
            });
        })

router.route("/genres")
    .get((req, res, next) => {
        GenreServices.getAllGenres()
            .then((result) => {
                res.render("genres", { "items": result });
            })
            .catch((err) => {
                next(err);
            });
        })

module.exports = router;