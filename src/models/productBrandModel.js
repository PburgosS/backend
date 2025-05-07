const mongoose = require('mongoose');

const productBrandSchema = mongoose.Schema({
    productBrandName : {
        type : String,
        require : true,
        unique :  true
    }
});
module.exports = mongoose.model('productBrand', productBrandSchema);