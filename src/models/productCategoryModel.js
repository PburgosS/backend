const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema({
    productCategoryName : {
        type : String,
        unique : true,
        require : true
    }
});
module.exports = mongoose.model('productCategory', productCategorySchema);