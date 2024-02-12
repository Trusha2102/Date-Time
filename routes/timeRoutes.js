const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');
const allTimeZoneController = require('../controllers/allTimeZones')

router.post('/', timeController.getTimeBetween);
router.post('/all', allTimeZoneController.convertTimeToMultipleTimeZones);


module.exports = router;
