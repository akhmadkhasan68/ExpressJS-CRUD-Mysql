const { Router } = require('express');
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');

router.get('/users', userController.fetch);
router.post('/users', userController.create);

module.exports = router;