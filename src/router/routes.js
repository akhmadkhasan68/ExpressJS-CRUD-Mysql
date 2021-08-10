const express = require('express');
const router = express.Router();
const userRouter = require('./_partials/users.routes.js'); //import route users

router.use('/users', userRouter);

module.exports = router;