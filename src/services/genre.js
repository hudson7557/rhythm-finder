var GenreModel = require("../models/genre");
var GenreServices = {};

GenreServices.getAllGenres = () => {
    return new Promise((resolve, reject) => {
        GenreModel.getAllGenres()
            .then(resolve)
            .catch(reject);
    });
};

module.exports = GenreServices;
