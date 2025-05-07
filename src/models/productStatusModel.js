const mongoose = require('mongoose');

const productsStatusSchema = mongoose.Schema({
    productStatusName : {
        type : String,
        required : true,
        unique : true
    }
});

module.exports = mongoose.model('productsStatus', productsStatusSchema);