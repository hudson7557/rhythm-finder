var faker = require('faker');
var ArtistModel = require("../models/artist");
var ArtistServices = {};

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

ArtistServices.getAllArtistsByGenre = (genreId) => {
    return new Promise((resolve, reject) => {
        ArtistModel.getAllArtistsByGenre(genreId)
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
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

module.exports = ArtistServices;
