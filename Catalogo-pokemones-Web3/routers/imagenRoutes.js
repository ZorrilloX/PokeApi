const express = require('express');
const { manejarImagen } = require('../controllers/imagenController');
const router = express.Router();

// Ruta para recibir la imagen con el ID del Pokémon
router.post('/upload-imagen/:id', manejarImagen);
router.delete('/upload-imagen/:id', manejarImagen)

// Exportar el router directamente
module.exports = router;
