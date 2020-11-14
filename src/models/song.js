var mysql = require("../config/mysql");
var Song = {};

Song.getAllSongs = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allSongs"), [])
            .then(resolve)
            .catch(reject);
    });
}

function getQuery(type) {
    var query = "";
    switch(type) {
        case "allSongs":
            query = "SELECT s.songName, a.albumName FROM Songs s \
                INNER JOIN Albums a ON a.albumId = s.songAlbum;"
            break;
        case "getAllSongsGenres":
            query = "SELECT s.songId, s.songName, g.genreName FROM Songs s \
                INNER JOIN SongsGenres sg ON s.songId = sg.songId \
                INNER JOIN Genres g ON g.genreId = sg.genreId;"
            break;
        }

    return query;
};

module.exports = Song;

