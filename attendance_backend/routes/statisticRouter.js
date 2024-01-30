const express = require('express');

const StatisticController = require('../controllers/statisticController');

const router = express.Router();

const statisticController = new StatisticController();


module.exports = router;