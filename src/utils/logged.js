module.exports = {
    logged : (req, res, next) => {
        res.locals.isLogged = req.session.isLogged;
        next();
    }
}