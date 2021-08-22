const { body } = require('express-validator');
const { Users, Op } = require('../models'); //load user model
const validationMessage = require('../helpers/validationMessage.js');

const login = () => {
    return [
        body('username').notEmpty().withMessage(validationMessage.notEmpty('Username')).isLength({min: 5}).withMessage(validationMessage.isLength("Username", {min:5})),
        body('password').notEmpty().withMessage(validationMessage.notEmpty("Password")).isLength({min: 8, max:16}).withMessage(validationMessage.isLength("Password", {min:8, max:16}))
    ];
}

module.exports =
 {
    name: 'AuthValidation',
    login,
}