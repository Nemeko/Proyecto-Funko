
const express = require('express');
const router = express.Router();
const uploadFiles = require('../middlewares/uploadsFiles');
const imageControl = require('../middlewares/imageControl');

// const multer = require('multer');
// const path = require('path');           /* esto lo utilizo para resolver la ruta desde donde estoy */


// // console.log('- Middleware -> UploadFiles');    

// /* Logica para guardar las imagenes */
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/img/Imagenes-Funko')), // ruta destination
//     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)  // nombre del archivo
// })

// const configMulter = multer({storage:storage});       // Configuracion de multer

// const uploadFiles = configMulter.fields([
//     {name:'imagenDelantera',maxCount:1},
//     {name:'imagenTrasera', maxCount:1}
// ]);





const adminController = require('../controllers/adminController');

router.get('/list', adminController.itemsList);
router.get('/login', adminController.userLogin);
router.get('/create', adminController.itemCreateLoad);
router.get('/edit/:id', adminController.itemEditLoad);
router.get('/register', adminController.adminRegisterLoad);

router.post('/create', uploadFiles.uploadFiles, adminController.itemCreate);
router.post('/edit/:id', uploadFiles.uploadFiles, adminController.itemEdit);
router.post('/register', adminController.adminRegister);

router.post('/delete/:id', adminController.itemDelete);

module.exports = router;

/*  completar la lista de los get con todas las pag de admin
    luego agregar los post, puts y delete */