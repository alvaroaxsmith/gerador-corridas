const RideService = require('../src/services/rideService');
const RideModel = require('../src/models/rideModel');

// Mock do modelo
jest.mock('../src/models/rideModel');

describe('RideService', () => {
  it('deve criar uma nova corrida', async () => {
    const user_id = 'user123';
    const mockRide = { id: 1, user_id, status: 'active', created_at: new Date().toISOString() };

    RideModel.create.mockImplementation((user_id, callback) => {
      callback(null, mockRide);
    });

    const ride = await RideService.createRide(user_id);
    expect(ride).toEqual(mockRide);
  });

  it('deve cancelar uma corrida', async () => {
    const id = 1;
    const mockRide = { id, status: 'canceled' };

    RideModel.cancel.mockImplementation((id, callback) => {
      callback(null, mockRide);
    });

    const ride = await RideService.cancelRide(id);
    expect(ride).toEqual(mockRide);
  });
});
