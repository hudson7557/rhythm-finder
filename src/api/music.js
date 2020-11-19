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

router.route("/albums-genre/:id")
    .get((req, res, next) => {
        AlbumServices.getAlbumsByGenre(req.params.id)
            .then((result) => {
                if (result.results.length > 0) {
                    console.log(result);
                    res.render("albums", {
                        "items": result.results,
                        "header": `${result.genre} Albums`
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

router.route("/artists-genre/:id")
        .get((req, res, next) => {
        ArtistServices.getAllArtistsByGenre(req.params.id)
        .then((result) => {
            if (result.results.length > 0) {
                console.log(result);
                res.render("artists", {
                    "items": result.results,
                    "header": `${result.genre} Artists`
                });
            }
            else {
                res.render("albums", {
                    "header": "No artists found under that genre"
                });
            }
        })
        .catch((err) => {
            next(err);
        });
    })  

router.route("/songs-genre/:id")
    .get((req, res, next) => {
    SongServices.getSongsByGenre(req.params.id)
    .then((result) => {
        if (result.results.length > 0) {
            console.log(result);
            res.render("songs", {
                "items": result.results,
                "header": `${result.genre} Songs`
            });
        }
        else {
            res.render("albums", {
                "header": "No songs found under that genre"
            });
        }
    })
    .catch((err) => {
        next(err);
    });
})  


    router.route("/songs-artist/:id")
    .get((req, res, next) => {
        SongServices.getSongsByArtist(req.params.id)
            .then((result) => {
                if (result.length > 0) {
                    console.log(result);
                    res.render("songs", {
                        "items": result,
                        "header": `Songs by ${result[0].artist}`
                    });
                }
                else {
                    res.render("songs", {
                        "header": "No songs found under that artist"
                    });
                }
            })
            .catch((err) => {
                next(err);
            });
        })
    
router.route("/songs-album/:id")
    .get((req, res, next) => {
        SongServices.getSongsByAlbum(req.params.id)
            .then((result) => {
                if (result.length > 0) {
                    console.log(result);
                    res.render("songs", {
                        "items": result,
                        "header": `Songs in ${result[0].album}`
                    });
                }
                else {
                    res.render("songs", {
                        "header": "No songs found in that album"
                    });
                }
            })
            .catch((err) => {
                next(err);
            });
        })
        
module.exports = router;