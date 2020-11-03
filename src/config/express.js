var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({
    "defaultLayout": "main",
});
var bodyParser = require("body-parser");
var path = require("path");
var config = require("./config");

var settings = function(app) {
    app.use(bodyParser.urlencoded({ "extended": true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(process.cwd(), "/public")));
    app.engine("handlebars", handlebars.engine);
    app.set("view engine", "handlebars");
    app.set("views", path.join(process.cwd(), "/public/views"));

    app.use("/", require("../api/main"));
    app.use("/music", require("../api/music"));
    app.use("/account", require("../api/account"));

    app.use(handleError404);
    app.use(handleError500);
};

function handleError404(req, res) {
    res.status(404);
    res.render("error", {"errorMessage": "404: Page Not Found"}); 
};

function handleError500(error, req, res, next) {
    console.error(error.stack);
    res.status(500);
    res.render("error", {"errorMessage": "500: Internal Server Error"});
};

module.exports = settings;

