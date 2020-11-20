var UserModel = require("../models/user");
var UserServices = {};

UserServices.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.getAllUsers()
            .then(resolve)
            .catch(reject);
    });
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

module.exports = UserServices;
