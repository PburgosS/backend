const mongoose = require('mongoose');

const viewSchema = mongoose.Schema({
    viewName : {
        type : String,
        unique : true,
        required : true
    },
    frontPath:{
        type : String,
        unique : true,
        required : true
    },
    viewPermisson:{
        type : String,
        required : true,
    },
    actionLink : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'action'
    }
});

module.exports = mongoose.model("view", viewSchema);