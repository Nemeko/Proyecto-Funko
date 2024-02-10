/* En modelos unicamente va las consultas query a BBDD */

const { db } = require('../config/db');     // cargamos el archivo de conf de la BBDD

const getAllItem = async ()=> {
    const [rows] = await db.query('SELECT * FROM product');
    return rows;
}

const getOneItem = async (params) => {
    const [rows] = await db.query('SELECT * FROM product WHERE ?', params); // la query devuelve rows y fields, en este caso selecciono las rows
    return rows;
}

const getAllLicence = async() => {
    const [rows] = await db.query('SELECT * FROM licence');
    return rows;
}

const getOneLicence = async(params) => {
    const[rows] = await db.query('SELECT * FROM licence WHERE ?', params);
    return rows;
}

const getAllCategory = async() => {
    const [rows] = await db.query('SELECT * FROM category');
    return rows;
}

const getOneCategory = async(params) => {
    const[rows] = await db.query('SELECT * FROM category WHERE ?', params);
    return rows;
}





module.exports = {
    getAllItem,
    getOneItem,
    getAllLicence,
    getOneLicence,
    getAllCategory,
    getOneCategory
}