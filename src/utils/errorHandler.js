

module.exports = {
    notFound: (req, res, next) => {
        res.status(404).send('Pagina no encontrada');
    },
    serverError: (req, res, next) => {
        res.status(500).send("el Servidor que traia la info no funciona");
    }
}