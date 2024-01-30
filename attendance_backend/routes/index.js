const express = require('express');
const UserRouter = require('./userRouter')
const statisticRouter = require('./statisticRouter');
const AttendanceRouter = require('./attendanceRouter');
const router = express.Router();

router.use('/user', UserRouter);
router.use('/statics', statisticRouter);
router.use('/attendance', AttendanceRouter);

module.exports  = router;