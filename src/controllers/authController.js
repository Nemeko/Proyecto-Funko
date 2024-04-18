const services = require('../services/adminServices');
const bcrypt = require('bcrypt');

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
        const user = await services.userCheck(email);
        console.log(`User = ${user}`);

        if(!user){
            return res.status(401).send("Credenciales invalidas"); 
        }
        /* ----- Logica para verficar al usuario */      
        
        const emailValidation = email == user.email;                            
        const passwordValidation = bcrypt.compareSync(password, user.password);

        console.log(`EmailValidator - ${emailValidation}\npassValidation - ${passwordValidation}`);
        req.session.isLogged = emailValidation && passwordValidation ? true : false;

        /* nota: guardar en la variable session si es admin? */

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
        const comprovacionValores = Object.values(req.body).indexOf("");    // Comprobacion de algun espacion en blanco
        // console.log(`Hay algun campo vacio? (-1 = false) -> (${valores})`);
        // console.log(`\n\n userInfo -> `,userInfo,`\n\n valores -> ${valores}`);

        if(comprovacionValores != -1){
            const mensaje = 'Falta completar algun valor o no cumple con los requisitos';
            return res.render('./auth/register' , {mensaje});
        }

        try{
            await services.userCreate(userInfo);
            res.send('Controller -> adminRegister\n');  // Revisar esto que no me cuadra !!!!!
        }catch(err){
            const {sqlMessage} = err.e;                                         // Recuperacion del mensaje de error del SQL
            const isEmailDuplicate = sqlMessage.includes("user_unique_email");  // True si el correo esta duplicado
            
            console.log("e = ", err.e);
            
            if (isEmailDuplicate){
                const mensaje = 'Ya existe una cuenta registrada con el correo indicado';
                return res.render('./auth/register' , {mensaje});
            }
            res.status(500).render('./error',{err});
        } 
    }
}
