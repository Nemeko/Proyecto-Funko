/* En este controller va la logica de 'Items' y las llamadas a BBDD*/

const { getAllItemsByLicence } = require('../models/mainModels');
const services = require('../services/adminServices');


module.exports = {
   
    home: async(req, res)=>{
        const headerMenu = req.headerMenu;
        const licences = await services.licenceGetAll();
        const cards = await services.itemGetAll();
        res.render('./home', {licences, cards, headerMenu});
    },

    showShop : async(req, res) => {
        const headerMenu = req.headerMenu;
        items = await services.itemGetAll();
        res.render('./shop/shop', {items, headerMenu});
    },
    
    showItem : async(req, res) => {
        const headerMenu = req.headerMenu;
        const id = req.params.id;
        const item = await services.itemGetOne(id);
        const cards = await services.itemGetByLicence(item.licence_id);
        res.render('./shop/item', {item, cards, headerMenu});
        // res.send("Carga de 1 Item, falta desarrollar");
    },

    search : async(req, res) => {
        
        // const cards = await services.itemGetByLicence(item.licence_id);
        // renderizar la propia pagina de
        // res.render('./shop/item', {item, cards});
        // res.send("Carga de 1 Item, falta desarrollar");
    }

}