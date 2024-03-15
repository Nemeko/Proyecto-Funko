/* En modelos unicamente va las consultas query a BBDD */

const  { db } = require('../config/db');     // cargamos el archivo de conf de la BBDD

const error = {     // mover al errorhandeler y arreglar
  isError:true,
  message:"Error desconocido ",
  load(e){
    this.message = "Algo anda mal con la BBDD -> " + e;
  }
}


// const error = (e) => {
//   console.log("dentro de la funcion error")
//   const message = "Algo anda mal con la BBDD -> " + e;
//   res.status(500).render('./error',message);
// }

module.exports = {
    /* Crear */
    insertItem : async(params) => { /* modificar para que tome las keys y las values en 2 parametros */
      try{
        await db.query('INSERT INTO product SET ?', [params])
      }catch(err){
        console.log(err);
        error.load(err)
        throw(error);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },

    
    

    /* obtener */
    getOneItem : async (sql) => {
      try{   
        const [rows] = await db.query('SELECT * FROM product WHERE ?', [sql]); // la query devuelve rows y fields, en este caso selecciono las rows
        return rows;
      }catch(err){
        res.status(500).render('./error',error(err));
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },
    getAllItems : async ()=> {
      try{
        // const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id');
        const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id JOIN licence ON product.licence_id=licence.licence_id');
        return rows;
      }catch(err){
        error.load(err)
        throw(error);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },
    getSearchAdmin : async (sql)=>{
      try{
        const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id WHERE product_name LIKE ? OR sku LIKE ? OR category_name LIKE ?',[sql,sql,sql]);
        return rows;
      }catch(err){
        error.load(err)
        throw(error);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },
    getAllLicence : async() => {
      try{   
        const [rows] = await db.query('SELECT * FROM licence');
        return rows;
      }catch(err){
        // error.Obtener(err);
        return error;
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },
    getOneLicence : async(sql) => {
      try{  
        const [rows] = await db.query('SELECT * FROM licence WHERE ?', [sql]);
        return rows;
      }catch(err){
        // error.Obtener(err);
        return error;
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },
    getAllCategory : async() => {
      try{
        const [rows] = await db.query('SELECT * FROM category');
        return rows;
      }catch(err){
        // return error.Obtener(err);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },
    getOneCategory : async(sql) => {
      try{  
        const [rows] = await db.query('SELECT * FROM category WHERE ?', [sql]);
        return rows;
      }catch(err){
        // return error.Obtener(err);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },



    /* Editar */
    updateItem : async(params, id) => {
      try{
      const [rows] = await db.query('UPDATE product SET ? WHERE product_id = ?',[params, id])
      return rows
      }catch(err){
        return error.Modificar(err);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },



    /* Eliminar */
    deleteItem : async(id) => {
      try{
        return await db.query('DELETE FROM product WHERE ?', [id]); 
      }catch(err){
        return error.Eliminar(err);
      }finally{
        db.releaseConnection();
      }
    },
      
      

    /* DB INFO */
    dbCabeceras : async ()=>{
      try{
      const [rows] = await db.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "product"');
      return rows;
      }catch(err){
        return error.Cabeceras(err);
      }finally{
        db.releaseConnection();
      }
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





/*

{
  product_name: 'test',
  product_description: 'test',
  price: '123',
  stock: '1',
  discount: '1',
  sku: 'test09',
  dues: null,
  image_front: '/img/Imagenes-Funko/1708808014464-vulpix-1.webp',
  image_back: null,
  licence_id: '1',
  category_id: '1'
}

{
  product_name: 'testing',
  product_description: 'testing carga BBDD con null',
  price: '124',
  stock: '123',
  discount: '2',
  sku: 'test08',
  dues: null,
  image_front: '/img/Imagenes-Funko/1708805953951-charmander-1.webp',
  image_back: '/img/Imagenes-Funko/1708555837683-vulpix-box.webp',
  licence_id: '1',
  category_id: '1'
}
*/