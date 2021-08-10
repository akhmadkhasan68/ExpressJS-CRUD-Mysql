const { Users } = require('../models'); //load user model
const { success, error } = require('../helpers/response.js'); //load response helper

const fetch = async (req, res) => {
    await Users.findAll().then(data => {
        res.status(200).json(success("OK", data, res.statusCode));
    }).catch(err => {
        res.status(500).json(error(err, res.statusCode));
    });
}

const fetchById = async (req, res) => {
    const { id } = req.params;

    await Users.findAll({
        where:{
            id
        }
    }).then(data => {
        res.status(200).json(success("OK", data, res.statusCode));
    }).catch(err => res.status(500).json(error(err, res.statusCode)));
}

const create = async (req, res) => {
    await Users.create(req.body).then(data => {
        res.status(200).json(success("Success Create Data", data, res.statusCode));
    }).catch(err => {
        res.status(500).json(error(err, res.statusCode));
    });
}

const update = async (req, res) => {
    const { id } = req.params;

    await Users.update(req.body, { 
        where: {
            id
        }
    }).then(data => {
        res.status(200).json(success("Success Update Data", data, res.statusCode));
    }).catch(err => {
        res.status(500).json(error(err, res.statusCode));
    });
}

const destroy = async (req, res) => {
    const { id } = req.params;

    await Users.destroy({
        where: {
            id
        }
    }).then(data => {
        res.status(200).json(success("Success Delete Data", data, res.statusCode));
    }).catch(err => res.status(500).json(error(err, res.statusCode)));
}

module.exports = {
    fetch,
    create,
    fetchById,
    destroy,
    update
}
