import RideModel from '../models/rideModel.js';

const createRide = (user_id) => {
  return new Promise((resolve, reject) => {
    RideModel.create(user_id, (err, ride) => {
      if (err) {
        return reject(err);
      }
      resolve(ride);
    });
  });
};

const cancelRide = (id) => {
  return new Promise((resolve, reject) => {
    RideModel.cancel(id, (err, ride) => {
      if (err) {
        return reject(err);
      }
      resolve(ride);
    });
  });
};

const getAllRides = () => {
  return new Promise((resolve, reject) => {
    RideModel.getAll((err, rides) => {
      if (err) {
        return reject(err);
      }
      resolve(rides);
    });
  });
};

const getUserIdByEmail = (email) => {
  return new Promise((resolve, reject) => {
    RideModel.getUserIdByEmail(email, (err, userId) => {
      if (err) {
        return reject(err);
      }
      resolve(userId);
    });
  });
};

export { createRide, cancelRide, getAllRides, getUserIdByEmail };
