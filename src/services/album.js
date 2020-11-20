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

AlbumServices.getAlbumsByGenre = (genreId) => {
    return new Promise((resolve, reject) => {
        AlbumModel.getAlbumsByGenre(genreId)
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var image = faker.image.image();
                    var processed = {
                        "id": element.albumId,
                        "name": element.albumName,
                        "img": image
                    }
                    processedResults.push(processed);
                });
                if (results.length > 0) {
                    return {
                        "genre": results[0].genreName, "results": processedResults
                    }
                }
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

module.exports = AlbumServices;
