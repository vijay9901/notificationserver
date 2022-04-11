const mongoose = require('mongoose')


const companySchema = new mongoose.Schema( {
    companyname: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    companytype: {
        type: String,
        required: true,
        trim: true
    },

    companyId: {
        type: String,
        required: false,
        trim: true
    },

    companynumber: {
        type: Number,
        min: 1000000000, 
        max:9999999999,
        required: true,
        trim: true
    },
    market: {
        type: String,
        required: true,
        trim: true
    },
    calldate:{
        type: Date,
        required: true,
    },

    schedule:[{
                type: String,
        required: true,
    }]
})


const Company = mongoose.model('Companies', companySchema)

module.exports = Company