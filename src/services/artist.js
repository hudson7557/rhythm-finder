var faker = require('faker');
var ArtistModel = require("../models/artist");
var GenreModel = require("../models/genre");
var ArtistServices = {};

// Read Services

ArtistServices.getAllArtists = () => {
    return new Promise((resolve, reject) => {
        ArtistModel.getAllArtists()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.artistId,
                        "name": element.artistName,
                        "genre": element.genreName,
                        "description": `Known for ${faker.commerce.productAdjective()} music`,
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

ArtistServices.getAllArtistsByGenre = () => {
    var artists = new Promise((resolve, reject) => {
        ArtistModel.getAllArtistsByGenre()
            .then((results) => {
                var processedResults = [];
                results.forEach(element => {
                    var processed = {
                        "id": element.artistId,
                        "name": element.artistName,
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

    return Promise.all([artists, genres]);
};

ArtistServices.getArtistsByGenre = (genreId) => {
    return new Promise((resolve, reject) => {
        ArtistModel.getArtistsByGenre(genreId)
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.artistId,
                        "name": element.artistName,
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

ArtistServices.createArtist = (artistName) => {
    return new Promise((resolve, reject) => {
        ArtistModel.createArtist(artistName)
        .then(resolve)
        .catch(reject);
    })
}

ArtistServices.addArtistGenre = (artist, genre) => {
    return new Promise((resolve, reject) => {
        ArtistModel.addArtistGenre(artist, genre)
        .then(resolve)
        .catch(reject);
    })
}


module.exports = ArtistServices;
