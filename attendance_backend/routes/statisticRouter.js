const express = require('express');

const StatisticController = require('../controllers/statisticController');

const router = express.Router();

router.get('/',StatisticController.getStaticsData)


module.exports = router;