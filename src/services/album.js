var AlbumModel = require("../models/album");
var AlbumServices = {};

AlbumServices.getAllAlbums = () => {
    return new Promise((resolve, reject) => {
        AlbumModel.getAllAlbums()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.albumId,
                        "name": element.albumName
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
