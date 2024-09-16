const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../dbConfig');

// Registro de usuario
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  });
});

// Inicio de sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, 'tu_secreto', { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
