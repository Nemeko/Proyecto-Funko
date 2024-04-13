/* capa servicios para antes de la conulta de modeles a la BBDD */
const { json } = require('express');
const db = require('../models/mainModels');
const header = require('../middlewares/header');

const schema = async(params, table) => {
    try{
        const headers = await db.dbCabeceras(table);
        const ignoredKeys = ["schema", "product_id", "create_time", "isAdmin", "aceptacionDeTerminos", "passwordR"];
        const itemSchema = {};
              
        /* Creacion del schema */
        headers.forEach((o) => itemSchema[Object.values(o)]=null);  // Creacion de objeto en base a las cabeceras de la BD
        Object.assign(itemSchema, params);                          // Clonar parametros en base al esquema de la BD
        ignoredKeys.forEach((key) => delete itemSchema[key]);       // Eliminacion de las 'Keys' no requeridas

        

        console.log('Headers\n');
        console.log(headers);

        console.log('\nParams\n',params);

        console.log('\nSchema');
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
                
        const itemSchema = await schema(params, "product"); 
        itemSchema.discount == "" ? itemSchema.discount = 0:"";
        console.log(`* cabeceras => ${itemSchema}\n\n`);
        return await db.insertItem(itemSchema);
    },
    userCreate: async(params) => {
        const userSchema = await schema(params, "user"); 
        console.log(`* cabeceras => ${userSchema}\n\n`);
        return await db.insertUser(userSchema);
        

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

    itemGetByLicence: async (params) => {
        return await db.getAllItemsByLicence(params);
    },

    licenceGetAll: async (params) => {
        return await db.getAllLicence();
    },    

    /* Buscar */
    seachAdmin: async (params) => {
        console.log("dentro del servicio")
        const sql = 'product_name LIKE ? OR sku LIKE ? OR category_name LIKE ?';
        params = [params, params, params];
        return await db.getSearch(sql, params);
    },




    /* Editar */
    itemEdit : async (params, id) => {
        console.log('- Servicios -> itemEdit');
        const itemSchema = await schema(params, "product");      // esta logica va para itemCreate ya que para el edit solo se necesita el Objeto
        return await db.updateItem(itemSchema, id);

    },


    /* Delete */
    itemDelete : async(id)=>{
        return await db.deleteItem(id);
    },


    /* Schema */
    itemSchema : async(table)=>{
        const params = null;
        return await schema(params, table); 
    }

}