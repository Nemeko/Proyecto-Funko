const express = require('express');
const app = express();
const methodOverride = require('method-override');
require('dotenv').config();
const PORT = process.env.PORT;
const adminRutes = require('./src/routes/adminRutes');
const shopRoutes = require('./src/routes/shopRutes.js')
const mainRoutes = require('./src/routes/mainRoutes.js');
const { notFound } = require('./src/utils/errorHandler.js');


/* define carpeta de archivos estaticos */
app.use(express.static('public'));  //ruta para las paginas en local


/* configuracion del Template Engine - EJS */
app.set('view engine', 'ejs');
app.set('views', './src/views');

/* Parseo de datos recibidos por POST */
app.use(express.urlencoded({extended: false}));
app.use(express.json());


/* middleware para poder utilizar los metodos PUT y DELETE */
// app.use(methodOverride('_method'));

/* Rutas de aplicacion */

// app.use('/', (req, res) => res.send("Funko Test"));
// app.use('/shop', shopRutes);
app.use('/', mainRoutes)
app.use('/shop', shopRoutes);
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
app.listen(PORT, () => console.log(`\n- Servidor corriendo en el puerto ${PORT}`));