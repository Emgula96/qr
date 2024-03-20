const express = require('express')
const users = require('./users.route')
const attendence = require('./attendence.route')
const qr = require('./qr.route')

const router = express.Router();

router.use('/users', users);
router.use('/attendence', attendence);
router.use('/qr', qr);

module.exports = router;