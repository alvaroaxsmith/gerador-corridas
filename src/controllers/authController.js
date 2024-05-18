import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import RideModel from '../models/rideModel.js';

dotenv.config({ path: './.env' });
const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      RideModel.createUser(email, password, (err, user) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json(user);
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      RideModel.findUserByEmail(email, (err, user) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!user || !RideModel.comparePassword(password, user.password)) {
          return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static authenticate(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Acesso negado' });
    }
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ error: 'Token inválido' });
    }
  }
}

export default AuthController;
