const { Users } = require('../models'); // load model
const { error, success, } = require('../helpers/response.js');
const authService = require('../services/auth.services');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const loginProcess = await authService.login(username, password);

        res.status(200).json(success("OK", loginProcess, res.statusCode))
    } catch (e) {
        res.status(500).json(error(e.message, res.statusCode));
    }
}

const logout = (req, res) => {

}

module.exports = {
    login,
    logout
}