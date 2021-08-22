const express = require('express');
const router = express.Router();
const userRouter = require('./_partials/users.routes.js'); //import route users
const authRouter = require('./_partials/auth.routes.js'); //import auth users

router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;