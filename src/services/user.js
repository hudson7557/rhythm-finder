var UserModel = require("../models/user");
var UserServices = {};

UserServices.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.getAllUsers()
            .then(resolve)
            .catch(reject);
    });
};

module.exports = UserServices;
