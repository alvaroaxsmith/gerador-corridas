import express from 'express';
import RideController from '../controllers/rideController.js';

const router = express.Router();

router.post('/create', RideController.create);
router.post('/cancel/:id', RideController.cancel);
router.get('/', RideController.getAll);

export default router;
