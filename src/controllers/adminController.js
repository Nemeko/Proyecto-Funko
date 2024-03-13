
/* En este controller va la logica de 'Items' y las llamadas a BBDD*/

// const { getAllItem, getOneItem } = require('../models/mainModels');
const { secureHeapUsed } = require('crypto');
const db = require('../models/mainModels');
const adminServices = require('../services/adminServices');
const services = require('../services/adminServices');
const fs = require('fs');   // Se llama para eliminar archivos del directorio
const { on } = require('events');

// console.log("dirname: ",__dirname);              //Directorio donde se ejecuta el archivo (adminController.js)
// console.log("process.cwd: ",process.cwd());      //Directorio donde se ejecuta node (app.js)

module.exports = {
    /* Admin list */
    itemsList : async (req, res) => {
        try{
            const { search } = req.query
            console.log(`Search: ${search}`);
            if (search){
                items = await services.itemSearchAdmin(`%${search}%`);
                console.log("dentro del search");
                res.render('./admin/admin',{items})
            }else{
                items = await services.itemGetAll();
                console.log("dentro del list")
                res.render('./admin/admin',{items})
            }
            
        }catch(err){
            res.status(500).render('./error',{err})
        }
        // items.isError ? databaseErrorResponse : etc ;
        // redirigir a la pag de error con un boton de volver ?
    },


    /* Item create */
    itemCreateLoad : async (req, res) => {
        const category = await db.getAllCategory();
        const licence = await db.getAllLicence();
        const formAction = `/admin/create`;

        const view = {
            tapName : "Admin | FUNKO",
            title: "CREAR ITEM",
            method: ""
        }    
        
        // const info = await db.dbInfo();
        // console.log('dbINFO => ', info);     // testing de la info de la BD

        const item =  {
                    product_id: '',
                    product_name: '',
                    product_description: '',
                    price: '',
                    stock: '',
                    discount: '',
                    sku: '',
                    dues: '',
                    image_front: '',
                    image_back: '',
                    licence_id: '',
                    category_id: ''
                }
            // res.render('./admin/create',{item: item,view: view});
            res.render('./admin/create',{
                formAction: formAction,
                view: view,
                item: item,
                category: category,
                licence: licence
            });
    },

    itemCreate : async(req, res) => {
        console.log('- Controller -> itemCreate'); 

        const item = req.body;
        const files = Object.values(req.files);
        files.forEach(([file]) => {               // Detectando si se cargo una nueva imagen
            file.fieldname == 'imagenDelantera' ? item.image_front = `/img/Imagenes-Funko/${file.filename}` : item.image_back = `/img/Imagenes-Funko/${file.filename}`;
        })
        try{
        await services.itemCreate(item);
        res.redirect(`/admin/list`);
        }catch(err){
            res.status(500).render('./error',{err})
        } 
    },

    /* Item edit */
    itemEditLoad : async(req, res) => {
        const view = {
            tapName : "Admin | FUNKO",
            title: "EDITAR ITEM",
            method: "?_method=PUT"
        }     
        
        const id = req.params.id;
        console.log("ID: ", id);
        // const item = await db.getOneItem({product_id: id});        // Hay que mandar la consulta para completar la query 
        const item = await adminServices.itemGetOne(id);
        // console.log('item devuelto por la BBDD: ',item);
        const formAction = `/admin/edit/${item.product_id}`;
        // const formAction = item[0].product_id;
        const category = await db.getAllCategory();
        const licence = await db.getAllLicence();
        
        // console.log('- Controller - ItemEditLoad');
        // console.log(' -- Item => ', item);
        console.log(` ---------------- `);
        // console.log('-- Controller - formAction -> ',formAction);

        res.render('./admin/create',{
            formAction: formAction,
            view: view,
            item: item,
            category: category,
            licence: licence
        });
    },

    itemEdit : async (req, res) => {

        console.log('- Controller -> ItemEdit'); 

        const item = req.body;
        const files = Object.values(req.files);
        const id = req.params.id;
        let {image_front, image_back} = await services.itemGetOne(id);  // trayendo las imagenes de la BBDD

        files.forEach(([file]) => {                                     // Detectando si se cargo una nueva imagen
            file.fieldname == 'imagenDelantera' ? image_front = `/img/Imagenes-Funko/${file.filename}` : image_back = `/img/Imagenes-Funko/${file.filename}`;
        })
        
        Object.assign(item, {image_front:image_front},{image_back:image_back});     // asignando las variables a item

        await services.itemEdit(item, id);
        res.redirect(`/admin/list`);
    },

    /* ItemSearch API */

    itemSearch : async (req, res) => {
        try{
            console.log("Dentro del API search")
            const { search } = req.query
            console.log(`Search: ${search}`);
            items = await services.itemSearchAdmin(`%${search}%`);
            res.send(items)
        }catch(err){
            res.status(500).render('./error',{err})
        }
    },











    userLogin : async (req, res) => {
        res.render('./auth/login');
    },

    adminRegisterLoad : async (req, res) => {
        res.render('./admin/register');
    },

    adminRegister : async (req, res) => {
        console.log('Controller -> adminRegister');
        res.send('Controller -> adminRegister');
    },



    /* Item delete */
    itemDelete : async (req, res) => {
        const id = req.params.id;      
        const item = await adminServices.itemGetOne(id);        // Obteniendo info del item

        console.log("Deleteando: ",item);

        if(item.image_front){
            fs.unlink(process.cwd()+'/public'+item.image_front, (err) => {  // Funcion para deletear del disco
                if(err) throw err;
            });
        }
        if(item.image_back){
            fs.unlink(process.cwd()+'/public'+item.image_back, (err) => {  // Funcion para deletear del disco
                    if(err) throw err;
            });
        }

        await services.itemDelete({product_id: id})     // Servicio para deletear de la BBDD
        res.redirect(`/admin/list`);
    }

}
