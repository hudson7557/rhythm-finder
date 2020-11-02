var express = require("express");
var init = require("./config/loader");
var config = require("./config/config");

var startServer = () => {
    var app = express();
    init(app)
        .then(function() {
            app.listen(config.port, function() {
            console.log("Server connection establisted..\nListening on port " + config.port + "..");
        });
    });
};

startServer();
