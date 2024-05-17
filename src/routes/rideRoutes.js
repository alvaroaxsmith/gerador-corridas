const express = require('express');
const RideController = require('../controllers/rideController');

const router = express.Router();

router.post('/', RideController.create);
router.delete('/:id', RideController.cancel);

module.exports = router;
