var faker = require('faker');
var AlbumModel = require("../models/album");
var AlbumServices = {};

AlbumServices.getAllAlbums = () => {
    return new Promise((resolve, reject) => {
        AlbumModel.getAllAlbums()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var image = faker.image.image();
                    var processed = {
                        "id": element.albumId,
                        "name": element.albumName,
                        "description": `An album to ${faker.hacker.verb()} to`,
                        "location": faker.address.state(),
                        "img": image
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

module.exports = AlbumServices;
