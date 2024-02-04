const express = require('express');
const app = express();

const PORT = 4001;

app.get('/', (req, res) => res.send("hola Pepe"));


app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));