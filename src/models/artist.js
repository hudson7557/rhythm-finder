var mysql = require("../config/mysql");
var Artist = {};

Artist.getAllArtists = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allArtists"), [])
            .then(resolve)
            .catch(reject);
    });
}

function getQuery(type) {
    var query = "";
    switch(type) {
        case "allArtists":
            query = "SELECT a.artistId, a.artistName, gn.genreName \
                FROM Artists a \
                LEFT JOIN \
                    (SELECT ag.artistId, g.genreName FROM ArtistsGenres ag \
                    INNER JOIN Genres g ON g.genreId = ag.genreId) gn \
                ON a.artistId = gn.artistId;"
            break;
        }

    return query;
};

module.exports = Artist;

