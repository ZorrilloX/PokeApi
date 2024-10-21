const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload'); // para subir archivos
const path = require('path');
const corsOptions = {
    origin: 'http://localhost:5173'
};
const imagenRoutes = require('./routers/imagenRoutes');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.static('public'));

// Middleware para servir archivos estáticos
app.use('/imagenes', express.static(path.join(__dirname, 'public/imagenes')));
app.use('/api', imagenRoutes);
// Configuraciones adicionales
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Sin duplicación de rutas
require('./routers')(app); // Aquí se manejarán todas las rutas a través del archivo routers

const db = require("./models");
db.sequelize.sync({
    //force: true // drop database and recreate
}).then(() => {
    console.log("database resync");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Exito! escuchando el puerto ${port}...`);
});
