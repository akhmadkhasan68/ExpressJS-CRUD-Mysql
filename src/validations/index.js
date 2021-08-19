const fs = require('fs');
const path = require('path');
const { success, error } = require('../helpers/response.js'); //load response helper
const { body, validationResult } = require('express-validator');

const basename = path.basename(__filename);
const validation = {}

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    const validator = require(path.join(__dirname, file));
    validation[validator.name] = validator;
});

validation['validate'] = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json(error(extractedErrors, res.statusCode));
}

module.exports = validation;