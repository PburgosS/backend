const mongoose = require('mongoose');

const providerContactSchema = mongoose.Schema({
    providerContactName: {
        type: String,
        unique: true,
        require: true
    },
    providerContactEmail: {
        type: String,
        unique: true,
        require: true
    },
    providerContactNumber: {
        type: String,
        unique: true,
        require: true
    },
    assignat : {
        default : true
    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'provider'
    }
});

module.exports = mongoose.model("providerContact", providerContactSchema);