const RideModel = require('../models/rideModel');

class RideService {
  /**
   * Cria uma nova corrida
   * @param {string} user_id - ID do usuário
   * @returns {Promise<Object>} - A promessa que resolve a corrida criada
   */
  static async createRide(user_id) {
    return new Promise((resolve, reject) => {
      RideModel.create(user_id, (err, ride) => {
        if (err) {
          return reject(err);
        }
        resolve(ride);
      });
    });
  }

  /**
   * Cancela uma corrida existente
   * @param {number} id - ID da corrida
   * @returns {Promise<Object>} - A promessa que resolve a corrida cancelada
   */
  static async cancelRide(id) {
    return new Promise((resolve, reject) => {
      RideModel.cancel(id, (err, ride) => {
        if (err) {
          return reject(err);
        }
        resolve(ride);
      });
    });
  }

  /**
   * Retorna todas as corridas.
   *
   * @return {Promise<Object>} A promessa que resolve todas as corridas
   */
  static async getAllRides() {
    return new Promise((resolve, reject) => {
      RideModel.getAll((err, rides) => {
        if (err) {
          return reject(err);
        }
        resolve(rides);
      });
    });
  }
}

module.exports = RideService;
