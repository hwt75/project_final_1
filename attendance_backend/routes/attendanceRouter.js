const express = require('express');
const AttendanceController = require('../controllers/attendaceController')
const router = express.Router();
const attendanceController = new AttendanceController();
router.post('/', attendanceController.attendance);

module.exports = router;