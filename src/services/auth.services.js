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

        const token = 'Bearer ' + jwt.sign(payload, process.env.JWTPRIVATEKEY, {
            expiresIn: 86400 //24h expired
        });

        payload.token = token;

        return payload;
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    login
}