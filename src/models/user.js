var mysql = require("../config/mysql");
var User = {};

User.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allUsers"), [])
            .then(resolve)
            .catch(reject);
    });
}

function getQuery(type) {
    var query = "";
    switch(type) {
        case "allUsers":
            query = "SELECT * FROM Users;"
            break;
        }

    return query;
};

module.exports = User;

