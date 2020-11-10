var express = require("express");
var router = express.Router();
var UserServices = require("../services/User");

router.route("/")
    .get((req, res) => {
        res.render("user-music");
    });

router.route("/music")
    .get((req, res) => {
        res.render("user-music");
    });

router.route("/profile")
    .get((req, res) => {
        res.render("user-profile");
    });

router.route("/all")
    .get((req, res, next) => {
        UserServices.getAllUsers()
            .then((result) => {
                console.log("get all users: ");
                console.log(result);
                res.render("all-users", { "items": result, "header": "All Users" });
            })
            .catch((err) => {
                next(err);
            });
})

module.exports = router;
