const mongoose = require('mongoose');

const productArrivalSchema = mongoose.Schema({
    productArrived : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'product',
            required : true
        },
        productSerialNumber : {
            type : String,
            required : true,
            unique : true
        }
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