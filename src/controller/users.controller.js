require('dotenv').config();
const { Users } = require('../models'); //load user model
const { success, error } = require('../helpers/response.js'); //load response helper
const UsersService = require('../services/users.services.js');
const bcrypt = require('bcryptjs');

const fetch = async (req, res) => {
    try {
        let data = await Users.findAll();

        res.status(200).json(success("OK", data, res.statusCode));
    } catch (e) {
        res.status(500).json(error(e.message, res.statusCode));
    }
}

const fetchById = async (req, res) => {
    const { id } = req.params;

    try {
        let data = await Users.findOne({where: {id}});
        
        if(!data) {
            res.status(404).json(error("Data Not Found!", res.statusCode));
        }else{
            res.status(200).json(success("OK", data, res.statusCode));
        }
    } catch (e) {
        res.status(500).json(error(e.message, res.statusCode));
    }
}

const create = async (req, res) => {
    const { firstName, lastName, username, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    let encryptPassword = await bcrypt.hash(password, salt);

    try {
        const createUser = await UsersService.create({
            firstName,
            lastName,
            username,
            email,
            password: encryptPassword,
            role
        });
        
        res.status(200).json(success("OK", createUser, res.statusCode));
    } catch (e) {
        res.status(500).json(error(e.message, res.statusCode));
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if(!!req.body.password){
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        let encryptPassword = await bcrypt.hash(req.body.password, salt);

        body.password = encryptPassword;
    }

    try {
        const updateUser = await UsersService.update(id, body);
        res.status(200).json(success("OK", updateUser, res.statusCode));
    } catch (e) {
        res.status(500).json(error(e.message, res.statusCode));
    }
}

const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteUser = await UsersService.destroy(id);
        res.status(200).json(success("OK", deleteUser, res.statusCode));
    } catch (e) {
        res.status(500).json(error(e.message, res.statusCode));
    }
}

module.exports = {
    fetch,
    create,
    fetchById,
    destroy,
    update
}
