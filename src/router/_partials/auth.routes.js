const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth.controller');
const { AuthValidation, validate } = require('../../validations');
const { verifyToken } = require('../../middleware/auth.js');

router.post('/login', AuthValidation.login(), validate, authController.login);
router.post('/refresh_token', authController.refreshToken);
router.delete('/logout', verifyToken, authController.logout);

module.exports = router;