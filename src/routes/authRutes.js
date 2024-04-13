
const express = require('express');
const router = express.Router();
const uploadFiles = require('../middlewares/uploadsFiles');
const imageControl = require('../middlewares/imageControl');
const header = require('../middlewares/header');

const authController = require('../controllers/authController');

router.get('/login', authController.userLoginLoad);
router.get('/logout', authController.userLogout);
router.get('/register', header.create, authController.adminRegisterLoad);

router.post('/login', authController.userLogin);
router.post('/register', authController.adminRegister);

module.exports = router;
