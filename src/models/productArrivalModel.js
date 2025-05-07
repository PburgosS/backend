const mongoose = require('mongoose');

const productArrivalSchema = mongoose.Schema({
    product : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product',
        required : true
    }],
    provider : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'provider',
        required : true 
    },
    arrivalDate : {
        type : String,
        required : true
    },
    buyOrder : {
        type : String,
        required : true,
        unique : true
    },
    receipt : {
        type : String,
        required : true,
        unique : true
    },
    actualProductStatus : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'productsStatus'
        
    },
    historyProductStatus : [{
        productStatus : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'productsStatus'
        },
        productStatusDate : String
    }]
})

module.exports = mongoose.model('productArrival', productArrivalSchema);