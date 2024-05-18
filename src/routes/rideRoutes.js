import express from 'express';
import RideController from '../controllers/rideController.js';
import AuthController from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rides
 *   description: Endpoints relacionados a corridas
 */

/**
 * @swagger
 * /rides/register:
 *   post:
 *     summary: Registra um novo usuário.
 *     description: Cria um novo usuário com base no e-mail e senha fornecidos.
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *       '500':
 *         description: Erro no servidor.
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /rides/login:
 *   post:
 *     summary: Login de usuário.
 *     description: Autentica o usuário e retorna um token JWT.
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       '200':
 *         description: Login bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT.
 *       '401':
 *         description: E-mail ou senha inválidos.
 *       '500':
 *         description: Erro no servidor.
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /rides/create:
 *   post:
 *     summary: Cria uma nova corrida.
 *     description: Cria uma nova corrida com base no ID do usuário fornecido.
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
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
 *       '401':
 *         description: Acesso não autorizado.
 */
router.post('/create', AuthController.authenticate, RideController.create);

/**
 * @swagger
 * /rides/cancel/{id}:
 *   post:
 *     summary: Cancela uma corrida.
 *     description: Cancela a corrida com o ID especificado.
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
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
 *       '401':
 *         description: Acesso não autorizado.
 */
router.post('/cancel/:id', AuthController.authenticate, RideController.cancel);

/**
 * @swagger
 * /rides:
 *   get:
 *     summary: Obtém todas as corridas.
 *     description: Obtém uma lista de todas as corridas.
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
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
 *       '401':
 *         description: Acesso não autorizado.
 */
router.get('/', AuthController.authenticate, RideController.getAll);

export default router;
