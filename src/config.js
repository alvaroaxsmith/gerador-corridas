import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE rides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    status TEXT,
    created_at TEXT
  )`, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela de corridas:', err.message);
    } else {
      console.log('Tabela de corridas criada com sucesso.');
    }
  });

  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela de usuários:', err.message);
    } else {
      console.log('Tabela de usuários criada com sucesso.');
    }
  });
});

export const run = (sql, params, callback) => db.run(sql, params, callback);
export const all = (sql, params, callback) => db.all(sql, params, callback);

export default db;
