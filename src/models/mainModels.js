/* En modelos unicamente va las consultas query a BBDD */

const  { db } = require('../config/db');     // cargamos el archivo de conf de la BBDD

/* Obtener la info de las columnas para los schemas */
/* SELECT TABLE_NAME FROM information_schema.columns WHERE TABLE_NAME = product */


const dbInfo = async ()=>{
  return await db.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "product"');
  // console.log(info);
  // return await db.query('SELECT TABLE_NAME FROM information_schema.columns WHERE TABLE_NAME = product');
}  


module.exports = {

    /* Crear */
      insertItem : async(params) => {
        const [rows] = await db.query('INSERT INTO product (product_name, product_description, price, stock, discount, sku, dues, licence_id, category_id) values(?)', [params])
      },


    /* obtener */
      getAllItem : async ()=> {
           const [rows] = await db.query('SELECT * FROM product');
        return rows;
    },

      getOneItem : async (params) => {
           const [rows] = await db.query('SELECT * FROM product WHERE ?', [params]); // la query devuelve rows y fields, en este caso selecciono las rows
        return rows;
    },

      getAllLicence : async() => {
           const [rows] = await db.query('SELECT * FROM licence');
        return rows;
    },

      getOneLicence : async(params) => {
          const [rows] = await db.query('SELECT * FROM licence WHERE ?', [params]);
        return rows;
    },

      getAllCategory : async() => {
        const [rows] = await db.query('SELECT * FROM category');
        return rows;
    },

      getOneCategory : async(params) => {
          const [rows] = await db.query('SELECT * FROM category WHERE ?', [params]);
        return rows;
    },


    /* Editar */
      updateItem : async(params, id) => {
          const [rows] = await db.query('UPDATE product SET ? WHERE product_id = ?',[params, id])
        return rows
    },


    /* Eliminar */
      deleteItem : async(id) => {
        return await db.query('DELETE FROM product WHERE ?', [id]); 
      }  
 }







/* Agregar */
/* INSERT INTO `category`(`category_id (este campo es auto increment)`, `category_name`, `category_description`) VALUES ('value-1','value-2','value-3') */

/* actualizar */
// UPDATE `category` SET `category_id`='[value-1]',`category_name`='[value-2]',`category_description`='[value-3]' WHERE category_id=1


// module.exports = {
//     getAllItem,
//     getOneItem,
//     getAllLicence,
//     getOneLicence,
//     getAllCategory,
//     getOneCategory, 
//     updateItem, 
//     updateImage
// }