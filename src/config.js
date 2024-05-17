import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE rides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    status TEXT,
    created_at TEXT
  )`);
});

export const run = (sql, params, callback) => db.run(sql, params, callback);
export const all = (sql, params, callback) => db.all(sql, params, callback);
export const update = (sql, params, callback) => db.run(sql, params, callback);

export default db;
