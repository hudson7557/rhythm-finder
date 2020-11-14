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
                res.render("songs", {
                    "items": result, "header": "Songs"
                });
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
            res.render("artists", {
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
                res.render("albums", {
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

router.route("/albums/genre/:id")
    .get((req, res, next) => {
        AlbumServices.getAlbumsByGenres(req.params.id)
            .then((result) => {
                if (result.length > 0) {
                    console.log(result);
                    res.render("albums", {
                        "items": result,
                        "header": `${result[0].genre} Albums`
                    });
                }
                else {
                    res.render("albums", {
                        "header": "No albums found under that genre"
                    });
                }
            })
            .catch((err) => {
                next(err);
            });
        })


module.exports = router;