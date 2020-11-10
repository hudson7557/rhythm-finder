var mysql = require("mysql");
var config = require("./config");

var connectionConfig = {
    "connectionLimit": 10,
    "multipleStatements": true,
    "host": config.dbHost,
    "user": config.dbUser,
    "password": config.dbPassword,
    "database": config.dbName
};

var pool = mysql.createConnection(connectionConfig);

var connection = () => {
    return new Promise((resolve, reject) => {
        pool.connect((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

var query = (query, data) => {
    return new Promise((resolve, reject) => {
        pool.query(query, data, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    "connection": connection,
    "query": query, 
    "pool": pool
};
