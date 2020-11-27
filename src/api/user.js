var express = require("express");
var router = express.Router();
var UserServices = require("../services/user");

router.route("/")
    .get((req, res, next) => {
        UserServices.getAllUsers()
            .then((result) => {
                console.log("get all users: ");
                console.log(result);
                res.render("all-users", { "items": result });
            })
            .catch((err) => {
                next(err);
            });
})

router.route("/:id")
    .get((req, res, next) => {
        UserServices.getUserSongs(req.params.id)
            .then((result) => {
                console.log(result);
                res.render("songs", { 
                    "header": `${result.name}'s Saved Songs`,
                    "items": result.results
                });
            })
            .catch((err) => {
                next(err);
            });
})

router.route("/songs/all")
    .get((req, res, next) => {
        UserServices.getAllUsersSongs()
            .then((result) => {
                console.log(result);
                res.render("user-songs", {
                    "items": result[0],
                    "songs": result[1],
                    "users": result[2],
                    "formAddress": "http://localhost:3306/user/songs/all"
                });
            })
            .catch((err) => {
                next(err);
            });
    })
    .post((req, res, next) => {
        UserServices.addUserSong(req.body.songName, req.body.userName)
            .then(() => {
                res.redirect("/user/songs/all");
            })
            .catch((err) => {
                next(err);
            });
    });



module.exports = router;
