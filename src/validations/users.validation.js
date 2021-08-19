const { body, CustomValidator, param } = require('express-validator');
const { Users, Op } = require('../models'); //load user model

const roles = ['admin', 'guest', 'seller'];

const createData = () => {
    return [
        body("firstName").notEmpty().withMessage("First Name is required").isLength({
            max: 10
        }).withMessage("Fisrt Name must have maximum 10 character"),
        body("lastName").notEmpty().withMessage("Last Name is required").isLength({
            max: 10
        }).withMessage("Last Name must have maximum 10 character"),
        body("username").notEmpty().withMessage("Username is required").isLength({
            min: 5
        }).withMessage("Username must have minimum 5 character").custom(value => {
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
        body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email must have valid value").custom(value => {
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
        body("password").notEmpty().withMessage("Password is required").isLength({
            min: 8,
            max: 16
        }).withMessage("Password must have value between 5 and 8 character"),
        body("conf_password").notEmpty().withMessage("Password Confirmation is required").isLength({
            min: 8,
            max: 16
        }).withMessage("Password must have value between 5 and 8 character").custom((value, {
            req
        }) => {
            if (value !== req.body.password && value) {
                throw new Error("Password confirmation does not match password");
            }
            return true;
        }),
        body("role").notEmpty().withMessage("Role is required").isIn(roles).withMessage(`Role must have value ${roles.join(', ')}`)
    ]
}

const UpdateData = () => {
    let validator = [
        body("firstName").notEmpty().withMessage("First Name is required").isLength({
            max: 10
        }).withMessage("Fisrt Name must have maximum 10 character"),
        body("lastName").notEmpty().withMessage("Last Name is required").isLength({
            max: 10
        }).withMessage("Last Name must have maximum 10 character"),
        body("username").notEmpty().withMessage("Username is required").isLength({
            min: 5
        }).withMessage("Username must have minimum 5 character").custom((value, { req }) => {
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
        body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email must have valid value").custom((value, { req }) => {
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
        body("role").notEmpty().withMessage("Role is required").isIn(roles).withMessage(`Role must have value ${roles.join(', ')}`),
        body('change_password').custom((value, { req }) => {
            if(value && value == 1){
                body("password").notEmpty().withMessage("Password is required").isLength({
                    min: 8,
                    max: 16
                }).withMessage("Password must have value between 5 and 8 character"),
                body("conf_password").notEmpty().withMessage("Password Confirmation is required").isLength({
                    min: 8,
                    max: 16
                }).withMessage("Password must have value between 5 and 8 character").custom((value, { req }) => {
                    if (value !== req.body.password && value !== null) {
                        throw new Error("Password confirmation does not match password");
                    }
                    return true;
                })
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