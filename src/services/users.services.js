const { Users } = require('../models'); //load user model

exports.create = (data) => {
    return new Promise((resolve, reject) => {
        Users.create(data)
        .then(record => resolve(record))
        .catch(err => reject(err));
    });
}

exports.update = (id, data) => {
    return new Promise((resolve, reject) => {
        Users.update(data, {
            where: {
                id
            }
        })
        .then(res => {
            if(!res){
                reject("Error while updating data!");
            }

            resolve("Success updating data!")
        })
        .catch(err => reject(err));
    });
}

exports.destroy = (id) => {
    return new Promise((resolve, reject) => {
        Users.destroy({
            where: {
                id
            }
        }).then(data => {
            if(!data) reject("Error while deleting data!");

            resolve("success deleting data!")
        })
        .catch(err => reject(err));
    })
}