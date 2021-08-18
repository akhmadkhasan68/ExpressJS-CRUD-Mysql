const { Users } = require('../models'); //load user model

exports.create = (data) => {
    return Users.create(data)
        .then(record => record)
        .catch(err => {
            throw new Error('Error while create data!');
        });
}

exports.update = async (id, data) => {
    const findRow = await Users.findOne({where:{id}});

    if(!findRow) throw new Error("Data not found!");
    
    return Users.update(data, {where: {id}}).then(res => res).catch(err => err);
}

exports.destroy = async (id) => {
    const findRow = await Users.findOne({where:{id}});
    
    if(!findRow) throw new Error("Data not found!");

    return Users.destroy({where: {id}}).then(res => res).catch(err => err);
}