/* En modelos unicamente va las consultas query a BBDD */

const  { db } = require('../config/db'); 

const error = {     // mover al errorhandeler y arreglar
  isError:true,
  message:"Error desconocido ",
  load(e){
    this.message = "Algo anda mal con la BBDD -> " + e;
    this.e = e;
  }
}

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
        db.releaseConnection();
      }
    },
        
    
    /* obtener */
    getOneItem : async (params) => {
      try{   
        const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id JOIN licence ON product.licence_id=licence.licence_id WHERE ?', [params]); // la query devuelve rows y fields, en este caso selecciono las rows
        return rows;
      }catch(err){
        // res.status(500).render('./error',error(err));
      }finally{
        db.releaseConnection();
      }
    },
    getAllItems : async (sql=" ORDER BY product_name")=> {
      try{
        const [rows] = await db.query(`SELECT * FROM product JOIN category ON product.category_id=category.category_id JOIN licence ON product.licence_id=licence.licence_id`+sql);
        return rows;
      }catch(err){
        error.load(err)
        throw(error);
      }finally{
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
        db.releaseConnection();
      }
    },


    /* Buscar */
    getSearchAdmin : async (params)=>{
      try{
        console.log("dentro del sql: ", params);
        const [rows] = await db.query('SELECT * FROM product JOIN category ON product.category_id=category.category_id WHERE product_name LIKE ? OR sku LIKE ? OR category_name LIKE ?', params);
        console.log("rows ",rows);
        return rows;
      }catch(err){
        console.log(err);
        error.load(err)
        throw(error);
      }finally{
        db.releaseConnection();
      }
    },
    getSearch : async (sql, params)=>{
      try{
        const [rows] = await db.query(`SELECT * FROM product JOIN licence ON product.licence_id=licence.licence_id WHERE `+sql, params);
        // const [rows] = await db.query("SELECT * FROM product JOIN licence ON product.licence_id=licence.licence_id WHERE product_name LIKE '%harr%' OR licence_name LIKE '%harr%' AND price <= 200 ORDER BY product_name")
        return rows;
      }catch(err){
        error.load(err)
        throw(error);
      }finally{
        db.releaseConnection();
      }
    },


    /* Editar */
    updateItem : async(params, id) => {
      try{
      const [rows] = await db.query('UPDATE product SET ? WHERE product_id = ?',[params, id]);
      return rows
      }catch(err){
        return error.Modificar(err);
      }finally{
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
    dbCabeceras : async (table)=>{
      try{
        const [rows] = await db.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'Funkodb' AND table_name = ?`, [table]);
        return rows;
      }catch(err){
        return error.Cabeceras(err);
      }finally{
        db.releaseConnection();
      }
    },

    /* Enviar emails desde Node */
    // https://www.w3schools.com/nodejs/nodejs_email.asp

    /* User info */
    insertUser : async(user) => {
      try{
        await db.query('INSERT INTO user SET ?', [user]);
      }catch(err){
        console.log(err);
        error.load(err);
        throw(error);
      }finally{
        db.releaseConnection();
      }
    },
    userExist : async (params) => {
      try{   
        const [rows] = await db.query('SELECT * FROM user WHERE email=?', [params]); // la query devuelve rows y fields, en este caso selecciono las rows
        console.log("db user email - ", rows);
        return rows;
      }catch(err){
        console.log(err);
        res.status(500).render('./error',error(err));
      }finally{
        db.releaseConnection();
      }
    },

    userSetPassord : async () => {
      // modificar la pass en db para el usuario
    }

 }
