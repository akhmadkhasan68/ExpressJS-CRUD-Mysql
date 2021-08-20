const { body } = require('express-validator');
const { Users, Op } = require('../models'); //load user model
const validationMessage = require('../helpers/validationMessage.js');

const roles = ['admin', 'guest', 'seller'];

const createData = () => {
    return [
        body("firstName").notEmpty().withMessage(`${validationMessage.notEmpty('First Name')}`).isLength({
            max: 10
        }).withMessage(validationMessage.isLength("First Name", {max: 10})),
        body("lastName").notEmpty().withMessage(`${validationMessage.notEmpty('Last Name')}`).isLength({
            max: 10
        }).withMessage(validationMessage.isLength("Last Name", {max: 10})),
        body("username").notEmpty().withMessage(`${validationMessage.notEmpty('Username')}`).isLength({
            min: 5
        }).withMessage(validationMessage.isLength("Username", {min: 5})).custom(value => {
            if (value) {
                return Users.findOne({
                    where: {
                        username: value
                    }
                }).then(user => {
                    if (user) {
                        throw new Error("Username already use")
                    }
                });
            }
            return true;
        }),
        body("email").notEmpty().withMessage(`${validationMessage.notEmpty('Email')}`).isEmail().withMessage(`${validationMessage.isEmail('Email')}`).custom(value => {
            if (value) {
                return Users.findOne({
                    where: {
                        email: value
                    }
                }).then(user => {
                    if (user) {
                        throw new Error("Email already use")
                    }
                });
            }
            return true;
        }),
        body("password").notEmpty().withMessage(`${validationMessage.notEmpty('Password')}`).isLength({
            min: 8,
            max: 16
        }).withMessage(validationMessage.isLength("Password", {min: 8, max:16})),
        body("conf_password").notEmpty().withMessage(`${validationMessage.notEmpty('Password Confirmation')}`).isLength({
            min: 8,
            max: 16
        }).withMessage(validationMessage.isLength("Password Confirmation", {min: 8, max:16})).custom((value, {req}) => {
            if (value !== req.body.password && value) {
                throw new Error("Password confirmation does not match password");
            }
            return true;
        }),
        body("role").notEmpty().withMessage(`${validationMessage.notEmpty('Role')}`).isIn(roles).withMessage(`Role must have value ${roles.join(', ')}`)
    ]
}

const UpdateData = () => {
    let validator = [
        body("firstName").notEmpty().withMessage(`${validationMessage.notEmpty('First Name')}`).isLength({
            max: 10
        }).withMessage(validationMessage.isLength("First Name", { max:10 })),
        body("lastName").notEmpty().withMessage(`${validationMessage.notEmpty('Last Name')}`).isLength({
            max: 10
        }).withMessage(validationMessage.isLength("Last Name", {max:10})),
        body("username").notEmpty().withMessage(`${validationMessage.notEmpty('Username')}`).isLength({
            min: 5
        }).withMessage(validationMessage.isLength("Username", {min:5})).custom((value, { req }) => {
            if (value) {
                return Users.findOne({
                    where: {
                        id: {
                            [Op.ne]: req.params.id
                        },
                        username: value
                    }
                }).then(user => {
                    if (user) {
                        throw new Error("Username already use")
                    }
                });
            }
            return true;
        }),
        body("email").notEmpty().withMessage(`${validationMessage.notEmpty('Email')}`).isEmail().withMessage(`${validationMessage.isEmail('Email')}`).custom((value, { req }) => {
            if (value) {
                return Users.findOne({
                    where: {
                        id: {
                            [Op.ne]: req.params.id
                        },
                        email: value
                    }
                }).then(user => {
                    if (user) {
                        throw new Error("Email already use")
                    }
                });
            }
            return true;
        }),
        body("role").notEmpty().withMessage(`${validationMessage.notEmpty('Role')}`).isIn(roles).withMessage(`Role must have value ${roles.join(', ')}`),
        body("change_password").optional(),
        body("password").if(body('change_password').exists()).notEmpty().withMessage(`${validationMessage.notEmpty('Password')}`).isLength({
            min: 8,
            max: 16
        }).withMessage(validationMessage.isLength("Password", {min:8, max:16})),
        body("conf_password").if(body('change_password').exists()).notEmpty().withMessage(`${validationMessage.notEmpty('Password Confirmation')}`).isLength({
            min: 8,
            max: 16
        }).withMessage(validationMessage.isLength("Password Confirmation", {min:8, max:16})).custom((value, {req}) => {
            if (value !== req.body.password && value) {
                throw new Error("Password confirmation does not match password");
            }
            return true;
        })
    ]

    return validator;
}

module.exports = {
    name: 'UsersValidation',
    createData,
    UpdateData,
}