require('dotenv').config();
const jwt = require('jsonwebtoken');
const { success, error, validation } = require('../helpers/response.js');
const TOKEN_SECRET = process.env.JWTPRIVATEKEY;

const verifyToken = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(403).json(error("No Token Provided!", res.statusCode));

    jwt.verify(token, TOKEN_SECRET, (err, payload) => {
        if(err) return res.status(401).json(error("Unauthorized!", res.statusCode));

        req.payload = payload;
        next();
    });
}

const isAdmin = (req, res, next) => {
    const payload = req.payload;

    if(payload.role !== "admin") return res.status(403).json(error("Require admin role!", res.statusCode)); 
    
    next();
}

const isGuest = (req, res, next) => {
    const payload = req.payload;

    if(payload.role !== "guest") return res.status(403).json(error("Require guest role!", res.statusCode)); 
    
    next();
}

const isSeller = (req, res, next) => {
    const payload = req.payload;

    if(payload.role !== "seller") return res.status(403).json(error("Require seller role!", res.statusCode)); 
    
    next();
}

module.exports = {
    verifyToken,
    isAdmin,
    isGuest,
    isSeller
}