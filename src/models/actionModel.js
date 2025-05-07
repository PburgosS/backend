const mongoose = require('mongoose');
const actionSchema = mongoose.Schema({
    actionName : {
        type : String,
        required : true
    },
    processLink : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'subdeptoProcess'
    }
});
module.exports = mongoose.model('action', actionSchema);