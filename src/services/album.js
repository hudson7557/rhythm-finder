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
                        "genre": element.genreName,
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

AlbumServices.getAlbumsByGenres = (genreId) => {
    return new Promise((resolve, reject) => {
        AlbumModel.getAlbumsByGenres(genreId)
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var image = faker.image.image();
                    var processed = {
                        "id": element.albumId,
                        "name": element.albumName,
                        "genre": element.genreName,
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
