const mongoose = require('mongoose')

const deptosSchema = mongoose.Schema({
    deptoCode : {
        type : String,
        required : true,
        unique : true
    },
    deptoName : {
        type : String,
        required : true,
        unique : true
    },
    deptoNom : {
        type : String,
        required : true,
        unique : true
    }
});

module.exports = mongoose.model("deptos", deptosSchema);