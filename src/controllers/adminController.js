
const db = require('../models/mainModels');
const adminServices = require('../services/adminServices');
const services = require('../services/adminServices');
const fs = require('fs');   // Se llama para eliminar archivos del directorio

module.exports = {
    /* Admin list */
    itemsList : async (req, res) => {
        try{
            const { search } = req.query
            const headerMenu = req.headerMenu
            let items = [];

            if (search){
                items = await services.seachAdmin(`%${search}%`);
                console.log("dentro del search");
            }else{
                items = await services.itemGetAll();
                console.log("dentro del list")                
            }
            res.render('./admin/admin',{items, headerMenu});
            
        }catch(err){
            res.status(500).render('./error',{err})
        }
    },


    /* Item create */
    itemCreateLoad : async (req, res) => {
        const category = await db.getAllCategory();
        const licence = await db.getAllLicence();
        const formAction = `/admin/create`;
        const headerMenu = req.headerMenu

        const view = {
            tapName : "Admin | FUNKO",
            title: "CREAR ITEM",
            method: ""
        }    
        
        const newSchema = await services.itemSchema("product");
        console.log("New Schema ==> ", newSchema); 
       
        res.render('./admin/create',{
            formAction: formAction,
            view: view,
            item: newSchema,
            category: category,
            licence: licence,
            headerMenu
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
        const headerMenu = req.headerMenu
        // const item = await db.getOneItem({product_id: id});        // Hay que mandar la consulta para completar la query 
        const item = await adminServices.itemGetOne(id);
        // console.log('item devuelto por la BBDD: ',item);
        const formAction = `/admin/edit/${item.product_id}`;
        // const formAction = item[0].product_id;
        const category = await db.getAllCategory();
        const licence = await db.getAllLicence();
        
        res.render('./admin/create',{
            formAction: formAction,
            view: view,
            item: item,
            category: category,
            licence: licence,
            headerMenu
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
            // items = await services.itemSearchAdmin(`%${search}%`);
            items = await services.searchAdmin(`%${search}%`);
            console.log(items);
            res.send(items)
        }catch(err){
            res.status(500).render('./error',{err})
        }
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
