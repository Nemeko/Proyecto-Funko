
/* En este controller va la logica de 'Items' y las llamadas a BBDD*/

// const { getAllItem, getOneItem } = require('../models/mainModels');
const db = require('../models/mainModels');
const adminServices = require('../services/adminServices');
const services = require('../services/adminServices');

module.exports = {

    /* Admin list */
    itemsList : async (req, res) => {
        const items = await db.getAllItem();
        res.render('./admin/admin',{items});
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
        
        let items = req.body;

        await services.createItem(items);
        
        items = await db.getAllItem();
        res.render('./admin/admin',{items});

        /* if boton de pagina = Agregar producto -> query set xxx from ....*/
        /* if boton de pagina = Editar producto -> query update from ....*/

        /* opcion B configurar la llamada como PUT o como POST para que vaya a un controlador distinto */
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

        const item = req.body;
        console.log('req.body => ', item);
        const files = Object.values(req.files);
        console.log('req.files => ', files);
        const id = req.params.id;
        
        console.log('- Controller -> ItemEdit');    

        if(files.length == 2){
            console.log('2 Imagenes editadas')
            item.image_front = `/img/Imagenes-Funko/${files[0][0].filename}`;
            item.image_back = `/img/Imagenes-Funko/${files[1][0].filename}`;

        } else if(files.length == 1) {
            console.log('1 Imengen editada')
            files[0][0].fieldname == 'imagenDelantera' ? item.image_front = `/img/Imagenes-Funko/${files[0][0].filename}` : item.image_back = `/img/Imagenes-Funko/${files[0][0].filename}`;
            
        }else{
            console.log('Ninguna imagen editada');
        }

        await services.itemEdit(item, id);
        res.redirect(`/admin/list`);
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

    itemDelete : async (req, res) => {
        const id = req.params.id;
        console.log("Deleteando: ", id);
        
        await services.itemDelete({product_id: id})
        res.redirect(`/admin/list`);
    }

}
