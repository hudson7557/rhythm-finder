var databaseLoader = require("./mysql");
var expressSettings = require("./express");

var init = (app) => {
    return new Promise((resolve, reject) => {
        databaseLoader.connection()
        .then(() => {
            console.log("Database connection established...");
            expressSettings(app);
            resolve();
        })
        .catch((err) => {
            console.log(err)
        })    
    });
};

module.exports = init;
