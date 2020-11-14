var faker = require('faker');
var SongModel = require("../models/song");
var SongServices = {};

SongServices.getAllSongs = () => {
    return new Promise((resolve, reject) => {
        SongModel.getAllSongs()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                        "description": faker.commerce.productAdjective(),
                        "location": faker.address.state(),
                        "album": element.albumName
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

SongServices.getAllSongsGenres = () => {
    return new Promise((resolve, reject) => {
        SongModel.getAllSongsGenres()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                        "description": faker.commerce.productAdjective(),
                        "location": faker.address.state(),
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

module.exports = SongServices;
