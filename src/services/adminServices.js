/* capa servicios para antes de la conulta de model a la BBDD */
const db = require('../models/mainModels');

const schema = async(params, table) => {
    try{
        const headers = await db.dbCabeceras(table);
        const ignoredKeys = ["schema", "product_id", "create_time", "isAdmin", "aceptacionDeTerminos", "passwordR"];
        const itemSchema = {};
              
        /* Creacion del schema */
        headers.forEach((o) => itemSchema[Object.values(o)]=null);  // Creacion de objeto en base a las cabeceras de la BD
        Object.assign(itemSchema, params);                          // Clonar parametros en base al esquema de la BD
        ignoredKeys.forEach((key) => delete itemSchema[key]);       // Eliminacion de las 'Keys' no requeridas
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

    itemGetByLicence: async (params) => {
        return await db.getAllItemsByLicence(params);
    },

    licenceGetAll: async (params) => {
        return await db.getAllLicence();
    },    
    
    /* Buscar */
    searchAdmin: async (params) => {
        try{
        params = [params, params, params];
        return await db.getSearchAdmin(params);
        }catch(err){
            console.log(err);
            throw(err);
        }
    },

    searchItem: async (search="", order=1, min=false, max=false, fNew=false, fOfert=false, fSpecial=false, fFavorites=false) =>{
        let sql = "";
        let sqlAND = "";
        let params = [];
        
        if (search != ""){
            sql = 'product_name LIKE ? OR licence_name LIKE ?';
            sqlAND = ' AND ';
            params = [`%${search}%`, `%${search}%`];   
        }

        min = parseInt(min);
        max = parseInt(max);
        

        if(min){
            sql += sqlAND;
            sql += 'price >= ?';
            sqlAND = ' AND ';
            params.push(min);
        }

        if(max){
            sql += sqlAND;
            sql += 'price <= ?';
            sqlAND = ' AND ';
            params.push(max);
        }

        /* Logicas
            fNews
            fOfert
            fSpecial
            fFavorites
        */
        order = parseInt(order);
        switch (order){
            case 0: break;
            case 1: sql+= ' ORDER BY product_name';
            break;
            case 2: sql+= ' ORDER BY product_name DESC';
            break;
            case 3: sql+= ' ORDER BY price';
            break;
            case 4: sql+= ' ORDER BY price DESC';
            break;
        }

        
        if(sqlAND == ""){   // control por si unicamente se modifica el orden de los items
            return await db.getAllItems(sql);
        }
        return await db.getSearch(sql, params);
    },

    /* Editar */
    itemEdit : async (params, id) => {
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
    },

    /* users */
    userCreate: async(params) => {
        const userSchema = await schema(params, "user"); 
        return await db.insertUser(userSchema);
    },
    userCheck: async(params) => {
        const [user] = await db.userExist(params);
        return user;
    }
}