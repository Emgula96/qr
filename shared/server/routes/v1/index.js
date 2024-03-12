const express = require('express')
const users = require('./users.route')
const attendence = require('./attendence.route')

const router = express.Router();

router.use('/users', users);
router.use('/attendence', attendence);

module.exports = router;