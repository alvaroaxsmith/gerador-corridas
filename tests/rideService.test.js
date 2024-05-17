import request from 'supertest';
import express from 'express';
import rideRoutes from '../src/routes/rideRoutes.js';
import { createRide, cancelRide, getAllRides } from '../src/services/rideService.js';

jest.mock('../src/services/rideService.js');

const app = express();
app.use(express.json());
app.use('/rides', rideRoutes);

describe('RideService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova corrida', async () => {
    const user_id = 'user123';
    const mockRide = { id: 1, user_id, status: 'active', created_at: new Date().toISOString() };
    createRide.mockResolvedValue(mockRide);

    const response = await request(app)
      .post('/rides/create')
      .send({ user_id });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockRide);
  });

  it('deve cancelar uma corrida', async () => {
    const id = 1;
    const mockRide = { id, status: 'canceled' };
    cancelRide.mockResolvedValue(mockRide);

    const response = await request(app)
      .post(`/rides/cancel/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockRide);
  });

  it('deve listar todas as corridas quando há corridas presentes', async () => {
    const mockRides = [
      { id: 1, user_id: 'user123', status: 'active', created_at: new Date().toISOString() },
      { id: 2, user_id: 'user456', status: 'completed', created_at: new Date().toISOString() },
    ];

    getAllRides.mockResolvedValue(mockRides);

    const response = await request(app).get('/rides');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockRides);
  });

  it('deve retornar uma lista vazia se não houver corridas presentes', async () => {
    getAllRides.mockResolvedValue([]);

    const response = await request(app).get('/rides');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
