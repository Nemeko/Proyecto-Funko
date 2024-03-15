/* En este controller va la logica de 'Items' y las llamadas a BBDD*/

const services = require('../services/shopServices');


module.exports = {
    // getItem : async (req, res) => {
    //     console.log('--- Ruta para un solo item');
    //     const id = req.params.id;                       // Tomamos y guardamos el valor de item en la variable 'id' para enviarla a la query
    //     const item = await getOne({product_id: id});    // Pasamos el parametro cargado en la URL como objeto, para crear la query 
    //     console.log(item[0]);
    //     // funcion para mandar related
    //     item[0] == undefined ? res.send('Item no encontrado'):res.render('./shop/item',{item: item[0]}); // mando el objeto que devuelve la BBDD    
    // },
    showShop : async(req, res) => {
        // res.send('testing');
        items = await services.itemShopLoad();
        // res.send(items);
        res.render('./shop/shop', {items});
    },
    showItem : async(req, res) => {
        res.send("Carga de 1 Item, falta desarrollar");
    }


}