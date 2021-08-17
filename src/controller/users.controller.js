const { Users } = require('../models'); //load user model
const { success, error } = require('../helpers/response.js'); //load response helper
const UsersService = require('../services/users.services.js');

const fetch = async (req, res) => {
    try {
        let data = await Users.findAll();

        res.status(200).json(success("OK", data, res.statusCode));
    } catch (error) {
        throw new Error(res.status(500).json(error(error, res.statusCode)));
    }
}

const fetchById = async (req, res) => {
    const { id } = req.params;

    try {
        let data = await Users.findOne({
            where: {
                id
            }
        });
        
        if(!data) {
            res.status(404).json(error("Data Not Found!", res.statusCode));
        }else{
            res.status(200).json(success("OK", data, res.statusCode));
        }
    } catch (error) {
        throw new Error(res.status(500).json(error(error, res.statusCode)));
    }
}

const create = async (req, res) => {
    try {
        const createUser = await UsersService.create(req.body);
        res.status(200).json(success("OK", createUser, res.statusCode));
    } catch (error) {
        throw new Error(res.status(500).json(error(error, res.statusCode)));
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
        let findRow = await Users.findOne({where: {id}});
        
        if(!findRow) {
            res.status(404).json(error("Data Not Found!", res.statusCode));
        }

        const updateUser = await UsersService.update(id, body);
        res.status(200).json(success("OK", updateUser, res.statusCode));
    } catch (error) {
        throw new Error(res.status(500).json(error(error, res.statusCode)));
    }
}

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const findRow = await Users.findOne({where:{id}});
        if(!findRow){
            res.status(404).json(error("Data Not Found!", res.statusCode));
        }

        const deleteUser = await UsersService.destroy(id);
        res.status(200).json(success("OK", deleteUser, res.statusCode));
    } catch (error) {
        throw new Error(res.status(500).json(error(error, res.statusCode)));
    }
}

module.exports = {
    fetch,
    create,
    fetchById,
    destroy,
    update
}
