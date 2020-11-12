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
            query = "SELECT * FROM Artists;"
            break;
        }

    return query;
};

module.exports = Artist;

