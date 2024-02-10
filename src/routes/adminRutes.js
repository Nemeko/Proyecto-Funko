
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/list', adminController.itemsList);
router.get('/create', adminController.itemCreateLoad);
router.get('/edit/:id', adminController.itemEditLoad);
router.get('/login', adminController.userLogin);
router.get('/register', adminController.adminRegisterLoad);

router.post('/create', adminController.itemCreate);
router.post('/register', adminController.adminRegister)

router.put('/edit/:id', adminController.itemEdit);

router.delete('/delete/:item', adminController.itemDelete);

module.exports = router;

/*  completar la lista de los get con todas las pag de admin
    luego agregar los post, puts y delete */