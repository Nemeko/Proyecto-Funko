/* Este archivo va a controllers */

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js')

router.get('/', (req, res)=>{
    res.render('home');
});

module.exports = router;



// res.reder('ruta de la pag', {objeto que se envia})
// res.reder('../views/admin/admin', {objeto que se envia})
