/* Utilizando express-session */
// const session = require('express-session');
// require('dotenv').config();

// module.exports = {
//     initSession : () => {
//         return session({
//             secret: process.env.SESSION_NAME,
//             resave: false,
//             saveUnitialized: true
//         })
//     }
// }

/* Utilizando cookie-sessions (config para poder utilizarlo en el server gratuito)*/
const session = require('cookie-session');
require('dotenv').config();

module.exports = {
    initSession : () => {
        return session({
            secret: process.env.SESSION_NAME
        })
    }
}


/* variables de conf que recibe express-session
- resave: Indica si se deve volver a guardar la sesion en el almacen de sessiones aunque no haya habido cambios en la session durante la solicitud
- saveUnitialized: Determina si se debe guardar una session auqneu no se haya modificado
                   El valor true permite que se cree una session nueva y se guarde en el almacen de sessiones incluso si no se ha modificado ningun dato
- name: Especifica el nombre de la cookie de session. Por defecto se utiliza "connect.sid"
- cookie: Permite configurar opciones especificas para la cookie de session, como el tiempo de expiracion (expires), la ruta (path), el dominio (domain), etc
- store: Define el almacen de sessiones que se utilizara para guardar las sessiones.
         Puede utilizar un almacen de memoria (MemoryStore), almacenamiento en BBDD, almacenamiento en cache (RedisStore), etc
- rolling: Indica si la cookie de session debe ser renovada en cada interaccion con el servidor, lo que extiende su tiempo de expiracion.
*/
