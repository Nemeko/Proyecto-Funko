const mysql = require('mysql2');
const { connect } = require('../routes/adminRutes');
require('dotenv').config();

const pool = mysql.createPool({       // Creamos un pool de conexion con la conf de la BBDD
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    port:3306,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

pool.getConnection((error, connection)=>{  
        if(!error){
            console.log("- La conexion a la BBDD fue exitosa")
            connection.release();
        }else{
            console.log("- Hubo un error en la conexion a la BBDD:\n",error);
            console.log("\n- Es necesario reiniciar la ejecucion manualmente")
        }
    });

    module.exports = {
        db: pool.promise()      // Exportamos como promesa porque cuando lo llamamemos del callback espera una promesa  
    };