var mysql = require("../config/mysql");
var User = {};

User.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("allUsers"), [])
            .then(resolve)
            .catch(reject);
    });
}

User.getAllUsersSongs = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("getAllUsersSongs"), [])
            .then(resolve)
            .catch(reject);
    });
}

User.getUserSongs = (id) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("getUserSongs"), [id])
            .then(resolve)
            .catch(reject);
    });
}

User.getUser = () => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("getUser"), [])
            .then(resolve)
            .catch(reject);
    });
}

User.addUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("addUser"), [name, email, password])
            .then(resolve)
            .catch(reject);
    });
}

User.addUserSong = (song, user) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("addUserSong"), [song, user])
            .then(resolve)
            .catch(reject);
    });
}

User.updateEmail = (email, user) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("updateEmail"), [email, user])
            .then(resolve)
            .catch(reject);
    });
}

User.deleteUser = (user) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("deleteUser"), [user])
            .then(resolve)
            .catch(reject);
    });
}

User.deleteUserSong = (user, song) => {
    return new Promise((resolve, reject) => {
        mysql.query(getQuery("deleteUserSong"), [user, song])
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
        case "getUser":
            query = "SELECT * FROM Users WHERE userId=1;"
            break;
        case "getUserSongs":
            query = "SELECT u.userId, u.userName, sn.songName, sn.songId \
                FROM Users u \
                INNER JOIN( \
                    SELECT us.songId, us.userId, s.songName FROM UsersSongs us \
                    JOIN Songs s ON s.songId = us.songId) sn \
                ON u.userId = sn.userId \
                WHERE u.userId = ?;"
            break;
        case "getAllUsersSongs":
            query = "SELECT u.userId, u.userName, sn.songName, sn.songId \
                FROM Users u \
                LEFT JOIN( \
                    SELECT us.songId, us.userId, s.songName FROM UsersSongs us \
                    JOIN Songs s ON s.songId = us.songId) sn \
                ON u.userId = sn.userId \
                ORDER BY u.userId;"
            break;
        case "addUserSong":
            query = "INSERT INTO UsersSongs VALUES (?, ?);"
            break;
        case "addUser":
            query = "INSERT INTO `Users` VALUE (NULL, ?, ?, ?);"
            break;
        case "updateEmail":
            query = "UPDATE Users SET userEmail = ? WHERE userId = ?;"
            break;
        case "deleteUser":
            query = "DELETE FROM Users WHERE userId = ?;"
            break;
        case "deleteUserSong":
            query = "DELETE FROM UsersSongs WHERE userId = ? and songId = ?;"
            break;
        }
    return query;
};

module.exports = User;

