const express = require('express');
const app = express();
const methodOverride = require('method-override');
const { initSession } = require('./src/utils/sessions.js');
const { logged } = require('./src/utils/logged.js');
require('dotenv').config();
const PORT = process.env.PORT;
const adminRutes = require('./src/routes/adminRutes');
const authRutes = require('./src/routes/authRutes.js');
const shopRoutes = require('./src/routes/shopRutes.js');
const { notFound } = require('./src/utils/errorHandler.js');



/* define carpeta de archivos estaticos */
app.use(express.static('public'));  //ruta para las paginas en local

/* Crea una session de usuario (inicializacion) */
app.use(initSession()); // Verifica si el user esta logueado
app.use(logged);        // Lo utilizo para el manejo de las opciones del header

/* configuracion del Template Engine - EJS */
app.set('view engine', 'ejs');
app.set('views', './src/views');

/* Parseo de datos recibidos por POST */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Rutas */
app.use('/', shopRoutes)
app.use('/auth', authRutes);
app.use('/admin', adminRutes);

/* 404 */
app.use(notFound); // Manejo del error 404

/* Puerto */
app.listen(PORT, () => console.log(`\n- Servidor corriendo en el puerto ${PORT}`));