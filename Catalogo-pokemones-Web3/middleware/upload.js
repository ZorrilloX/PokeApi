const multer = require('multer');

// Configura el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'ruta/a/tu/carpeta'); // Cambia esto a la ruta donde deseas almacenar las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Inicializa multer
const upload = multer({ storage: storage });

// Exporta el middleware
module.exports = upload;
