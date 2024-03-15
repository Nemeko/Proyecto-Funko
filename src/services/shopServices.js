const db = require('../models/mainModels');

module.exports = {
    
    itemShopLoad : async (params) => {
        return await db.getAllItems();
    }
    // items = await services.itemSearchAdmin(`%${search}%`);
    // itemShopLoad();
    // getAllItems
}