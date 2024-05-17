const db = require('../config');

class RideModel {
  static create(user_id, callback) {
    const status = 'active';
    const created_at = new Date().toISOString();
    db.run(`INSERT INTO rides (user_id, status, created_at) VALUES (?, ?, ?)`,
      [user_id, status, created_at], function(err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id: this.lastID, user_id, status, created_at });
      });
  }

  static cancel(id, callback) {
    db.run(`UPDATE rides SET status = ? WHERE id = ?`, ['canceled', id], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id, status: 'canceled' });
    });
  }

  static getAll(callback) {
    db.all(`SELECT * FROM rides`, [], (err, rows) => {
    if (err) {
    return callback(err);
    }
    callback(null, rows);
    });
    }
    }


module.exports = RideModel;
