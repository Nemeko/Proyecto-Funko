/* Este archivo de rutas utiliza el archivo de controllers */

const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController.js')


// router.get('/item/:id', shopController.getItem);
// router.get('/', shopController.showShop);
// router.get('/item/:id', shopController.showItem);

router.get('/', shopController.home);
router.get('/shop', shopController.showShop);
router.get('/shop/item/:id', shopController.showItem);


// router.get('/list', adminController.itemsList);

module.exports = router;



