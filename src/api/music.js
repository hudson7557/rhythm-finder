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
    .get((req, res, next) => {
    ArtistServices.getAllArtists()
        .then((result) => {
            console.log(result);
            res.render("music", {
                "items": result,
                "header": "All Artists",
                "description": "Artist Name"
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
                    "header": "All Albums",
                    "description": "Album Name"
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
                console.log(result);
                res.render("music", {
                    "items": result,
                    "header": "All Genres",
                    "description": "Genre Name"
                });
                })
            .catch((err) => {
                next(err);
            });
        })

module.exports = router;