
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController.js')

const header = require('../middlewares/header');

router.get('/',header.shop, shopController.home);
router.get('/shop',header.shop, shopController.showShop);
router.get('/shop/search', shopController.search);
router.get('/shop/item/:id',header.shop, shopController.showItem);

module.exports = router;



