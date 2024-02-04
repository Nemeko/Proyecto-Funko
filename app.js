const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const adminRutes = require('./src/routes/adminRutes');
const { notFound } = require('./src/utils/errorHandler.js');


/* configuracion del Template Engine - EJS */

// app.set('view engine', 'ejs');
// app.set('views', './src/views');

/* Parseo de datos recibidos por POST */

app.use(express.urlencoded());
app.use(express.json());

/* Rutas de aplicacion */

// app.use('/', (req, res) => res.send("Funko Test"));
// app.use('/shop', shopRutes);
app.use('/admin', adminRutes);

// app.get('/admin', (req, res)=>{
//     console.log('Dentro deladmin');
//     res.send('Dentro del Admin')
// });


// app.get('/admin/create', (req, res)=>{
//     console.log('dentro del create');
//     res.send('dentro de create');
// });



/* agregar una ruta para la config de la pag */
/* admin o config ? */ 

app.use(notFound);                  // Manejo del error 404

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));