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
                        "name": element.artistName
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

module.exports = ArtistServices;
