const mongoose = require('mongoose');

const regionSchema = mongoose.Schema({
    regionName : {
        type: String,
        unique : true,
        required : true
    },
    regionISOCode : {
        type : String,
        unique : true,
        required : true
    },
    countryLink : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'countries'
    }
});

module.exports = mongoose.model('regions', regionSchema);