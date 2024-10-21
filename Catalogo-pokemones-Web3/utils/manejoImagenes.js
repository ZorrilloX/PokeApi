const path = require('path');
const fs = require('fs');

async function manejarImagen(req, eliminar, id) {
    const dirPath = path.join(__dirname, '../public/images/pokemones');
    const oldImagePath = path.join(dirPath, `${id}.jpg`);

    if (eliminar) {
        if (fs.existsSync(oldImagePath)) {
            console.log(`Eliminando la imagen: ${oldImagePath}`);
            fs.unlinkSync(oldImagePath);
        }
    } else {
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const newFilename = `${id}.jpg`;
            const uploadPath = path.join(dirPath, newFilename);

            if (fs.existsSync(oldImagePath)) {
                console.log(`Eliminando imagen anterior: ${oldImagePath}`);
                await fs.promises.unlink(oldImagePath);
            }

            try {
                console.log(`Moviendo la nueva imagen a: ${uploadPath}`);
                await imagen.mv(uploadPath);
            } catch (err) {
                console.error('Error al mover la nueva imagen:', err);
                throw new Error('Error al mover la nueva imagen');
            }
        }
    }
}

module.exports = { manejarImagen };
