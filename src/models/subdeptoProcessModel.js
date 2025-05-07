const mongoose = require('mongoose');

const subdeptoProcessSchema = mongoose.Schema({
    subdeptoProcessName:{
        type : String,
        required : true
    },
    subdeptoLink:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'subdeptos'
    }
});
module.exports = mongoose.model('subdeptoProcess', subdeptoProcessSchema);