
const express = require('express');
const router = express.Router();
const uploadFiles = require('../middlewares/uploadsFiles');
const imageControl = require('../middlewares/imageControl');
const auth = require('../middlewares/auth');

const adminController = require('../controllers/adminController');

router.get('/list', auth.isLogged, adminController.itemsList);
router.get('/search', adminController.itemSearch);
router.get('/create', auth.isLogged, adminController.itemCreateLoad);
router.get('/edit/:id', auth.isLogged, adminController.itemEditLoad);

router.post('/create', auth.isLogged, uploadFiles.uploadFiles, adminController.itemCreate);
router.post('/edit/:id', auth.isLogged, uploadFiles.uploadFiles, adminController.itemEdit);

router.post('/delete/:id', auth.isLogged, adminController.itemDelete);

module.exports = router;
