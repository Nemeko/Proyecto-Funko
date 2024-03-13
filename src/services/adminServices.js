/* capa servicios para antes de la conulta de modeles a la BBDD */
const { json } = require('express');
const db = require('../models/mainModels');

const schema = async(params) => {
    try{
        const headers = await db.dbCabeceras();
        const ignoredKeys = ["product_id", "create_time", "name", "description"];
        const itemSchema = {};
        /*  asignacion de schema para que coincida con la BBDD, si se agregan nuevos 
            campos en el formulario que sean distintos a la BBDD se normalizan aqui*/
        params.product_name = params.name;
        params.product_description = params.description;

        /* Creacion del schema */
        headers.forEach((o) => itemSchema[Object.values(o)]=null);  // Creacion de objeto en base a las cabeceras de la BD
        Object.assign(itemSchema, params);                          // Clonar parametros en base al esquema de la BD
        ignoredKeys.forEach((key) => delete itemSchema[key]);       // Eliminacion de las 'Keys' no requeridas
    
        console.log('Schema');
        console.log(itemSchema);
        console.log(' ------- ');

        // const itemParams = Object.keys(itemSchema); 
        // const itemValues = Object.values(itemSchema);  

        return itemSchema;
    }catch(err){
        console.log(err.message);
        return err
    }
}

module.exports = {
    /* Crear */
    itemCreate: async(params) => {
                
        const itemSchema = await schema(params); 
        return await db.insertItem(itemSchema);
    },


    /* Obtener */
    itemGetOne: async (params) => {
        const id = {product_id: params};
        const item =  await db.getOneItem(id);
        return item[0];
    },
    
    itemGetAll: async (params) => {
        return await db.getAllItems();
    },
        
    itemSearchAdmin: async (params) => {
        return await db.getSearchAdmin(params);
    },


    /* Editar */
    itemEdit : async (params, id) => {
        console.log('- Servicios -> itemEdit');
        const itemSchema = await schema(params);      // esta logica va para itemCreate ya que para el edit solo se necesita el Objeto
        return await db.updateItem(itemSchema, id);

    },


    /* Delete */
    itemDelete : async(id)=>{
        return await db.deleteItem(id);
    }

}