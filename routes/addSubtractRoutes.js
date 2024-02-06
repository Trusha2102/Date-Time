const express = require('express');
const router = express.Router();
const addSubtractController = require('../controllers/addSubtractController');

router.post('/', addSubtractController.addSubtractTime);

module.exports = router;
