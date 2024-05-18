import { run, all } from '../config.js';
import bcrypt from 'bcrypt';

class RideModel {
  static create(user_id, callback) {
    const status = 'active';
    const created_at = new Date().toISOString();
    run(`INSERT INTO rides (user_id, status, created_at) VALUES (?, ?, ?)`,
      [user_id, status, created_at], function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id: this.lastID, user_id, status, created_at });
      });
  }

  static cancel(id, callback) {
    run(`UPDATE rides SET status = ? WHERE id = ?`, ['canceled', id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id, status: 'canceled' });
    });
  }

  static getAll(callback) {
    all(`SELECT * FROM rides`, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  static createUser(email, password, callback) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    run(`INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, hashedPassword], function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id: this.lastID, email });
      });
  }

  static findUserByEmail(email, callback) {
    all(`SELECT * FROM users WHERE email = ?`, [email], (err, rows) => {
      if (err) {
        return callback(err);
      }
      if (rows.length === 0) {
        return callback(new Error('E-mail não encontrado'));
      }
      callback(null, rows[0]);
    });
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

export default RideModel;
