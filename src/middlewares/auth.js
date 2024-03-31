
module.exports = {
    isLogged : (req, res, next) => {
        if (req.session.isLogged){
            return next();
        }
        return res.status(401).redirect('/auth/login');      //.redirect('auth/login'); //hay que hacer que redirija al login
    }
}