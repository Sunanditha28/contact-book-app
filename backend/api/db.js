const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./contacts.db");

// Create table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
  )`);
});

function addContact({ name, email, phone }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)`,
      [name, email, phone],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, name, email, phone });
      }
    );
  });
}

function getContacts({ page, limit }) {
  const offset = (page - 1) * limit;
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM contacts LIMIT ? OFFSET ?`,
      [limit, offset],
      (err, rows) => {
        if (err) return reject(err);
        db.get(`SELECT COUNT(*) as count FROM contacts`, [], (err2, countRow) => {
          if (err2) return reject(err2);
          resolve({ rows, total: countRow.count });
        });
      }
    );
  });
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM contacts WHERE id = ?`, [id], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = { addContact, getContacts, deleteContact };
