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
            query = "SELECT * FROM Songs;"
            break;
        }

    return query;
};

module.exports = Song;

