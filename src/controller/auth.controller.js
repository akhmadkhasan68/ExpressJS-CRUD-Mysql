const { Users } = require('../models'); // load model
const { error, success, } = require('../helpers/response.js');
const { AuthService } = require('../services/auth.services');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const authService = new AuthService();
        const loginProcess = await authService.login(username, password);
        
        res.status(200).json(success("OK", loginProcess, res.statusCode))
    } catch (e) {
        res.status(500).json(error(e.message, res.statusCode));
    }
}

const refreshToken = async (req, res) => {
    const token = req.body.token;

    try {
        const authService = new AuthService();
        const refreshProcess = await authService.refreshToken(token);
       
        res.status(200).json(success("OK", refreshProcess, res.statusCode))
    } catch (e) {
        res.status(500).json(error(e, res.statusCode));
    }
}

const logout = async (req, res) => {
    const payload = req.payload;

    try {
        const authService = new AuthService();
        const logoutProcess = await authService.logout(payload);

        res.status(200).json(success("OK", logoutProcess, res.statusCode))
    } catch (e) {
        res.status(500).json(error(e.message, res.statusCode));
    }
}

module.exports = {
    login,
    refreshToken,
    logout
}