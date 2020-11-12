var UserModel = require("../models/user");
var UserServices = {};

UserServices.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.getAllUsers()
            .then(resolve)
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
