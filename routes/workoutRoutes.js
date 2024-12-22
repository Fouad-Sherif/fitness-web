const express = require('express');
const { addWorkout, getWorkouts } = require('../controllers/workoutController');
const router = express.Router();

router.post('/', addWorkout);
router.get('/:userId', getWorkouts);

module.exports = router;
