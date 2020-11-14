var mysql = require("../config/mysql");
var Album = {};

Album.getAllAlbums = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allAlbums"), [])
            .then(resolve)
            .catch(reject);
    });
}

function getQuery(type) {
    var query = "";
    switch(type) {
        case "allAlbums":
            query = "SELECT a.albumId, a.albumName, gn.genreName \
                FROM Albums a \
                LEFT JOIN \
                    (SELECT ag.albumId, g.genreName FROM AlbumsGenres ag \
                    INNER JOIN Genres g ON g.genreId = ag.genreId) gn \
                ON a.albumId = gn.albumId;"
            break;
        }

    return query;
};

module.exports = Album;

