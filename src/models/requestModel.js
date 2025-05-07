const mongoose = require('mongoose');
const requestSchema = mongoose.Schema({
    requestor : {
        type: String,
        required : true
    },
    requestItems : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'product'
        },
        quantity : Number
    }],
    requestDate : {
        type: String,
        required : true
    },
    requestVia : {
        type: String,
        required : true
    },
    requestStatus: {
        statusName: String,
        requestStatusDate: String
    },
    previousRequestStatus : [{
        prevStatusName: String,
        prevRequestStatusDate: String
    }],
    finalUser: {
        finalUserName: String,
        finalUserDepto: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'deptos'
        },
        finalUserDeptoCode: {
            type : String,
            required : true
        },
        finalUserSubDepto : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'subdepto'
        }
    },
    requestID : {
        type : String,
        required : true,
        unique : true
    },
    requestorID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
});

module.exports = mongoose.model("request", requestSchema);