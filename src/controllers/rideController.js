import { createRide, cancelRide, getAllRides } from '../services/rideService.js';

class RideController {
  static async create(req, res) {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      const ride = await createRide(user_id);
      res.status(201).json(ride);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async cancel(req, res) {
    try {
      const { id } = req.params;
      const ride = await cancelRide(id);
      res.status(200).json(ride);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const rides = await getAllRides();
      res.status(200).json(rides);
    } catch (err) {
      console.error('Error fetching rides:', err);
      res.status(500).json({ error: err.message });
    }
  }
}

export default RideController;
