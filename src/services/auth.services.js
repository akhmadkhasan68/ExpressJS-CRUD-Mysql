require('dotenv').config();
const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis_client.js');

class AuthService{
    constructor(){

    }

    async login (username, password){
        try {
            const user = await Users.findOne({where:{username}});
            if(!user) throw new Error('Username not found!');
    
            const passwordValid = bcrypt.compareSync(password, user.password);
            if(!passwordValid) throw new Error("Invalid Password!");
    
            let payload = {
                user_id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                role: user.role
            };
    
            const accessToken = 'Bearer ' + this.generateAccessToken(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'}); //20s expired
            const refreshToken = this.generateAccessToken(payload, process.env.REFRESH_TOKEN_SECRET);
            redisClient.set(`refresh_token_${user.id}`, refreshToken);
    
            payload.accessToken = accessToken;
            payload.refreshToken = refreshToken;
    
            return payload;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async refreshToken(token){
        return new Promise((resolve, reject) => {
            if(!token) reject("No Token Provided!");

            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if(err) reject(err.message);
    
                redisClient.GET(`refresh_token_${payload.user_id}`, (err, reply) => {
                    if(!reply) reject("Token not found!");
                    if(reply != token) reject("Token not valid!");

                    const newPayload = {
                        user_id: payload.user_id,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        username: payload.username,
                        email: payload.email,
                        role: payload.role,
                    };
        
                    const accessToken = 'Bearer ' + this.generateAccessToken(newPayload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'}); //20s expired
                    resolve(accessToken);
                });
    
            });
        });
    }

    generateAccessToken (payload, secret_key, expired) {
        return jwt.sign(payload, secret_key, expired);
    }
}

module.exports.AuthService = AuthService;