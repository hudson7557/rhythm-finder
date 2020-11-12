var express = require("express");
var router = express.Router();
var UserServices = require("../services/user");

router.route("/")
    .get((req, res) => {
        res.render("user-music");
    });

router.route("/music")
    .get((req, res) => {
        res.render("user-music");
    });

router.route("/profile")
.get((req, res, next) => {
    UserServices.getUser()
        .then((result) => {
            res.render("user-profile", { "user": result });
        })
        .catch((err) => {
            next(err);
        });
});

router.route("/all")
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

module.exports = router;
