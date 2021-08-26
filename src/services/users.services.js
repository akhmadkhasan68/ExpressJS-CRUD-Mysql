const { Users } = require('../models'); //load user model

class UsersService{
    constructor(){

    }

    create(data) {
        Users.create(data).then(record => record).catch(err => {
            throw new Error(err.message);
        });
    }

    async update(id, data){
        const findRow = await Users.findOne({where: {id}});

        if(!findRow) throw new Error("Data not found!");

        return Users.update(data, {where: {id}}).then(res => res).catch(err => {
            throw new Error(err.message);
        });
    }

    async destroy(id){
        const findRow = await Users.findOne({where: {id}});

        if(!findRow) throw new Error("Data not found!");

        return Users.destroy({where: {id}}).then(res => res).catch(err => {
            throw new Error(err.message);
        });
    }
}

module.exports.UsersService = UsersService;