var express = require("express");
var init = require("./config/loader");
var config = require("./config/config");

var startServer = () => {
    var app = express();
    init(app)
        .then(() => {
            app.listen(config.port, () => {
            console.log(`Server connection establisted...\nListening on port ${config.port}...`);
        });
    });
};

startServer();
