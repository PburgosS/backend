const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    countryName:{
        type : String,
        unique : true,
        required : true
    },
    countryIataCode : {
        type: String,
        unique : true,
        required : true
    }
});

module.exports = mongoose.model("country", countrySchema);