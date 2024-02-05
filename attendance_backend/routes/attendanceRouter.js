const express = require('express');
const attendanceController = require('../controllers/attendaceController')
const router = express.Router();
router.post('/', attendanceController.attendance);
router.get('/', attendanceController.autoAttendanceAsync)
module.exports = router;