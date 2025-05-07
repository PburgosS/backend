const mongoose = require('mongoose');

const providerSchema = mongoose.Schema({
    providerRut : {
        type : String,
        unique : true,
        require : true
    },
    providerRegisteredName:{
        type: String,
        unique: true,
        require: true
    },
    providerFantasyName:{
        type: String,
        unique: true,
        require: true
    },
    market:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    countryCommune:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'commune'
    }
});

module.exports = mongoose.model("provider", providerSchema);