
const express = require('express');
const router = express.Router();
const uploadFiles = require('../middlewares/uploadsFiles');
const imageControl = require('../middlewares/imageControl');

const authController = require('../controllers/authController');

router.get('/login', authController.userLoginLoad);
router.get('/logout', authController.userLogout);
router.get('/register', authController.adminRegisterLoad);

router.post('/login', authController.userLogin);
router.post('/register', authController.adminRegister);

module.exports = router;
