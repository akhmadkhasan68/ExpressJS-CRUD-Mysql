const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth.controller');
const { AuthValidation, validate } = require('../../validations');

router.post('/login', AuthValidation.login(), validate, authController.login);
router.delete('/logout', authController.logout);

module.exports = router;