const express = require('express');
const userController = require('../../controller/users.controller.js'); //import users controller
const router = express.Router();

router.get('/', userController.fetch);
router.get('/:id', userController.fetchById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;