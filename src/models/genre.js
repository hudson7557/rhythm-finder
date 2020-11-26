var mysql = require("../config/mysql");
var Genre = {};

Genre.getAllGenres = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allGenres"), [])
            .then(resolve)
            .catch(reject);
    });
}

Genre.createGenre = (genreName) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("createGenre"), [genreName])
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
        case "createGenre":
            query = "INSERT INTO Genres VALUE (NULL, ?);"
            break;
        }

    return query;
};

module.exports = Genre;

