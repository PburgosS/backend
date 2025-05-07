const mongoose = require('mongoose');

const permissonSchema = mongoose.Schema({
    permissonCode: {
        type : String,
        required : true,
        unique : true
    },
    permissonName: {
        type : String,
        required : true,
        unique : true
    },
    postName : {
        type : String,
        required : true,
        unique : true
    }
});

module.exports = mongoose.model("permison", permissonSchema);