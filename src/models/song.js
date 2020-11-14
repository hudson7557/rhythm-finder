var mysql = require("../config/mysql");
var Song = {};


Song.getAllSongs = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("getAllSongsGenres"), [])
            .then(resolve)
            .catch(reject);
    });
}

function getQuery(type) {
    var query = "";
    switch(type) {
        case "allSongs":
            query = "SELECT s.songId, s.songName, a.albumName FROM Songs s \
                INNER JOIN Albums a ON a.albumId = s.songAlbum;"
            break;
        case "getAllSongsGenres":
            query = "SELECT s.songId, s.songName, gn.genreName, a.albumName FROM Songs s \
                INNER JOIN Albums a ON a.albumId = s.songAlbum \
                LEFT JOIN (SELECT sg.songId, g.genreName FROM SongsGenres sg \
                    INNER JOIN Genres g ON g.genreId = sg.genreId) gn ON s.songId = gn.songId;"
            break;
        }

    return query;
};

module.exports = Song;

