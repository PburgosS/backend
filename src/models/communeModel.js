const mongoose = require('mongoose');

const communeSchema = mongoose.Schema({
    communeName : {
        type: String,
        required : true,
        unique: true
    },
    communeLocode : {
        type: String,
        required : true,
        unique : true
    },
    regionLink : {
        type :  mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'regions'
    }
});

module.exports = mongoose.model('communes', communeSchema);