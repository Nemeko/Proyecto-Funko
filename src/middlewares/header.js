/* Config del menu del header si esta logueado */

module.exports = {    
    admin : (req, res, next) => {
        req.headerMenu = [{
            menu : "SHOP",
            url : "/shop"
        }];
        next()
    },
    create : (req, res, next) => {
        req.headerMenu = [{
            menu : "SHOP",
            url : "/shop"
        },{
            menu : "ADMIN",
            url : "/admin/list"
        }];
        next()
    },
    shop : (req, res, next) => {
        req.headerMenu = [{
            menu : "ADMIN",
            url : "/admin/list"
        }];
        next()
    },
    item : (req, res, next) => {
        req.headerMenu = [{
            menu : "SHOP",
            url : "/shop"
        },{
            menu : "ADMIN",
            url : "/admin/list"
        }];
        next()
    }
}