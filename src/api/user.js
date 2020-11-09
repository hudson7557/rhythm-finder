var express = require("express");
var router = express.Router();
var UserServices = require("../services/User");

router.route("/")
    .get(function(req, res) {
        res.render("user-music");
    });

router.route("/music")
    .get(function(req, res) {
        res.render("user-music");
    });

router.route("/profile")
    .get(function(req, res) {
        res.render("user-profile");
    });

    router.route("/all")
    .get(function(req, res, next) {
        UserServices.getAllUsers()
            .then((result) => {
                console.log("get all users: ");
                console.log(result);
                res.render("all-users", { "items": result, "header": "All Users" });
            })
            .catch(function(err) {
                next(err);
            });
})

module.exports = router;
