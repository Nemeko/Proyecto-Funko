
/* llamar a la BBDD */

const itemsList = (req, res) => {
    console.log('Controller -> Lista de Items (Admin)')
    res.send('Lista de Items (Admin)')
}

const itemCreateLoad = (req, res) => {
    console.log('Controller ->  itemCreateLoad')
    res.send('Controller ->  itemCreateLoad')
}

const itemEditLoad = (req, res) => {
    console.log('Controller -> itemEditLoad')
    res.send('Controller -> itemEditLoad')
}

const userLogin = async (req, res) => {
    console.log('Controller -> userLogin');
    res.send('Controller -> userLogin');
}

const adminRegisterLoad = async (req, res) => {
    console.log('Controller -> adminRegisterLoad');
    res.send('Controller -> adminRegisterLoad');
}


const itemCreate = async (req, res) => {
    console.log('Controller -> itemCreate');
    res.send('Controller -> itemCreate');
}

const adminRegister = async (req, res) => {
    console.log('Controller -> adminRegister');
    res.send('Controller -> adminRegister');
}


const itemEdit = async (req, res) => {
    console.log('Controller -> itemEdit');
    res.send('Controller -> itemEdit');
}


const itemDelete = async (req, res) => {
    console.log('Controller -> itemDelete');
    res.send('Controller -> itemDelete');
}

module.exports = {
    itemsList,
    itemCreateLoad,
    itemEditLoad,
    userLogin,
    adminRegisterLoad,
    itemCreate,
    adminRegister,
    itemEdit,
    itemDelete
}