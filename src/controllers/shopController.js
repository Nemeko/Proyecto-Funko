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
    },

    serchItem : async(req, res) => {
       
        const search = req.body.valorBuscado;
        const order = req.body.valorOpciones;
        const min = req.body.valorPrecioMin;
        const max = req.body.valorPrecioMax;

        console.log(req.body);
        try{
        const items = await services.searchItem(search, order, min, max);
        res.send(items);
        }catch(err){
            console.log(err);
            res.status(500).render('./error',{err})
        }

    }
}