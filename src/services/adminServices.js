/* capa servicios para antes de la conulta de modeles a la BBDD */


const db = require('../models/mainModels');

module.exports = {
    /* Crear */

    createItem: async(params) => {
        const itemSchema = {
            product_name: params.name,
            product_description: params.description,
            price: params.price,
            stock: params.stock,
            discount: params.discount,
            sku: params.sku,
            dues: params.dues,
            licence_id: params.licence_id,
            category_id: params.category_id 
        }
        return await db.insertItem(Object.values(itemSchema));
    },

    /* Obtener */
    itemGetOne: async (params) => {
        const id = {product_id: params};
        const item =  await db.getOneItem(id);
        return item[0];
    },

    /* Editar */
    itemEdit : async (params, id) => {
    console.log('- Servicios -> itemEdit');
      
    const itemSchema = {
        product_name: params.name,
        product_description: params.description,
        price: params.price,
        stock: params.stock,
        discount: params.discount,
        sku: params.sku,
        dues: params.dues,
        licence_id: params.licence_id,
        category_id: params.category_id 
    }

    params.image_front ? itemSchema.image_front = params.image_front : console.log(" --- No hay imagen delantera ");
    params.image_back ? itemSchema.image_back = params.image_back : console.log(" --- No hay imagen trasera ");

    return await db.updateItem(itemSchema, id);

    },

    itemDelete : async(id)=>{
        return await db.deleteItem(id);
    }

}
/*
product_name`='[value-2]',
`product_description`='[value-3]',
`price`='[value-4]',
`stock`='[value-5]',
`discount`='[value-6]',
`sku`='[value-7]',
`dues`='[value-8]',
`image_front`='[value-9]',
`image_back`='[value-10]',
`create_time`='[value-11]',
`licence_id`='[value-12]',
`category_id`='[value-13]' 
*/