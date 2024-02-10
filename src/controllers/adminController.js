
/* En este controller va la logica de 'Items' y las llamadas a BBDD*/

// const { getAllItem, getOneItem } = require('../models/mainModels');
const db = require('../models/mainModels')


const itemsList = async (req, res) => {
    const items = await db.getAllItem();
    res.render('./admin/admin',{items});
}

const itemCreateLoad = async (req, res) => {
    
    const category = await db.getAllCategory();
    const licence = await db.getAllLicence();
    const formAction = `action=/admin/create`

    const view = {
        tapName : "Admin | FUNKO",
        title: "CREAR ITEM",
        method: ""
    }    
    
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

}

const itemEditLoad = async(req, res) => {
    const view = {
        tapName : "Admin | FUNKO",
        title: "EDITAR ITEM",
        method: "?_method=PUT"
    }     
    
    const id = req.params.id;
    const item = await db.getOneItem({product_id: id});        // Hay que mandar la consulta para completar la query 
    const formAction = `action=/admin/edit/${item[0].product_id}?_method=PUT`
    const category = await db.getAllCategory();
    const licence = await db.getAllLicence();
    
    // <option value="" disabled hidden selected>-- Seleccionar --</option>
    
    console.log(item[0]);
    console.log('------');
    console.log(licence);

    console.log('------');
    console.log(licence[0].licence_name);

    
    // console.log('-----------');
    // console.log("Licencia del Item: ",item[0].licence_id);  
    
    res.render('./admin/create',{
        formAction: formAction,
        view: view,
        item: item[0],
        category: category,
        licence: licence
    });
}

const userLogin = async (req, res) => {
    res.render('./admin/login');
}

const adminRegisterLoad = async (req, res) => {
    res.render('./admin/register');
}


const itemCreate = (req, res) => {
    console.log('Controller -> itemCreate');
    res.send('Controller -> itemCreate');

    /* if boton de pagina = Agregar producto -> query set xxx from ....*/
    /* if boton de pagina = Editar producto -> query update from ....*/

    /* opcion B configurar la llamada como PUT o como POST para que vaya a un controlador distinto */



}

const adminRegister = async (req, res) => {
    console.log('Controller -> adminRegister');
    res.send('Controller -> adminRegister');
}


const itemEdit = (req, res) => {
    console.log('Controller -> itemEdit');
    res.send('Se envio el formulario, dentro de itemEdit');
}


const itemDelete = async (req, res) => {
    console.log('Controller -> itemDelete');
    res.send('Controller -> itemDelete');
}

module.exports = {
    itemsList,
    itemCreateLoad,
    itemEditLoad,
    userLogin,
    adminRegisterLoad,
    itemCreate,
    adminRegister,
    itemEdit,
    itemDelete
}