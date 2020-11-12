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
            query = "SELECT * FROM Albums;"
            break;
        }

    return query;
};

module.exports = Album;

