const mongoose = require('mongoose');

const subdeptoSchema = mongoose.Schema({
    subdeptoName:{
        type : String,
        unique : true,
        required : true
    },
    deptoLink:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'deptos'
    }
});
module.exports = mongoose.model('subdepto', subdeptoSchema);
