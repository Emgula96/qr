import express from 'express'
import users from './users.route.js'
import attendence from './attendence.route.js'
import qr from './qr.route.js'

const router = express.Router()

router.use('/users', users)
router.use('/attendence', attendence)
router.use('/qr', qr)

export default router