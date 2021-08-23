require('dotenv').config();
const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (username, password) => {
    try {
        const user = await Users.findOne({where:{username}});
        if(!user) throw new Error('Username not found!');

        const passwordValid = bcrypt.compareSync(password, user.password);
        if(!passwordValid) throw new Error("Invalid Password!");

        let payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role
        };

        const accessToken = 'Bearer ' + generateAccessToken(process.env.ACCESS_TOKEN_SECRET, payload, {expiresIn: '30m'}); //30m expired
        const refreshToken = generateAccessToken(process.env.REFRESH_TOKEN_SECRET, payload);

        payload.accessToken = accessToken;
        payload.refreshToken = refreshToken;

        return payload;
    } catch (e) {
        throw new Error(e.message);
    }
}

const refreshToken = (token) => {
    if(!token) res.status(403).json(error("No Token Provided!", res.statusCode));
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if(err) throw new Error(err.message);

        const accessToken = 'Bearer ' + generateAccessToken(process.env.ACCESS_TOKEN_SECRET, payload, {expiresIn: '30m'}); //30m expired
    });
}

const generateAccessToken = (secret_key, payload, expired) => {
    return jwt.sign(payload, secret_key, expired);
}

module.exports = {
    login,
    refreshToken
}