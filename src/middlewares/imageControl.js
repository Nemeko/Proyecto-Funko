
const checkImage = (req, res, next) => {

    console.log('- Middleware -> imageUploadControl - START');    

    const files = Object.values(req.files);

    if(files.length == 2){
        console.log('2 Imagenes editadas')
        req.body.image_front = files[0][0].path;
        req.body.image_back = files[1][0].path;
    
    } else if(files.length == 1) {
        console.log('1 Imengen editada')
        files[0][0].fieldname == 'imagenDelantera' ? req.body.image_front = files[0][0].path : req.body.image_back = files[0][0].path;
        
    } else{
        console.log('Ninguna imagen editada');
    }

    console.log('- Middleware -> imageUploadControl - END');
    next();
}

module.exports = checkImage