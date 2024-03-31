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
    getOneItem : async (params) => {
      try{   
        const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id JOIN licence ON product.licence_id=licence.licence_id WHERE ?', [params]); // la query devuelve rows y fields, en este caso selecciono las rows
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
        // const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id JOIN licence ON product.licence_id=licence.licence_id ORDER BY rand() LIMIT 2');
        
        return rows;
      }catch(err){
        error.load(err)
        throw(error);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },
    getAllItemsByLicence : async (params)=> {
      try{
        const [rows] = await db.query('SELECT * FROM product JOIN licence ON product.licence_id=licence.licence_id WHERE product.licence_id=?', [params]);
        return rows;
      }catch(err){
        error.load(err)
        throw(error);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },
    getSearchAdmin : async (params)=>{
      try{
        const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id WHERE product_name LIKE ? OR sku LIKE ? OR category_name LIKE ?',[params,params,params]);
        // const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id JOIN licence ON product.licence_id=licence.licence_id WHERE ');
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
    getOneLicence : async(params) => {
      try{  
        const [rows] = await db.query('SELECT * FROM licence WHERE ?', [params]);
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
    getOneCategory : async(params) => {
      try{  
        const [rows] = await db.query('SELECT * FROM category WHERE ?', [params]);
        return rows;
      }catch(err){
        // return error.Obtener(err);
      }finally{
        console.log("Liberando conexion de la BBDD");
        db.releaseConnection();
      }
    },



    /* Buscar */

    getSearch : async (sql, params)=>{ // params es un array que debe conincidir con los ? para que no de error 
      try{
        // const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id WHERE product_name LIKE ? OR sku LIKE ? OR category_name LIKE ?',[params,params,params]);
        console.log(`SELECT * FROM product JOIN category ON product.category_id=category.category_id JOIN licence ON product.licence_id=licence.licence_id WHERE`+sql);
        const [rows] = await db.query(`SELECT * FROM product JOIN category ON product.category_id=category.category_id JOIN licence ON product.licence_id=licence.licence_id WHERE `+sql, params);
        return rows;
      }catch(err){
        error.load(err)
        throw(error);
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
