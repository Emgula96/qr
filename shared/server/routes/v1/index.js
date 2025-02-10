import express from 'express';
import users from './users.route.js';
import attendance from './attendance.route.js';
import qr from './qr.route.js';
import room from './room.route.js';

const router = express.Router();

router.use('/users', users);
router.use('/attendance', attendance);
router.use('/qr', qr);
router.use('/room', room);

export default router;
