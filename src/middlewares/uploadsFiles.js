const multer = require('multer');
const path = require('path');           /* esto lo utilizo para resolver la ruta desde donde estoy */


// console.log('- Middleware -> UploadFiles');    

/* Logica para guardar las imagenes */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/img/Imagenes-Funko')), // ruta destination
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)  // nombre del archivo
})

const configMulter = multer({storage:storage});       // Configuracion de multer

const uploadFiles = configMulter.fields([
    {name:'imagenDelantera',maxCount:1},
    {name:'imagenTrasera', maxCount:1}
]);

module.exports = {
    uploadFiles
}