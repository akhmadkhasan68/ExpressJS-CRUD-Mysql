const express = require('express');
const userController = require('../../controller/users.controller.js'); //import users controller
const router = express.Router();
const { UsersValidation, validate } = require('../../validations');

router.get('/', userController.fetch);
router.get('/:id', userController.fetchById);
router.post('/', UsersValidation.enterData(), validate, userController.create);
router.put('/:id', UsersValidation.enterData(), validate, userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;