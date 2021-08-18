const { body, valildationResult, param } = require('express-validator');
const { Users, Op } = require('../models'); //load user model

const roles = ['admin', 'guest', 'seller'];

const enterData = () => {
    return [
        body('firstName').isLength({min: 5, max:20}).notEmpty(),
        body('lastName').isLength({min: 5, max:20}).notEmpty(),
        body('username').isLength({min: 5}).notEmpty().custom((username, {req}) => {
            return Users.findOne({
                where: {
                    username,
                    id: {
                        [Op.ne]: req.params.id
                    }
                }
            }).then(user => {
                if(user){
                    throw new Error(`Username ${user.username} already taken!`);
                }
                return true;
            });
        }),
        body('email').isEmail().notEmpty().custom((email, {req}) => {
            return Users.findOne({
                where: {
                    email,
                    id: {
                        [Op.ne]: req.params.id
                    }
                }
            }).then(user => {
                if(user){
                    throw new Error(`Email ${user.email} already taken!`);
                }
                return true;
            });
        }),
        body('password').notEmpty().isLength({min: 5, max: 16}),
        body('role').notEmpty().custom(value => {
            if(!roles.includes(value)){
                throw new Error(`Role must has value ${roles.join(', ')}`);
            }
            return true;
        })
    ]
}

const update = (id) => {
    return [
        body('firstName').isLength({min: 5, max:20}).notEmpty(),
        body('lastName').isLength({min: 5, max:20}).notEmpty(),
        body('username').isLength({min: 5}).notEmpty().custom(username => {
            return Users.findOne({where:{username, id: {[Op.or]: id}}}).then(user => Promise.reject('Username already taken!'))
        }),
        body('email').isEmail().notEmpty().custom(email => {
            return Users.findOne({where:{email, id: {[Op.or]: id}}}).then(user => Promise.reject('Email already taken!'))
        }),
        body('password').notEmpty().isLength({min: 5, max: 16}),
        body('role').notEmpty().custom(value => {
            if(!roles.includes(value)) return Promise.reject(`Role must has value ${roles.join(', ')}`);
        })
    ]
}

module.exports = {
    name: 'UsersValidation',
    enterData,
}