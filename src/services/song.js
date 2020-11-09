var SongModel = require("../models/song");
var SongServices = {};

SongServices.getAllSongs = () => {
    return new Promise((resolve, reject) => {
        SongModel.getAllSongs()
            .then(resolve)
            .catch(reject);
    });
};

module.exports = SongServices;
