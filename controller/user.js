const db = require('../models');
const { success, error } = require('../helpers/responseApi.js');

const fetch = async (req, res) => {
    await db.User.findAll().then(data => {
        res.status(200).json(success("OK", data, res.statusCode));
    }).catch(err => {
        res.status(500).json(error(err, res.statusCode));
    });
}

const fetchById = async (req, res) => {
    const { id } = req.params;

    await db.User.findAll({
        where:{
            id: id
        }
    }).then(data => {
        res.status(200).json(success("OK", data, res.statusCode));
    }).catch(err => res.status(500).json(error(err, res.statusCode)));
}

const create = async (req, res) => {
    await db.User.create(req.body).then(data => {
        res.status(200).json(success("Success Create Data", data, res.statusCode));
    }).catch(err => {
        res.status(500).json(error(err, res.statusCode));
    });
}

const destroy = async (req, res) => {
    const { id } = req.params;

    await db.User.destroy({
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
    destroy
}
