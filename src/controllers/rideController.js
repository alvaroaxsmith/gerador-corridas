import { createRide, cancelRide, getAllRides } from '../services/rideService.js';

class RideController {
  /**
   * Cria uma nova corrida.
   * 
   * @param {object} req - O objeto de solicitação HTTP.
   * @param {object} res - O objeto de resposta HTTP.
   * @returns {object} - O objeto JSON com os detalhes da corrida criada.
   */
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

  /**
   * Cancela uma corrida existente.
   * 
   * @param {object} req - O objeto de solicitação HTTP.
   * @param {object} res - O objeto de resposta HTTP.
   * @returns {object} - O objeto JSON com os detalhes da corrida cancelada.
   */
  static async cancel(req, res) {
    try {
      const { id } = req.params;
      const ride = await cancelRide(id);
      res.status(200).json(ride);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * Obtém todas as corridas.
   * 
   * @param {object} req - O objeto de solicitação HTTP.
   * @param {object} res - O objeto de resposta HTTP.
   * @returns {object} - O objeto JSON com a lista de todas as corridas.
   */
  static async getAll(req, res) {
    try {
      const rides = await getAllRides();
      res.status(200).json(rides);
    } catch (err) {
      console.error('Error fetching rides:', err);
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email } = req.body;
      const userId = await getUserIdByEmail(email);
      if (!userId) {
        return res.status(404).json({ error: 'E-mail não encontrado' });
      }
      res.status(200).json({ user_id: userId });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: err.message });
    }
  }
  
}

export default RideController;
