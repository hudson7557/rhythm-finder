var mysql = require("../config/mysql");
var Album = {};

Album.getAllAlbums = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allAlbums"), [])
            .then(resolve)
            .catch(reject);
    });
}

Album.getAllAlbumsByGenre = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("AllAlbumsByGenre"), [])
            .then(resolve)
            .catch(reject);
    });
}

Album.getAlbumsByGenre = (genreId) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("getAlbumsByGenre"), [genreId])
            .then(resolve)
            .catch(reject);
    });
}

Album.createAlbum = (albumName) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("createAlbum"), [albumName])
            .then(resolve)
            .catch(reject);
    });
}

function getQuery(type) {
    var query = "";
    switch(type) {
        case "allAlbums":
            query = "SELECT a.albumId, a.albumName \
                FROM Albums a;"
            break;
        case "AllAlbumsByGenre":
                query = "SELECT a.albumId, a.albumName, gn.genreName \
                    FROM Albums a LEFT JOIN \
                    (SELECT ag.albumId, g.genreId, g.genreName FROM AlbumsGenres ag \
                    INNER JOIN Genres g ON g.genreId = ag.genreId) gn ON \
                    a.albumId = gn.albumId;"
                break;
        case "getAlbumsByGenre":
            query = "SELECT a.albumId, a.albumName, gn.genreName \
                FROM Albums a LEFT JOIN \
                (SELECT ag.albumId, g.genreId, g.genreName FROM AlbumsGenres ag \
                INNER JOIN Genres g ON g.genreId = ag.genreId) gn ON \
                a.albumId = gn.albumId WHERE gn.genreId = ? ;"
            break;
        case "createAlbum":
            query = "INSERT INTO Albums VALUE (NULL, ?);"
            break;
        }

    return query;
};

module.exports = Album;

