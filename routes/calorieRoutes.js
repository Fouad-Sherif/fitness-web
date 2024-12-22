const express = require('express');
const { calculateCalories } = require('../controllers/calorieController');
const router = express.Router();

router.post('/', calculateCalories);

module.exports = router;
