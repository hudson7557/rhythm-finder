var faker = require('faker');
var AlbumModel = require("../models/album");
var GenreModel = require("../models/genre");
var AlbumServices = {};

// Read Services

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

AlbumServices.getAllAlbumsByGenre = () => {
    var albums = new Promise((resolve, reject) => {
        AlbumModel.getAllAlbumsByGenre()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.albumId,
                        "name": element.albumName,
                        "genre": element.genreName
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });

    var genres = new Promise((resolve, reject) => {
        GenreModel.getAllGenres()
            .then(resolve)
            .catch(reject);
    });;

    return Promise.all([albums, genres]);
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
                return { "results": [] };
            })
            .then(resolve)
            .catch(reject);
    });
};

// Create Services

AlbumServices.createAlbum = (albumName) => {
    return new Promise((resolve, reject) => {
        AlbumModel.createAlbum(albumName)
        .then(resolve)
        .catch(reject);
    })
}

AlbumServices.addAlbumGenre = (album, genre) => {
    return new Promise((resolve, reject) => {
        AlbumModel.addAlbumGenre(album, genre)
        .then(resolve)
        .catch(reject);
    })
}

module.exports = AlbumServices;
