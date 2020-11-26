var faker = require('faker');
var SongModel = require("../models/song");
var ArtistModel = require("../models/artist");
var AlbumModel = require("../models/album");
var GenreModel = require("../models/genre");
var SongServices = {};

// Read Services

SongServices.getSongs = () => {
    var songs = new Promise((resolve, reject) => {
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

    var artists = new Promise((resolve, reject) => {
        ArtistModel.getAllArtists()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "artistId": element.artistId,
                        "artistName": element.artistName,
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
    
    var albums = new Promise((resolve, reject) => {
        AlbumModel.getAllAlbums()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "albumId": element.albumId,
                        "albumName": element.albumName,
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });

    return Promise.all([songs, artists, albums])
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
    var songs = new Promise((resolve, reject) => {
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
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });

    var artists = new Promise((resolve, reject) => {
        ArtistModel.getAllArtists()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "artistId": element.artistId,
                        "artistName": element.artistName,
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });

    return Promise.all([songs, artists]);
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
    var songs = new Promise((resolve, reject) => {
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

    return Promise.all([songs, genres])
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

// Create Services

SongServices.addSong = (song, artist, album) => {
    return new Promise((resolve, reject) => {
        SongModel.addSong(song, artist, album)
        .then(resolve)
        .catch(reject);
    })
}

SongServices.addSongArtist = (song, artist) => {
    return new Promise((resolve, reject) => {
        SongModel.addSongArtist(song, artist)
        .then(resolve)
        .catch(reject);
    })
}

SongServices.addSongGenre = (song, genre) => {
    return new Promise((resolve, reject) => {
        SongModel.addSongGenre(song, genre)
        .then(resolve)
        .catch(reject);
    })
}

module.exports = SongServices;
