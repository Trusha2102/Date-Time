const express = require('express');
const router = express.Router();
const convertController = require('../controllers/convertController');

router.post('/', convertController.convertToUTC);

module.exports = router;
