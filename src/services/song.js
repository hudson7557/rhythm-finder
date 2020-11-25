var faker = require('faker');
var SongModel = require("../models/song");
var SongServices = {};

SongServices.getSongs = () => {
    return new Promise((resolve, reject) => {
        SongModel.getSongs()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                        "album": element.albumName
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

SongServices.getAllSongs = () => {
    return new Promise((resolve, reject) => {
        SongModel.getAllSongs()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                        "artist": element.artistName,
                        "album": element.albumName,
                        "genre": element.genreName,
                        "description": faker.commerce.productAdjective(),
                        "location": faker.address.state()
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
};

SongServices.getAllSongsByArtist = () => {
    return new Promise((resolve, reject) => {
        SongModel.getAllSongsByArtist()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                        "artist": element.artistName
                    }
                    processedResults.push(processed);
                });
                return { "results": processedResults }
            })
            .then(resolve)
            .catch(reject);
    });
};

SongServices.getSongsByArtist = (artistId) => {
    return new Promise((resolve, reject) => {
        SongModel.getSongsByArtist(artistId)
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                    }
                    processedResults.push(processed);
                });
                if (results.length > 0) {
                    return {
                        "artist": results[0].artistName, "results": processedResults
                    }
                }
                return { "results": [] };
            })
            .then(resolve)
            .catch(reject);
    });
};

SongServices.getSongsByAlbum = (albumId) => {
    return new Promise((resolve, reject) => {
        SongModel.getSongsByAlbum(albumId)
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                    }
                    processedResults.push(processed);
                });
                if (results.length > 0) {
                    return {
                        "album": results[0].albumName, "results": processedResults
                    }
                }
                return { "results": [] };
            })
            .then(resolve)
            .catch(reject);
    });
};

SongServices.getAllSongsByGenre = () => {
    return new Promise((resolve, reject) => {
        SongModel.getAllSongsByGenre()
        .then((results) => {
            var processedResults = []
            results.forEach(element => {
                var processed = {
                    "id": element.songId,
                    "name": element.songName,
                    "artist": element.artistName,
                    "album": element.albumName,
                    "genre": element.genreName
                }
                processedResults.push(processed);
            });
            return { "results": processedResults }
        })
        .then(resolve)
        .catch(reject);
    });
};

SongServices.getSongsByGenre = (genreId) => {
    return new Promise((resolve, reject) => {
        SongModel.getSongsByGenre(genreId)
        .then((results) => {
            var processedResults = []
            results.forEach(element => {
                var processed = {
                    "id": element.songId,
                    "name": element.songName,
                    "artist": element.artistName,
                    "album": element.albumName,
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

module.exports = SongServices;
