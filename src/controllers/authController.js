const { secureHeapUsed } = require('crypto');
const db = require('../models/mainModels');
const adminServices = require('../services/adminServices');
const services = require('../services/adminServices');
const fs = require('fs');   // Se llama para eliminar archivos del directorio
const { on } = require('events');
const bcrypt = require('bcrypt');
const { PassThrough } = require('stream');

/* durante desarrollo unicamente */
const userCredentials = {
    email: "admin@admin.com",
    password: "Abc123"
}

/* funcion para encryptar */

const encryptar = (password) => {
    const saltRounds = 1;  // requerido para encryptar
    password = bcrypt.hashSync(password, saltRounds);
    return password;
}


module.exports = {
    
    /* Login */
    userLoginLoad : async (req, res) => {
        res.render('./auth/login');
    },
    
    userLogin : async (req, res) => {
        const { email, password } = req.body;
        const emailValidation = userCredentials.email == email; // tomar email de la BBDD
        const passwordValidation = userCredentials.password == password; // tomar password de la BBDD
        


        /* encryptar correo y password 
        en caso de olvidar la contraseña enviarla al correo desde una cuenta no reply
        si la pass esta en blanco (se elimino de la BBDD) que solicite la pass al ingresar ?

        /* logica para detectar si es admin y esta logueado correctamente */
        req.session.isLogged = emailValidation && passwordValidation ? true : false;

        /* guardar en la variable session si es admin */

        if(req.session.isLogged){
            return res.redirect('/admin/list');
        }
        return res.status(401).send("Credenciales invalidas"); // No tiene permisos o manejar el error con algo de eso
    },
    userLogout : (req, res) => {
        req.session.isLogged = false;
        return res.redirect('/');
    },


    /* registration */
    adminRegisterLoad : async (req, res) => {
        const headerMenu = req.headerMenu
        const mensaje = "";
        res.render('./auth/register', {headerMenu, mensaje});
    },
    adminRegister : async (req, res) => {
        const terminos = req.body.aceptacionDeTerminos;
        const passValidator = (req.body.password === req.body.passwordR && req.body.password != "");
        
        if(!passValidator){
            const mensaje = 'La contraseña no coincide o no cumple las especificaciones';
            return res.render('./auth/register' , {mensaje});
        }else if (!terminos){
            const mensaje = 'Es necesario aceptar los Terminos y condiciones';
            return res.render('./auth/register' , {mensaje});
        }
        
        req.body.password = encryptar(req.body.password);       // Encriptacion de la password
        delete req.body["passwordR"];                           // Eliminacion del passwordR (comprobacion)

        const userInfo = req.body;
        const valores = Object.values(req.body).indexOf("");
        console.log(`Hay algun campo vacio? (-1 = false) -> (${valores})`);
        console.log(`\n\n userInfo -> `,userInfo,`\n\n valores -> ${valores}`);

        if(valores != -1){
            const mensaje = 'Falta completar algun valor o no cumple con los requisitos';
            return res.render('./auth/register' , {mensaje});
        }

        try{
            await services.userCreate(userInfo);
            res.send('Controller -> adminRegister\n');
        
        
        
        }catch(err){
            const {sqlMessage} = err.e;
            const isEmailDuplicate = sqlMessage.includes("user_unique_email");           
            
            console.log("e = ", err.e);
            
            if (isEmailDuplicate){
                const mensaje = 'Ya existe una cuenta registrada con el correo indicado';
                return res.render('./auth/register' , {mensaje});
            }
            
            res.status(500).render('./error',{err})
        } 
    

        // const hash = encryptar(password[0]);
        // console.log(`hash +> ${hash}`);
    
        
    }
}


// Load hash from your password DB.
// bcrypt.compareSync(myPlaintextPassword, hash); // true