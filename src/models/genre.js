var mysql = require("../config/mysql");
var Genre = {};

Genre.getAllGenres = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allGenres"), [])
            .then(resolve)
            .catch(reject);
    });
}

function getQuery(type) {
    var query = "";
    switch(type) {
        case "allGenres":
            query = "SELECT * FROM Genres;"
            break;
        }

    return query;
};

module.exports = Genre;

