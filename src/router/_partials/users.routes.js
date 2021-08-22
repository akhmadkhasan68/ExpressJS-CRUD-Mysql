const express = require('express');
const router = express.Router();
const userController = require('../../controller/users.controller.js'); //import users controller
const { UsersValidation, validate } = require('../../validations');
const authMiddleware = require('../../middleware/auth.js');

router.get('/', verifyToken, userController.fetch);
router.get('/:id', userController.fetchById);
router.post('/', UsersValidation.createData(), validate, userController.create);
router.put('/:id', UsersValidation.UpdateData(), validate, userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;