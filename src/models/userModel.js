const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname : String,
    secondname : String,
    lastname : String,
    secondSurname : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    username : {
        type : String,
        unique : true,
        required : true
    },
    permisson : {
        permissonCode : String,
        permissonName : String
    },
    active : {
        type : Boolean,
        default : false
    },
    password : String,
    depto : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'deptos'
    },
    subdepto : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subDepto'
    }],
    userMenu : []
});

module.exports = mongoose.model("user", userSchema);