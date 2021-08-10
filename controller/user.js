const db = require('../models');

const fetch = async (req, res) => {
    await db.User.findAll().then(data => {
        res.status(200).json({"error": false, data: data})
    }).catch(err => {
        res.status(500).json({"error": true, "message": err})
    });
}

const create = async (req, res) => {
    await db.User.create(req.body).then(() => {
        res.status(200).json({"error":false, "message": "success create user"});
    }).catch(err => {
        res.status(500).json({"error": true, "message": err});
    });
}

module.exports = {
    fetch: fetch,
    create: create
}