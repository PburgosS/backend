const mongoose = require('mongoose');
const productDeregisterSchema = mongoose.Schema({
    deregisterDate : {
        type : String,
        required : true
    },
    productDeregistered : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'product'
        },
        serialNumber : {
            type : String,
            required : true,
            unique : true
        }
    }]
});

module.exports = mongoose.model('productDeregister', productDeregisterSchema);