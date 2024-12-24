const express = require('express');
const { getPersonalTrainers, addPersonalTrainer } = require('../controllers/personalTrainerController');
const router = express.Router();

router.post('/add', addPersonalTrainer);
router.post('/get', getPersonalTrainers);

module.exports = router;
