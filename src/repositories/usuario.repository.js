import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )
`);

function createUsuarioRepository(novoUsuario) {
  return new Promise((resolve, reject) => {
    const { nome, email, senha } = novoUsuario;
    db.run(
      `INSERT INTO usuario(nome, email, senha) VALUES(?,?,?)`,
      [nome, email, senha],
      function (error) {
        if (error) return reject(error);
        resolve({ id: this.lastID, ...novoUsuario });
      }
    );
  });
}

function findAllUsuarioRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM usuario`, [], (error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    });
  });
}

function findUsuarioByIdRepository(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM usuario WHERE id = ?`, [id], (error, row) => {
      if (error) return reject(error);
      resolve(row);
    });
  });
}

function updateUsuarioRepository(id, usuario) {
  return new Promise((resolve, reject) => {
    const { nome, email, senha } = usuario;
    db.run(
      `UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?`,
      [nome, email, senha, id],
      function (error) {
        if (error) return reject(error);
        resolve(this.changes > 0); // true se atualizou
      }
    );
  });
}

function deleteUsuarioRepository(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM usuario WHERE id = ?`, [id], function (error) {
      if (error) return reject(error);
      resolve(this.changes > 0); // true se deletou
    });
  });
}

export default {
  createUsuarioRepository,
  findAllUsuarioRepository,
  findUsuarioByIdRepository,
  updateUsuarioRepository,
  deleteUsuarioRepository
};