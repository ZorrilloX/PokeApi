// controllers/imagenController.js
const path = require('path');
const fs = require('fs');

const manejarImagen = async (req, res) => {
    const pokemonId = req.params.id; // Obtén el ID del Pokémon desde la URL
    const dirPath = path.join(__dirname, '../public/imagenes');
    const imagePath = path.join(dirPath, `${pokemonId}.jpg`); // Ruta de la imagen

    if (req.method === 'POST') {
        // Manejo para cargar la imagen
        try {
            const imagen = req.files?.imagen; // Recibe la imagen enviada, con validación segura

            // Validar si se subió una imagen
            if (!imagen) {
                return res.status(400).send('No se ha subido ninguna imagen.');
            }

            // Guarda la imagen en la carpeta
            await imagen.mv(imagePath);
            return res.status(200).send('Imagen cargada con éxito.');
        } catch (error) {
            console.error('Error al guardar la imagen:', error);
            return res.status(500).send('Error en el servidor');
        }
    } else if (req.method === 'DELETE') {
        // Manejo para eliminar la imagen
        try {
            // Verificar si la imagen existe
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Elimina la imagen
                return res.status(204).send(); // Sin contenido
            } else {
                return res.status(404).send('Imagen no encontrada.');
            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
            return res.status(500).send('Error en el servidor');
        }
    } else {
        // Método no permitido
        return res.status(405).send('Método no permitido.');
    }
};

module.exports = { manejarImagen };
