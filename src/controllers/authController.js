const { secureHeapUsed } = require('crypto');
const db = require('../models/mainModels');
const adminServices = require('../services/adminServices');
const services = require('../services/adminServices');
const fs = require('fs');   // Se llama para eliminar archivos del directorio
const { on } = require('events');

/* durante desarrollo unicamente */
const userCredentials = {
    email: "admin@admin.com",
    password: "Abc123"
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

        req.session.isLogged = emailValidation && passwordValidation ? true : false;

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
        res.render('./auth/register');
    },
    adminRegister : async (req, res) => {
        console.log('Controller -> adminRegister');
        res.send('Controller -> adminRegister');
    }
}