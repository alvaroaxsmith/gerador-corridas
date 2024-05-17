import express from 'express';
import RideController from '../controllers/rideController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rides
 *   description: Endpoints relacionados a corridas
 */

/**
 * @swagger
 * /rides/create:
 *   post:
 *     summary: Cria uma nova corrida.
 *     description: Cria uma nova corrida com base no ID do usuário fornecido.
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID do usuário para o qual a corrida será criada.
 *     responses:
 *       '201':
 *         description: Corrida criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID da corrida criada.
 *                 user_id:
 *                   type: string
 *                   description: ID do usuário associado à corrida.
 *                 status:
 *                   type: string
 *                   description: Status da corrida.
 *                 created_at:
 *                   type: string
 *                   description: Data de criação da corrida.
 */
router.post('/create', RideController.create);

/**
 * @swagger
 * /rides/cancel/{id}:
 *   post:
 *     summary: Cancela uma corrida.
 *     description: Cancela a corrida com o ID especificado.
 *     tags: [Rides]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID da corrida a ser cancelada.
 *     responses:
 *       '200':
 *         description: Corrida cancelada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID da corrida cancelada.
 *                 status:
 *                   type: string
 *                   description: Novo status da corrida (canceled).
 */
router.post('/cancel/:id', RideController.cancel);

/**
 * @swagger
 * /rides:
 *   get:
 *     summary: Obtém todas as corridas.
 *     description: Obtém uma lista de todas as corridas.
 *     tags: [Rides]
 *     responses:
 *       '200':
 *         description: Lista de todas as corridas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID da corrida.
 *                   user_id:
 *                     type: string
 *                     description: ID do usuário associado à corrida.
 *                   status:
 *                     type: string
 *                     description: Status da corrida.
 *                   created_at:
 *                     type: string
 *                     description: Data de criação da corrida.
 */
router.get('/', RideController.getAll);

export default router;
