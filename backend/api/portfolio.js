const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Obtener todos los trabajos
router.get('/', (req, res) => {
  const query = `
    SELECT j.id, j.client_name, j.client_url, j.position, j.description, j.job_image_url, j.created_at, u.username
    FROM jobs j
    JOIN users u ON j.user_id = u.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Obtener un trabajo específico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT j.id, j.client_name, j.client_url, j.position, j.description, j.job_image_url, j.created_at, u.username
    FROM jobs j
    JOIN users u ON j.user_id = u.id
    WHERE j.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Trabajo no encontrado' });
    }
    res.json(results[0]);
  });
});

// Crear un nuevo trabajo
router.post('/', (req, res) => {
  const { client_name, client_url, position, description, job_image_url, user_id } = req.body;
  const query = `
    INSERT INTO jobs (client_name, client_url, position, description, job_image_url, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [client_name, client_url, position, description, job_image_url, user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Trabajo creado con éxito' });
  });
});

// Actualizar un trabajo existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { client_name, client_url, position, description, job_image_url } = req.body;
  const query = `
    UPDATE jobs
    SET client_name = ?, client_url = ?, position = ?, description = ?, job_image_url = ?
    WHERE id = ?
  `;
  db.query(query, [client_name, client_url, position, description, job_image_url, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Trabajo actualizado con éxito' });
  });
});

// Eliminar un trabajo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM jobs WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Trabajo eliminado con éxito' });
  });
});

module.exports = router;
