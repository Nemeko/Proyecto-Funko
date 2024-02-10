/* Este archivo de rutas utiliza el archivo de controllers */

const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController.js')

router.get('/item/:id', shopController.getItem);


module.exports = router;



