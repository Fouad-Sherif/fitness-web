const express = require('express');
const { getGymLocations, addGymLocation } = require('../controllers/gymLocationsController');
const router = express.Router();

router.post('/add', addGymLocation);
router.post('/get', getGymLocations);

module.exports = router;
