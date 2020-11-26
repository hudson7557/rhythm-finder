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
                    "items": result,
                    "header": "Songs: Detailed Information"
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

router.route("/songs")
    .get((req, res, next) => {
        SongServices.getSongs()
            .then((result) => {
                console.log(result)
                res.render("songs", {
                    "addSongs": true,
                    "header": "Songs",
                    "formHeader": "Add New Song",
                    "items": result[0],
                    "artists": result[1],
                    "albums": result[2]
                });
            })
            .catch((err) => {
                next(err);
            });
    })

router.route("/artists")
    .get((req, res, next) => {
    ArtistServices.getAllArtists()
        .then((result) => {
            console.log(result);
            res.render("artists", {
                "items": result,
                "header": "Artists",
                "formHeader": "Add New Artist"
            });
        })
        .catch((err) => {
            next(err);
        });
    })
    .post((req, res, next) => {
        ArtistServices.createArtist(req.body.artistName)
            .then(function(result) {
                res.redirect("/music/artists");
            })
            .catch(function(err) {
                next(err);
            });
    });

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
    .post((req, res, next) => {
        AlbumServices.createAlbum(req.body.albumName)
            .then(function(result) {
                res.redirect("/music/albums");
            })
            .catch(function(err) {
                next(err);
            });
    });

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
    .post((req, res, next) => {
        GenreServices.createGenre(req.body.genreName)
            .then(function(result) {
                res.redirect("/music/genres");
            })
            .catch(function(err) {
                next(err);
            });
    });

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

router.route("/albums-genre/")
    .get((req, res, next) => {
        AlbumServices.getAllAlbumsByGenre()
        .then((result) => {
            console.log(result)
            res.render("albums", {
                "items": result.results,
                "header": `Albums by Genre`
            });
        })
        .catch((err) => {
            next(err);
        });
    })  

router.route("/artists-genre/")
    .get((req, res, next) => {
        ArtistServices.getAllArtistsByGenre()
        .then((result) => {
            console.log(result)
            res.render("artists", {
                "items": result.results,
                "header": "Artists by Genre",
                "formHeader": "Add Genre to Artist"
            });
        })
        .catch((err) => {
            next(err);
        });
    })  

router.route("/artists-genre/:id")
        .get((req, res, next) => {
        ArtistServices.getArtistsByGenre(req.params.id)
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

router.route("/songs-genre/")
    .get((req, res, next) => {
    SongServices.getAllSongsByGenre()
    .then((result) => {
        console.log(result);
        res.render("songs", {
            "items": result.results,
            "addSongs": true,
            "header": "Songs by Genre",
            "formHeader": "Add Genre to Song",
            "songs": result.results,
            "genres": true
        });
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
            res.render("songs", {
                "header": "No songs found under that genre"
            });
        }
    })
    .catch((err) => {
        next(err);
    });
})  

router.route("/songs-artist/")
    .get((req, res, next) => {
        SongServices.getAllSongsByArtist()
            .then((result) => {
                console.log(result);
                res.render("songs", {
                    "songs": result[0],
                    "artists": result[1],
                    "items": result[0],
                    "addSongs": true,
                    "header": "All Songs by Artists",
                    "formHeader": "Add Artist to Song"
                });
            })
            .catch((err) => {
                next(err);
            });
        })

router.route("/songs-artist/:id")
    .get((req, res, next) => {
        SongServices.getSongsByArtist(req.params.id)
            .then((result) => {
                if (result.results.length > 0) {
                    console.log(result);
                    res.render("songs", {
                        "items": result.results,
                        "header": `Songs By ${result.artist}`
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
                if (result.results.length > 0) {
                    console.log(result);
                    res.render("songs", {
                        "items": result.results,
                        "header": `Songs in ${result.album}`
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