const RideService = require('../services/rideService');

class RideController {
  /**
   * Handler para criar uma nova corrida
   * @param {Request} req - O objeto de solicitação
   * @param {Response} res - O objeto de resposta
   */
  static async create(req, res) {
    try {
      const { user_id } = req.body;
      const ride = await RideService.createRide(user_id);
      res.status(201).json(ride);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * Handler para cancelar uma corrida existente
   * @param {Request} req - O objeto de solicitação
   * @param {Response} res - O objeto de resposta
   */
  static async cancel(req, res) {
    try {
      const { id } = req.params;
      const ride = await RideService.cancelRide(id);
      res.status(200).json(ride);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
 * Handler para obter todas as corridas.
 *
 * @param {Request} req - O objeto de requisição
 * @param {Response} res - O objeto de resposta
 * @return {Promise<void>} Resposta JSON com todas as corridas ou erro
 */
  static async getAll(req, res) {
    try {
      const rides = await RideService.getAllRides();
      res.status(200).json(rides);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = RideController;
