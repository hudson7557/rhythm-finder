var GenreModel = require("../models/genre");
var GenreServices = {};

GenreServices.getAllGenres = () => {
    return new Promise((resolve, reject) => {
        GenreModel.getAllGenres()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.genreId,
                        "name": element.genreName
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

module.exports = GenreServices;
