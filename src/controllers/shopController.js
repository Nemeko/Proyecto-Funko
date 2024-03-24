/* En este controller va la logica de 'Items' y las llamadas a BBDD*/

const { getAllItemsByLicence } = require('../models/mainModels');
const services = require('../services/adminServices');


module.exports = {
   
    home: async(req, res)=>{
        cards = await services.itemGetAll();
        res.render('./home', {cards});
    },

    showShop : async(req, res) => {
        // res.send('testing');
        items = await services.itemGetAll();
        // res.send(items);
        res.render('./shop/shop', {items});
    },
    
    showItem : async(req, res) => {
        const id = req.params.id;
        const item = await services.itemGetOne(id);
        const cards = await services.itemGetByLicence(item.licence_id);
        console.log(item);
        console.log("\nCards ====> ",cards);
        res.render('./shop/item', {item, cards});
        // res.send("Carga de 1 Item, falta desarrollar");
    }

}