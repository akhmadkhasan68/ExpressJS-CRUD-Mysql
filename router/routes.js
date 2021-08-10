const { Router } = require('express');
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');

router.get('/users', userController.fetch);
router.get('/users/:id', userController.fetchById);
router.post('/users', userController.create);
router.delete('/users/:id', userController.destroy);

module.exports = router;