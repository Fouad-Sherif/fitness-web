const express = require('express');
const { getPersonalTrainers, addPersonalTrainer ,getPersonalTrainerByGymID } = require('../controllers/personalTrainerController');
const router = express.Router();

router.post('/add', addPersonalTrainer);
router.get('/get', getPersonalTrainers);
router.get("/trainers", getPersonalTrainerByGymID);

module.exports = router;
