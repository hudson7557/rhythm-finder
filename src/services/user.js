var UserModel = require("../models/user");
var SongModel = require("../models/song");
var UserServices = {};


UserServices.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.getAllUsers()
            .then(resolve)
            .catch(reject);
    });
};

UserServices.getAllUsersSongs = () => {
    var usersSongs = new Promise((resolve, reject) => {
        UserModel.getAllUsersSongs()
            .then((results) => {
                var processedResults = [];
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                        "userId": element.userId,
                        "userName": element.userName
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });
    
    var songs = new Promise((resolve, reject) => {
        SongModel.getSongs()
            .then((results) => {
                var processedResults = []
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName
                    }
                    processedResults.push(processed);
                });
                return processedResults;
            })
            .then(resolve)
            .catch(reject);
    });

    var users = new Promise((resolve, reject) => {
        UserModel.getAllUsers()
            .then(resolve)
            .catch(reject);
    });

    return Promise.all([usersSongs, songs, users])
};

UserServices.getUserSongs = (id) => {
    return new Promise((resolve, reject) => {
        UserModel.getUserSongs(id)
            .then((results) => {
                var processedResults = [];
                results.forEach(element => {
                    var processed = {
                        "id": element.songId,
                        "name": element.songName,
                        "userId": element.userId,
                        "userName": element.userName
                    }
                    processedResults.push(processed);
                });
                if (results.length > 0) {
                    resolve ( {
                        "name": results[0].userName, "results": processedResults
                    } )
                }
                resolve(processedResults);
            })
            .catch(reject);
    });
};

UserServices.getUser = () => {
    return new Promise((resolve, reject) => {
        UserModel.getUser()
            .then((result) => {
                var user = {
                    userId: result[0]['userId'],
                    userName: result[0]['userName'],
                    userEmail: result[0]['userEmail']
                }
                resolve(user);
            })
            .catch(reject);
    });
};

// Create services

UserServices.addUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        UserModel.addUser(name, email, password)
            .then(resolve)
            .catch(reject);
    });
};


UserServices.addUserSong = (song, user) => {
    return new Promise((resolve, reject) => {
        UserModel.addUserSong(song, user)
            .then(resolve)
            .catch(reject);
    });
};

module.exports = UserServices;
