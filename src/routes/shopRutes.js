
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController.js')

const header = require('../middlewares/header');

router.get('/',header.shop, shopController.home);
router.get('/shop',header.shop, shopController.showShop);
router.get('/shop/item/:id',header.item, shopController.showItem);
// router.get('/shop/carrito', shopController.showCarrito);


router.post('/shop/search', shopController.serchItem);
router.post('/shop/carrito', header.item, shopController.takeCarritoInfo);

// router.post('/shop/search', shopController.serchItem);

module.exports = router;