/* Este archivo de rutas utiliza el archivo de controllers */

const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController.js')


router.get('/', shopController.home);
router.get('/shop', shopController.showShop);
router.get('/shop/search', shopController.search);
router.get('/shop/item/:id', shopController.showItem);

module.exports = router;



